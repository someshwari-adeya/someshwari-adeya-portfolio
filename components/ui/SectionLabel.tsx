import type * as React from "react";

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({
  children,
  className
}: SectionLabelProps): React.JSX.Element {
  return (
    <p className={cn("text-label-caps text-primary uppercase", className)}>
      {children}
    </p>
  );
}

