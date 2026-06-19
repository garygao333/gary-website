import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Public, RLS-enforced client — safe for reading published posts.
export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

// Server-only client that bypasses RLS. Used by the inbound-email webhook to
// write posts and upload images. NEVER import this into a client component.
export function supabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
