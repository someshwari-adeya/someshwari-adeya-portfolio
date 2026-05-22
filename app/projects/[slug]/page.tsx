import type * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/metadata";
import { StatusChip } from "@/components/ui/StatusChip";
import { ProjectMetricCard } from "@/components/projects/ProjectMetricCard";
import { ProjectImageContainer } from "@/components/projects/ProjectImageContainer";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const project = PROJECTS.find((p) => p.slug === resolvedParams.slug);
  if (!project) return {};

  return generatePageMetadata({
    title: project.title,
    description: project.summary,
    ogImage: project.coverImage,
    ogType: "article",
    canonicalPath: `/projects/${project.slug}`
  });
}

interface ProcessListProps {
  steps: string[];
}

function ProcessList({ steps }: ProcessListProps): React.JSX.Element {
  return (
    <ol className="mt-8 space-y-6">
      {steps.map((step, idx) => (
        <li key={idx} className="flex gap-5 items-start group/step">
          {/* Step number */}
          <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/30 bg-primary/8 flex items-center justify-center">
            <span className="font-mono text-[11px] font-bold text-primary leading-none">
              {String(idx + 1).padStart(2, "0")}
            </span>
          </div>
          {/* Step text */}
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed pt-0.5 group-hover/step:text-white transition-colors duration-200">
            {step}
          </p>
        </li>
      ))}
    </ol>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-6 bg-primary/50" />
      <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase font-bold">
        {children}
      </span>
    </div>
  );
}

export default async function ProjectDetailPage({ params }: PageProps): Promise<React.JSX.Element> {
  const resolvedParams = await params;
  const project = PROJECTS.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const currentIdx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextIdx = (currentIdx + 1) % PROJECTS.length;
  const nextProject = PROJECTS[nextIdx];

  return (
    <>
      <Navbar />
      <main className="bg-[#131313] min-h-screen">

        {/* ─── Hero Band ──────────────────────────────────────── */}
        <section className="relative overflow-hidden px-5 pt-32 pb-16 md:px-10 md:pt-40 md:pb-20">
          {/* Background decorative glow */}
          <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/3 blur-[100px]" />

          <div className="mx-auto max-w-container relative z-10">

            {/* Back link */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-on-surface-variant hover:text-primary transition-colors mb-10 group"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              All projects
            </Link>

            {/* Two-column hero layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">

              {/* Left: Category + Title + Headline */}
              <div className="max-w-3xl">
                <StatusChip variant="primary" className="mb-5">
                  {project.category}
                </StatusChip>

                <h1 className="font-hanken text-[38px] md:text-[56px] lg:text-[68px] font-extrabold text-white leading-[1.05] tracking-[-0.04em]">
                  {project.title}
                </h1>

                <p className="mt-5 font-inter text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                  {project.headline}
                </p>

                {/* Meta chips row */}
                <div className="flex flex-wrap items-center gap-3 mt-7">
                  <span className="font-mono text-xs text-on-surface-variant bg-white/5 border border-white/8 rounded-full px-3 py-1">
                    {project.year}
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant bg-white/5 border border-white/8 rounded-full px-3 py-1">
                    {project.status}
                  </span>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant/70 bg-white/4 border border-white/6 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: CTA block */}
              {project.liveUrl && (
                <div className="flex-shrink-0 lg:mt-14">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#d85318] to-[#f37335] px-7 py-4 font-inter text-sm font-bold text-white transition-all duration-300 hover:from-[#f37335] hover:to-[#ffb597] hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-[#f37335]/20 hover:shadow-[0_0_30px_rgba(243,115,53,0.3)]"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* ─── Screenshot & Diagram ───────────────────────────── */}
        <section className="px-5 md:px-10 pb-6">
          <div className="mx-auto max-w-container">
            <ProjectImageContainer project={project} />
          </div>
        </section>

        {/* ─── Metrics Strip ──────────────────────────────────── */}
        <section className="px-5 md:px-10 py-16">
          <div className="mx-auto max-w-container">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((metric) => (
                <ProjectMetricCard
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Main Content + Sidebar ─────────────────────────── */}
        <section className="px-5 md:px-10 pb-24">
          <div className="mx-auto max-w-container">

            {/* Subtle divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent mb-16" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

              {/* ── Main Column ── */}
              <div className="lg:col-span-8 space-y-16">

                {/* The Problem */}
                <div>
                  <SectionLabel>The Problem</SectionLabel>
                  <p className="font-inter text-body-lg text-on-surface-variant leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Approach */}
                <div>
                  <SectionLabel>How I Approached It</SectionLabel>
                  <ProcessList steps={project.process} />
                </div>

                {/* Outcome */}
                <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-[#1a1a1a] to-[#111111] p-8">
                  <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
                  <SectionLabel>The Outcome</SectionLabel>
                  <p className="font-inter text-lg text-white leading-relaxed font-medium relative z-10">
                    {project.outcome}
                  </p>
                </div>

              </div>

              {/* ── Sidebar ── */}
              <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-5">

                {/* Tech Stack */}
                <div className="rounded-xl border border-white/5 bg-gradient-to-br from-[#191919] to-[#101010] p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 mb-5 block font-bold">
                    Tech Stack
                  </span>
                  <ul className="space-y-2.5">
                    {project.techStack.map((tech) => (
                      <li key={tech} className="flex items-center gap-3 font-inter text-sm text-on-surface-variant group/tech hover:text-white transition-colors duration-150">
                        <span className="h-1 w-1 rounded-full bg-primary flex-shrink-0 group-hover/tech:scale-150 transition-transform duration-150" aria-hidden="true" />
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inquiry CTA */}
                <div className="rounded-xl border border-white/5 bg-gradient-to-br from-[#191919] to-[#101010] p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 mb-3 block font-bold">
                    Want Similar Work?
                  </span>
                  <p className="font-inter text-sm text-on-surface-variant mb-5 leading-relaxed">
                    {"Let's talk about what you're building."}
                  </p>
                  <Button asChild variant="primary" className="w-full text-xs font-bold tracking-wide">
                    <Link href="/#contact">Send project inquiry →</Link>
                  </Button>
                </div>

              </aside>

            </div>

            {/* ─── Next Project Navigation ─────────────────────── */}
            <div className="mt-24 pt-12 border-t border-white/5">
              <Link href={`/projects/${nextProject.slug}`} className="group/next block">
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50 mb-4">
                  <span className="h-px w-6 bg-white/15" />
                  Next Project
                </span>
                <div className="flex items-start justify-between gap-8">
                  <h4 className="font-hanken text-[26px] md:text-[36px] font-bold text-white group-hover/next:text-primary transition-colors duration-200 leading-tight max-w-2xl">
                    {nextProject.title}
                  </h4>
                  <div className="flex-shrink-0 h-12 w-12 rounded-full border border-white/8 flex items-center justify-center group-hover/next:border-primary/40 group-hover/next:bg-primary/8 transition-all duration-300 mt-1">
                    <ArrowRight className="h-5 w-5 text-on-surface-variant group-hover/next:text-primary transition-colors duration-300" />
                  </div>
                </div>
                <p className="mt-2 font-inter text-sm text-on-surface-variant/60 line-clamp-1 max-w-xl">
                  {nextProject.summary}
                </p>
              </Link>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
