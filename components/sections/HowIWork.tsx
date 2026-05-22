"use client";

import { useRef } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useTimelineAnimation } from "@/hooks/useTimelineAnimation";
import { HOW_I_WORK_COPY, HOW_I_WORK_STEPS, PAGE_IDS } from "@/lib/constants";
import { TimelineStep } from "@/components/sections/TimelineStep";

export function HowIWork(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepsContainerRef = useRef<HTMLDivElement | null>(null);
  const spineFillRef = useRef<HTMLDivElement | null>(null);

  useTimelineAnimation(spineFillRef, stepsContainerRef);

  return (
    <section
      id={PAGE_IDS.howIWork}
      ref={sectionRef}
      className="px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionLabel className="text-center">{HOW_I_WORK_COPY.label}</SectionLabel>
        <h2 className="mx-auto mt-6 max-w-3xl text-center text-headline-lg">
          <span>{HOW_I_WORK_COPY.headlineLeading}</span>
          <span className="text-primary">{HOW_I_WORK_COPY.headlineAccent}</span>
        </h2>

        <div ref={stepsContainerRef} className="relative mt-16 md:mt-20">
          <div className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-[var(--color-outline-variant)] md:left-1/2 md:-translate-x-1/2" />
          <div
            ref={spineFillRef}
            id="spine-fill"
            className="absolute left-4 top-0 w-px -translate-x-1/2 bg-primary-container md:left-1/2 md:-translate-x-1/2"
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
