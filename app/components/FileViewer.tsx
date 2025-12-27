"use client";

import React from "react";
import { VscMarkdown, VscFile } from "react-icons/vsc";
import { SiTypescript } from "react-icons/si";

type FileType = "README.md" | "resume" | "links.ts" | null;

interface FileViewerProps {
  activeFile: FileType;
  onClose: () => void;
}

const ReadmeContent = () => (
  <div className="text-sm space-y-4" style={{ color: "var(--fg-main)" }}>
    <pre className="whitespace-pre-wrap">
      <span style={{ color: "var(--violet)" }}># Gary Gao</span>
      {"\n\n"}
      <span style={{ color: "var(--fg-main)" }}>Hi, I&apos;m Gary! I study Physics + Wharton at Penn.</span>
      {"\n\n"}
      <span style={{ color: "var(--violet)" }}>## About Me</span>
      {"\n\n"}
      <span style={{ color: "var(--fg-main)" }}>I like building at the edge of deep tech, AI, neuromorphic hardware, and archaeology.</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>This TUI is my little playground to show off projects, experiments, and weird ideas.</span>
      {"\n\n"}
      <span style={{ color: "var(--violet)" }}>## Interests</span>
      {"\n\n"}
      <span style={{ color: "var(--fg-main)" }}>- AI & Machine Learning</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- Neuromorphic Computing</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- Archaeology & GIS</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- Hardware Hacking</span>
      {"\n\n"}
      <span style={{ color: "var(--violet)" }}>## Current Projects</span>
      {"\n\n"}
      <span style={{ color: "var(--fg-main)" }}>- **Chert** - Voice-based GIS for Archaeology</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- **Nodal CLI** - Hardware copilot for embedded systems</span>
    </pre>
  </div>
);

const ResumeContent = () => (
  <div className="text-sm space-y-3" style={{ color: "var(--fg-main)" }}>
    <div
      className="rounded p-6"
      style={{
        border: "1px solid var(--border-subtle)",
        backgroundColor: "var(--bg-alt)"
      }}
    >
      <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--cyan)" }}>Gary Gao</h1>
      <p className="text-sm mb-4" style={{ color: "var(--fg-muted)" }}>garygao@sas.upenn.edu | Philadelphia, PA</p>

      <div className="mb-4">
        <h2
          className="text-lg font-semibold pb-1 mb-2"
          style={{ color: "var(--violet)", borderBottom: "1px solid var(--border-subtle)" }}
        >
          Education
        </h2>
        <div>
          <p className="font-medium">University of Pennsylvania</p>
          <p className="text-sm" style={{ color: "var(--fg-muted)" }}>B.A. Physics & B.S. Economics (Wharton)</p>
        </div>
      </div>

      <div className="mb-4">
        <h2
          className="text-lg font-semibold pb-1 mb-2"
          style={{ color: "var(--violet)", borderBottom: "1px solid var(--border-subtle)" }}
        >
          Skills
        </h2>
        <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
          Python, TypeScript, React, Next.js, PyTorch, Node.js, Arduino, C/C++, SQL, Tailwind CSS
        </p>
      </div>

      <div className="mb-4">
        <h2
          className="text-lg font-semibold pb-1 mb-2"
          style={{ color: "var(--violet)", borderBottom: "1px solid var(--border-subtle)" }}
        >
          Projects
        </h2>
        <div className="space-y-2">
          <div>
            <p className="font-medium">Chert - Voice-based GIS</p>
            <p className="text-sm" style={{ color: "var(--fg-muted)" }}>Voice-first GIS data collection platform for archaeological projects</p>
          </div>
          <div>
            <p className="font-medium">Nodal CLI</p>
            <p className="text-sm" style={{ color: "var(--fg-muted)" }}>CLI that generates wiring diagrams, firmware, and host code for Arduino/ESP32</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LinksContent = () => (
  <div className="text-sm font-mono">
    <pre className="whitespace-pre-wrap">
      <span style={{ color: "var(--fg-muted)" }}>{"// links.ts"}</span>
      {"\n"}
      <span style={{ color: "var(--fg-muted)" }}>{"// Social links and contact information"}</span>
      {"\n\n"}
      <span style={{ color: "var(--violet)" }}>export const</span> <span style={{ color: "var(--cyan)" }}>links</span> <span style={{ color: "var(--fg-main)" }}>=</span> {"{"}
      {"\n"}
      <span style={{ color: "var(--fg-muted)" }}>{"  // GitHub"}</span>
      {"\n"}
      {"  "}<span style={{ color: "var(--cyan)" }}>github</span>: <span style={{ color: "var(--yellow)" }}>&quot;<a href="https://github.com/garygao333" target="_blank" rel="noreferrer" className="hover:underline">https://github.com/garygao333</a>&quot;</span>,
      {"\n\n"}
      <span style={{ color: "var(--fg-muted)" }}>{"  // LinkedIn"}</span>
      {"\n"}
      {"  "}<span style={{ color: "var(--cyan)" }}>linkedin</span>: <span style={{ color: "var(--yellow)" }}>&quot;<a href="https://linkedin.com/in/garygao" target="_blank" rel="noreferrer" className="hover:underline">https://linkedin.com/in/garygao</a>&quot;</span>,
      {"\n\n"}
      <span style={{ color: "var(--fg-muted)" }}>{"  // Email"}</span>
      {"\n"}
      {"  "}<span style={{ color: "var(--cyan)" }}>email</span>: <span style={{ color: "var(--yellow)" }}>&quot;<a href="mailto:garygao@sas.upenn.edu" className="hover:underline">garygao@sas.upenn.edu</a>&quot;</span>,
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
        return <VscMarkdown style={{ color: "var(--blue)" }} />;
      case "resume":
        return <VscFile style={{ color: "var(--fg-muted)" }} />;
      case "links.ts":
        return <SiTypescript style={{ color: "var(--blue)" }} />;
      default:
        return <VscFile style={{ color: "var(--fg-muted)" }} />;
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
      <div
        className="flex-shrink-0 flex items-center text-xs"
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          backgroundColor: "var(--bg-alt)"
        }}
      >
        <div
          className="flex items-center gap-2 px-3 py-1.5"
          style={{
            backgroundColor: "var(--bg-main)",
            borderRight: "1px solid var(--border-subtle)",
            color: "var(--fg-strong)"
          }}
        >
          <span>{getFileIcon(activeFile)}</span>
          <span>{activeFile}</span>
          <button
            onClick={onClose}
            className="ml-2 transition-colors"
            style={{ color: "var(--fg-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-main)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
          >
            ×
          </button>
        </div>
      </div>

      {/* File content */}
      <div
        className="flex-1 min-h-0 overflow-y-auto p-4"
        style={{ backgroundColor: "var(--bg-main)" }}
      >
        {renderContent()}
      </div>
    </div>
  );
};
