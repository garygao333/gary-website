"use client";

import { useState, useEffect, useCallback } from "react";

type Project = {
  title: string;
  description: string;
  details: string;
  gradient: string;
  year: string;
};

export const ProjectGallery = ({ projects }: { projects: Project[] }) => {
  const [expanded, setExpanded] = useState<number>(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setExpanded((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  // Auto-rotate every 3s unless user paused it
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const handleClick = (i: number) => {
    setExpanded(i);
    setPaused(true);
    // Resume auto-rotation after 8s of inactivity
    setTimeout(() => setPaused(false), 8000);
  };

  return (
    <div className="grid grid-cols-3 gap-1">
      {projects.map((project, i) => {
        const isExpanded = expanded === i;

        return (
          <div
            key={project.title}
            className="relative cursor-pointer"
            style={{ zIndex: isExpanded ? 10 : 1 }}
            onClick={() => handleClick(i)}
          >
            <div
              className={`relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br ${project.gradient} transition-all duration-500 ease-out`}
              style={{
                transform: isExpanded ? "scale(1.06)" : "scale(1)",
                boxShadow: isExpanded
                  ? "0 12px 32px rgba(0,0,0,0.25)"
                  : "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <span className="absolute top-3 left-3 text-4xl font-black text-white/20">
                {project.year}
              </span>

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-500"
                style={{
                  background: isExpanded
                    ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%)",
                  opacity: 1,
                }}
              >
                {/* Title — always visible */}
                <span
                  className="text-white font-bold leading-tight transition-all duration-500"
                  style={{
                    fontSize: isExpanded ? "13px" : "11px",
                    opacity: isExpanded ? 1 : 0.7,
                  }}
                >
                  {project.title}
                </span>

                {/* Description + details — expand in */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: isExpanded ? "100px" : "0px",
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <span className="text-white/70 text-[11px] leading-tight block mt-0.5">
                    {project.description}
                  </span>
                  <span className="text-white/50 text-[11px] leading-snug block mt-1">
                    {project.details}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
