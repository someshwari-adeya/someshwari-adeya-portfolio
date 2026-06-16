"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { gsap, SplitText, ScrollTrigger } from "@/lib/gsap";
import { HERO_COPY, PAGE_IDS, SECTION_PLACEHOLDERS } from "@/lib/constants";

/* ─── Lazy-load Three.js constellation canvas ─── */
const HeroConstellationField = dynamic(
  () =>
    import("@/components/sections/HeroConstellationField").then(
      (mod) => mod.HeroConstellationField
    ),
  { ssr: false }
);

export function Hero(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const illustrationRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  /* ─── Cinematic entrance timeline ─── */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const description = descriptionRef.current;
    const actions = actionsRef.current;
    const badge = badgeRef.current;
    const headline = headlineRef.current;
    const eyebrow = eyebrowRef.current;
    const illustration = illustrationRef.current;

    if (!description || !actions || !badge || !headline || !eyebrow || !illustration) {
      return;
    }

    if (mediaQuery.matches) {
      gsap.set([eyebrow, description, actions, badge, illustration], {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      });
      return;
    }

    /* SplitText for cinematic word-by-word reveal */
    const splitText = SplitText.create(headline, {
      type: "words",
      wordsClass: "hero-word",
    });

    /* Set initial hidden states */
    gsap.set(eyebrow, { opacity: 0, y: -20, scale: 0.95 });
    gsap.set(splitText.words, { opacity: 0, y: 50, rotateX: -20 });
    gsap.set(description, { opacity: 0, y: 30 });
    gsap.set(actions, { opacity: 0, y: 30 });
    gsap.set(badge, { opacity: 0, y: 20, scale: 0.9 });
    gsap.set(illustration, { opacity: 0, x: 60, scale: 0.92 });

    /* Build cinematic timeline */
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.15,
    });

    tl
      /* Eyebrow badge slides in */
      .to(eyebrow, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
      })
      /* Headline words cascade in with 3D perspective */
      .to(
        splitText.words,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.2"
      )
      /* Illustration slides in from right */
      .to(
        illustration,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )
      /* Description fades up */
      .to(
        description,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.4"
      )
      /* CTAs rise in */
      .to(
        actions,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
        },
        "-=0.2"
      )
      /* Availability badge pops in */
      .to(
        badge,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.4)",
        },
        "-=0.15"
      );

    return () => {
      splitText.revert();
      tl.kill();
    };
  }, []);

  /* ─── Scroll parallax: content fades + shifts as you scroll away ─── */
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const illustration = illustrationRef.current;

    if (!section || !content || !illustration) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    parallaxTl
      .to(
        content,
        {
          y: -40,
          opacity: 0.3,
          ease: "none",
        },
        0
      )
      .to(
        illustration,
        {
          y: -60,
          opacity: 0.2,
          scale: 0.95,
          ease: "none",
        },
        0
      );

    return () => {
      parallaxTl.scrollTrigger?.kill();
      parallaxTl.kill();
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 0);
    };
  }, []);

  return (
    <section
      id={PAGE_IDS.hero}
      ref={sectionRef}
      className="relative overflow-hidden px-5 pb-8 pt-32 md:px-10 md:pb-12 md:pt-36"
      style={{ perspective: "1200px" }}
    >
      <div id={PAGE_IDS.top} className="absolute top-0" />

      {/* Three.js constellation background */}
      <HeroConstellationField />

      {/* Ambient gradient glow */}
      <div className="hero-ambient-glow" />

      {/* Content grid */}
      <div className="relative z-10 mx-auto grid max-w-container items-center gap-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        {/* Left: text content */}
        <div ref={contentRef} className="max-w-[44rem]">
          {/* Eyebrow badge */}
          <div
            ref={eyebrowRef}
            className="hero-eyebrow mb-8 inline-flex items-center gap-3 text-label-caps text-on-surface-variant"
          >
            <span className="hero-status-dot h-2 w-2 rounded-full bg-[#57c785]" />
            <span>{HERO_COPY.eyebrow}</span>
            <span className="text-outline/40">·</span>
            <span>{HERO_COPY.eyebrowAccent}</span>
          </div>

          {/* Headline with SplitText */}
          <h1
            ref={headlineRef}
            className="text-display-lg leading-[1.1] md:leading-[1.1]"
            style={{ transformStyle: "preserve-3d" }}
          >
            I build{" "}
            <span className="text-primary">web Applications</span> that go{" "}
            <span className="text-primary">live</span> fast and{" "}
            <span className="text-primary">scale</span> clean.
          </h1>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="mt-8 max-w-2xl text-body-lg text-on-surface-variant/85"
          >
            {HERO_COPY.description}
          </p>

          {/* CTAs */}
          <div
            ref={actionsRef}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              variant="primary"
              className="hero-cta-primary w-full sm:w-auto"
            >
              <Link href={`#${SECTION_PLACEHOLDERS.projects}`}>
                {HERO_COPY.primaryCta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href={`#${SECTION_PLACEHOLDERS.blog}`}>
                {HERO_COPY.secondaryCta}
              </Link>
            </Button>
          </div>

          {/* Availability badge */}
          <div
            ref={badgeRef}
            className="hero-availability-badge mt-8 inline-flex items-center gap-3 text-label-caps text-on-surface-variant"
          >
            <span className="hero-status-dot h-2 w-2 rounded-full bg-[#57c785]" />
            <span>{HERO_COPY.availability}</span>
          </div>
        </div>

        {/* Right: illustration */}
        <div
          ref={illustrationRef}
          className="relative flex justify-center md:justify-end"
        >
          <div className="hero-illustration-wrapper relative w-full max-w-[34rem]">
            <Image
              src="/portfolio-hero-v2.png"
              alt={HERO_COPY.illustrationAlt}
              width={1100}
              height={1200}
              priority
              fetchPriority="high"
              className="object-contain"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
