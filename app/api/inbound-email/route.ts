import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { Webhook } from "svix";
import { Resend } from "resend";
import { supabaseAdmin } from "../../lib/supabase";
import {
  buildBodyHtml,
  isAllowedSender,
  makeExcerpt,
  slugify,
} from "../../lib/email-to-post";

export const runtime = "nodejs";
export const maxDuration = 60;

type ReceivedAttachment = {
  id: string;
  filename: string | null;
  content_type: string | null;
  content_disposition: string | null;
  content_id: string | null;
  size: number;
};

function bad(status: number, message: string) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(req: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return bad(500, "RESEND_WEBHOOK_SECRET not configured");

  // 1. Verify the Svix signature against the raw body.
  const raw = await req.text();
  let event: { type: string; data: Record<string, unknown> };
  try {
    event = new Webhook(secret).verify(raw, {
      "svix-id": req.headers.get("svix-id") ?? "",
      "svix-timestamp": req.headers.get("svix-timestamp") ?? "",
      "svix-signature": req.headers.get("svix-signature") ?? "",
    }) as typeof event;
  } catch {
    return bad(401, "Invalid signature");
  }

  if (event.type !== "email.received") {
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  const meta = event.data as {
    email_id: string;
    from: string;
    subject?: string;
    message_id?: string;
  };

  // 2. Only allowlisted senders may publish.
  if (!isAllowedSender(meta.from)) {
    return bad(403, "Sender not allowed");
  }

  const admin = supabaseAdmin();
  const resend = new Resend(process.env.RESEND_API_KEY);

  // 3. Pull the full email (body + attachment metadata).
  const { data: email, error: getErr } = await resend.emails.receiving.get(
    meta.email_id,
  );
  if (getErr || !email) return bad(502, `Failed to fetch email: ${getErr?.message ?? "unknown"}`);

  const messageId = email.message_id ?? meta.message_id ?? meta.email_id;

  // 4. De-dupe — Resend may retry the webhook.
  const { data: existing } = await admin
    .from("posts")
    .select("slug")
    .eq("message_id", messageId)
    .maybeSingle();
  if (existing) {
    return NextResponse.json({ ok: true, deduped: existing.slug });
  }

  const subject = (email.subject ?? meta.subject ?? "Untitled").trim();
  const baseSlug = slugify(subject);

  // 5. Process image attachments → upload to Supabase Storage.
  const attachments = (email.attachments ?? []) as ReceivedAttachment[];
  const cidToUrl = new Map<string, string>();
  const trailingImageUrls: string[] = [];
  const sourceHtml = email.html ?? "";

  for (const att of attachments) {
    if (!att.content_type?.startsWith("image/")) continue;

    // Is this attachment actually referenced by cid: in the HTML? Gmail embeds
    // inline images as base64 data: URIs in the body *and* re-sends them as
    // inline attachments. We rewrite the data: URIs in step 6, so uploading
    // the duplicate attachment here would just orphan an unused file.
    const bareCid = att.content_id?.replace(/^<|>$/g, "");
    const cidReferenced = !!bareCid && sourceHtml.includes(`cid:${bareCid}`);
    if (att.content_disposition === "inline" && !cidReferenced) continue;

    try {
      const { data: full } = await resend.emails.receiving.attachments.get({
        id: att.id,
        emailId: meta.email_id,
      });
      const downloadUrl = (full as { download_url?: string })?.download_url;
      if (!downloadUrl) continue;

      const bytes = Buffer.from(await (await fetch(downloadUrl)).arrayBuffer());
      const url = await storeImage(
        admin,
        baseSlug,
        att.id.slice(0, 8),
        bytes,
        att.content_type,
        att.filename ?? att.id,
      );

      if (cidReferenced) {
        cidToUrl.set(att.content_id!, url);
      } else {
        trailingImageUrls.push(url);
      }
    } catch (e) {
      console.error(`inbound-email: attachment ${att.id} failed`, e);
    }
  }

  // 6. Inline images embedded directly in the HTML as data: URIs (Gmail and
  //    others do this instead of cid:) → upload and rewrite src to hosted URL.
  const htmlWithImages = sourceHtml
    ? await inlineDataImages(sourceHtml, admin, baseSlug)
    : "";

  // 7. Build the verbatim, sanitized post body.
  const bodyHtml = buildBodyHtml({
    html: htmlWithImages || null,
    text: email.text ?? null,
    cidToUrl,
    trailingImageUrls,
  });

  if (!bodyHtml) return bad(422, "Empty email body");

  // 8. Ensure a unique slug, then insert.
  let slug = baseSlug;
  const { data: slugClash } = await admin
    .from("posts")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();
  if (slugClash) slug = `${baseSlug}-${meta.email_id.slice(0, 6)}`;

  const { error: insErr } = await admin.from("posts").insert({
    slug,
    title: subject,
    body_html: bodyHtml,
    excerpt: makeExcerpt(bodyHtml),
    status: "published",
    message_id: messageId,
  });
  if (insErr) return bad(500, `Insert failed: ${insErr.message}`);

  // 9. Invalidate the cached listing so the post appears immediately.
  revalidateTag("posts", "max");

  return NextResponse.json({ ok: true, slug, url: `/writing/${slug}` });
}

function stripExt(name: string): string {
  return name.replace(/\.[^./\\]+$/, "");
}

// Normalize + upload one image to the post-images bucket; returns its public URL.
async function storeImage(
  admin: ReturnType<typeof supabaseAdmin>,
  baseSlug: string,
  key: string,
  bytes: Buffer,
  contentType: string,
  nameHint: string,
): Promise<string> {
  const { buffer, contentType: ct, ext } = await normalizeImage(
    bytes,
    contentType,
  );
  const name = `${slugify(stripExt(nameHint))}.${ext}`;
  const path = `${baseSlug}/${key}-${name}`;
  // Upload a Blob, NOT a raw Buffer. On web-standard runtimes (Vercel) the
  // storage client builds a FormData and a Node Buffer appended to FormData is
  // coerced to a UTF-8 string — silently corrupting the binary. A Blob is sent
  // as binary on every runtime.
  const blob = new Blob([new Uint8Array(buffer)], { type: ct });
  const { error } = await admin.storage
    .from("post-images")
    .upload(path, blob, { contentType: ct, upsert: true });
  if (error) throw new Error(error.message);
  return admin.storage.from("post-images").getPublicUrl(path).data.publicUrl;
}

// Rewrite <img src="data:image/...;base64,..."> references to hosted URLs by
// uploading the decoded bytes. Non-data srcs (https, cid:) are left untouched.
async function inlineDataImages(
  html: string,
  admin: ReturnType<typeof supabaseAdmin>,
  baseSlug: string,
): Promise<string> {
  const imgTags = html.match(/<img\b[^>]*>/gi) ?? [];
  let out = html;
  let i = 0;
  for (const tag of imgTags) {
    const src = tag.match(/src="(data:(image\/[a-z0-9.+-]+);base64,([^"]+))"/i);
    if (!src) continue;
    const [, dataUri, mime, b64] = src;
    const alt = tag.match(/alt="([^"]*)"/i)?.[1];
    try {
      const bytes = Buffer.from(b64, "base64");
      const url = await storeImage(
        admin,
        baseSlug,
        `inline-${i}`,
        bytes,
        mime,
        alt || `inline-${i}`,
      );
      out = out.replace(dataUri, url);
    } catch (e) {
      console.error("inbound-email: inline data image failed", e);
    }
    i++;
  }
  return out;
}

// Re-encode to a web-friendly format, fix EXIF rotation, cap width for perf.
// Falls back to the raw bytes if sharp can't handle the input (e.g. some HEIC).
async function normalizeImage(
  bytes: Buffer,
  contentType: string,
): Promise<{ buffer: Buffer; contentType: string; ext: string }> {
  try {
    const sharp = (await import("sharp")).default;
    const pipeline = sharp(bytes).rotate().resize({
      width: 1600,
      withoutEnlargement: true,
    });
    if (contentType.includes("png")) {
      return { buffer: await pipeline.png().toBuffer(), contentType: "image/png", ext: "png" };
    }
    if (contentType.includes("webp")) {
      return { buffer: await pipeline.webp().toBuffer(), contentType: "image/webp", ext: "webp" };
    }
    if (contentType.includes("gif")) {
      // Don't re-encode (may be animated) — pass through.
      return { buffer: bytes, contentType: "image/gif", ext: "gif" };
    }
    return {
      buffer: await pipeline.jpeg({ quality: 82 }).toBuffer(),
      contentType: "image/jpeg",
      ext: "jpg",
    };
  } catch {
    const ext = contentType.split("/")[1]?.split("+")[0] || "bin";
    return { buffer: bytes, contentType, ext };
  }
}
