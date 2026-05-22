"use client";

import type * as React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { StatusChip } from "@/components/ui/StatusChip";
import type { Project } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="group flex flex-col h-full rounded-xl border border-white/5 md:border-outline-variant/30 bg-gradient-to-br from-[#161616] to-[#0f0f0f] hover:from-[#1b1b1b] hover:to-[#111111] overflow-hidden hover:border-primary/30 transition-all duration-300 shadow-xl hover:shadow-[0_12px_30px_-10px_rgba(243,115,53,0.08)] relative"
    >
      {/* Premium Framed Image Container */}
      <div className="p-4 pb-0">
        <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-[#1f1f1f] border border-white/5 shadow-inner">
          {!imgError ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover filter grayscale opacity-85 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03]"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Technical Diagram Placeholder if coverImage fails */
            <div className="absolute inset-0 bg-surface-container-high flex flex-col items-center justify-center p-6">
              <div className="w-full text-center">
                <div className="mx-auto max-w-[200px] rounded border border-outline-variant bg-surface-container-lowest p-2.5 font-mono text-[10px] text-on-surface-variant mb-3">
                  {project.category}
                </div>
                <div className="space-y-1">
                  {project.diagramArrows.map((arrow, idx) => {
                    const parts = arrow.split("→");
                    return (
                      <p key={idx} className="font-mono text-[10px] text-on-surface-variant flex items-center justify-center gap-1.5">
                        {parts.map((p, pIdx) => (
                          <span key={pIdx} className="inline-flex items-center">
                            {pIdx > 0 && <span className="text-[#f37335] mr-1.5">→</span>}
                            {p.trim()}
                          </span>
                        ))}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Top-right overlay status */}
          <div className="absolute top-3 right-3 z-10">
            <StatusChip variant="primary" className="px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-semibold">
              {project.status}
            </StatusChip>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex flex-col flex-grow px-5 py-4">
        {/* Tags Row */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {project.tags.map((tag) => (
            <StatusChip key={tag} variant="default" className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold">
              {tag}
            </StatusChip>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-hanken text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-200 leading-snug">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="font-inter text-xs sm:text-sm text-on-surface-variant/85 line-clamp-2 leading-relaxed mb-4">
          {project.summary}
        </p>

        {/* Bottom Row */}
        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-on-surface-variant/70 flex-shrink-0">
            {project.year}
          </span>
          
          {/* Tech Stack Mini Pills */}
          <div className="hidden xl:flex flex-wrap gap-1">
            {project.techStack.slice(0, 2).map((tech) => (
              <span
                key={tech}
                className="bg-[#1f1f1f] border border-white/5 rounded px-2 py-0.5 font-mono text-[9px] text-on-surface-variant/80"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-[#ffb597] bg-primary/10 border border-primary/20 hover:bg-primary/20 rounded px-2.5 py-1 transition-all"
              >
                <span className="uppercase tracking-wider">Live</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="font-inter text-xs text-[#f37335] font-semibold flex-shrink-0 inline-flex items-center gap-0.5 group/btn hover:text-[#ffb597] transition-colors"
            >
              <span>Case Study</span>
              <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
