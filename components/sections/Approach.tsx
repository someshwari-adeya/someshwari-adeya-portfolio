"use client";

import { Bot, Map, Workflow } from "lucide-react";
import { useRef } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  APPROACH_CARDS,
  APPROACH_COPY,
  PAGE_IDS,
  type IconRegistry
} from "@/lib/constants";
import { gsap } from "@/lib/gsap";

const iconRegistry: IconRegistry = {
  Workflow,
  Bot,
  Map
};

export function Approach(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollAnimation(sectionRef, {
    setFinalState: (element) => {
      const cards = element.querySelectorAll<HTMLElement>("[data-approach-card]");
      gsap.set(cards, { opacity: 1, y: 0 });
    },
    createAnimation: (element) => {
      const cards = element.querySelectorAll<HTMLElement>("[data-approach-card]");

      gsap.set(cards, { opacity: 0, y: 30 });

      return gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
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
    <section id={PAGE_IDS.approach} ref={sectionRef}>
      <div className="mx-auto max-w-container pt-16 md:pt-20">
        <div className="max-w-4xl">
          <SectionLabel>{APPROACH_COPY.label}</SectionLabel>
          <h2 className="mt-6 text-headline-lg">
            <span>{APPROACH_COPY.headlineLeading} </span>
            <span className="text-primary">{APPROACH_COPY.headlineAccent} </span>
            <span>{APPROACH_COPY.headlineTrailing}</span>
          </h2>
          <p className="mt-6 max-w-3xl text-body-lg text-on-surface-variant">
            {APPROACH_COPY.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {APPROACH_CARDS.map((card) => {
            const Icon = iconRegistry[card.icon];

            return (
              <article
                key={card.title}
                data-approach-card
                className="rounded-lg border border-outline-variant bg-surface-container px-6 py-7"
              >
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-10 font-hanken text-2xl font-medium text-on-surface">
                  {card.title}
                </h3>
                <p className="mt-4 text-body-md text-on-surface-variant">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
