import type * as React from "react";
import { generatePageMetadata } from "@/lib/metadata";
import { PROJECTS } from "@/lib/constants";
import { ProjectsList } from "@/components/projects/ProjectFilter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = generatePageMetadata({
  title: "Projects",
  description: "Engineering case studies built around system judgment, not stack trivia.",
  canonicalPath: "/projects",
});

export default function ProjectsPage(): React.JSX.Element {
  return (
    <>
      <Navbar />
      <main className="bg-[#131313] min-h-screen px-5 py-24 md:px-10">
        <div className="mx-auto max-w-container pt-12 md:pt-16">
          
          {/* Header Section */}
          <div className="max-w-4xl mb-12">
            <SectionLabel>Selected Work</SectionLabel>
            <h1 className="mt-6 font-hanken text-[44px] lg:text-[72px] font-bold leading-[1.1] tracking-[-0.04em] text-white">
              <span>Case studies shaped around </span>
              <br className="hidden md:inline" />
              <span className="text-[#f37335]">engineering judgment.</span>
            </h1>
            <p className="mt-4 font-inter text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Real projects delivered to active businesses, focusing on automated billing reliability, spatial render discipline, and recoverable workflows.
            </p>
          </div>

          {/* Interactive Project List (Pills + Cards) */}
          <ProjectsList projects={PROJECTS} />

        </div>
      </main>
      <Footer />
    </>
  );
}
