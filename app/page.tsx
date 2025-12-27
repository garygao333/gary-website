"use client";

import { useState } from "react";
import { ResizableTerminalPanel } from "./components/ResizableTerminalPanel";
import { FileViewer } from "./components/FileViewer";

type FileType = "README.md" | "resume" | "links.ts" | null;

export default function Home() {
  const [activeFile, setActiveFile] = useState<FileType>(null);

  const files = [
    { name: "README.md" as const, icon: "📄" },
    { name: "resume" as const, icon: "📋" },
    { name: "links.ts" as const, icon: "🔗" },
  ];

  const handleEditorClick = () => {
    setActiveFile(null);
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-slate-900 text-emerald-300 flex flex-col">
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
            EXPLORER
          </div>
          <div className="flex-1 overflow-y-auto text-xs">
            <div className="px-3 pt-2 pb-1 text-zinc-400 uppercase text-[10px] tracking-wider">
              Files
            </div>
            <ul className="space-y-0.5">
              {files.map((file) => (
                <li key={file.name}>
                  <button
                    onClick={() => setActiveFile(file.name)}
                    className={`w-full text-left px-3 py-1.5 flex items-center gap-2 transition-colors ${
                      activeFile === file.name
                        ? "text-emerald-300 bg-emerald-500/10 border-l-2 border-emerald-400"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border-l-2 border-transparent"
                    }`}
                  >
                    <span>{file.icon}</span>
                    <span>{file.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-3 py-2 border-t border-emerald-500/20 text-[10px] text-zinc-500">
            Click a file to view
          </div>
        </aside>

        {/* Main panel */}
        <main className="flex-1 flex flex-col">
          {/* Editor area (blank or file content) */}
          <div
            className="flex-1 min-h-0 overflow-hidden bg-[#0a0a0f] cursor-default"
            onClick={handleEditorClick}
          >
            {activeFile ? (
              <FileViewer activeFile={activeFile} onClose={() => setActiveFile(null)} />
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-600 text-sm">
                <div className="text-center">
                  <p>Select a file from the explorer</p>
                  <p className="text-xs mt-1 text-zinc-700">or use the terminal below</p>
                </div>
              </div>
            )}
          </div>

          {/* Resizable Terminal Panel */}
          <ResizableTerminalPanel />
        </main>
      </div>
    </div>
  );
}
