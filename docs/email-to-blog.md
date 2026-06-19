# Email → Blog

Email a post to your Resend inbound address and it publishes automatically.

- **Title** = email subject
- **Body** = email body, wording verbatim, formatting (paragraph spacing, bold,
  links, lists) preserved
- **Images** = drag images **into the body** to place them between paragraphs;
  plain attachments land at the end
- Only allowlisted senders (`ALLOWED_SENDERS`) can publish

## How it works

```
You email <id>.resend.app
   → Resend fires the email.received webhook (Svix-signed)
   → /api/inbound-email verifies signature + sender allowlist
   → fetches the full email + attachments from Resend
   → uploads inline images to Supabase Storage (bucket: post-images)
   → sanitizes HTML, rewrites cid: image refs to hosted URLs (verbatim text)
   → inserts a row into Supabase `posts` (status=published)
   → revalidateTag("posts") → live instantly at /writing/<slug>
```

## One-time setup (after deploying)

1. **Deploy** so `https://<your-domain>/api/inbound-email` exists.
2. **Add env vars in Vercel** (Project → Settings → Environment Variables) —
   same keys as `.env.local`:
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_WEBHOOK_SECRET`,
   `ALLOWED_SENDERS`.
3. **Resend dashboard → Emails → Receiving:** copy your `…@<id>.resend.app`
   receiving address.
4. **Resend dashboard → Webhooks:** add a webhook pointing to
   `https://<your-domain>/api/inbound-email`, event **`email.received`**.
   Copy the **Signing Secret** (`whsec_…`) into `RESEND_WEBHOOK_SECRET` (local +
   Vercel), then redeploy.
5. **Test:** email your receiving address from an allowlisted account. The post
   should appear under `/writing` within a few seconds.

## Schema

`supabase/schema.sql` — run once in the Supabase SQL editor. Images live in the
public `post-images` storage bucket.

## Adding/removing allowed senders

Edit `ALLOWED_SENDERS` (comma-separated) locally and in Vercel.
