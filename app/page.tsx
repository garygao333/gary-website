import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Photos } from "./components/Photos";
import { Portrait } from "./components/Portrait";
import { getPosts, postYear } from "./lib/posts";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
        <div className="mx-auto flex max-w-[720px] items-center justify-between px-6 py-5 md:px-8">
          <Link href="/" className="font-display text-lg font-semibold tracking-tight">
            Gary Gao
          </Link>
          <div className="flex items-center gap-5 text-sm" style={{ color: "var(--text-secondary)" }}>
            <Link href="/writing" className="transition-colors hover:text-[var(--accent)]">
              Writing
            </Link>
            <span className="hidden h-4 w-px sm:block" style={{ backgroundColor: "var(--border)" }} />
            <a href="https://github.com/garygao333" target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--accent)]" aria-label="GitHub">
              <FaGithub size={17} />
            </a>
            <a href="https://www.linkedin.com/in/garygao333/" target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--accent)]" aria-label="LinkedIn">
              <FaLinkedinIn size={17} />
            </a>
            <a href="mailto:gary@trychert.com" className="transition-colors hover:text-[var(--accent)]" aria-label="Email">
              <HiOutlineMail size={19} />
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[720px] px-6 md:px-8">
        {/* Hero */}
        <section className="pt-16 pb-12 md:pt-24">
          <div className="flex items-start gap-6">
            <Portrait />
            <div className="pt-1">
              <h1 className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl">
                Gary Gao
              </h1>
              <p className="mt-4 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                Co-Founder @ Chert · CS + Wharton @ Penn · Z-Fellow
              </p>
            </div>
          </div>

          <p className="mt-8 text-[17px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Currently co-founder and CEO at <span style={{ color: "var(--text-primary)" }}>Chert</span> (YC
            P26), which is the infrastructure for building conversational interfaces on iMessage.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Previously studying CS + Business at Penn and Wharton.
          </p>
        </section>

        {/* Writing */}
        <section id="writing" className="py-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-normal">Writing</h2>
            <Link href="/writing" className="text-sm transition-colors hover:text-[var(--accent)]" style={{ color: "var(--text-muted)" }}>
              All posts &rarr;
            </Link>
          </div>
          <div className="mt-3 h-px" style={{ backgroundColor: "var(--rule)" }} />

          <ul className="mt-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group flex flex-col gap-1 border-b py-5 sm:flex-row sm:items-baseline sm:gap-6"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span className="shrink-0 text-sm tabular-nums" style={{ color: "var(--text-muted)" }}>
                    {postYear(post)}
                  </span>
                  <span className="flex-1">
                    <span className="font-display text-lg transition-colors group-hover:text-[var(--accent)]">
                      {post.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {post.excerpt}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Photos */}
        <section id="photos" className="py-12">
          <h2 className="font-display text-2xl font-normal">Photos</h2>
          <div className="mt-3 mb-6 h-px" style={{ backgroundColor: "var(--rule)" }} />
          <Photos />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto flex max-w-[720px] items-center justify-between px-6 py-6 text-sm md:px-8" style={{ color: "var(--text-muted)" }}>
          <span>&copy; Gary Gao · 2025</span>
          <a href="mailto:gary@trychert.com" className="transition-colors hover:text-[var(--accent)]">
            gary@trychert.com
          </a>
        </div>
      </footer>
    </div>
  );
}
