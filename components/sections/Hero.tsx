"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { gsap, SplitText } from "@/lib/gsap";
import { HERO_COPY, PAGE_IDS, SECTION_PLACEHOLDERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Hero(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const description = descriptionRef.current;
    const actions = actionsRef.current;
    const badge = badgeRef.current;
    const headline = headlineRef.current;

    if (!description || !actions || !badge || !headline) {
      return;
    }

    if (mediaQuery.matches) {
      gsap.set([description, actions, badge], { opacity: 1, y: 0 });
      return;
    }

    const splitText = SplitText.create(headline, {
      type: "words",
      wordsClass: "hero-word"
    });

    gsap.set(splitText.words, { opacity: 0, y: 40 });
    gsap.set([description, actions, badge], { opacity: 0, y: 24 });

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .to(splitText.words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05
      })
      .to(
        description,
        {
          opacity: 1,
          y: 0,
          duration: 0.5
        },
        "-=0.2"
      )
      .to(
        actions,
        {
          opacity: 1,
          y: 0,
          duration: 0.45
        },
        "-=0.18"
      )
      .to(
        badge,
        {
          opacity: 1,
          y: 0,
          duration: 0.45
        },
        "-=0.12"
      );

    return () => {
      splitText.revert();
      timeline.kill();
    };
  }, []);

  return (
    <section
      id={PAGE_IDS.hero}
      ref={sectionRef}
      className="relative overflow-x-clip px-5 pb-5 pt-32 md:px-10 md:pb-8 md:pt-36"
    >
      <div id={PAGE_IDS.top} className="absolute top-0" />
      <div className="mx-auto grid max-w-container items-center gap-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="max-w-[44rem]">
          <div className="mb-8 flex items-center gap-3 text-label-caps text-on-surface-variant">
            <span className="text-[#57c785]">•</span>
            <span>{HERO_COPY.eyebrow}</span>
            <span className="text-outline">·</span>
            <span>{HERO_COPY.eyebrowAccent}</span>
          </div>

          <h1 ref={headlineRef} className="text-display-lg leading-[1.1] md:leading-[1.1]">
            I build <span className="text-primary">web Applications</span> that go <span className="text-primary">live</span> fast and <span className="text-primary">scale</span> clean.
          </h1>

          <p
            ref={descriptionRef}
            className="mt-8 max-w-2xl text-body-lg text-on-surface-variant"
          >
            {HERO_COPY.description}
          </p>

          <div
            ref={actionsRef}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button asChild variant="primary" className="w-full sm:w-auto">
              <Link href={`#${SECTION_PLACEHOLDERS.projects}`}>
                {HERO_COPY.primaryCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href={`#${SECTION_PLACEHOLDERS.blog}`}>{HERO_COPY.secondaryCta}</Link>
            </Button>
          </div>

          <div
            ref={badgeRef}
            className="mt-8 inline-flex items-center gap-3 text-label-caps text-on-surface-variant"
          >
            <span className="h-2 w-2 rounded-full bg-[#57c785]" />
            <span>{HERO_COPY.availability}</span>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-full max-w-[34rem]">
            <Image
              src="/images/hero-illustration.png"
              alt={HERO_COPY.illustrationAlt}
              width={1100}
              height={1200}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
