import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { Photos } from "./components/Photos";
import { Portrait } from "./components/Portrait";
import { FeaturedLinks } from "./components/FeaturedLinks";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
        <div className="mx-auto flex max-w-[720px] items-start justify-between gap-4 px-6 py-5 sm:items-center md:px-8">
          <Link href="/" className="shrink-0 font-display text-lg font-semibold tracking-tight">Gary Gao</Link>
          <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link href="/writing" className="pt-1 text-sm transition-colors hover:text-[var(--accent)] sm:pt-0" style={{ color: "var(--text-secondary)" }}>Writing</Link>
            <div className="flex items-center gap-4" style={{ color: "var(--text-secondary)" }}>
              <a href="https://github.com/garygao333" target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--accent)]" aria-label="GitHub"><FaGithub size={17} /></a>
              <a href="https://www.linkedin.com/in/garygao333/" target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--accent)]" aria-label="LinkedIn"><FaLinkedinIn size={17} /></a>
              <a href="https://www.instagram.com/garygao333/" target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--accent)]" aria-label="Instagram"><FaInstagram size={17} /></a>
              <a href="https://x.com/GaryGao891219" target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--accent)]" aria-label="X"><FaXTwitter size={16} /></a>
              <a href="mailto:gary@trychert.com" className="transition-colors hover:text-[var(--accent)]" aria-label="Email"><HiOutlineMail size={19} /></a>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[720px] px-6 md:px-8">
        {/* Hero */}
        <section className="pt-16 pb-12 md:pt-24">
          <div className="flex items-start gap-4 sm:gap-6">
            <Portrait />
            <div className="pt-1">
              <h1 className="font-display text-4xl font-light leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
                Gary Gao
              </h1>
              <p className="mt-4 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                Co-Founder @ Chert · CS + Wharton @ Penn · Z-Fellow
              </p>
            </div>
          </div>

          <p className="mt-8 text-[17px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Currently co-founder and CEO at <span style={{ color: "var(--text-primary)" }}>Chert</span> (YC
            P26). We build infra that lets AI agents use FaceTime and iMessage.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Previously studying CS + Business at Penn and Wharton.
          </p>
        </section>

        {/* Writing */}
        <section id="writing" className="py-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-normal">Writing</h2>
          </div>
          <div className="mt-3 h-px" style={{ backgroundColor: "var(--rule)" }} />

          <FeaturedLinks compact />
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
          <span>&copy; Gary Gao · 2026</span>
          <a href="mailto:gary@trychert.com" className="transition-colors hover:text-[var(--accent)]">
            gary@trychert.com
          </a>
        </div>
      </footer>
    </div>
  );
}
