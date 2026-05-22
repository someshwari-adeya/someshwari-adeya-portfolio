"use client";

import {
  ArrowUpRight,
  CheckCheck,
  ClipboardList,
  Code2,
  FolderSearch,
  Rocket,
  SearchCheck,
  TerminalSquare
} from "lucide-react";
import { useMemo, useRef } from "react";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { gsap } from "@/lib/gsap";
import { HOW_I_WORK_ILLUSTRATION_COPY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface TimelineStepProps {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  side: "left" | "right";
  loopNote?: string;
  isLast?: boolean;
}

type StepIllustrationProps = {
  step: number;
  title: string;
};

function StepIllustration({ step, title }: StepIllustrationProps): React.JSX.Element {
  const iconClassName = "h-10 w-10 text-primary";
  const accentClassName =
    "rounded border border-outline-variant bg-surface-container-high px-3 py-2 text-label-caps text-on-surface-variant";

  switch (step) {
    case 1:
      return (
        <div className="flex flex-col items-center gap-4" aria-label={title}>
          <div className="flex items-center gap-4">
            <SearchCheck className={iconClassName} aria-hidden="true" />
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-outline-variant bg-surface-container-high">
              <FolderSearch className="h-8 w-8 text-on-surface-variant" aria-hidden="true" />
            </div>
          </div>
          <div className={accentClassName}>{HOW_I_WORK_ILLUSTRATION_COPY.discoveryTag}</div>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col items-center gap-4" aria-label={title}>
          <ClipboardList className={iconClassName} aria-hidden="true" />
          <div className="grid w-full max-w-[16rem] gap-2">
            {HOW_I_WORK_ILLUSTRATION_COPY.auditLines.map((line, index) => (
              <span
                key={line}
                className={cn(
                  "block h-2 rounded-full bg-surface-container-high",
                  index === 0 ? "w-full" : index === 1 ? "w-5/6" : index === 2 ? "w-4/6" : "w-3/6"
                )}
              />
            ))}
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col items-center gap-4" aria-label={title}>
          <CheckCheck className={iconClassName} aria-hidden="true" />
          <div className="grid w-full max-w-[17rem] gap-3">
            {HOW_I_WORK_ILLUSTRATION_COPY.planChecklist.map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-sm border text-[10px]",
                    index < 2
                      ? "border-primary text-primary"
                      : "border-outline-variant text-on-surface-variant"
                  )}
                >
                  {index < 2 ? "✓" : ""}
                </span>
                <span className="text-label-caps text-on-surface-variant">{item}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex flex-col items-center gap-4" aria-label={title}>
          <Code2 className={iconClassName} aria-hidden="true" />
          <div className="grid w-full max-w-[18rem] gap-2 rounded-lg border border-outline-variant bg-surface-container-high p-4 font-mono text-xs text-on-surface-variant">
            {HOW_I_WORK_ILLUSTRATION_COPY.executeSnippet.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
      );
    case 5:
      return (
        <div className="flex flex-col items-center gap-4" aria-label={title}>
          <TerminalSquare className={iconClassName} aria-hidden="true" />
          <div className="grid w-full max-w-[18rem] gap-2 rounded-lg border border-outline-variant bg-surface-container-high p-4 font-mono text-xs">
            {HOW_I_WORK_ILLUSTRATION_COPY.testOutputs.map((line, index) => (
              <span
                key={line}
                className={index < 2 ? "text-[#57c785]" : "text-primary-container"}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      );
    case 6:
      return (
        <div className="flex flex-col items-center gap-4" aria-label={title}>
          <Rocket className={iconClassName} aria-hidden="true" />
          <div className="flex items-center gap-4 rounded-lg border border-outline-variant bg-surface-container-high px-4 py-3">
            <ArrowUpRight className="h-6 w-6 text-primary-container" aria-hidden="true" />
            <span className="text-label-caps text-on-surface-variant">
              {HOW_I_WORK_ILLUSTRATION_COPY.deployTag}
            </span>
          </div>
        </div>
      );
    case 7:
      return (
        <div className="flex flex-col items-center gap-4" aria-label={title}>
          <ClipboardList className={iconClassName} aria-hidden="true" />
          <div className="flex items-center gap-4 rounded-lg border border-outline-variant bg-surface-container-high px-4 py-3">
            <span className="text-label-caps text-on-surface-variant">
              {HOW_I_WORK_ILLUSTRATION_COPY.handoffTag}
            </span>
            <ArrowUpRight className="h-5 w-5 text-primary-container" aria-hidden="true" />
          </div>
        </div>
      );
    default:
      return <div className={accentClassName}>{title}</div>;
  }
}

export function TimelineStep({
  step,
  title,
  subtitle,
  description,
  side,
  loopNote,
  isLast = false
}: TimelineStepProps): React.JSX.Element {
  const stepRef = useRef<HTMLDivElement | null>(null);
  const dotSelector = useMemo(() => `[data-step="${step}"]`, [step]);

  useScrollAnimation(stepRef, {
    start: "top 75%",
    setFinalState: (element) => {
      const textColumn = element.querySelector<HTMLElement>("[data-timeline-text]");
      const cardColumn = element.querySelector<HTMLElement>("[data-timeline-card]");
      const dot = element.querySelector<HTMLElement>(dotSelector);

      if (textColumn) {
        gsap.set(textColumn, { opacity: 1, x: 0 });
      }

      if (cardColumn) {
        gsap.set(cardColumn, { opacity: 1, x: 0 });
      }

      if (dot) {
        gsap.set(dot, { backgroundColor: "#f37335" });
      }
    },
    createAnimation: (element, config) => {
      const textColumn = element.querySelector<HTMLElement>("[data-timeline-text]");
      const cardColumn = element.querySelector<HTMLElement>("[data-timeline-card]");
      const dot = element.querySelector<HTMLElement>(dotSelector);

      if (!textColumn || !cardColumn || !dot) {
        return null;
      }

      gsap.set(textColumn, { opacity: 0, x: side === "right" ? -30 : 30 });
      gsap.set(cardColumn, { opacity: 0, x: side === "right" ? 30 : -30 });

      return gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start: config.start,
            once: true
          }
        })
        .to(textColumn, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out"
        })
        .to(
          cardColumn,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out"
          },
          "-=0.42"
        )
        .to(
          dotSelector,
          {
            backgroundColor: "#f37335",
            duration: 0.25,
            ease: "power1.out"
          },
          "-=0.5"
        );
    }
  });

  return (
    <div
      ref={stepRef}
      className={cn(
        "relative pl-12 md:pl-0",
        !isLast ? "pb-14 md:pb-20" : undefined
      )}
    >
      <span
        data-step={step}
        className="absolute left-4 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-outline-variant)] md:left-1/2"
      />
      <div className="grid items-center gap-8 md:min-h-[280px] md:grid-cols-2 md:gap-12">
        <div
          data-timeline-text
          className={cn(side === "left" ? "md:order-2" : "md:order-1")}
        >
          <p className="font-mono text-[64px] leading-none text-[var(--color-on-surface-variant)] opacity-30">
            {step.toString().padStart(2, "0")}
          </p>
          <p className="mt-5 text-label-caps text-primary">{subtitle}</p>
          <h3 className="mt-4 text-headline-md text-on-surface">{title}</h3>
          <p className="mt-4 max-w-xl text-body-md text-on-surface-variant">
            {description}
          </p>
          {loopNote ? (
            <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-outline-variant bg-surface-container-high px-3 py-1 font-mono text-[11px] text-primary">
              {loopNote}
            </span>
          ) : null}
        </div>
        <div
          data-timeline-card
          className={cn(side === "left" ? "md:order-1" : "md:order-2")}
        >
          <div className="flex min-h-[180px] items-center justify-center rounded-lg border border-outline-variant bg-surface-container p-6 md:aspect-[16/10]">
            <StepIllustration step={step} title={title} />
          </div>
        </div>
      </div>
    </div>
  );
}
