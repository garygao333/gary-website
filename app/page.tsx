"use client";

import { useState } from "react";
import { ResizableTerminalPanel } from "./components/ResizableTerminalPanel";
import { FileViewer } from "./components/FileViewer";
import { VscMarkdown, VscFile } from "react-icons/vsc";
import { SiTypescript } from "react-icons/si";

type FileType = "README.md" | "resume" | "links.ts" | null;

export default function Home() {
  const [activeFile, setActiveFile] = useState<FileType>(null);

  const files = [
    { name: "README.md" as const, icon: <VscMarkdown style={{ color: "var(--blue)" }} /> },
    { name: "resume" as const, icon: <VscFile style={{ color: "var(--base01)" }} /> },
    { name: "links.ts" as const, icon: <SiTypescript style={{ color: "var(--blue)" }} /> },
  ];

  const handleEditorClick = () => {
    setActiveFile(null);
  };

  return (
    <div
      className="h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: "var(--bg-main)", color: "var(--fg-main)" }}
    >
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-4 py-2"
        style={{
          backgroundColor: "var(--bg-alt)",
          borderBottom: "1px solid var(--border-subtle)",
          color: "var(--fg-strong)"
        }}
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--red)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--yellow)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--green)" }} />
          <span className="ml-3 font-semibold" style={{ color: "var(--cyan)" }}>
            gary-tui
          </span>
        </div>
        <div className="text-xs hidden sm:block" style={{ color: "var(--fg-muted)" }}>
          ~/portfolio/terminal
        </div>
        <div className="text-xs" style={{ color: "var(--fg-muted)" }}>
          TUI MODE
        </div>
      </header>

      {/* Main layout: sidebar + main pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className="hidden md:flex w-60 flex-col"
          style={{
            backgroundColor: "var(--bg-alt)",
            borderRight: "1px solid var(--border-subtle)"
          }}
        >
          <div
            className="px-3 py-2 text-xs uppercase tracking-widest"
            style={{
              borderBottom: "1px solid var(--border-subtle)",
              color: "var(--fg-strong)"
            }}
          >
            EXPLORER
          </div>
          <div className="flex-1 overflow-y-auto text-xs">
            <div
              className="px-3 pt-2 pb-1 uppercase text-[10px] tracking-wider"
              style={{ color: "var(--fg-strong)" }}
            >
              Files
            </div>
            <ul className="space-y-0.5">
              {files.map((file) => (
                <li key={file.name}>
                  <button
                    onClick={() => setActiveFile(file.name)}
                    className="w-full text-left px-3 py-1.5 flex items-center gap-2 transition-colors"
                    style={{
                      color: activeFile === file.name ? "var(--fg-strong)" : "var(--fg-muted)",
                      backgroundColor: activeFile === file.name ? "rgba(0, 43, 54, 0.8)" : "transparent",
                      borderLeft: activeFile === file.name ? "2px solid var(--accent-primary)" : "2px solid transparent"
                    }}
                  >
                    <span>{file.icon}</span>
                    <span>{file.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="px-3 py-2 text-[10px]"
            style={{
              borderTop: "1px solid var(--border-subtle)",
              color: "var(--fg-muted)"
            }}
          >
            Click a file to view
          </div>
        </aside>

        {/* Main panel */}
        <main className="flex-1 flex flex-col">
          {/* Editor area (blank or file content) */}
          <div
            className="flex-1 min-h-0 overflow-hidden cursor-default"
            style={{ backgroundColor: "var(--bg-main)" }}
            onClick={handleEditorClick}
          >
            {activeFile ? (
              <FileViewer activeFile={activeFile} onClose={() => setActiveFile(null)} />
            ) : (
              <div
                className="h-full flex items-center justify-center text-sm"
                style={{ color: "var(--fg-muted)" }}
              >
                <div className="text-center">
                  <p>Select a file from the explorer</p>
                  <p className="text-xs mt-1" style={{ color: "var(--base01)", opacity: 0.7 }}>
                    or use the terminal below
                  </p>
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
