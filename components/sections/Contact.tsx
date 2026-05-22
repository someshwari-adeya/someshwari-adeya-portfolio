"use client";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatusChip } from "@/components/ui/StatusChip";
import {
  CONTACT_CONFIG,
  CONTACT_FORM_COPY,
  CONTACT_SECTION_COPY,
  SOCIAL_LINKS
} from "@/lib/constants";
import { SocialLinkItem } from "@/components/ui/SocialLinkItem";
import { cn } from "@/lib/utils";

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
  "w-full rounded border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-high)] px-4 py-3 font-[var(--font-inter)] text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)] placeholder:opacity-50 transition-colors duration-200 focus:border-[var(--color-primary)] focus:outline-none";

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

  const hasSuccess = submitState.status === "success";
  const hasError = submitState.status === "error";
  const isLoading = submitState.status === "loading";

  const projectTypeOptions = useMemo(
    () => CONTACT_CONFIG.projectTypes,
    []
  );

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
    <section className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionLabel>{CONTACT_SECTION_COPY.label}</SectionLabel>
          <h2 className="mt-6 font-hanken text-[32px] font-semibold leading-[1.2] text-on-surface md:text-[48px]">
            <span className="block">{CONTACT_CONFIG.headline}</span>
            <span className="block">{CONTACT_CONFIG.headlineAccent}</span>
            <span className="block">{CONTACT_CONFIG.headlineLine2}</span>
            <span className="block">{CONTACT_CONFIG.headlineLine3}</span>
          </h2>
          <p className="mt-6 max-w-sm text-body-md text-on-surface-variant">
            {CONTACT_CONFIG.subText}
          </p>
          <a
            href={`mailto:${CONTACT_CONFIG.email}`}
            className="mt-8 inline-block text-body-md text-primary transition-colors hover:underline"
          >
            {CONTACT_CONFIG.email}
          </a>
        </div>

        <div className="rounded-lg border border-outline-variant bg-surface-container p-8">
          <div>
            <p className="text-label-caps text-primary">{CONTACT_CONFIG.formTitle}</p>
            <p className="mt-2 font-hanken text-xl font-semibold text-on-surface">
              {CONTACT_CONFIG.formSubtitle}
            </p>
          </div>

          {hasSuccess ? (
            <div className="mt-10">
              <CheckCircle2 className="h-12 w-12 text-green-400" aria-hidden="true" />
              <p className="mt-5 font-hanken text-2xl font-semibold text-on-surface">
                {CONTACT_FORM_COPY.successTitle}
              </p>
              <p className="mt-3 text-body-md text-on-surface-variant">
                {CONTACT_FORM_COPY.successBody}
              </p>
              <button
                type="button"
                className="mt-6 text-label-caps text-primary hover:underline"
                onClick={resetToIdle}
              >
                {CONTACT_FORM_COPY.sendAnother}
              </button>
            </div>
          ) : (
            <div className="mt-10">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-1 font-mono text-[11px] text-on-surface-variant">
                    {CONTACT_FORM_COPY.nameLabel}
                  </p>
                  <input
                    type="text"
                    value={formState.name}
                    placeholder={CONTACT_FORM_COPY.namePlaceholder}
                    className={inputClassName}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  {attemptedSubmit && fieldErrors.name ? (
                    <p className="mt-1 text-sm text-[#ffb4ab]">{fieldErrors.name}</p>
                  ) : null}
                </div>
                <div>
                  <p className="mb-1 font-mono text-[11px] text-on-surface-variant">
                    {CONTACT_FORM_COPY.emailLabel}
                  </p>
                  <input
                    type="email"
                    value={formState.email}
                    placeholder={CONTACT_FORM_COPY.emailPlaceholder}
                    className={inputClassName}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  {attemptedSubmit && fieldErrors.email ? (
                    <p className="mt-1 text-sm text-[#ffb4ab]">{fieldErrors.email}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-1 font-mono text-[11px] text-on-surface-variant">
                    {CONTACT_FORM_COPY.companyLabel}
                  </p>
                  <input
                    type="text"
                    value={formState.company}
                    placeholder={CONTACT_FORM_COPY.companyPlaceholder}
                    className={inputClassName}
                    onChange={(e) => handleChange("company", e.target.value)}
                  />
                </div>
                <div>
                  <p className="mb-1 font-mono text-[11px] text-on-surface-variant">
                    {CONTACT_FORM_COPY.projectTypeLabel}
                  </p>
                  <select
                    value={formState.projectType}
                    className={cn(inputClassName, "appearance-none")}
                    onChange={(e) => handleChange("projectType", e.target.value)}
                  >
                    <option value="">{CONTACT_FORM_COPY.projectTypePlaceholder}</option>
                    {projectTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-1 font-mono text-[11px] text-on-surface-variant">
                  {CONTACT_FORM_COPY.messageLabel}
                </p>
                <textarea
                  rows={4}
                  value={formState.message}
                  placeholder={CONTACT_FORM_COPY.messagePlaceholder}
                  className={inputClassName}
                  onChange={(e) => handleChange("message", e.target.value)}
                />
                {attemptedSubmit && fieldErrors.message ? (
                  <p className="mt-1 text-sm text-[#ffb4ab]">{fieldErrors.message}</p>
                ) : null}
              </div>

              {hasError ? (
                <div className="mt-6">
                  <StatusChip variant="error">{CONTACT_FORM_COPY.errorChip}</StatusChip>
                </div>
              ) : null}

              <button
                type="button"
                disabled={isLoading}
                className="mt-6 flex w-full items-center justify-center rounded bg-primary-container py-3 font-semibold text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    {CONTACT_FORM_COPY.sendingLabel}
                  </>
                ) : (
                  CONTACT_FORM_COPY.submitLabel
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
