import { Fragment } from "react";
import { cn } from "@/lib/utils";

export interface CaseStudyDiagramProps {
  lines: string[];
  arrows: string[];
}

function ArrowLine({ value }: { value: string }): React.JSX.Element {
  const parts = value.split("→");

  return (
    <div className="flex items-center bg-[#181818]/60 border border-white/5 rounded-xl px-4 py-3 transition-colors duration-300 hover:border-primary/20 hover:bg-black/30">
      <p className="font-mono text-[11px] text-white/80 w-full flex items-center justify-between gap-1">
        {parts.map((part, index) => (
          <Fragment key={`${part}-${index}`}>
            {index > 0 ? (
              <span className="text-primary font-bold animate-pulse text-[12px]">→</span>
            ) : null}
            <span className="truncate font-semibold uppercase tracking-wider text-white/95">{part.trim()}</span>
          </Fragment>
        ))}
      </p>
    </div>
  );
}

export function CaseStudyDiagram({
  lines,
  arrows
}: CaseStudyDiagramProps): React.JSX.Element {
  return (
    <div className="w-full space-y-4">
      {/* Telemetry Header */}
      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">SYSTEM DIAGRAM</span>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#57c785] animate-pulse shadow-[0_0_8px_rgba(87,199,133,0.6)]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#57c785] font-semibold">ACTIVE SYNC</span>
        </div>
      </div>

      {/* Main Flow Logs */}
      <div className="w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4.5 space-y-3">
        {lines.map((line, index) => (
          <div key={line} className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-primary/80 font-bold">{`0${index + 1}`}</span>
            <div className="h-1 w-1 rounded-full bg-white/20" />
            <p className="font-mono text-[11px] font-semibold text-white/90 uppercase tracking-wider">{line}</p>
          </div>
        ))}
      </div>

      {/* Data Pipelines */}
      <div className="space-y-2.5">
        {arrows.map((arrow) => (
          <ArrowLine key={arrow} value={arrow} />
        ))}
      </div>
    </div>
  );
}
