import type * as React from "react";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { ABOUT_PAGE, SITE_META } from "@/lib/constants";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutExperience } from "@/components/about/AboutExperience";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutSkills } from "@/components/about/AboutSkills";
import { BeyondRoles } from "@/components/sections/BeyondRoles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export const metadata = generatePageMetadata({
  title: ABOUT_PAGE.meta.title,
  description: ABOUT_PAGE.meta.description,
  canonicalPath: "/about",
});

function AboutCTA(): React.JSX.Element {
  const { cta } = ABOUT_PAGE;
  return (
    <section className="py-24 px-5 text-center bg-[#131313] border-t border-outline-variant/30">
      <div className="mx-auto max-w-xl">
        <h2 className="font-hanken text-[32px] font-semibold text-white leading-tight">
          {cta.headline}
        </h2>
        <p className="mt-4 font-inter text-body-md text-on-surface-variant leading-relaxed">
          {cta.subText}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button asChild variant="primary" className="w-full sm:w-auto">
            <Link href={cta.primaryHref}>{cta.primaryLabel}</Link>
          </Button>
          <Button asChild variant="secondary" className="w-full sm:w-auto">
            <Link href={cta.secondaryHref}>{cta.secondaryLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage(): React.JSX.Element {
  const canonicalUrl = `${SITE_META.url}/about`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": SITE_META.name,
    "url": canonicalUrl,
    "jobTitle": "Full-Stack Product Engineer",
    "sameAs": [
      "https://instagram.com/someshwari",
      "https://linkedin.com/in/someshwari"
    ]
  };

  return (
    <>
      {/* JSON-LD Person schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="bg-[#131313]">
        <AboutHero />
        <AboutExperience />
        <AboutStory />
        <AboutValues />
        <BeyondRoles />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
