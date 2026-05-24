"use client";

import type * as React from "react";
import { useRef, useEffect } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useTimelineAnimation } from "@/hooks/useTimelineAnimation";
import { HOW_I_WORK_COPY, HOW_I_WORK_STEPS, PAGE_IDS } from "@/lib/constants";
import { TimelineStep } from "@/components/sections/TimelineStep";
import { gsap, SplitText } from "@/lib/gsap";

export function HowIWork(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepsContainerRef = useRef<HTMLDivElement | null>(null);
  const spineFillRef = useRef<HTMLDivElement | null>(null);
  
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const labelLineRef = useRef<HTMLSpanElement | null>(null);

  useTimelineAnimation(spineFillRef, stepsContainerRef);

  /* Headline SplitText reveal on scroll */
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
        wordsClass: "how-work-word"
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
      id={PAGE_IDS.howIWork}
      ref={sectionRef}
      className="relative px-5 py-24 md:px-10 md:py-32 bg-[#131313] overflow-hidden z-10"
    >
      <div className="relative mx-auto max-w-5xl z-10">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div ref={labelRef} className="flex items-center gap-3">
            <span ref={labelLineRef} className="h-[1px] w-6 bg-primary/60 origin-left transition-transform duration-700 scale-x-0" />
            <SectionLabel>{HOW_I_WORK_COPY.label}</SectionLabel>
            <span className="h-[1px] w-6 bg-primary/60 origin-right transition-transform duration-700 scale-x-0 active:scale-x-100" />
          </div>
          <h2 ref={headlineRef} className="mt-6 font-hanken text-[36px] font-bold leading-[1.15] text-white md:text-[54px] tracking-tight">
            <span>{HOW_I_WORK_COPY.headlineLeading} </span>
            <span className="text-primary">{HOW_I_WORK_COPY.headlineAccent}</span>
          </h2>
        </div>

        {/* Steps Grid & Vertical Connectors */}
        <div ref={stepsContainerRef} className="relative mt-12 md:mt-16">
          {/* Vertical Spine Base */}
          <div className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          
          {/* Glowing Spine fill linked to scroll progress */}
          <div
            ref={spineFillRef}
            id="spine-fill"
            className="absolute left-4 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#f37335] via-[#f59e0b] to-[#f37335] md:left-1/2 shadow-[0_0_10px_rgba(243,115,53,0.5)]"
          />

          {HOW_I_WORK_STEPS.map((step, index) => (
            <TimelineStep
              key={step.step}
              step={step.step}
              title={step.title}
              subtitle={step.subtitle}
              description={step.description}
              side={step.side}
              loopNote={step.loopNote}
              isLast={index === HOW_I_WORK_STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
