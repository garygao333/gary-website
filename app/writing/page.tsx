import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "../posts";

export const metadata: Metadata = {
  title: "Writing — Gary Gao",
  description: "Essays on AI agents, trust, and building.",
};

export default function Writing() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-[680px] px-6 pt-20 pb-24 md:px-8 md:pt-28">
        <Link
          href="/"
          className="text-sm transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--text-muted)" }}
        >
          &larr; Gary Gao
        </Link>

        <h1 className="mt-10 font-display text-4xl font-light tracking-tight md:text-5xl">
          Writing
        </h1>
        <p className="mt-3 text-[17px]" style={{ color: "var(--text-muted)" }}>
          Essays on AI agents, trust, and building.
        </p>

        <ul className="mt-12">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group flex flex-col gap-1 border-t py-6 sm:flex-row sm:items-baseline sm:gap-6"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="shrink-0 text-sm tabular-nums" style={{ color: "var(--text-muted)" }}>
                  {post.year}
                </span>
                <span className="flex-1">
                  <span className="font-display text-xl transition-colors group-hover:text-[var(--accent)]">
                    {post.title}
                  </span>
                  <span className="mt-1 block text-[15px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {post.excerpt}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
