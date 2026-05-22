"use client";

import type * as React from "react";

interface ProjectMetricCardProps {
  value: string;
  label: string;
}

export function ProjectMetricCard({ value, label }: ProjectMetricCardProps): React.JSX.Element {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 group hover:border-primary/20 transition-colors duration-300">
      {/* Ambient glow */}
      <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary/8 blur-2xl pointer-events-none" />
      <p className="font-hanken text-[46px] sm:text-[52px] font-extrabold text-primary leading-none tracking-tight">
        {value}
      </p>
      <p className="font-inter text-xs sm:text-sm text-on-surface-variant mt-3 leading-snug uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}
