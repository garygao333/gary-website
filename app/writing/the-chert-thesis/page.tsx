import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Chert Thesis — Gary Gao",
  description:
    "Why AI agents need a layer of trust — and how that turns an 8B market into a 50B one.",
};

export default function TheChertThesis() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-[640px] px-6 pt-20 pb-24 md:px-8 md:pt-28">
        <Link
          href="/writing"
          className="text-sm transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--text-muted)" }}
        >
          &larr; Writing
        </Link>

        <p className="mt-10 text-sm tabular-nums" style={{ color: "var(--text-muted)" }}>
          September 2025
        </p>
        <h1 className="mt-2 font-display text-4xl font-light tracking-tight md:text-5xl">
          The Chert Thesis
        </h1>

        <div className="mt-12 space-y-6 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <p>
            We believe that AI agents have an{" "}
            <strong style={{ color: "var(--text-primary)" }}>untapped potential</strong>.
          </p>

          <p>
            Right now, agents like Manus or Poke are seen as powerful but only limited to the role of personal assistants.
          </p>

          <p>
            For AI agents to truly integrate into human society, they need to take on{" "}
            <strong style={{ color: "var(--text-primary)" }}>independent, human roles</strong>, whether as sales reps or customer support agents.
          </p>

          <p>
            And for that to happen, agents need a{" "}
            <strong style={{ color: "var(--text-primary)" }}>layer of trust</strong>{" "}
            that they currently lack. People shouldn&apos;t feel uneasy when they are talking to an AI. They should feel comfortable.
          </p>

          <p>
            <strong style={{ color: "var(--text-primary)" }}>
              We are interested in building this emotional layer of trust between humans and AI.
            </strong>
          </p>

          <p>
            And that&apos;s what we believe will be the major shift that will grow the AI agent market from an 8B industry to a 50B industry in the next three years. We imagine a future where agents become treated as{" "}
            <strong style={{ color: "var(--text-primary)" }}>friends, co-workers, and people instead of tools</strong>.
          </p>
        </div>
      </main>
    </div>
  );
}
