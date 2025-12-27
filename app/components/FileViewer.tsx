"use client";

import React from "react";

type FileType = "README.md" | "resume" | "links.ts" | null;

interface FileViewerProps {
  activeFile: FileType;
  onClose: () => void;
}

const ReadmeContent = () => (
  <div className="text-sm text-zinc-300 space-y-4">
    <div className="text-zinc-500 text-xs">1</div>
    <pre className="whitespace-pre-wrap">
      <span className="text-purple-400"># Gary Gao</span>
      {"\n\n"}
      <span className="text-zinc-400">Hi, I&apos;m Gary! I study Physics + Wharton at Penn.</span>
      {"\n\n"}
      <span className="text-purple-400">## About Me</span>
      {"\n\n"}
      <span className="text-zinc-400">I like building at the edge of deep tech, AI, neuromorphic hardware, and archaeology.</span>
      {"\n"}
      <span className="text-zinc-400">This TUI is my little playground to show off projects, experiments, and weird ideas.</span>
      {"\n\n"}
      <span className="text-purple-400">## Interests</span>
      {"\n\n"}
      <span className="text-zinc-400">- AI & Machine Learning</span>
      {"\n"}
      <span className="text-zinc-400">- Neuromorphic Computing</span>
      {"\n"}
      <span className="text-zinc-400">- Archaeology & GIS</span>
      {"\n"}
      <span className="text-zinc-400">- Hardware Hacking</span>
      {"\n\n"}
      <span className="text-purple-400">## Current Projects</span>
      {"\n\n"}
      <span className="text-zinc-400">- **Chert** - Voice-based GIS for Archaeology</span>
      {"\n"}
      <span className="text-zinc-400">- **Nodal CLI** - Hardware copilot for embedded systems</span>
    </pre>
  </div>
);

const ResumeContent = () => (
  <div className="text-sm text-zinc-300 space-y-3">
    <div className="border border-zinc-700 rounded p-6 bg-zinc-900/50">
      <h1 className="text-2xl font-bold text-emerald-300 mb-1">Gary Gao</h1>
      <p className="text-zinc-400 text-sm mb-4">garygao@sas.upenn.edu | Philadelphia, PA</p>

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-purple-400 border-b border-zinc-700 pb-1 mb-2">Education</h2>
        <div>
          <p className="font-medium">University of Pennsylvania</p>
          <p className="text-zinc-400 text-sm">B.A. Physics & B.S. Economics (Wharton)</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-purple-400 border-b border-zinc-700 pb-1 mb-2">Skills</h2>
        <p className="text-zinc-400 text-sm">
          Python, TypeScript, React, Next.js, PyTorch, Node.js, Arduino, C/C++, SQL, Tailwind CSS
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-purple-400 border-b border-zinc-700 pb-1 mb-2">Projects</h2>
        <div className="space-y-2">
          <div>
            <p className="font-medium">Chert - Voice-based GIS</p>
            <p className="text-zinc-400 text-sm">Voice-first GIS data collection platform for archaeological projects</p>
          </div>
          <div>
            <p className="font-medium">Nodal CLI</p>
            <p className="text-zinc-400 text-sm">CLI that generates wiring diagrams, firmware, and host code for Arduino/ESP32</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LinksContent = () => (
  <div className="text-sm font-mono">
    <pre className="whitespace-pre-wrap">
      <span className="text-zinc-500">{"// links.ts"}</span>
      {"\n"}
      <span className="text-zinc-500">{"// Social links and contact information"}</span>
      {"\n\n"}
      <span className="text-purple-400">export const</span> <span className="text-emerald-300">links</span> <span className="text-zinc-400">=</span> {"{"}
      {"\n"}
      <span className="text-zinc-500">{"  // GitHub"}</span>
      {"\n"}
      {"  "}<span className="text-emerald-300">github</span>: <span className="text-amber-300">&quot;<a href="https://github.com/garygao333" target="_blank" rel="noreferrer" className="hover:underline">https://github.com/garygao333</a>&quot;</span>,
      {"\n\n"}
      <span className="text-zinc-500">{"  // LinkedIn"}</span>
      {"\n"}
      {"  "}<span className="text-emerald-300">linkedin</span>: <span className="text-amber-300">&quot;<a href="https://linkedin.com/in/garygao" target="_blank" rel="noreferrer" className="hover:underline">https://linkedin.com/in/garygao</a>&quot;</span>,
      {"\n\n"}
      <span className="text-zinc-500">{"  // Email"}</span>
      {"\n"}
      {"  "}<span className="text-emerald-300">email</span>: <span className="text-amber-300">&quot;<a href="mailto:garygao@sas.upenn.edu" className="hover:underline">garygao@sas.upenn.edu</a>&quot;</span>,
      {"\n"}
      {"}"};
    </pre>
  </div>
);

export const FileViewer: React.FC<FileViewerProps> = ({ activeFile, onClose }) => {
  if (!activeFile) {
    return null;
  }

  const getFileIcon = (file: FileType) => {
    switch (file) {
      case "README.md":
        return "📄";
      case "resume":
        return "📋";
      case "links.ts":
        return "🔗";
      default:
        return "📄";
    }
  };

  const renderContent = () => {
    switch (activeFile) {
      case "README.md":
        return <ReadmeContent />;
      case "resume":
        return <ResumeContent />;
      case "links.ts":
        return <LinksContent />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
      {/* Tab bar */}
      <div className="flex-shrink-0 flex items-center border-b border-emerald-500/20 bg-black/60 text-xs">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 border-r border-emerald-500/20 text-emerald-300">
          <span>{getFileIcon(activeFile)}</span>
          <span>{activeFile}</span>
          <button
            onClick={onClose}
            className="ml-2 hover:text-white text-zinc-500"
          >
            ×
          </button>
        </div>
      </div>

      {/* File content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 bg-[#0a0a0f]">
        {renderContent()}
      </div>
    </div>
  );
};
