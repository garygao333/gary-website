import { Terminal } from "./components/Terminal";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-slate-900 text-emerald-300 flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-emerald-500/30 bg-black/70">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="ml-3 font-semibold text-emerald-300">
            gary-tui
          </span>
        </div>
        <div className="text-xs text-zinc-500 hidden sm:block">
          ~/portfolio/terminal
        </div>
        <div className="text-xs text-zinc-500">
          TUI MODE
        </div>
      </header>

      {/* Main layout: sidebar + main pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex w-60 flex-col border-r border-emerald-500/20 bg-black/60">
          <div className="px-3 py-2 border-b border-emerald-500/20 text-xs uppercase tracking-widest text-zinc-500">
            SESSION
          </div>
          <div className="flex-1 overflow-y-auto text-xs">
            <div className="px-3 pt-2 pb-1 text-zinc-400">
              Active
            </div>
            <button className="w-full text-left px-3 py-1 text-emerald-300/90 bg-emerald-500/10 border-l-2 border-emerald-400 text-xs">
              gary@terminal - portfolio
            </button>

            <div className="px-3 pt-4 pb-1 text-zinc-400">
              Views
            </div>
            <ul className="px-3 space-y-1 text-zinc-400">
              <li>about.md</li>
              <li>projects.json</li>
              <li>resume.pdf</li>
              <li>contact.cfg</li>
            </ul>
          </div>

          <div className="px-3 py-2 border-t border-emerald-500/20 text-[10px] text-zinc-500">
            Use arrow keys to navigate history
          </div>
        </aside>

        {/* Main panel */}
        <main className="flex-1 flex flex-col">
          {/* Terminal */}
          <section className="flex-1">
            <Terminal />
          </section>
        </main>
      </div>
    </div>
  );
}
