"use client";

import type * as React from "react";
import Image from "next/image";
import {
  Bot,
  Box,
  Cloud,
  Code2,
  Database,
  Server,
  type LucideIcon
} from "lucide-react";
import { useMemo, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface TechCategoryProps {
  label: string;
  iconName: string;
  techs: Array<{ name: string; icon: string }>;
  fullWidth?: boolean;
}

const categoryIcons: Record<string, LucideIcon> = {
  Code2,
  Server,
  Database,
  Cloud,
  Bot
};

export function TechCategory({
  label,
  iconName,
  techs,
  fullWidth = false
}: TechCategoryProps): React.JSX.Element {
  const [erroredIcons, setErroredIcons] = useState<Record<string, boolean>>({});
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const CategoryIcon = useMemo(() => categoryIcons[iconName] ?? Box, [iconName]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const gridClassName = fullWidth
    ? "grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4"
    : "grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5";

  return (
    <article
      data-tech-card
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-2xl border border-white/10 bg-[#1c1b1b]/35 backdrop-blur-xl p-6 md:p-8 transition-all duration-500 hover:border-primary/45 hover:-translate-y-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.3)] overflow-hidden z-10 group",
        fullWidth ? "lg:col-span-2" : undefined
      )}
    >
      {/* Real-time Mouse Glow Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(243, 115, 53, 0.09), transparent 45%)`
        }}
      />

      <div className="relative flex items-center mb-6 z-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(243,115,53,0.15)] transition-transform duration-300 group-hover:scale-110">
          <CategoryIcon className="h-5.5 w-5.5 text-primary" aria-hidden="true" />
        </div>
        <div className="ml-4 h-px flex-1 bg-white/10" />
        <div className="ml-4 h-2 w-2 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(243,115,53,0.5)]" />
      </div>

      <p className="relative font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary/95 mb-6 z-10">
        {label}
      </p>

      <div className={cn("relative z-10", gridClassName)}>
        {techs.map((tech, idx) => {
          const hasError = erroredIcons[tech.icon] ?? false;

          // Out-of-sync unique floating rhythm
          const delay = `${(idx * 0.4) % 2.5}s`;
          const duration = `${4.0 + ((idx * 0.6) % 2.0)}s`;

          return (
            <div
              key={tech.name}
              style={{
                "--float-delay": delay,
                "--float-duration": duration
              } as React.CSSProperties}
              className="tech-item-floating flex flex-col items-center gap-2.5 bg-white/5 border border-white/5 hover:border-primary/25 rounded-xl p-3 transition-all duration-300 hover:scale-[1.05] hover:bg-white/[0.08]"
            >
              {hasError ? (
                <div className="flex h-9 w-9 items-center justify-center">
                  <Box className="h-9 w-9 text-primary/70" aria-hidden="true" />
                </div>
              ) : (
                <Image
                  src={`/icons/tech/${tech.icon}`}
                  alt={`${tech.name} logo`}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.06)]"
                  onError={() =>
                    setErroredIcons((current) => ({ ...current, [tech.icon]: true }))
                  }
                />
              )}
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-white/80 text-center">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </article>
  );
}
