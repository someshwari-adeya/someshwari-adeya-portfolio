"use client";

import { useState } from "react";
import Image from "next/image";
import { CaseStudyDiagram } from "@/components/sections/CaseStudyDiagram";
import { CASE_STUDIES, type Project } from "@/lib/constants";

interface ProjectImageContainerProps {
  project: Project;
}

export function ProjectImageContainer({ project }: ProjectImageContainerProps): React.JSX.Element {
  const [imgError, setImgError] = useState(false);

  const study = CASE_STUDIES.find((c) => c.id === project.slug);
  const diagramLines = study?.diagramLines || [project.category];
  const diagramArrows = study?.diagramArrows || project.diagramArrows;

  return (
    <div className="group w-full mt-12">
      {!imgError && project.coverImage ? (
        <div className="relative">
          {/* Premium browser/device chrome mockup frame */}
          <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-[#111111] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.8)]">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-[#0d0d0d]">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <div className="ml-4 flex-1 max-w-[320px] h-6 rounded-md bg-white/5 border border-white/5 flex items-center px-3">
                <span className="font-mono text-[10px] text-on-surface-variant/50 truncate">
                  {project.liveUrl ?? `app.techsonance.co.in/${project.slug}`}
                </span>
              </div>
            </div>

            {/* The actual screenshot */}
            <div className="relative w-full aspect-video overflow-hidden bg-[#1a1a1a]">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-top transition-all duration-700 group-hover:scale-[1.02]"
                onError={() => setImgError(true)}
                priority
              />
            </div>
          </div>

          {/* Glow reflection below frame */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-primary/5 blur-2xl rounded-full pointer-events-none" />
        </div>
      ) : null}

      {/* Flow Diagram — rendered as a clean separate pill strip */}
      <div className="mt-10 rounded-xl border border-white/5 bg-gradient-to-br from-[#141414] to-[#0f0f0f] px-8 py-6 flex flex-col items-center justify-center">
        <CaseStudyDiagram lines={diagramLines} arrows={diagramArrows} />
      </div>
    </div>
  );
}
