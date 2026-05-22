import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

import "@/app/globals.css";
import { SITE_META } from "@/lib/constants";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["500", "600", "700"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"]
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_META.url),
  title: {
    default: SITE_META.title,
    template: "%s | Someshwari Adeya"
  },
  description: SITE_META.description,
  keywords: SITE_META.keywords,
  authors: [{ name: SITE_META.name }],
  creator: SITE_META.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_META.url,
    siteName: SITE_META.name,
    title: SITE_META.title,
    description: SITE_META.description,
    images: [
      {
        url: SITE_META.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_META.title
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_META.title,
    description: SITE_META.description,
    images: [SITE_META.ogImage]
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_META.url }
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_META.name,
  url: SITE_META.url,
  jobTitle: "Full-Stack Product Engineer",
  description:
    "Systems engineer and full-stack product architect specializing in admin workflows, automation, and map interfaces.",
  email: SITE_META.email,
  knowsAbout: [
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "Automation",
    "Map Interfaces",
    "Admin Systems"
  ]
} as const;

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_META.name,
  url: SITE_META.url,
  description:
    "Full-Stack Product Engineer portfolio — admin workflows, automation, AI features, map interfaces.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_META.url}/blog?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  author: {
    "@type": "Person",
    name: SITE_META.name,
    url: SITE_META.url
  }
} as const;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[var(--color-background)] text-[var(--color-on-surface)]">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
