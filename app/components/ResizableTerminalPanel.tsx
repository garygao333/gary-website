"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Terminal } from "./Terminal";

export const ResizableTerminalPanel: React.FC = () => {
  const [height, setHeight] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startY.current = e.clientY;
    startHeight.current = height;
  }, [height]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaY = startY.current - e.clientY;
    const newHeight = Math.max(150, Math.min(startHeight.current + deltaY, window.innerHeight - 200));
    setHeight(newHeight);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "ns-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col"
      style={{
        height: `${height}px`,
        borderTop: "1px solid var(--border-subtle)",
        backgroundColor: "var(--bg-main)"
      }}
    >
      {/* Drag handle */}
      <div
        onMouseDown={handleMouseDown}
        className="h-1 cursor-ns-resize transition-colors"
        style={{
          backgroundColor: isDragging ? "var(--accent-primary)" : "var(--border-subtle)"
        }}
        onMouseEnter={(e) => {
          if (!isDragging) e.currentTarget.style.backgroundColor = "var(--accent-primary)";
        }}
        onMouseLeave={(e) => {
          if (!isDragging) e.currentTarget.style.backgroundColor = "var(--border-subtle)";
        }}
      />

      {/* Tab bar like VS Code */}
      <div
        className="flex items-center text-xs"
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          backgroundColor: "var(--bg-alt)"
        }}
      >
        <button
          className="px-4 py-1.5 transition-colors"
          style={{ color: "var(--fg-muted)" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-main)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
        >
          PROBLEMS
        </button>
        <button
          className="px-4 py-1.5 transition-colors"
          style={{ color: "var(--fg-muted)" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-main)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
        >
          OUTPUT
        </button>
        <button
          className="px-4 py-1.5 transition-colors"
          style={{ color: "var(--fg-muted)" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-main)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
        >
          DEBUG CONSOLE
        </button>
        <button
          className="px-4 py-1.5 -mb-[1px]"
          style={{
            color: "var(--accent-primary)",
            borderBottom: "2px solid var(--accent-primary)"
          }}
        >
          <span className="underline underline-offset-2">TERMINAL</span>
        </button>
        <button
          className="px-4 py-1.5 transition-colors"
          style={{ color: "var(--fg-muted)" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-main)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
        >
          PORTS
        </button>

        {/* Right side controls */}
        <div className="ml-auto flex items-center gap-2 pr-2" style={{ color: "var(--fg-muted)" }}>
          <button
            className="p-1 transition-colors"
            title="New Terminal"
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-main)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            className="p-1 transition-colors"
            title="Split Terminal"
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-main)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
            </svg>
          </button>
          <button
            className="p-1 transition-colors"
            title="Maximize"
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-main)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button
            className="p-1 transition-colors"
            title="Close"
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-main)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div className="flex-1 overflow-hidden">
        <Terminal />
      </div>
    </div>
  );
};
