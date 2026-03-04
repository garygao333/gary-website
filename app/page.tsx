import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { ProjectGallery } from "./components/ProjectGallery";

const projects = [
  {
    title: "Chert",
    description: "Voice-based GIS for archaeology.",
    details: "A voice-first GIS data collection platform used by archaeological field projects. Built with Next.js, Python, PostgreSQL, and GIS tooling.",
    gradient: "from-amber-800 via-green-800 to-emerald-900",
    year: "2025",
  },
  {
    title: "Nodal CLI",
    description: "Hardware copilot for embedded systems.",
    details: "CLI that generates wiring diagrams, firmware, and host code for Arduino and ESP32. Built with Node.js and TypeScript.",
    gradient: "from-slate-700 via-sky-800 to-blue-900",
    year: "2025",
  },
  {
    title: "Photon Framework",
    description: "Building Flux for AI infrastructure.",
    details: "Next-gen framework for building and deploying AI infrastructure at scale. Exploring new paradigms in model serving and orchestration.",
    gradient: "from-orange-700 via-red-800 to-rose-900",
    year: "2024",
  },
  {
    title: "Outbound via iMessage",
    description: "Automated outbound messaging at scale.",
    details: "Built an outbound sales and communication platform leveraging iMessage for high-deliverability outreach.",
    gradient: "from-green-600 via-teal-700 to-cyan-800",
    year: "2024",
  },
  {
    title: "Neuromorphic Chips",
    description: "Building brain-inspired computing hardware.",
    details: "Researching and building neuromorphic chip architectures that mimic biological neural networks for efficient, low-power computation.",
    gradient: "from-violet-700 via-purple-800 to-indigo-900",
    year: "2024",
  },
  {
    title: "Pottery Sherd Classification",
    description: "AI-powered archaeological artifact analysis.",
    details: "Built a classification model for pottery sherds using computer vision, helping archaeologists identify and catalog artifacts in the field.",
    gradient: "from-yellow-700 via-amber-800 to-orange-900",
    year: "2023",
  },
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
            Currently buidling Chert, an AI BDR that gets businesses customers through iMessage. Previously studying Computer Science and Business at Penn and Wharton. Researching in statistical mechanics (physical learning networks) and machine learning (pottery sherd classification).
          </p>
          {/* <p className="text-base leading-relaxed mt-5" style={{ color: "var(--text-primary)" }}>
            Outside of 
          </p> */}
        </section>

        {/* Latest Projects */}
        <section id="work" className="pt-10 pb-6">
          <div className="mb-1">
            <h2 className="text-2xl font-bold">Projects and Experiences</h2>
          </div>
          <div className="h-px mb-8" style={{ backgroundColor: "var(--accent)" }} />

          <ProjectGallery projects={projects} />
        </section>

        {/* Writing */}
        <section id="posts" className="pt-14 pb-6">
          <div className="mb-1">
            <h2 className="text-2xl font-bold">Writing</h2>
          </div>
          <div className="h-px mb-6" style={{ backgroundColor: "var(--accent)" }} />
          <div className="flex items-center gap-6 py-4">
            <span className="text-sm shrink-0" style={{ color: "var(--text-muted)" }}>
              2025
            </span>
            <a
              href="/writing"
              className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
            >
              The Chert Thesis
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[840px] mx-auto px-6 md:px-12 py-6">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            &copy; Gary Gao | 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
