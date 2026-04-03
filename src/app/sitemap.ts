import type { MetadataRoute } from "next";

const BASE_URL = "https://euphoria-web-gules.vercel.app";
const locales = ["sk", "cs", "hu", "de", "en"];
const pages = ["", "/about", "/contact", "/events", "/gallery", "/reservation"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
