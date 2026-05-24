"use client";

import { useEffect, type RefObject } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

export interface ScrollAnimationConfig {
  fromX?: number;
  fromY?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

type ScrollAnimationOptions<T extends HTMLElement> = {
  createAnimation?: (
    element: T,
    config: Required<ScrollAnimationConfig>
  ) => gsap.core.Animation | null;
  setFinalState?: (element: T) => void;
} & ScrollAnimationConfig;

export function useScrollAnimation<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: ScrollAnimationOptions<T>
): void {
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const config: Required<ScrollAnimationConfig> = {
      fromX: options.fromX ?? 0,
      fromY: options.fromY ?? 30,
      duration: options.duration ?? 0.5,
      stagger: options.stagger ?? 0,
      start: options.start ?? "top 80%"
    };

    if (mediaQuery.matches) {
      options.setFinalState?.(element);
      return;
    }

    const animation =
      options.createAnimation?.(element, config) ??
      gsap.fromTo(
        element,
        { opacity: 0, x: config.fromX, y: config.fromY },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: config.duration,
          stagger: config.stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: config.start,
            once: true
          }
        }
      );

    return () => {
      animation?.scrollTrigger?.kill();
      animation?.kill();
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 0);
    };
  }, [options, ref]);
}
