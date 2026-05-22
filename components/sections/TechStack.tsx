"use client";

import { useEffect, useRef } from "react";

import { TechCategory } from "@/components/sections/TechCategory";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { gsap, SplitText } from "@/lib/gsap";
import { PAGE_IDS, TECH_CATEGORIES, TECH_STACK_COPY } from "@/lib/constants";

export function TechStack(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  useScrollAnimation(sectionRef, {
    start: "top 75%",
    setFinalState: (element) => {
      const cards = element.querySelectorAll<HTMLElement>("[data-tech-card]");
      gsap.set(cards, { opacity: 1, y: 0 });
    },
    createAnimation: (element, config) => {
      const cards = element.querySelectorAll<HTMLElement>("[data-tech-card]");

      gsap.set(cards, { opacity: 0, y: 20 });

      return gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: config.duration,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: config.start,
          once: true
        }
      });
    }
  });

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
      wordsClass: "tech-stack-word"
    });

    gsap.set(splitText.words, { opacity: 0, y: 24 });

    const animation = gsap.to(splitText.words, {
      opacity: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.08,
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
    <section
      id={PAGE_IDS.techStack}
      ref={sectionRef}
      className="px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-label-caps text-primary">{TECH_STACK_COPY.label}</p>
        <h2 ref={headlineRef} className="mt-6 text-center text-display-lg">
          <span>{TECH_STACK_COPY.headlineLeading}</span>
          <span className="text-primary">{TECH_STACK_COPY.headlineAccent}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-center text-body-md text-on-surface-variant">
          {TECH_STACK_COPY.description}
        </p>

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
