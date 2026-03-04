"use client";

import { useState } from "react";

type Project = {
  title: string;
  description: string;
  details: string;
  gradient: string;
  year: string;
};

const rotations = ["-1.5deg", "1deg", "-0.8deg", "1.2deg", "-1deg", "0.7deg"];

export const ProjectGallery = ({ projects }: { projects: Project[] }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-3 gap-1">
      {projects.map((project, i) => {
        const isExpanded = expanded === i;
        const rotation = rotations[i % rotations.length];

        return (
          <div
            key={project.title}
            className="relative cursor-pointer"
            style={{ zIndex: isExpanded ? 10 : 1 }}
            onClick={() => setExpanded(isExpanded ? null : i)}
          >
            <div
              className={`relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br ${project.gradient} transition-all duration-300 ease-out`}
              style={{
                transform: isExpanded
                  ? "rotate(0deg) scale(1.08)"
                  : `rotate(${rotation}) scale(1)`,
                boxShadow: isExpanded
                  ? "0 12px 32px rgba(0,0,0,0.25)"
                  : "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <span className="absolute top-3 left-3 text-4xl font-black text-white/20">
                {project.year}
              </span>

              {/* Overlay — always visible when expanded, hover on default */}
              <div
                className={`absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-300 ${
                  isExpanded
                    ? "opacity-100"
                    : "opacity-0 hover:opacity-100"
                }`}
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                }}
              >
                <span className="text-white text-xs font-bold leading-tight">
                  {project.title}
                </span>
                <span className="text-white/70 text-[11px] leading-tight mt-0.5">
                  {project.description}
                </span>
                {isExpanded && (
                  <span className="text-white/60 text-[11px] leading-snug mt-1.5">
                    {project.details}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
