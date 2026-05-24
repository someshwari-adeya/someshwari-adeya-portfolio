"use client";

import type * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { BEYOND_ROLES } from "@/lib/constants";

export function BeyondRolesAgencyCard(): React.JSX.Element {
  const { agency } = BEYOND_ROLES;
  const [imgError, setImgError] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <article
      data-beyond-roles-card
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl border border-white/5 md:border-outline-variant/30 bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#101010] p-6 xs:p-8 md:p-12 shadow-2xl hover:border-primary/30 transition-all duration-300 group"
    >
      {/* Dynamic spotlight glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(243, 115, 53, 0.08), transparent 45%)`
        }}
      />

      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none group-hover:bg-primary/15 transition-all duration-500" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Side: Dynamic Badge, Typography-optimized Headline, Bulleted Depth, and CTA */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-center h-full text-left">
          <div>
            <span className="inline-flex text-[10px] md:text-[11px] font-mono font-bold tracking-[0.15em] text-[#ffb597] px-3.5 py-1.5 bg-primary/10 border border-primary/20 rounded-full w-fit uppercase select-none">
              {agency.chip}
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="font-hanken text-[22px] xs:text-[26px] sm:text-[32px] md:text-[36px] lg:text-[44px] font-extrabold text-white leading-[1.15] tracking-tight break-words">
              Founder, <span className="text-primary">{agency.title.replace("Founder, ", "")}</span>
            </h3>
            <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">
              {agency.body}
            </p>
          </div>

          {/* Core capabilities bullet list */}
          <ul className="space-y-3 font-inter text-sm text-on-surface-variant/90 border-t border-white/5 pt-6">
            <li className="flex items-start gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f37335] mt-2 flex-shrink-0" />
              <span>Full-scale software development: from discovery to production-ready deployments.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f37335] mt-2 flex-shrink-0" />
              <span>Highly performant React/Next.js systems, custom interactive dashboards, and SaaS invoicing.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f37335] mt-2 flex-shrink-0" />
              <span>Robust cloud architectures, geofenced registries, and robust double-entry bookkeeping engines.</span>
            </li>
          </ul>

          {/* CTA Link */}
          <div className="pt-2">
            <a
              href={agency.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#d85318] to-[#f37335] px-6 py-3.5 font-inter text-sm font-bold text-white transition-all duration-300 hover:from-[#f37335] hover:to-[#ffb597] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-[0_0_25px_rgba(243,115,53,0.3)]"
            >
              <span>{agency.ctaLabel}</span>
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right Side: Visual Avatar and Premium borderless stats */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6 lg:space-y-8">
          {/* Glowing Float Mascot Container */}
          <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center select-none">
            {/* Ambient background glow - borderless */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-full blur-xl animate-pulse opacity-70" />
            
            {/* Extremely subtle glass circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ffb597]/5 via-transparent to-white/5 backdrop-blur-[2px] transition-transform duration-500 group-hover:scale-105" />
            
            {!imgError ? (
              <Image
                src={agency.logo}
                alt={agency.logoAlt}
                width={120}
                height={120}
                className="relative z-10 object-contain filter drop-shadow-[0_6px_16px_rgba(216,83,24,0.15)] transition-all duration-500 group-hover:scale-110"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#2a2a2a] font-mono text-3xl font-bold text-white">
                T
              </div>
            )}
          </div>

          {/* Borderless Stats Grid */}
          <div className="w-full border-t border-white/5 pt-6">
            <div className="grid grid-cols-3 gap-2 text-center">
              {agency.stats.map((stat, index) => (
                <div key={index} className="px-1 flex flex-col justify-between group/stat">
                  <span className="font-hanken text-[22px] md:text-[28px] font-extrabold bg-gradient-to-b from-white via-[#ffb597] to-[#f37335] bg-clip-text text-transparent leading-none transition-transform duration-300 group-hover/stat:scale-105">
                    {stat.value}
                  </span>
                  <span className="font-inter text-[9px] md:text-[10px] text-on-surface-variant/80 mt-2 font-medium tracking-wider uppercase leading-tight select-none">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
