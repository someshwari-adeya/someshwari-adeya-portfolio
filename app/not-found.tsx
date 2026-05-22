"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";
import { NOT_FOUND_COPY } from "@/lib/constants";

export default function NotFound(): React.JSX.Element {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const content = contentRef.current;
    if (!backdrop || !content) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      gsap.set(backdrop, { opacity: 0.2, skewX: 0 });
      gsap.set(content.children, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(content.children, { opacity: 0, y: 18 });

    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
    timeline
      .to(backdrop, { skewX: 10, duration: 0.05 })
      .to(backdrop, { skewX: -8, duration: 0.05 })
      .to(backdrop, { skewX: 0, duration: 0.05 })
      .to(backdrop, { opacity: 0.2, duration: 0.1 })
      .to(
        content.children,
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        "-=0.05"
      );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5">
      <div
        ref={backdropRef}
        className="pointer-events-none absolute select-none font-hanken text-[100px] font-bold leading-none text-[var(--color-primary)] opacity-20 md:text-[180px]"
      >
        404
      </div>
      <div ref={contentRef} className="relative z-10 max-w-lg text-center">
        <SectionLabel className="text-center">{NOT_FOUND_COPY.label}</SectionLabel>
        <h1 className="mt-6 text-headline-lg text-on-surface">
          {NOT_FOUND_COPY.headline}
        </h1>
        <p className="mt-4 text-body-md text-on-surface-variant">
          {NOT_FOUND_COPY.body}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild variant="primary">
            <Link href="/">{NOT_FOUND_COPY.goHome}</Link>
          </Button>
          <Link
            href="#projects"
            className="text-label-caps text-on-surface-variant hover:text-primary"
          >
            {NOT_FOUND_COPY.viewWork}
          </Link>
        </div>
      </div>
    </main>
  );
}
