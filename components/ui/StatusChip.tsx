import type * as React from "react";

import { cn } from "@/lib/utils";

interface StatusChipProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "error" | "success";
  className?: string;
}

const variantClasses: Record<
  NonNullable<StatusChipProps["variant"]>,
  string
> = {
  default:
    "bg-surface-container-high border-outline-variant text-on-surface-variant",
  primary:
    "bg-[rgba(243,115,53,0.12)] border-[rgba(243,115,53,0.3)] text-primary",
  error:
    "bg-[rgba(255,180,171,0.1)] border-[rgba(255,180,171,0.3)] text-[#ffb4ab]",
  success:
    "bg-[rgba(100,200,100,0.1)] border-[rgba(100,200,100,0.3)] text-green-400"
};

export function StatusChip({
  children,
  variant = "default",
  className
}: StatusChipProps): React.JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px]",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
