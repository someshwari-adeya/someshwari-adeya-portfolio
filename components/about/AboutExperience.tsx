"use client";

import type * as React from "react";
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { gsap } from "@/lib/gsap";

interface TimelineItem {
  period: string;
  role: string;
  subTitle: string;
  location: string;
  description: string;
  bullets: string[];
  tags: string[];
}

const EXPERIENCE_TIMELINE: TimelineItem[] = [
  {
    period: "AUG 2023 - PRESENT",
    role: "Full-Stack Product Engineer",
    subTitle: "Freelance & Personal Product Delivery",
    location: "Berhampur, Odisha, India · Remote",
    description: "Architecting high-performance web systems and hybrid applications focusing on robust local state, transactional accounting compliance, and production reliability.",
    bullets: [
      "Engineered 'SyncServe POS' — an offline-first Point of Sale application wrapped in Electron with Dexie.js (IndexedDB) and local SQLite, syncing transactions in the background to Postgres with zero data loss.",
      "Developed 'Hisaab Kitaab' — an MSME accounting and GST compliance SaaS automator featuring split CGST/SGST ledger calculations, aging receivables alerts, and client-side jsPDF/XLSX generation.",
      "Built the operational onboarding, automated enrollment, and recurring invoicing workflows for 'Kumar Singh Global Trading Academy', eliminating manual student tracking pipelines.",
      "Leveraged React 19, Next.js, TypeScript, better-auth, SQLite, Tailwind CSS, and Prisma to deliver highly optimized web interfaces and transactional workflows."
    ],
    tags: ["React 19", "Next.js", "TypeScript", "Electron", "SQLite", "PostgreSQL", "Dexie.js", "Prisma", "Tailwind CSS"]
  },
  {
    period: "2024 - PRESENT",
    role: "Founder & Chief Architect",
    subTitle: "TechSonance InfoTech LLP · Software Engineering Agency",
    location: "Berhampur, Odisha, India · Remote",
    description: "Founded TechSonance InfoTech LLP to partner with forward-thinking teams, translating complex internal operations and billing workflows into reliable digital systems.",
    bullets: [
      "Designed and delivered 'CMS TechSonance' — a comprehensive internal workspace featuring NFC geofenced GPS clock-ins, HR payroll engines, ticket support, and a highly granular 23-role RBAC security structure.",
      "Shipped 'FreightFlow' — a multi-tenant logistics and transport SaaS that digitizes lorry receipts (LR), automates driver advance toll tracking, and settles trip P&L statements instantly.",
      "Managed end-to-end delivery of 10+ operational web systems, standardizing continuous delivery pipelines, code styling audits, and high-performance CDN caching configurations.",
      "Built reliable client relationships by providing exhaustive handoff documentation and technical training to internal administrative staff."
    ],
    tags: ["Agency Ops", "RBAC Security", "Supabase", "Row-Level Security", "SaaS Architecture", "NFC Hardware APIs", "n8n Automation"]
  }
];

export function AboutExperience(): React.JSX.Element {
  const containerRef = useRef<HTMLElement | null>(null);

  useScrollAnimation(containerRef, {
    setFinalState: (element) => {
      const nodes = element.querySelectorAll<HTMLElement>("[data-timeline-node]");
      gsap.set(nodes, { opacity: 1, x: 0 });
    },
    createAnimation: (element) => {
      const nodes = element.querySelectorAll<HTMLElement>("[data-timeline-node]");
      gsap.set(nodes, { opacity: 0, x: -30 });

      return gsap.to(nodes, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
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
      ref={containerRef}
      className="px-5 py-20 md:px-10 md:py-28 bg-[#131313] relative overflow-hidden"
    >
      {/* Decorative background overlay */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-container">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16 text-center lg:text-left">
          <span className="font-mono text-xs tracking-[0.2em] text-[#ffb597] uppercase">
            THE EXPERIENCE
          </span>
          <h2 className="mt-3 font-hanken text-[40px] md:text-[54px] font-bold leading-tight text-white tracking-[-0.03em]">
            Crafting <span className="text-primary">Experiences</span>
          </h2>
        </div>

        {/* Timeline Grid Layout */}
        <div className="relative border-l border-outline-variant/40 ml-4 md:ml-6 pl-8 md:pl-12 space-y-16">
          {/* Vertical line indicator */}
          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#ffb597] via-primary/50 to-transparent" />

          {EXPERIENCE_TIMELINE.map((item, idx) => (
            <div
              key={idx}
              data-timeline-node
              className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_2.9fr] gap-8 items-start group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-[-37px] md:left-[-53px] top-2 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-[#131313] border-2 border-primary group-hover:border-[#ffb597] transition-colors duration-300">
                <div className="h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-[#ffb597] transition-colors duration-300" />
              </div>

              {/* Node Column 1: Time, Role, Location */}
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 font-mono text-[10px] font-bold tracking-wider rounded bg-primary/10 text-[#ffb597] border border-primary/20">
                  {item.period}
                </span>
                <h3 className="font-hanken text-[22px] font-bold text-white group-hover:text-primary transition-colors duration-300 leading-tight">
                  {item.role}
                </h3>
                <p className="font-mono text-[12px] text-[#ffb597]">
                  {item.subTitle}
                </p>
                <p className="font-inter text-[12px] text-on-surface-variant">
                  {item.location}
                </p>
              </div>

              {/* Node Column 2: Description & Bullets */}
              <div className="space-y-6">
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>

                {/* Styled Bullets */}
                <ul className="space-y-3 pl-1">
                  {item.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="font-inter text-body-md text-on-surface-variant/90 leading-relaxed flex items-start gap-3"
                    >
                      <span className="text-primary font-bold mt-0.5 select-none">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container-high border border-outline-variant rounded-full px-3.5 py-1 font-mono text-[11px] text-on-surface-variant hover:text-white hover:border-primary/40 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
