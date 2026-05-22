"use client";

import type * as React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ABOUT_PAGE } from "@/lib/constants";

export function AboutSkills(): React.JSX.Element {
  const { skills } = ABOUT_PAGE;

  // Split the headline "What I work with." dynamically to color "with."
  const hasWith = skills.headline.includes("with.");
  const headlinePrefix = hasWith ? skills.headline.replace("with.", "") : skills.headline;

  return (
    <section className="px-5 py-16 md:px-10 md:py-24 bg-[#131313]">
      <div className="mx-auto max-w-container">
        
        {/* Header */}
        <div className="max-w-4xl mb-10">
          <SectionLabel>{skills.label}</SectionLabel>
          <h2 className="mt-6 font-hanken text-[32px] font-semibold leading-[1.2] text-white md:text-[48px]">
            <span>{headlinePrefix}</span>
            {hasWith && <span className="text-[#f37335]">with.</span>}
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {skills.categories.map((category, index) => (
            <div
              key={index}
              className="bg-surface-container-low border border-outline-variant rounded-lg p-5"
            >
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-3">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="bg-surface-container-high border border-outline-variant rounded-full px-3 py-1 font-inter text-[13px] text-on-surface-variant"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
