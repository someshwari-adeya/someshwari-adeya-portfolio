"use client";

import type * as React from "react";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SERVICES } from "@/lib/constants";
import { ServiceCard } from "./ServiceCard";
import { gsap, SplitText } from "@/lib/gsap";

/* ─── Lazy-load Three.js canvas (SSR-safe) ─── */
const ServicesParticleField = dynamic(
  () =>
    import("@/components/sections/ServicesParticleField").then(
      (mod) => mod.ServicesParticleField
    ),
  { ssr: false }
);

export function Services(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const labelLineRef = useRef<HTMLSpanElement | null>(null);

  /* Headline SplitText and Card entrance trigger timeline */
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

    /* Initialize GSAP scroll timeline for header reveal */
    const ctx = gsap.context(() => {
      const split = SplitText.create(headline, {
        type: "words",
        wordsClass: "services-word"
      });

      gsap.set(split.words, { opacity: 0, y: 25 });
      gsap.set(label, { opacity: 0, y: 15 });

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
          duration: 0.65,
          stagger: 0.04,
          ease: "power3.out"
        },
        "-=0.25"
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useScrollAnimation(sectionRef, {
    setFinalState: (element) => {
      const cards = element.querySelectorAll<HTMLElement>("[data-service-card]");
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
    },
    createAnimation: (element) => {
      const cards = element.querySelectorAll<HTMLElement>("[data-service-card]");

      /* Setup staggered card rise and pop entrance timeline */
      return gsap.timeline({
        scrollTrigger: {
          trigger: element.querySelector(".grid-cards-trigger") || element,
          start: "top 85%",
          once: true
        }
      }).fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out"
        }
      );
    }
  });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative px-5 py-24 md:px-10 md:py-32 bg-[#131313] overflow-hidden z-10"
    >
      {/* Dynamic 3D interactive wave particles in background */}
      <ServicesParticleField scrollTriggerElement={sectionRef.current} />

      <div className="relative mx-auto max-w-container z-10">
        <div className="max-w-4xl mb-16 md:mb-20 text-left">
          <div ref={labelRef} className="flex items-center gap-3">
            <span ref={labelLineRef} className="h-[1px] w-8 bg-primary/60 origin-left transition-transform duration-700 scale-x-0" />
            <SectionLabel>Services</SectionLabel>
          </div>
          <h2
            ref={headlineRef}
            className="mt-6 font-hanken text-[36px] font-bold leading-[1.15] text-white md:text-[54px] tracking-tight"
          >
            <span>Services I </span>
            <span className="text-[#f37335]">Provide.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cards-trigger">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
