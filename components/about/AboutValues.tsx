"use client";

import type * as React from "react";
import { Target, Shield, BookOpen, Users, type LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ABOUT_PAGE } from "@/lib/constants";

interface ValueType {
  icon: string;
  title: string;
  body: string;
}

const iconRegistry: Record<string, LucideIcon> = {
  Target,
  Shield,
  BookOpen,
  Users
};

export function AboutValues(): React.JSX.Element {
  const { values } = ABOUT_PAGE;

  return (
    <section className="px-5 py-16 md:px-10 md:py-24 bg-[#131313]">
      <div className="mx-auto max-w-container">
        
        {/* Header */}
        <div className="max-w-4xl mb-10">
          <SectionLabel>How I Work</SectionLabel>
          <h2 className="mt-6 font-hanken text-[32px] font-semibold leading-[1.2] text-white md:text-[48px]">
            <span>Principles that </span>
            <span className="text-[#f37335]">ship.</span>
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {values.map((item, index) => {
            const IconComponent = iconRegistry[item.icon] || Target;
            return (
              <div
                key={index}
                className="border border-outline-variant bg-surface-container rounded-lg p-6 flex flex-col"
              >
                <div className="text-primary mb-4">
                  <IconComponent className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-hanken text-[18px] font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
