"use client";

import { useEffect, type RefObject } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useTimelineAnimation(
  spineFillRef: RefObject<HTMLDivElement | null>,
  containerRef: RefObject<HTMLElement | HTMLDivElement | null>
): void {
  useEffect(() => {
    const spineFill = spineFillRef.current;
    const container = containerRef.current;

    if (!spineFill || !container) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      gsap.set(spineFill, { height: "100%" });
      return;
    }

    // Defensive: in dev/HMR edge cases the plugin registration can be lost.
    // If ScrollTrigger isn't available for any reason, fall back gracefully.
    if (typeof ScrollTrigger === "undefined") {
      gsap.set(spineFill, { height: "100%" });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(spineFill, { height: "0%" });

    const animation = gsap.to(spineFill, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 60%",
        end: "bottom 40%",
        scrub: true
      }
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 0);
    };
  }, [containerRef, spineFillRef]);
}
