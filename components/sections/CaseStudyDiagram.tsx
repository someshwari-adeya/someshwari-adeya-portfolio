import { Fragment } from "react";

import { cn } from "@/lib/utils";

export interface CaseStudyDiagramProps {
  lines: string[];
  arrows: string[];
}

function ArrowLine({ value }: { value: string }): React.JSX.Element {
  const parts = value.split("→");

  return (
    <p className="font-mono text-[12px] text-on-surface-variant">
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {index > 0 ? (
            <span className="text-[var(--color-primary)]">→</span>
          ) : null}
          <span>{part}</span>
        </Fragment>
      ))}
    </p>
  );
}

export function CaseStudyDiagram({
  lines,
  arrows
}: CaseStudyDiagramProps): React.JSX.Element {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[220px] rounded border border-outline-variant bg-surface-container-lowest p-4">
        {lines.map((line, index) => (
          <div key={line}>
            <p className="font-mono text-[11px] text-on-surface-variant">{line}</p>
            {index < lines.length - 1 ? (
              <div className={cn("my-3 h-px bg-outline-variant")} />
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {arrows.map((arrow) => (
          <ArrowLine key={arrow} value={arrow} />
        ))}
      </div>
    </div>
  );
}

