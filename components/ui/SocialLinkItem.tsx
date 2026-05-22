"use client";

import type * as React from "react";
import { MessageCircle, Instagram, Linkedin, Youtube, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SocialLink {
  id: string;
  label: string;
  sublabel: string;
  href: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface SocialLinkItemProps {
  link: SocialLink;
  className?: string;
}

const iconRegistry: Record<string, LucideIcon> = {
  MessageCircle,
  Instagram,
  Linkedin,
  Youtube
};

export function SocialLinkItem({ link, className }: SocialLinkItemProps): React.JSX.Element {
  const IconComponent = iconRegistry[link.icon] || MessageCircle;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-3 p-3 rounded-[4px] border border-outline-variant bg-surface-container hover:border-primary/30 transition-colors duration-200 w-full group",
        className
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-[4px] border",
          link.bgColor,
          link.borderColor
        )}
      >
        <IconComponent className={cn("h-[18px] w-[18px]", link.color)} aria-hidden="true" />
      </div>

      {/* Text Group */}
      <div className="flex flex-col ml-1">
        <span className="font-inter text-[14px] font-medium text-white group-hover:text-primary transition-colors duration-200">
          {link.label}
        </span>
        <span className="font-inter text-[12px] text-on-surface-variant leading-none mt-1">
          {link.sublabel}
        </span>
      </div>
    </a>
  );
}
