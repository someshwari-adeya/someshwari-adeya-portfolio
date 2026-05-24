"use client";

import type * as React from "react";
import { useCallback } from "react";
import { Code2, SearchCheck, Palette, MonitorSmartphone, Cpu, Settings, Database, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ServiceType {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface ServiceCardProps {
  service: ServiceType;
  className?: string;
}

/* Lucide Icon registry specific to services */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  SearchCheck,
  Palette,
  MonitorSmartphone,
  Cpu,
  Settings,
  Database,
  ShieldCheck
};

export function ServiceCard({ service, className }: ServiceCardProps): React.JSX.Element {
  const IconComponent = ICON_MAP[service.icon] || Code2;

  /* Coordinate mouse spotlight update */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return (
    <article
      data-service-card
      onMouseMove={handleMouseMove}
      className={cn(
        "service-card-premium group text-left cursor-default flex flex-col gap-5",
        className
      )}
    >
      {/* Icon Frame */}
      <div className="service-icon-wrapper">
        <IconComponent className="w-6 h-6 stroke-[1.75]" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5">
        <h3 className="font-hanken text-[21px] font-semibold text-white tracking-tight leading-snug group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>

        <p className="font-inter text-[14px] text-on-surface-variant/90 leading-relaxed">
          {service.description}
        </p>
      </div>
    </article>
  );
}
