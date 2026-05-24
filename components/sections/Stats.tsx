"use client";

import { useRef, useCallback } from "react";

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

  /* Spotlight mouse-tracking effect for glass cards */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  useScrollAnimation(sectionRef, {
    setFinalState: (element) => {
      const cells = Array.from(element.querySelectorAll<HTMLElement>("[data-stat-item]"));
      cells.forEach((cell) => {
        const target = cell.dataset.targetValue ?? "0";
        const valueNode = cell.querySelector<HTMLElement>("[data-stat-value]");

        if (valueNode) {
          valueNode.textContent = target;
        }
        gsap.set(cell, { opacity: 1, y: 0, scale: 1 });
      });
    },
    createAnimation: (element) => {
      const cells = Array.from(element.querySelectorAll<HTMLElement>("[data-stat-item]"));

      /* Setup GSAP cinematic scale/rise up timeline */
      return gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true
        }
      }).fromTo(
        cells,
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
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
                duration: 1.6,
                delay: index * 0.1,
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
    <section id={PAGE_IDS.stats} ref={sectionRef} className="relative z-10 px-5 md:px-10">
      <div className="mx-auto max-w-container py-8 md:py-10">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => (
            <article
              key={stat.label}
              data-stat-item
              data-target-value={stat.value}
              onMouseMove={handleMouseMove}
              className="stats-card group text-left cursor-default"
            >
              {/* Dynamic shining light border */}
              <div
                data-stat-value
                className="stats-value-gradient font-hanken text-[2.2rem] font-bold leading-none tracking-[-0.04em] md:text-[3.2rem]"
              >
                0
              </div>
              <div className="stats-divider" />
              <div className="font-mono text-[10px] md:text-[11px] font-bold tracking-wider text-on-surface-variant/80 uppercase leading-relaxed group-hover:text-primary transition-colors duration-300">
                {stat.label}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
