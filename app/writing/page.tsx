import Link from "next/link";
import type { Metadata } from "next";
import { FeaturedLinks } from "../components/FeaturedLinks";

export const metadata: Metadata = {
  title: "Writing | Gary Gao",
  description: "Launches, essays, and research.",
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
          Launches, essays, and research.
        </p>

        <div className="mt-10"><FeaturedLinks /></div>
      </main>
    </div>
  );
}
