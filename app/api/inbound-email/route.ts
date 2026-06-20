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

  for (const att of attachments) {
    if (!att.content_type?.startsWith("image/")) continue;
    try {
      const { data: full } = await resend.emails.receiving.attachments.get({
        id: att.id,
        emailId: meta.email_id,
      });
      const downloadUrl = (full as { download_url?: string })?.download_url;
      if (!downloadUrl) continue;

      const bytes = Buffer.from(await (await fetch(downloadUrl)).arrayBuffer());
      const { buffer, contentType, ext } = await normalizeImage(
        bytes,
        att.content_type,
      );

      const name = `${slugify(stripExt(att.filename ?? att.id))}.${ext}`;
      const path = `${baseSlug}/${att.id.slice(0, 8)}-${name}`;

      const { error: upErr } = await admin.storage
        .from("post-images")
        .upload(path, buffer, { contentType, upsert: true });
      if (upErr) throw new Error(upErr.message);

      const url = admin.storage.from("post-images").getPublicUrl(path).data
        .publicUrl;

      if (att.content_disposition === "inline" && att.content_id) {
        cidToUrl.set(att.content_id, url);
      } else {
        trailingImageUrls.push(url);
      }
    } catch (e) {
      console.error(`inbound-email: attachment ${att.id} failed`, e);
    }
  }

  // 6. Build the verbatim, sanitized post body.
  const bodyHtml = buildBodyHtml({
    html: email.html ?? null,
    text: email.text ?? null,
    cidToUrl,
    trailingImageUrls,
  });

  if (!bodyHtml) return bad(422, "Empty email body");

  // 7. Ensure a unique slug, then insert.
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

  // 8. Invalidate the cached listing so the post appears immediately.
  revalidateTag("posts", "max");

  return NextResponse.json({ ok: true, slug, url: `/writing/${slug}` });
}

function stripExt(name: string): string {
  return name.replace(/\.[^./\\]+$/, "");
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
