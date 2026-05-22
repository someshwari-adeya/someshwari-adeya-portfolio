"use client";

import type * as React from "react";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SERVICES } from "@/lib/constants";
import { ServiceCard } from "./ServiceCard";
import { gsap } from "@/lib/gsap";

export function Services(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollAnimation(sectionRef, {
    setFinalState: (element) => {
      const cards = element.querySelectorAll<HTMLElement>("[data-service-card]");
      gsap.set(cards, { opacity: 1, y: 0 });
    },
    createAnimation: (element) => {
      const cards = element.querySelectorAll<HTMLElement>("[data-service-card]");
      gsap.set(cards, { opacity: 0, y: 30 });

      return gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          once: true
        }
      });
    }
  });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="px-5 py-20 md:px-10 md:py-28 bg-[#131313]"
    >
      <div className="mx-auto max-w-container">
        <div className="max-w-4xl mb-12">
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-6 font-hanken text-[32px] font-semibold leading-[1.2] text-white md:text-[48px]">
            <span>Services I </span>
            <span className="text-[#f37335]">Provide.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
