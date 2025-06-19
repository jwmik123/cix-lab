import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { sitemapData } from "@/sanity/lib/queries";
import { headers } from "next/headers";

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await sanityFetch({
    query: sitemapData,
  });
  const headersList = await headers();
  const sitemap: MetadataRoute.Sitemap = [];
  const domain: String = headersList.get("host") as string;
  sitemap.push({
    url: domain as string,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: "monthly",
  });

  sitemap.push({
    url: `${domain}/events`,
    lastModified: new Date(),
    priority: 0.9,
    changeFrequency: "weekly",
  });

  if (allPostsAndPages != null && allPostsAndPages.data.length != 0) {
    let priority: number = 0.5;
    let changeFrequency:
      | "monthly"
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "yearly"
      | "never"
      | undefined = "monthly";
    let url: string = "";

    for (const p of allPostsAndPages.data) {
      // Use type assertion to handle the dynamic _type field
      const contentType = p._type as string;

      switch (contentType) {
        case "page":
          priority = 0.8;
          changeFrequency = "monthly";
          url = `${domain}/${p.slug}`;
          break;
        case "post":
          priority = 0.5;
          changeFrequency = "never";
          url = `${domain}/posts/${p.slug}`;
          break;
        case "event":
          priority = 0.6;
          changeFrequency = "weekly";
          url = `${domain}/events/${p.slug}`;
          break;
        default:
          // Skip unknown content types
          continue;
      }
      sitemap.push({
        lastModified: p._updatedAt || new Date(),
        priority,
        changeFrequency,
        url,
      });
    }
  }

  return sitemap;
}
