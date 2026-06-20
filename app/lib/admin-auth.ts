import crypto from "node:crypto";
import { cookies } from "next/headers";

// Server-only passcode auth for /admin. A single shared passcode (ADMIN_PASSCODE)
// is exchanged for an httpOnly session cookie holding an HMAC token that only the
// server can produce — so the cookie can't be forged without the service-role key.
// NOTE: import this only from Server Components / Server Actions, never the client.

const COOKIE = "gg_admin";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function sessionToken(): string {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return crypto
    .createHmac("sha256", secret)
    .update("gary-admin-session-v1")
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

export function checkPasscode(input: string): boolean {
  const pass = process.env.ADMIN_PASSCODE ?? "";
  if (!pass || !input) return false;
  return safeEqual(input, pass);
}

export async function isAuthed(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE)?.value;
  return !!token && safeEqual(token, sessionToken());
}

export async function setSession(): Promise<void> {
  (await cookies()).set(COOKIE, sessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}
