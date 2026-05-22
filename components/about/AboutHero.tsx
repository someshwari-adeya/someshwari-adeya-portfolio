"use client";

import type * as React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ABOUT_PAGE } from "@/lib/constants";
import { gsap } from "@/lib/gsap";

export function AboutHero(): React.JSX.Element {
  const { hero } = ABOUT_PAGE;
  const [imgError, setImgError] = useState(false);

  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const socialsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const headline = headlineRef.current;
    const description = descriptionRef.current;
    const socials = socialsRef.current;

    if (!headline || !description || !socials) {
      return;
    }

    if (mediaQuery.matches) {
      gsap.set([headline, description, socials], { opacity: 1, y: 0 });
      return;
    }

    gsap.set(headline, { opacity: 0, y: 30 });
    gsap.set([description, socials], { opacity: 0, y: 24 });

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .to(headline, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        clearProps: "all"
      })
      .to(
        description,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          clearProps: "all"
        },
        "-=0.4"
      )
      .to(
        socials,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          clearProps: "all"
        },
        "-=0.2"
      );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section className="relative overflow-x-clip px-5 pb-12 pt-32 md:px-10 md:pb-16 md:pt-36 bg-[#131313]">
      <div className="mx-auto max-w-container">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Photo & Badges) */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-[3/4] max-w-sm rounded-xl border border-primary/20 bg-surface-container overflow-hidden p-3 group hover:border-primary transition-colors duration-300">
              <span className="absolute top-4 left-4 z-10 font-mono text-[9px] tracking-widest text-[#ffb597] bg-[#131313]/90 px-3 py-1 rounded border border-outline-variant/30 uppercase font-bold">
                MORE ABOUT ME
              </span>
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                {!imgError ? (
                  <Image
                    src={hero.photo}
                    alt={hero.photoAlt}
                    fill
                    priority
                    className="object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-surface-container to-surface-container-lowest flex items-center justify-center font-mono text-sm text-on-surface-variant">
                    [Photo: {hero.photoAlt}]
                  </div>
                )}
              </div>
            </div>
            
            {/* Badging Row: Life | Code | Write */}
            <div className="flex gap-2.5 justify-center mt-6">
              <span className="border border-outline-variant/80 px-5 py-1.5 rounded-full text-white font-mono text-xs hover:border-[#ffb597] hover:text-[#ffb597] transition-all cursor-default select-none bg-surface-container/20">
                Life
              </span>
              <span className="border border-outline-variant/80 px-5 py-1.5 rounded-full text-white font-mono text-xs hover:border-[#ffb597] hover:text-[#ffb597] transition-all cursor-default select-none bg-surface-container/20">
                Code
              </span>
              <span className="border border-outline-variant/80 px-5 py-1.5 rounded-full text-white font-mono text-xs hover:border-[#ffb597] hover:text-[#ffb597] transition-all cursor-default select-none bg-surface-container/20">
                Ship
              </span>
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="max-w-[44rem]">
            <SectionLabel>{hero.label}</SectionLabel>
            
            <h1
              ref={headlineRef}
              className="mt-6 font-hanken text-[44px] lg:text-[72px] font-bold leading-[1.1] tracking-[-0.04em] text-white"
            >
              <span>{hero.headline} </span>
              <span className="text-primary">{hero.headlineAccent}</span>
            </h1>

            {/* Narrative Paragraphs */}
            <div
              ref={descriptionRef}
              className="mt-6 font-inter text-body-lg text-on-surface-variant space-y-4 max-w-xl leading-relaxed"
            >
              <p>
                I&apos;m <strong className="text-primary">Someshwari Adeya</strong>, a full-stack product engineer specializing in robust, production-grade web systems. I focus on building the parts of products that usually get messy: custom double-entry accounting ledgers, geofenced GPS/NFC registers, offline-first Electron wrapper sync queues, and administrative RBAC permission systems.
              </p>
              <p>
                Rather than relying on generic stacks, my work is driven by strict operational requirements. I design and ship applications that scale reliably, handle automated billing under extreme edge cases, and keep real-world business operations running without manual database patchworks.
              </p>
              <p>
                Through my agency, <strong className="text-primary">TechSonance InfoTech LLP</strong>, I partner with forward-thinking teams to convert complex operational flows into sleek, high-performing digital systems.
              </p>
            </div>

            {/* Social Connect Row */}
            <div ref={socialsRef} className="flex flex-wrap items-center gap-6 mt-8">
              <div className="flex gap-4">
                <a
                  href="https://github.com/techsonance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-white transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/someshwari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-[#ffb597] transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/someshwari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-white transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/someshwari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-[#ffb597] transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>

              {/* consultation / contact loop */}
              <Link
                href="/#contact"
                className="font-mono text-xs text-[#ffb597] hover:underline"
              >
                Book a consultation →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
