"use client";

import type * as React from "react";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ABOUT_PAGE } from "@/lib/constants";
import { gsap } from "@/lib/gsap";

export function AboutStory(): React.JSX.Element {
  const { story } = ABOUT_PAGE;
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollAnimation(sectionRef, {
    setFinalState: (element) => {
      const paragraphs = element.querySelectorAll<HTMLElement>("[data-story-paragraph]");
      gsap.set(paragraphs, { opacity: 1, y: 0 });
    },
    createAnimation: (element) => {
      const paragraphs = element.querySelectorAll<HTMLElement>("[data-story-paragraph]");
      gsap.set(paragraphs, { opacity: 0, y: 20 });

      return gsap.to(paragraphs, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
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
      ref={sectionRef}
      className="px-5 py-16 md:px-10 md:py-24 bg-[#131313]"
    >
      <div className="mx-auto max-w-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column (Sticky Headline) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <SectionLabel>{story.label}</SectionLabel>
            <h2 className="mt-3 font-hanken text-[32px] font-medium leading-tight text-white md:text-[40px]">
              {story.headline}
            </h2>
          </div>

          {/* Right Column (Story Paragraphs) */}
          <div className="lg:col-span-8">
            {story.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                data-story-paragraph
                className="font-inter text-body-lg text-on-surface-variant mb-6 leading-relaxed last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
