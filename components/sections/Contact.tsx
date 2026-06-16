"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { 
  CheckCircle2, 
  Loader2, 
  Mail, 
  Copy, 
  Check 
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatusChip } from "@/components/ui/StatusChip";
import {
  CONTACT_CONFIG,
  CONTACT_FORM_COPY,
  CONTACT_SECTION_COPY
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ContactThreeCanvas } from "./ContactThreeCanvas";

interface FormState {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

interface SubmitState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

type FieldKey = keyof FormState;
type FieldErrors = Partial<Record<FieldKey, string>>;

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 font-sans text-sm text-white placeholder:text-white/30 transition-all duration-300 focus:border-[#f37335] focus:ring-1 focus:ring-[#f37335]/30 focus:bg-white/[0.05] focus:outline-none";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function Contact(): React.JSX.Element {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: ""
  });
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: ""
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [copied, setCopied] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  const hasSuccess = submitState.status === "success";
  const hasError = submitState.status === "error";
  const isLoading = submitState.status === "loading";

  const projectTypeOptions = useMemo(
    () => CONTACT_CONFIG.projectTypes,
    []
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left Column Text Animations
      gsap.fromTo(".animate-contact-left > *", 
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Glassmorphic Contact Card
      gsap.fromTo(".animate-contact-form", 
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_CONFIG.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};

    if (!formState.name.trim()) {
      errors.name = CONTACT_FORM_COPY.validationRequired;
    }

    if (!formState.email.trim()) {
      errors.email = CONTACT_FORM_COPY.validationRequired;
    } else if (!isValidEmail(formState.email.trim())) {
      errors.email = CONTACT_FORM_COPY.validationEmail;
    }

    if (!formState.message.trim()) {
      errors.message = CONTACT_FORM_COPY.validationRequired;
    }

    return errors;
  };

  const handleChange = (key: FieldKey, value: string): void => {
    setFormState((current) => ({ ...current, [key]: value }));
  };

  const resetToIdle = (): void => {
    setAttemptedSubmit(false);
    setFieldErrors({});
    setSubmitState({ status: "idle", message: "" });
    setFormState({
      name: "",
      email: "",
      company: "",
      projectType: "",
      message: ""
    });
  };

  const handleSubmit = async (): Promise<void> => {
    setAttemptedSubmit(true);

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmitState({ status: "error", message: CONTACT_FORM_COPY.errorChip });
      return;
    }

    setSubmitState({ status: "loading", message: "" });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        setSubmitState({ status: "error", message: CONTACT_FORM_COPY.errorChip });
        return;
      }

      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });

      if (!res.ok) {
        setSubmitState({ status: "error", message: CONTACT_FORM_COPY.errorChip });
        return;
      }

      setSubmitState({ status: "success", message: "" });
      setFieldErrors({});
      setAttemptedSubmit(false);
      setFormState({
        name: "",
        email: "",
        company: "",
        projectType: "",
        message: ""
      });
    } catch {
      setSubmitState({ status: "error", message: CONTACT_FORM_COPY.errorChip });
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32">
      {/* Background Volumetric Light Glows */}
      <div className="absolute left-1/4 top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#d85318]/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12 lg:items-start">
        {/* Left Side: Copy and Links */}
        <div className="animate-contact-left lg:col-span-5 flex flex-col justify-start">
          <SectionLabel>{CONTACT_SECTION_COPY.label}</SectionLabel>
          
          {/* Active Availability Chip */}
          <div className="mt-6 inline-flex self-start items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3.5 py-1.5 text-xs font-mono text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for Select Engagements
          </div>

          <h2 className="mt-6 font-hanken text-[40px] font-semibold leading-[1.1] tracking-tight text-white md:text-[56px]">
            Let's build <br />
            <span className="text-[#f37335]">something epic.</span>
          </h2>
          
          <p className="mt-6 text-[15px] leading-relaxed text-[#a68b80] max-w-md">
            {CONTACT_CONFIG.subText} Have a messy pipeline, a manual ledger that needs digitizing, or a billing system that requires production polishing? Let's fix it together.
          </p>

          {/* Quick Email Row */}
          <div className="mt-8 flex items-center gap-3 self-start rounded-xl border border-white/5 bg-white/[0.02] p-3 pr-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f37335]/10 text-[#f37335]">
              <Mail className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#a68b80]/60">Email Inquiries</span>
              <span className="text-sm font-medium text-white">{CONTACT_CONFIG.email}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="ml-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:text-white"
              title="Copy email to clipboard"
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Right Side: Ultra Premium Glassmorphic Form Card */}
        <div className="animate-contact-form lg:col-span-7 relative">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-10 shadow-2xl transition-all duration-300 hover:border-white/20">
            
            {/* Embedded Interactive Three.js Plexus Canvas */}
            <ContactThreeCanvas />

            <div className="relative z-10">
              <h3 className="font-hanken text-2xl font-semibold tracking-tight text-white">
                {CONTACT_CONFIG.formTitle}
              </h3>
              <p className="mt-2 text-sm text-[#a68b80]">
                {CONTACT_CONFIG.formSubtitle} Let's discuss your roadmap, timeline, and tech stack details.
              </p>

              {hasSuccess ? (
                <div className="mt-8 flex flex-col items-center justify-center py-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                    <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
                  </div>
                  <p className="mt-5 font-hanken text-2xl font-semibold text-white">
                    {CONTACT_FORM_COPY.successTitle}
                  </p>
                  <p className="mt-2 text-sm text-[#a68b80] max-w-sm">
                    {CONTACT_FORM_COPY.successBody}
                  </p>
                  <button
                    type="button"
                    className="mt-8 rounded-lg bg-white/5 px-6 py-2.5 text-xs font-mono tracking-wider uppercase text-[#f37335] hover:bg-white/10 transition-colors"
                    onClick={resetToIdle}
                  >
                    {CONTACT_FORM_COPY.sendAnother}
                  </button>
                </div>
              ) : (
                <div className="mt-8 space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-[#a68b80]/70">
                        {CONTACT_FORM_COPY.nameLabel}
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        placeholder={CONTACT_FORM_COPY.namePlaceholder}
                        className={cn(
                          inputClassName,
                          attemptedSubmit && fieldErrors.name && "border-red-500/50 focus:border-red-500"
                        )}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                      {attemptedSubmit && fieldErrors.name ? (
                        <p className="mt-1.5 text-xs text-red-400 font-mono">{fieldErrors.name}</p>
                      ) : null}
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-[#a68b80]/70">
                        {CONTACT_FORM_COPY.emailLabel}
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        placeholder={CONTACT_FORM_COPY.emailPlaceholder}
                        className={cn(
                          inputClassName,
                          attemptedSubmit && fieldErrors.email && "border-red-500/50 focus:border-red-500"
                        )}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                      {attemptedSubmit && fieldErrors.email ? (
                        <p className="mt-1.5 text-xs text-red-400 font-mono">{fieldErrors.email}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-[#a68b80]/70">
                        {CONTACT_FORM_COPY.companyLabel}
                      </label>
                      <input
                        type="text"
                        value={formState.company}
                        placeholder={CONTACT_FORM_COPY.companyPlaceholder}
                        className={inputClassName}
                        onChange={(e) => handleChange("company", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-[#a68b80]/70">
                        {CONTACT_FORM_COPY.projectTypeLabel}
                      </label>
                      <div className="relative">
                        <select
                          value={formState.projectType}
                          className={cn(inputClassName, "appearance-none cursor-pointer")}
                          onChange={(e) => handleChange("projectType", e.target.value)}
                        >
                          <option value="" disabled className="bg-zinc-950 text-white/50">
                            {CONTACT_FORM_COPY.projectTypePlaceholder}
                          </option>
                          {projectTypeOptions.map((option) => (
                            <option key={option} value={option} className="bg-zinc-950 text-white">
                              {option}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 border-b-2 border-r-2 border-white/30 transform rotate-45 transition-transform" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-[#a68b80]/70">
                      {CONTACT_FORM_COPY.messageLabel}
                    </label>
                    <textarea
                      rows={5}
                      value={formState.message}
                      placeholder={CONTACT_FORM_COPY.messagePlaceholder}
                      className={cn(
                        inputClassName,
                        attemptedSubmit && fieldErrors.message && "border-red-500/50 focus:border-red-500"
                      )}
                      onChange={(e) => handleChange("message", e.target.value)}
                    />
                    {attemptedSubmit && fieldErrors.message ? (
                      <p className="mt-1.5 text-xs text-red-400 font-mono">{fieldErrors.message}</p>
                    ) : null}
                  </div>

                  {hasError ? (
                    <div className="mt-4">
                      <StatusChip variant="error">{submitState.message || CONTACT_FORM_COPY.errorChip}</StatusChip>
                    </div>
                  ) : null}

                  {/* Submission Button with Scanning Hover Effect */}
                  <button
                    type="button"
                    disabled={isLoading}
                    className="relative group mt-6 flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#d85318] to-[#f37335] py-4 font-sans text-sm font-semibold text-white shadow-xl shadow-[#d85318]/15 transition-all duration-300 hover:shadow-[#d85318]/30 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={handleSubmit}
                  >
                    {/* Laser shine animation overlay */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine pointer-events-none" />
                    
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        {CONTACT_FORM_COPY.sendingLabel}
                      </>
                    ) : (
                      <>
                        <span>{CONTACT_FORM_COPY.submitLabel}</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
