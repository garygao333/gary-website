import Link from "next/link";

export default function Writing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}>
      <main className="max-w-[640px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-20">
        <Link
          href="/"
          className="text-sm transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--text-muted)" }}
        >
          &larr; Back
        </Link>

        <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-10 mb-12">
          The Chert Thesis
        </h1>

        <div className="space-y-6 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <p>
            We believe that AI agents have an <strong style={{ color: "var(--text-primary)" }}>untapped potential</strong>.
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
