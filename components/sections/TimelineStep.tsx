"use client";

import type * as React from "react";
import {
  ArrowUpRight,
  CheckCheck,
  ClipboardList,
  Code2,
  FolderSearch,
  Rocket,
  SearchCheck,
  TerminalSquare,
  Target,
  Users2,
  AlertCircle,
  Layers,
  Activity,
  Zap,
  FileText,
  Video,
  MessageSquare
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { gsap } from "@/lib/gsap";
import { HOW_I_WORK_ILLUSTRATION_COPY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMemo, useRef, useCallback } from "react";

export interface TimelineStepProps {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  side: "left" | "right";
  loopNote?: string;
  isLast?: boolean;
}

interface StepIllustrationProps {
  step: number;
  title: string;
}

function StepIllustration({ step, title }: StepIllustrationProps): React.JSX.Element {
  const iconClassName = "h-11 w-11 text-[#f37335] timeline-icon-bounce mb-2";
  const accentClassName =
    "rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-mono text-[11px] text-primary tracking-wider uppercase";

  switch (step) {
    case 1:
      return (
        <div className="flex flex-col items-center gap-4 w-full px-4" aria-label={title}>
          <SearchCheck className={iconClassName} aria-hidden="true" />
          <div className="grid w-full max-w-[18rem] gap-3">
            {[
              { text: "What success looks like", icon: Target, color: "#f37335", bg: "rgba(243,115,53,0.08)", border: "rgba(243,115,53,0.2)" },
              { text: "Who uses this product", icon: Users2, color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
              { text: "What is broken today", icon: AlertCircle, color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.2)" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-lg p-2.5 hover:border-primary/25 transition-all duration-300">
                  <span className="text-[12px] font-medium text-white/95">{item.text}</span>
                  <div
                    style={{ backgroundColor: item.bg, borderColor: item.border }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border transition-transform duration-300 hover:scale-110 shadow-sm"
                  >
                    <Icon style={{ color: item.color }} className="h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col items-center gap-4 w-full px-4" aria-label={title}>
          <ClipboardList className={iconClassName} aria-hidden="true" />
          <div className="grid w-full max-w-[18rem] gap-3">
            {HOW_I_WORK_ILLUSTRATION_COPY.auditLines.map((line, index) => (
              <div key={line} className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-lg p-2.5">
                <span className="text-[12px] font-medium text-white/95">{line}</span>
                <span
                  className={cn(
                    "h-2 rounded-full",
                    index === 0 ? "w-16 bg-[#f37335]" : index === 1 ? "w-12 bg-[#f59e0b]" : index === 2 ? "w-8 bg-[#ffc0a5]" : "w-6 bg-white/30"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col items-center gap-4 w-full px-4" aria-label={title}>
          <CheckCheck className={iconClassName} aria-hidden="true" />
          <div className="grid w-full max-w-[18rem] gap-3">
            {HOW_I_WORK_ILLUSTRATION_COPY.planChecklist.map((item, index) => (
              <div key={item} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-md border text-[11px] font-bold",
                    index < 2
                      ? "border-[#f37335] bg-[#f37335]/20 text-[#f37335]"
                      : "border-white/20 text-white/40"
                  )}
                >
                  {index < 2 ? "✓" : ""}
                </span>
                <span className="font-inter text-[13px] text-white/90 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex flex-col items-center gap-4 w-full px-4" aria-label={title}>
          <Code2 className={iconClassName} aria-hidden="true" />
          <div className="grid w-full max-w-[19rem] gap-1.5 rounded-xl border border-[#f37335]/35 bg-[#1a1310] p-4 font-mono text-[11px] text-[#ffc0a5] shadow-[0_0_20px_rgba(243,115,53,0.08)]">
            <div className="flex items-center gap-1.5 border-b border-white/15 pb-2 mb-1.5 opacity-60">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f37335]" />
              <span>build.js</span>
            </div>
            {HOW_I_WORK_ILLUSTRATION_COPY.executeSnippet.map((line, idx) => (
              <span key={line} className={idx === 0 ? "text-[#f59e0b]" : idx === 1 ? "text-teal-400 pl-2" : "text-white/80 pl-2"}>
                {line}
              </span>
            ))}
          </div>
        </div>
      );
    case 5:
      return (
        <div className="flex flex-col items-center gap-4 w-full px-4" aria-label={title}>
          <TerminalSquare className={iconClassName} aria-hidden="true" />
          <div className="grid w-full max-w-[19rem] gap-2 rounded-xl border border-white/15 bg-black/40 p-4 font-mono text-[11px] text-white/85 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-1.5">
              <span className="opacity-60">Test Suite</span>
              <span className="text-teal-400 font-bold">100% PASS</span>
            </div>
            {HOW_I_WORK_ILLUSTRATION_COPY.testOutputs.map((line, index) => (
              <div key={line} className="flex items-center justify-between">
                <span className={index < 2 ? "text-[#57c785]" : "text-primary/70"}>
                  {line}
                </span>
                <span className="text-[10px] opacity-40">ms</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 6:
      return (
        <div className="flex flex-col items-center gap-4 w-full px-4" aria-label={title}>
          <Rocket className={iconClassName} aria-hidden="true" />
          <div className="grid w-full max-w-[18rem] gap-3">
            {[
              { text: "Staged Canary Rollout", icon: Layers, color: "#14b8a6", bg: "rgba(20,184,166,0.08)", border: "rgba(20,184,166,0.2)" },
              { text: "Real-time Monitoring", icon: Activity, color: "#f37335", bg: "rgba(243,115,53,0.08)", border: "rgba(243,115,53,0.2)" },
              { text: "Zero-downtime Release", icon: Zap, color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-lg p-2.5 hover:border-primary/25 transition-all duration-300">
                  <span className="text-[12px] font-medium text-white/95">{item.text}</span>
                  <div
                    style={{ backgroundColor: item.bg, borderColor: item.border }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border transition-transform duration-300 hover:scale-110 shadow-sm"
                  >
                    <Icon style={{ color: item.color }} className="h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    case 7:
      return (
        <div className="flex flex-col items-center gap-4 w-full px-4" aria-label={title}>
          <ClipboardList className={iconClassName} aria-hidden="true" />
          <div className="grid w-full max-w-[18rem] gap-3">
            {[
              { text: "System documentation", icon: FileText, color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" },
              { text: "Loom walkthroughs", icon: Video, color: "#ec4899", bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.2)" },
              { text: "Codebase comments", icon: MessageSquare, color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-lg p-2.5 hover:border-primary/25 transition-all duration-300">
                  <span className="text-[12px] font-medium text-white/95">{item.text}</span>
                  <div
                    style={{ backgroundColor: item.bg, borderColor: item.border }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border transition-transform duration-300 hover:scale-110 shadow-sm"
                  >
                    <Icon style={{ color: item.color }} className="h-4 w-4" />
                  </div>
                </div>
              );
            })}
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

  /* Spotlight mouse movements handler */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }, []);

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
        "relative pl-12 md:pl-0 z-10",
        !isLast ? "pb-14 md:pb-24" : undefined
      )}
    >
      <span
        data-step={step}
        className="absolute left-4 top-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#131313] bg-[var(--color-outline-variant)] md:left-1/2 transition-colors duration-300"
      />
      <div className="grid items-center gap-8 md:min-h-[290px] md:grid-cols-2 md:gap-14">
        {/* Text Area */}
        <div
          data-timeline-text
          className={cn(side === "left" ? "md:order-2 text-left" : "md:order-1 text-left")}
        >
          <p className="font-hanken text-[56px] font-black leading-none text-[#f37335]/50 select-none">
            {step.toString().padStart(2, "0")}
          </p>
          <p className="mt-4 text-[12px] font-mono font-semibold tracking-wider text-primary uppercase">{subtitle}</p>
          <h3 className="mt-3 font-hanken text-[30px] md:text-[36px] font-extrabold text-[#ffb597] tracking-tight leading-none">{title}</h3>
          <p className="mt-3.5 font-inter text-[14px] leading-relaxed text-on-surface-variant/90">
            {description}
          </p>
          {loopNote ? (
            <span className="mt-4.5 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1 font-mono text-[11px] text-primary">
              {loopNote}
            </span>
          ) : null}
        </div>

        {/* Dynamic Card Area */}
        <div
          data-timeline-card
          className={cn(side === "left" ? "md:order-1" : "md:order-2")}
        >
          <div
            onMouseMove={handleMouseMove}
            className="timeline-card-premium w-full min-h-[300px] py-6 px-4 md:py-8 md:px-6"
          >
            <StepIllustration step={step} title={title} />
          </div>
        </div>
      </div>
    </div>
  );
}
