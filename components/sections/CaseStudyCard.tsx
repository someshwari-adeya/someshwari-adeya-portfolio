"use client";

import type * as React from "react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { StatusChip } from "@/components/ui/StatusChip";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CASE_STUDIES_COPY, PROJECTS, type CaseStudy } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary/95 font-semibold">
        {label}
      </p>
      <p className="mt-2.5 font-inter text-[14px] leading-relaxed text-on-surface-variant/90">{value}</p>
    </div>
  );
}

export function CaseStudyCard({ study }: CaseStudyCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLElement | null>(null);
  const [imgError, setImgError] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const project = PROJECTS.find((p) => p.slug === study.id);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      gsap.set(card, { opacity: 1, y: 0, scale: 1, rotateX: 0 });
      return;
    }

    const image = card.querySelector(".case-study-image");
    const leftCol = card.querySelector(".case-study-left");
    const rightCol = card.querySelector(".case-study-right");

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial 3D folded state
      gsap.set(card, {
        opacity: 0,
        y: 90,
        scale: 0.93,
        rotateX: -8,
        transformPerspective: 1200,
        transformOrigin: "center top"
      });

      // 2. Smooth lifting animation
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none"
        }
      });

      // 3. Staggered reveal for left and right columns
      if (leftCol && rightCol) {
        gsap.fromTo([leftCol, rightCol], 
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 4. Parallax scroll-bind on the image zoom
      if (image) {
        gsap.fromTo(image,
          { scale: 1.0, yPercent: -5 },
          {
            scale: 1.14,
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2
            }
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative group overflow-hidden rounded-2xl border border-white/10 bg-[#1c1b1b]/35 backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:-translate-y-1.5 shadow-[0_12px_45px_rgba(0,0,0,0.35)]",
        "md:min-h-[320px]"
      )}
    >
      {/* Dynamic Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(243, 115, 53, 0.08), transparent 45%)`
        }}
      />

      <div className="relative grid md:grid-cols-2 gap-8 p-6 md:p-8 z-10">
        {/* Left Column: Cover Image and Live Flow Diagram */}
        <div className="case-study-left flex flex-col gap-6 overflow-hidden">
          {!imgError && project?.coverImage ? (
            <div className="relative w-full aspect-video rounded-xl border border-white/10 overflow-hidden shadow-inner bg-black/40">
              {/* Grayscale background image with interactive hover transition */}
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="case-study-image object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : null}
          
          {/* Flow diagram below the image, completely separate, nested in a gorgeous sub-card */}
          <div className="p-6 flex flex-col items-center justify-center w-full flex-grow bg-black/20 border border-white/5 rounded-xl shadow-inner">
            <CaseStudyDiagram lines={study.diagramLines} arrows={study.diagramArrows} />
          </div>
        </div>

        {/* Right Column: Case Study Metadata details */}
        <div className="case-study-right flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <StatusChip variant="default">{study.category}</StatusChip>
              <div className="h-1.5 w-1.5 rounded-full bg-primary/80 animate-pulse" />
            </div>
            
            <h3 className="mt-4 font-hanken text-[26px] font-bold text-white md:text-[34px] leading-tight tracking-tight">
              {study.client}
            </h3>
            
            <p className="mt-4 font-inter text-[15px] leading-relaxed text-white/90 font-medium">
              {study.headline}
            </p>

            <div className="mt-6 border-t border-white/5 pt-4 space-y-4">
              <DetailBlock label={CASE_STUDIES_COPY.challengeLabel} value={study.challenge} />
              {study.findings ? (
                <DetailBlock label={CASE_STUDIES_COPY.findingsLabel} value={study.findings} />
              ) : null}
              <DetailBlock label={CASE_STUDIES_COPY.impactLabel} value={study.impact} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 border-t border-white/5 pt-6">
            <Link
              href={`/projects/${study.id}`}
              className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-primary/45 px-6 py-3.5 font-inter text-xs font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-white/[0.08]"
            >
              View Case Study
            </Link>
            {project?.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#d85318] to-[#f37335] px-6 py-3.5 font-inter text-xs font-bold text-white transition-all duration-300 hover:from-[#f37335] hover:to-[#ffb597] hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#f37335]/15 hover:shadow-[0_0_20px_rgba(243,115,53,0.35)]"
              >
                <span>Visit Live Site</span>
                <ExternalLink className="ml-2.5 h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
