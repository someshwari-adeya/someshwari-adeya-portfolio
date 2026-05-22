import type { Metadata } from "next";

import { SITE_META } from "@/lib/constants";

interface PageMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  canonicalPath?: string;
  noIndex?: boolean;
}

export function generatePageMetadata(
  options: PageMetadataOptions = {}
): Metadata {
  const {
    title,
    description = SITE_META.description,
    keywords = SITE_META.keywords,
    ogImage = SITE_META.ogImage,
    ogType = "website",
    canonicalPath = "",
    noIndex = false
  } = options;

  const fullTitle = title ? `${title} | ${SITE_META.name}` : SITE_META.title;

  const canonicalUrl = `${SITE_META.url}${canonicalPath}`;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_META.url}${ogImage}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: SITE_META.name }],
    creator: SITE_META.name,
    openGraph: {
      type: ogType,
      locale: "en_US",
      url: canonicalUrl,
      siteName: SITE_META.name,
      title: fullTitle,
      description,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: fullTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [fullOgImage],
      creator: SITE_META.twitterHandle
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: canonicalUrl
    }
  };
}

