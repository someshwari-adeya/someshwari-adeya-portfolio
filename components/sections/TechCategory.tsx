"use client";

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
import { useMemo, useState } from "react";

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

  const CategoryIcon = useMemo(() => categoryIcons[iconName] ?? Box, [iconName]);

  const gridClassName = fullWidth
    ? "grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4"
    : "grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5";

  return (
    <article
      data-tech-card
      className={cn(
        "rounded-lg border border-[var(--color-outline-variant)] bg-surface-container-low p-6 transition-colors duration-300 hover:border-[var(--color-primary)]",
        fullWidth ? "lg:col-span-2" : undefined
      )}
    >
      <div className="flex items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-[rgba(243,115,53,0.15)]">
          <CategoryIcon className="h-5 w-5 text-primary-container" aria-hidden="true" />
        </div>
        <div className="ml-4 h-px flex-1 bg-[var(--color-outline-variant)]" />
        <div className="ml-4 h-1.5 w-1.5 rounded-full bg-primary-container" />
      </div>

      <p className="mb-6 mt-4 text-label-caps text-on-surface">{label}</p>

      <div className={gridClassName}>
        {techs.map((tech) => {
          const hasError = erroredIcons[tech.icon] ?? false;

          return (
            <div key={tech.name} className="flex flex-col items-center gap-2">
              {hasError ? (
                <div className="flex h-10 w-10 items-center justify-center">
                  <Box className="h-10 w-10 text-primary" aria-hidden="true" />
                </div>
              ) : (
                <Image
                  src={`/icons/tech/${tech.icon}`}
                  alt={`${tech.name} logo`}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                  onError={() =>
                    setErroredIcons((current) => ({ ...current, [tech.icon]: true }))
                  }
                />
              )}
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </article>
  );
}
