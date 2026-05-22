import type { MetadataRoute } from "next";

import { SITE_META, PROJECTS } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_META.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8
    }
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      const res = await fetch(
        `${apiUrl}/api/posts?limit=100&status=published`,
        {
          next: { revalidate: 3600 }
        }
      );

      if (res.ok) {
        const data: unknown = await res.json();
        const posts =
          typeof data === "object" && data !== null && "posts" in data
            ? (data as { posts?: Array<{ slug: string; updatedAt: string }> })
                .posts ?? []
            : [];

        blogRoutes = posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.6
        }));
      }
    }
  } catch {
    // API not available yet — return static routes only
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}


