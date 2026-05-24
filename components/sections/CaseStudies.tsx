"use client";

import type * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";

import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES, CASE_STUDIES_COPY, PAGE_IDS } from "@/lib/constants";
import { gsap, SplitText } from "@/lib/gsap";

export function CaseStudies(): React.JSX.Element {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const labelLineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    const labelLine = labelLineRef.current;
    const label = labelRef.current;

    if (!headline || !labelLine || !label) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      gsap.set([headline, label], { opacity: 1, y: 0 });
      labelLine.classList.add("active");
      return;
    }

    const ctx = gsap.context(() => {
      const splitText = SplitText.create(headline, {
        type: "words",
        wordsClass: "case-studies-word"
      });

      gsap.set(splitText.words, { opacity: 0, y: 30 });
      gsap.set(label, { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headline,
          start: "top 85%",
          once: true,
          onEnter: () => {
            labelLine.classList.add("active");
          }
        }
      });

      tl.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(
        splitText.words,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out"
        },
        "-=0.25"
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="projects" className="relative px-5 py-24 md:px-10 md:py-32 bg-[#0b0b0b] overflow-hidden z-10">
      {/* Volumetric glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[130px] pointer-events-none select-none z-0" />

      <div className="relative mx-auto max-w-6xl z-10">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div ref={labelRef} className="flex items-center gap-3">
            <span ref={labelLineRef} className="h-[1px] w-6 bg-primary/60 origin-left transition-transform duration-700 scale-x-0" />
            <SectionLabel>{CASE_STUDIES_COPY.label}</SectionLabel>
            <span className="h-[1px] w-6 bg-primary/60 origin-right transition-transform duration-700 scale-x-0 active:scale-x-100" />
          </div>
          <h2
            ref={headlineRef}
            className="mx-auto mt-6 max-w-4xl font-hanken text-[36px] font-bold leading-[1.15] text-white md:text-[54px] tracking-tight"
          >
            {CASE_STUDIES_COPY.headline}
          </h2>
        </div>

        {/* Staggered dynamic timeline of projects */}
        <div className="mt-12 space-y-12">
          {CASE_STUDIES.slice(0, 3).map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        {/* Action button */}
        <div className="mt-16 flex justify-center">
          <Button asChild variant="primary" className="px-8 py-4 text-xs font-mono uppercase tracking-wider rounded-xl">
            <Link href="/projects">
              Show More Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
