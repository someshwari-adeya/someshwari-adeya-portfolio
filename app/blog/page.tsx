import { generatePageMetadata } from "@/lib/metadata";
import { BLOG_META_COPY, BLOG_PLACEHOLDER_COPY } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: BLOG_META_COPY.title,
  description: BLOG_META_COPY.description,
  canonicalPath: BLOG_META_COPY.canonicalPath
});

export default function BlogPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-5">
      <div className="max-w-lg text-center">
        <p className="mb-4 font-mono text-xs tracking-widest uppercase text-[var(--color-primary)]">
          {BLOG_PLACEHOLDER_COPY.label}
        </p>
        <h1 className="mb-4 font-hanken text-4xl font-semibold text-[var(--color-on-surface)]">
          {BLOG_PLACEHOLDER_COPY.headline}
        </h1>
        <p className="font-inter text-base text-[var(--color-on-surface-variant)]">
          {BLOG_PLACEHOLDER_COPY.body}
        </p>
      </div>
    </main>
  );
}

