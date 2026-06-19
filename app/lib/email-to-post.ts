import sanitizeHtml from "sanitize-html";

// Pull a bare lowercased email address out of a "Name <addr@x.com>" string.
export function extractAddress(from: string): string {
  const match = from.match(/<([^>]+)>/);
  const addr = (match ? match[1] : from).trim().toLowerCase();
  return addr;
}

export function isAllowedSender(from: string): boolean {
  const allow = (process.env.ALLOWED_SENDERS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return allow.includes(extractAddress(from));
}

export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .normalize("NFKD")
      .replace(/['’"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "post"
  );
}

// Turn a plain-text email body into paragraphs, preserving blank-line spacing.
function textToHtml(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`)
    .join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const SANITIZE_OPTS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "strong", "b", "em", "i", "u", "s", "a", "ul", "ol", "li",
    "blockquote", "h1", "h2", "h3", "h4", "img", "figure", "figcaption",
    "hr", "pre", "code", "span",
  ],
  allowedAttributes: {
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title"],
  },
  // Only allow images we control (rewritten to https) — strips leftover cid: refs.
  allowedSchemesByTag: { img: ["https"], a: ["http", "https", "mailto"] },
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    // Drop heading levels above h2 down to keep the type scale sane.
    h1: "h2",
  },
  // Remove empty paragraphs that mail clients love to inject.
  exclusiveFilter: (frame) =>
    frame.tag === "p" && !frame.text.trim() && !/<img/i.test(frame.text),
};

/**
 * Build the final sanitized post HTML.
 * - Rewrites inline image references (cid:CONTENT_ID) to their hosted URLs,
 *   keeping them exactly where they sit between paragraphs.
 * - Appends non-inline (plain attachment) images at the end.
 */
export function buildBodyHtml(opts: {
  html: string | null;
  text: string | null;
  cidToUrl: Map<string, string>;
  trailingImageUrls: string[];
}): string {
  let html = opts.html?.trim() || (opts.text ? textToHtml(opts.text) : "");

  // Rewrite every cid: reference we have an upload for.
  for (const [cid, url] of opts.cidToUrl) {
    const bare = cid.replace(/^<|>$/g, "");
    const pattern = new RegExp(`cid:${escapeRegExp(bare)}`, "g");
    html = html.replace(pattern, url);
  }

  for (const url of opts.trailingImageUrls) {
    html += `\n<img src="${url}" alt="">`;
  }

  return sanitizeHtml(html, SANITIZE_OPTS).trim();
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Short, readable excerpt from the rendered HTML for listings.
export function makeExcerpt(bodyHtml: string, max = 160): string {
  const text = bodyHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}
