import type { MetadataRoute } from "next";
import { niches } from "@/lib/niches";
import { resourceLinks, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/calculator",
    "/how-it-works",
    "/resources",
    "/about",
    "/book",
    "/contact",
    "/thank-you",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticPaths,
    ...niches.map((item) => item.href),
    ...resourceLinks.map((item) => item.href),
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
