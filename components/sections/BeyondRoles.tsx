"use client";

import type * as React from "react";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BEYOND_ROLES } from "@/lib/constants";
import { BeyondRolesAgencyCard } from "./BeyondRolesAgencyCard";
import { gsap } from "@/lib/gsap";

export function BeyondRoles(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollAnimation(sectionRef, {
    setFinalState: (element) => {
      const cards = element.querySelectorAll<HTMLElement>("[data-beyond-roles-card]");
      gsap.set(cards, { opacity: 1, y: 0 });
    },
    createAnimation: (element) => {
      const cards = element.querySelectorAll<HTMLElement>("[data-beyond-roles-card]");
      gsap.set(cards, { opacity: 0, y: 30 });

      return gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all",
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
      id="beyond-roles"
      ref={sectionRef}
      className="px-5 py-20 md:px-10 md:py-28 bg-[#131313]"
    >
      <div className="mx-auto max-w-container">
        <div className="max-w-4xl mb-10">
          <SectionLabel>{BEYOND_ROLES.sectionLabel}</SectionLabel>
          <h2 className="mt-6 font-hanken text-[32px] font-semibold leading-[1.2] text-white md:text-[48px]">
            {BEYOND_ROLES.headline}
          </h2>
          <p className="mt-2 font-inter text-body-md text-on-surface-variant max-w-xl">
            {BEYOND_ROLES.subText}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <BeyondRolesAgencyCard />
        </div>
      </div>
    </section>
  );
}
