"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ERROR_PAGE_COPY } from "@/lib/constants";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-5">
      <div className="max-w-lg text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-[var(--color-primary)] mb-4">
          {ERROR_PAGE_COPY.label}
        </p>
        <h1 className="font-hanken text-4xl font-semibold text-[var(--color-on-surface)] mb-4">
          {ERROR_PAGE_COPY.headline}
        </h1>
        <p className="font-inter text-base text-[var(--color-on-surface-variant)]">
          {ERROR_PAGE_COPY.body}
        </p>
        {error.digest ? (
          <code className="mt-2 block rounded bg-[var(--color-surface-container)] px-2 py-1 font-mono text-xs text-[var(--color-on-surface-variant)]">
            {error.digest}
          </code>
        ) : null}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="primary" onClick={reset}>
            {ERROR_PAGE_COPY.tryAgain}
          </Button>
          <Button asChild variant="ghost">
            <Link href="/">{ERROR_PAGE_COPY.goHome}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

