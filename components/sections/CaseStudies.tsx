"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES, CASE_STUDIES_COPY } from "@/lib/constants";
import { gsap, SplitText } from "@/lib/gsap";

export function CaseStudies(): React.JSX.Element {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      gsap.set(headline, { opacity: 1, y: 0 });
      return;
    }

    const splitText = SplitText.create(headline, {
      type: "words",
      wordsClass: "case-studies-word"
    });

    gsap.set(splitText.words, { opacity: 0, y: 40 });

    const animation = gsap.to(splitText.words, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.04,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headline,
        start: "top 80%",
        once: true
      }
    });

    return () => {
      splitText.revert();
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionLabel className="text-center">{CASE_STUDIES_COPY.label}</SectionLabel>
        <h2
          ref={headlineRef}
          className="mx-auto mt-6 max-w-4xl text-center text-headline-lg text-on-surface"
        >
          {CASE_STUDIES_COPY.headline}
        </h2>

        <div className="mt-12 space-y-8">
          {CASE_STUDIES.slice(0, 3).map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="primary" className="px-8 py-4 text-xs font-mono uppercase tracking-wider">
            <Link href="/projects">
              Show More Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

