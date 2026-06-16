"use client";

import type * as React from "react";
import { useEffect, useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BEYOND_ROLES } from "@/lib/constants";
import { BeyondRolesAgencyCard } from "./BeyondRolesAgencyCard";
import { BeyondRolesInstagramGrid } from "./BeyondRolesInstagramGrid";
import { gsap, SplitText } from "@/lib/gsap";

export function BeyondRoles(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const labelLineRef = useRef<HTMLSpanElement | null>(null);

  // Staggered reveal for cards inside the section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>("[data-beyond-roles-card]");
    gsap.set(cards, { opacity: 0, y: 35 });

    const scrollTrigger = {
      trigger: section,
      start: "top 80%",
      once: true
    };

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger
    });
  }, []);

  // SplitText animation for the headline
  useEffect(() => {
    const headline = headlineRef.current;
    const labelLine = labelLineRef.current;
    const label = labelRef.current;

    if (!headline || !labelLine || !label) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      gsap.set([headline, label], { opacity: 1, y: 0 });
      labelLine.classList.add("active");
      return;
    }

    const ctx = gsap.context(() => {
      const splitText = SplitText.create(headline, {
        type: "words",
        wordsClass: "beyond-roles-word"
      });

      gsap.set(splitText.words, { opacity: 0, y: 25 });
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
          duration: 0.65,
          stagger: 0.05,
          ease: "power3.out"
        },
        "-=0.2"
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="beyond-roles"
      ref={sectionRef}
      className="relative px-5 py-24 md:px-10 md:py-32 bg-[#131313] overflow-hidden z-10"
    >
      {/* Volumetric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none select-none z-0" />

      <div className="relative mx-auto max-w-container z-10">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <div ref={labelRef} className="flex items-center gap-3">
            <span ref={labelLineRef} className="h-[1px] w-6 bg-primary/60 origin-left transition-transform duration-700 scale-x-0" />
            <SectionLabel>{BEYOND_ROLES.sectionLabel}</SectionLabel>
            <span className="h-[1px] w-6 bg-primary/60 origin-right transition-transform duration-700 scale-x-0 active:scale-x-100" />
          </div>
          <h2 ref={headlineRef} className="mt-6 font-hanken text-[36px] font-bold leading-[1.15] text-white md:text-[54px] tracking-tight">
            {BEYOND_ROLES.headline}
          </h2>
          <p className="mt-4 font-inter text-[14px] leading-relaxed text-on-surface-variant/90 max-w-xl text-center">
            {BEYOND_ROLES.subText}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-container mx-auto items-stretch">
          {/* Left Column: Founder Agency Card */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <BeyondRolesAgencyCard />
          </div>

          {/* Right Column: Instagram Showcase */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <BeyondRolesInstagramGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
