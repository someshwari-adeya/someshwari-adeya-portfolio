"use client";

import type * as React from "react";
import { useEffect, useRef } from "react";

import { TechCategory } from "@/components/sections/TechCategory";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { gsap, SplitText } from "@/lib/gsap";
import { PAGE_IDS, TECH_CATEGORIES, TECH_STACK_COPY } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function TechStack(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const labelLineRef = useRef<HTMLSpanElement | null>(null);

  // Staggered 3D reveal for category cards
  useScrollAnimation(sectionRef, {
    start: "top 75%",
    setFinalState: (element) => {
      const cards = element.querySelectorAll<HTMLElement>("[data-tech-card]");
      gsap.set(cards, { opacity: 1, y: 0, rotateX: 0 });
    },
    createAnimation: (element, config) => {
      const cards = element.querySelectorAll<HTMLElement>("[data-tech-card]");

      gsap.set(cards, { opacity: 0, y: 45, rotateX: -12, transformPerspective: 1000 });

      return gsap.to(cards, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: config.start,
          once: true
        }
      });
    }
  });

  // Headline SplitText reveal on scroll
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
      const split = SplitText.create(headline, {
        type: "words",
        wordsClass: "tech-stack-word"
      });

      gsap.set(split.words, { opacity: 0, y: 20 });
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
        split.words,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
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
      id={PAGE_IDS.techStack}
      ref={sectionRef}
      className="relative px-5 py-24 md:px-10 md:py-32 bg-[#111111] overflow-hidden z-10"
    >

      {/* Volumetric ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none select-none z-0" />

      <div className="relative mx-auto max-w-6xl z-10">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div ref={labelRef} className="flex items-center gap-3">
            <span ref={labelLineRef} className="h-[1px] w-6 bg-primary/60 origin-left transition-transform duration-700 scale-x-0" />
            <SectionLabel>{TECH_STACK_COPY.label}</SectionLabel>
            <span className="h-[1px] w-6 bg-primary/60 origin-right transition-transform duration-700 scale-x-0 active:scale-x-100" />
          </div>
          <h2 ref={headlineRef} className="mt-6 font-hanken text-[36px] font-bold leading-[1.15] text-white md:text-[54px] tracking-tight">
            <span>{TECH_STACK_COPY.headlineLeading}</span>
            <span className="text-primary">{TECH_STACK_COPY.headlineAccent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-inter text-[14px] leading-relaxed text-on-surface-variant/90">
            {TECH_STACK_COPY.description}
          </p>
        </div>

        {/* Categories Spotlight Grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {TECH_CATEGORIES.map((category) => (
            <TechCategory
              key={category.id}
              label={category.label}
              iconName={category.iconName}
              techs={category.techs}
              fullWidth={category.fullWidth}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
