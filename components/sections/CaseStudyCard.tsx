"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { StatusChip } from "@/components/ui/StatusChip";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CASE_STUDIES_COPY, PROJECTS, type CaseStudy } from "@/lib/constants";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { CaseStudyDiagram } from "@/components/sections/CaseStudyDiagram";

interface CaseStudyCardProps {
  study: CaseStudy;
}

function DetailBlock({
  label,
  value
}: {
  label: string;
  value: string;
}): React.JSX.Element {
  return (
    <div className="mt-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-primary">
        {label}
      </p>
      <p className="mt-1 text-body-md text-on-surface-variant">{value}</p>
    </div>
  );
}

export function CaseStudyCard({ study }: CaseStudyCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLElement | null>(null);
  const [imgError, setImgError] = useState(false);

  const project = PROJECTS.find((p) => p.slug === study.id);

  useScrollAnimation(cardRef, {
    start: "top 85%",
    fromY: 30,
    duration: 0.6,
    setFinalState: (element) => {
      gsap.set(element, { opacity: 1, y: 0 });
    }
  });

  return (
    <article
      ref={cardRef}
      className={cn(
        "group overflow-hidden rounded-lg border border-outline-variant bg-surface-container transition-colors duration-300 hover:border-[rgba(255,181,151,0.3)]",
        "md:min-h-[320px]"
      )}
    >
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col bg-surface-container-high overflow-hidden md:border-r md:border-outline-variant">
          {!imgError && project?.coverImage ? (
            <div className="relative w-full aspect-video overflow-hidden">
              {/* Grayscale background image with interactive hover transition */}
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            </div>
          ) : null}
          {/* Flow diagram below the image, completely separate */}
          <div className="p-8 flex flex-col items-center justify-center w-full flex-grow bg-surface-container-lowest/10 border-t border-outline-variant/30">
            <CaseStudyDiagram lines={study.diagramLines} arrows={study.diagramArrows} />
          </div>
        </div>
        <div className="p-8">
          <StatusChip variant="default">{study.category}</StatusChip>
          <h3 className="mt-3 font-hanken text-[28px] font-semibold text-on-surface md:text-[36px]">
            {study.client}
          </h3>
          <p className="mt-4 max-w-prose text-body-md text-on-surface-variant">
            {study.headline}
          </p>

          <DetailBlock label={CASE_STUDIES_COPY.challengeLabel} value={study.challenge} />
          {study.findings ? (
            <DetailBlock label={CASE_STUDIES_COPY.findingsLabel} value={study.findings} />
          ) : null}
          <DetailBlock label={CASE_STUDIES_COPY.impactLabel} value={study.impact} />

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 border-t border-outline-variant/30 pt-6">
            <Link
              href={`/projects/${study.id}`}
              className="inline-flex items-center justify-center rounded-lg bg-surface-container-high border border-outline-variant hover:border-primary/45 px-5 py-3 font-inter text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              View Case Study
            </Link>
            {project?.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#d85318] to-[#f37335] px-5 py-3 font-inter text-sm font-bold text-white transition-all duration-300 hover:from-[#f37335] hover:to-[#ffb597] hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#f37335]/15 hover:shadow-[0_0_20px_rgba(243,115,53,0.35)]"
              >
                <span>Visit Live Site</span>
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

