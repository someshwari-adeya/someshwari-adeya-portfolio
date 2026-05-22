"use client";

import { useRef } from "react";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { PAGE_IDS, STATS } from "@/lib/constants";
import { gsap } from "@/lib/gsap";

type ParsedStat = {
  numericValue: number;
  suffix: string;
};

function parseStatValue(value: string): ParsedStat {
  const match = value.match(/^(\d+)(.*)$/);

  if (!match) {
    return { numericValue: 0, suffix: value };
  }

  return {
    numericValue: Number(match[1]),
    suffix: match[2]
  };
}

export function Stats(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollAnimation(sectionRef, {
    setFinalState: (element) => {
      const cells = Array.from(element.querySelectorAll<HTMLElement>("[data-stat-item]"));
      cells.forEach((cell) => {
        const target = cell.dataset.targetValue ?? "0";
        const valueNode = cell.querySelector<HTMLElement>("[data-stat-value]");

        if (valueNode) {
          valueNode.textContent = target;
        }
      });
    },
    createAnimation: (element) => {
      const cells = Array.from(element.querySelectorAll<HTMLElement>("[data-stat-item]"));

      return gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          once: true
        }
      }).fromTo(
        cells,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.15,
          onStart: () => {
            cells.forEach((cell, index) => {
              const target = cell.dataset.targetValue ?? "0";
              const { numericValue, suffix } = parseStatValue(target);
              const valueNode = cell.querySelector<HTMLElement>("[data-stat-value]");
              const counter = { value: 0 };

              if (!valueNode) {
                return;
              }

              gsap.to(counter, {
                value: numericValue,
                duration: 1.5,
                delay: index * 0.15,
                ease: "power2.out",
                onUpdate: () => {
                  valueNode.textContent = `${Math.ceil(counter.value)}${suffix}`;
                }
              });
            });
          }
        }
      );
    }
  });

  return (
    <section id={PAGE_IDS.stats} ref={sectionRef}>
      <div className="mx-auto max-w-container py-8 md:py-10">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => (
            <article
              key={stat.label}
              data-stat-item
              data-target-value={stat.value}
              className="rounded-lg border border-outline-variant bg-surface-container px-5 py-6 md:px-6"
            >
              <div
                data-stat-value
                className="font-hanken text-[2rem] font-bold leading-none tracking-[-0.04em] text-on-surface md:text-[3rem]"
              >
                0
              </div>
              <div className="mt-6 border-t border-outline-variant pt-4 text-label-caps text-on-surface-variant">
                {stat.label}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
