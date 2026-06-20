import type { Metadata } from "next";
import { supabaseAdmin } from "../lib/supabase";
import { isAuthed } from "../lib/admin-auth";
import { logout } from "./actions";
import { LoginForm } from "./LoginForm";
import { PostsManager } from "./PostsManager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

type AdminPost = {
  slug: string;
  title: string;
  body_html: string;
  status: string | null;
  created_at: string;
};

type ReceivedEmail = {
  id: string;
  from: string;
  to: string[];
  subject: string | null;
  created_at: string;
  attachments?: { filename: string | null }[];
};

async function getAdminPosts(): Promise<AdminPost[]> {
  const { data } = await supabaseAdmin()
    .from("posts")
    .select("slug, title, body_html, status, created_at")
    .order("created_at", { ascending: false });
  return (data as AdminPost[]) ?? [];
}

async function getReceivedEmails(): Promise<ReceivedEmail[]> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return [];
  try {
    const res = await fetch("https://api.resend.com/emails/receiving?limit=100", {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: ReceivedEmail[] };
    return json.data ?? [];
  } catch {
    return [];
  }
}

function fmt(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export default async function AdminPage() {
  if (!(await isAuthed())) {
    return <LoginForm />;
  }

  const [posts, emails] = await Promise.all([
    getAdminPosts(),
    getReceivedEmails(),
  ]);

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-[860px] px-6 pt-16 pb-24 md:px-8">
        <div className="flex items-baseline justify-between">
          <h1 className="font-display text-4xl font-light tracking-tight">
            Admin
          </h1>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--text-muted)" }}
            >
              Sign out
            </button>
          </form>
        </div>

        {/* Posts */}
        <section className="mt-14">
          <h2 className="font-display text-2xl">
            Posts{" "}
            <span
              className="text-base font-normal"
              style={{ color: "var(--text-muted)" }}
            >
              ({posts.length})
            </span>
          </h2>
          <div className="mt-5">
            <PostsManager
              posts={posts.map((p) => ({
                slug: p.slug,
                title: p.title,
                body_html: p.body_html,
                status: p.status ?? "",
                created_at: p.created_at,
              }))}
            />
          </div>
        </section>

        {/* Email log */}
        <section className="mt-16">
          <h2 className="font-display text-2xl">
            Received emails{" "}
            <span
              className="text-base font-normal"
              style={{ color: "var(--text-muted)" }}
            >
              ({emails.length})
            </span>
          </h2>
          {emails.length === 0 ? (
            <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
              No emails found (or Resend API unavailable).
            </p>
          ) : (
            <div
              className="mt-5 overflow-hidden rounded-lg border"
              style={{ borderColor: "var(--border)" }}
            >
              <table className="w-full text-left text-[14px]">
                <thead>
                  <tr
                    className="border-b"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <th className="px-4 py-2.5 font-medium">Date (UTC)</th>
                    <th className="px-4 py-2.5 font-medium">From</th>
                    <th className="px-4 py-2.5 font-medium">Subject</th>
                    <th className="px-4 py-2.5 font-medium">Att.</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((e) => (
                    <tr
                      key={e.id}
                      className="border-b last:border-0"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td
                        className="whitespace-nowrap px-4 py-2.5 tabular-nums"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {fmt(e.created_at)}
                      </td>
                      <td className="px-4 py-2.5">{e.from}</td>
                      <td className="px-4 py-2.5">{e.subject ?? "—"}</td>
                      <td
                        className="px-4 py-2.5 tabular-nums"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {e.attachments?.length ?? 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
