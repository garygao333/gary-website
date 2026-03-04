"use client";

import { useState } from "react";

type Project = {
  title: string;
  description: string;
  details: string;
  gradient: string;
  year: string;
};

export const ProjectGallery = ({ projects }: { projects: Project[] }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {projects.map((project, i) => {
        const isExpanded = expanded === i;
        return (
          <div
            key={project.title}
            className="cursor-pointer"
            onClick={() => setExpanded(isExpanded ? null : i)}
          >
            <div
              className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br ${project.gradient} transition-transform duration-300 ${
                isExpanded ? "scale-[1.02]" : "hover:scale-[1.01]"
              }`}
            >
              <span className="absolute top-4 left-5 text-5xl font-black text-white/30">
                {project.year}
              </span>
              {/* Hover overlay hint */}
              <div
                className={`absolute inset-0 bg-black/40 flex items-end p-4 transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 hover:opacity-100"
                }`}
              >
                <span className="text-white text-sm font-semibold">
                  {project.title}
                </span>
              </div>
            </div>
            <p className="text-sm mt-2 leading-snug" style={{ color: "var(--text-muted)" }}>
              {project.description}
            </p>
            {/* Expandable details */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isExpanded ? "120px" : "0px",
                opacity: isExpanded ? 1 : 0,
              }}
            >
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {project.details}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
