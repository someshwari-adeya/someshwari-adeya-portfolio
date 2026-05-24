"use client";

import dynamic from "next/dynamic";
import { Bot, Map, Workflow } from "lucide-react";
import { useEffect, useRef } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  APPROACH_CARDS,
  APPROACH_COPY,
  PAGE_IDS,
  type IconRegistry
} from "@/lib/constants";
import { gsap, SplitText } from "@/lib/gsap";

/* ─── Lazy-load Three.js canvas (SSR-safe) ─── */
const ApproachParticleField = dynamic(
  () =>
    import("@/components/sections/ApproachParticleField").then(
      (mod) => mod.ApproachParticleField
    ),
  { ssr: false }
);

const iconRegistry: IconRegistry = {
  Workflow,
  Bot,
  Map
};

export function Approach(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const labelLineRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  /* ─── Headline SplitText + description reveal ─── */
  useEffect(() => {
    const headline = headlineRef.current;
    const description = descriptionRef.current;
    const labelLine = labelLineRef.current;
    const label = labelRef.current;

    if (!headline || !description || !labelLine || !label) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      gsap.set([headline, description, label], { opacity: 1, y: 0 });
      labelLine.classList.add("active");
      return;
    }

    /* SplitText on the headline */
    const split = SplitText.create(headline, {
      type: "words",
      wordsClass: "approach-word"
    });

    gsap.set(split.words, { opacity: 0, y: 30, rotateX: -15 });
    gsap.set(description, { opacity: 0, y: 20 });
    gsap.set(label, { opacity: 0, x: -20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true
      }
    });

    tl.to(label, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => labelLine.classList.add("active")
    })
      .to(
        split.words,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.55,
          stagger: 0.04,
          ease: "power3.out"
        },
        "-=0.25"
      )
      .to(
        description,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        },
        "-=0.2"
      );

    return () => {
      split.revert();
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  /* ─── Card staggered entrance with 3D perspective ─── */
  useScrollAnimation(sectionRef, {
    setFinalState: (element) => {
      const cards = element.querySelectorAll<HTMLElement>(
        "[data-approach-card]"
      );
      gsap.set(cards, { opacity: 1, y: 0, rotateX: 0, scale: 1 });
    },
    createAnimation: (element) => {
      const cards = element.querySelectorAll<HTMLElement>(
        "[data-approach-card]"
      );

      gsap.set(cards, { opacity: 0, y: 50, rotateX: -8, scale: 0.97 });

      return gsap.to(cards, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element.querySelector("[data-approach-cards-grid]"),
          start: "top 85%",
          once: true
        }
      });
    }
  });

  return (
    <section
      id={PAGE_IDS.approach}
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Three.js particle background */}
      <ApproachParticleField sectionRef={sectionRef} />

      {/* Mobile fallback ambient glow */}
      <div className="approach-ambient-glow md:hidden" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-container px-5 pt-20 pb-8 md:px-10 md:pt-28 md:pb-12">
        {/* Header */}
        <div className="max-w-4xl">
          <div ref={labelRef} className="flex items-center">
            <SectionLabel>{APPROACH_COPY.label}</SectionLabel>
            <span ref={labelLineRef} className="approach-label-line" />
          </div>

          <h2
            ref={headlineRef}
            className="mt-6 text-headline-lg"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span>{APPROACH_COPY.headlineLeading} </span>
            <span className="text-primary">{APPROACH_COPY.headlineAccent} </span>
            <span>{APPROACH_COPY.headlineTrailing}</span>
          </h2>

          <p
            ref={descriptionRef}
            className="mt-6 max-w-3xl text-body-lg text-on-surface-variant"
          >
            {APPROACH_COPY.description}
          </p>
        </div>

        {/* Cards grid */}
        <div
          data-approach-cards-grid
          className="mt-14 grid gap-6 lg:grid-cols-3"
          style={{ perspective: "800px" }}
        >
          {APPROACH_CARDS.map((card) => {
            const Icon = iconRegistry[card.icon];

            return (
              <div
                key={card.title}
                data-approach-card
                className="approach-card-border"
                style={{ transformStyle: "preserve-3d" }}
              >
                <article className="approach-card">
                  <div className="approach-icon-ring">
                    <Icon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-8 font-hanken text-[1.375rem] font-medium leading-tight text-on-surface">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-body-md leading-relaxed text-on-surface-variant/80">
                    {card.description}
                  </p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
