import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const projects = [
  {
    title: "Chert",
    description: "Voice-based GIS platform for archaeological field work.",
    gradient: "from-amber-800 via-green-800 to-emerald-900",
    year: "2025",
  },
  {
    title: "Nodal CLI",
    description: "Hardware copilot for embedded systems and firmware.",
    gradient: "from-slate-700 via-sky-800 to-blue-900",
    year: "2025",
  },
  {
    title: "Photon Framework",
    description: "Building Flux for next-gen AI infrastructure.",
    gradient: "from-orange-700 via-red-800 to-rose-900",
    year: "2024",
  },
];

const posts = [
  { date: "Feb 2025", title: "Building voice-first tools for field research" },
  { date: "Jan 2025", title: "Why neuromorphic computing matters" },
  { date: "Dec 2024", title: "Lessons from hardware-software co-design" },
  { date: "Nov 2024", title: "Archaeology meets AI: a field report" },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-6 md:px-12 py-5" style={{ backgroundColor: "var(--bg)" }}>
        <div className="flex items-center gap-4" style={{ color: "var(--text-secondary)" }}>
          <a href="https://github.com/garygao333" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#111]" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/garygao333/" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#111]" aria-label="LinkedIn">
            <FaLinkedinIn size={18} />
          </a>
          <a href="mailto:gary@trychert.com" className="transition-colors hover:text-[#111]" aria-label="Email">
            <HiOutlineMail size={20} />
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-[840px] mx-auto px-6 md:px-12">
        {/* Hero */}
        <section className="pt-36 pb-8">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none -ml-1 md:-ml-1.5">
            Gary Gao
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-5 gap-2">
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Co-Founder @ Chert | CS + Wharton @ Penn | Z-Fellow
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--accent)" }}>&#x1F4CD;</span> San Francisco
            </p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-10">
          <p className="text-base leading-relaxed" style={{ color: "var(--text-primary)" }}>
            Hi there! I&apos;m Gary, a student at Penn studying CS and Wharton. I like building at the
            edge of deep tech &mdash; AI, neuromorphic hardware, archaeology, and robotics. I&apos;m driven by
            a love for creativity and innovation, constantly exploring new ways to connect ideas and build
            something meaningful.
          </p>
          <p className="text-base leading-relaxed mt-5" style={{ color: "var(--text-primary)" }}>
            When I&apos;m not immersed in my projects, you&apos;ll find me outdoors &mdash; flying planes,
            hiking trails, and embracing the energy of nature. Life is all about climbing to new heights,
            both literally and figuratively!
          </p>
        </section>

        {/* Latest Projects */}
        <section id="work" className="pt-10 pb-6">
          <div className="mb-1">
            <h2 className="text-2xl font-bold">Projects and Experiences</h2>
          </div>
          <div className="h-px mb-8" style={{ backgroundColor: "var(--accent)" }} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div key={project.title} className="group cursor-pointer">
                <div className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                  <span className="absolute top-4 left-5 text-5xl font-black text-white/30">
                    {project.year}
                  </span>
                </div>
                <h3 className="mt-3 font-bold text-sm">{project.title}</h3>
                <p className="text-sm mt-1 leading-snug" style={{ color: "var(--text-secondary)" }}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Posts */}
        <section id="posts" className="pt-14 pb-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-2xl font-bold">Latest Posts</h2>
            <span className="text-sm cursor-pointer transition-colors hover:text-[#111]" style={{ color: "var(--text-secondary)" }}>
              View all
            </span>
          </div>
          <div className="h-px mb-6" style={{ backgroundColor: "var(--accent)" }} />

          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {posts.map((post, i) => (
              <div key={i} className="flex items-center gap-6 py-4 cursor-pointer group">
                <span className="text-sm w-24 shrink-0" style={{ color: "var(--text-muted)" }}>
                  {post.date}
                </span>
                <span className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors">
                  {post.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-14">
          <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8" style={{ backgroundColor: "var(--bg-card)" }}>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Subscribe to my Newsletter</h2>
              <div className="flex gap-2 mb-3">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="flex-1 px-4 py-2.5 rounded-lg border text-sm outline-none focus:border-[var(--accent)] transition-colors"
                  style={{
                    backgroundColor: "white",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                />
                <button
                  className="px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--text-primary)" }}
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Sign up to stay updated about my latest work and adventures. <em>No Spam, No BS. Promise!</em>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[840px] mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            &copy; Gary Gao | 2025
          </p>
          <div className="flex items-center gap-5 text-sm" style={{ color: "var(--text-secondary)" }}>
            <a href="#" className="transition-colors" style={{ color: "var(--accent)" }}>Home</a>
            <a href="#about" className="transition-colors hover:text-[#111]">About</a>
            <a href="#work" className="transition-colors hover:text-[#111]">Work</a>
            <a href="#posts" className="transition-colors hover:text-[#111]">Posts</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
