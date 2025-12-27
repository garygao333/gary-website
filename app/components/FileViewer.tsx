"use client";

import React from "react";
import { VscMarkdown, VscFile } from "react-icons/vsc";
import { SiTypescript } from "react-icons/si";

type FileType = "README.md" | "resume" | "links.ts" | null;

interface FileViewerProps {
  activeFile: FileType;
  onClose: () => void;
}

export const ReadmeContent = () => (
  <div className="text-sm space-y-4" style={{ color: "var(--fg-main)" }}>
    <pre className="whitespace-pre-wrap">
      <span style={{ color: "var(--violet)" }}># Gary Gao</span>
      {"\n\n"}
      <span style={{ color: "var(--fg-main)" }}>Hi, I&apos;m Gary! I study CS + Wharton at Penn.</span>
      {"\n\n"}
      <span style={{ color: "var(--violet)" }}>## About Me</span>
      {"\n\n"}
      <span style={{ color: "var(--fg-main)" }}>I like building at the edge of deep tech, AI, neuromorphic hardware, and robotics.</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>This TUI is a place for me to show off projects, experiences, and ideas.</span>
      {"\n\n"}
      <span style={{ color: "var(--violet)" }}>## Interests</span>
      {"\n\n"}
      <span style={{ color: "var(--fg-main)" }}>- AI & Machine Learning</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- Neuromorphic Computing</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- Archaeology & GIS</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- Hardware and Robotics</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- Flying Planes</span>
      {"\n\n"}
      <span style={{ color: "var(--violet)" }}>## Current Projects</span>
      {"\n\n"}
      <span style={{ color: "var(--fg-main)" }}>- **Chert** - Voice-based GIS for Archaeology</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- **Nodal CLI** - Hardware copilot for embedded systems</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- **Photon Framework** - Building Flux</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- **Penn Engineering (LRSM)** - Building Physical AI</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- **GAO Capital** - Stock Forecasting Model using 0DTE Options</span>
      {"\n\n"}
      <span style={{ color: "var(--violet)" }}>## Past Projects</span>
      {"\n\n"}
      <span style={{ color: "var(--fg-main)" }}>- **ShiftKey** - Developed pricing model to recommend optimal base rates for over 10,000 healthcare facilities</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- **Tharros** - Built a Pottery Sherd Classification Model</span>
      {"\n"}
      <span style={{ color: "var(--fg-main)" }}>- **Wharton** - Helped cDots develop their capital stack</span>
    </pre>
  </div>
);

const ResumeContent = () => (
  <div className="text-sm flex items-center justify-center h-full" style={{ color: "var(--fg-muted)" }}>
    <div className="text-center">
      <p style={{ color: "var(--yellow)" }}>Currently under construction</p>
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
      {"  "}<span style={{ color: "var(--cyan)" }}>email</span>: <span style={{ color: "var(--yellow)" }}>&quot;<a href="mailto:garygao@wharton.upenn.edu" className="hover:underline">garygao@wharton.upenn.edu</a>&quot;</span>,
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
