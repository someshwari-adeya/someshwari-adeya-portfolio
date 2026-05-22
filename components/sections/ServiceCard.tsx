"use client";

import type * as React from "react";
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

export function ServiceCard({ service, className }: ServiceCardProps): React.JSX.Element {
  return (
    <article
      data-service-card
      className={cn(
        "rounded-2xl border border-outline-variant bg-[#1c1b1b] p-8 transition-all duration-300 hover:border-primary/30 hover:bg-surface-container flex flex-col gap-4 text-left",
        className
      )}
    >
      {/* Icon/Emoji */}
      <div className="text-[36px] select-none leading-none mb-1" aria-hidden="true">
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="font-hanken text-[22px] font-semibold text-white tracking-tight leading-tight">
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">
        {service.description}
      </p>
    </article>
  );
}

