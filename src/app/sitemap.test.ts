import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { niches } from "@/lib/niches";
import { partners } from "@/lib/partners";
import { resourceLinks, site } from "@/lib/site";

describe("sitemap", () => {
  it("includes core routes, STR niche, realtor partner, and resource articles", () => {
    const urls = sitemap().map((entry) => entry.url);
    const expected = [
      "/",
      "/calculator",
      "/how-it-works",
      "/resources",
      "/about",
      "/book",
      "/contact",
      ...niches.map((item) => item.href),
      ...partners.map((item) => item.href),
      ...resourceLinks.map((item) => item.href),
    ];
    for (const path of expected) {
      expect(urls).toContain(`${site.url}${path}`);
    }
    expect(urls).toContain(`${site.url}/str`);
    expect(urls).toContain(`${site.url}/realtors`);
    expect(urls).toContain(`${site.url}/resources/what-is-dscr`);
    expect(urls).toContain(`${site.url}/resources/short-term-rentals`);
  });

  it("lists exactly the known public routes", () => {
    const urls = sitemap().map((entry) => entry.url).sort();
    const expected = [
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
      ...niches.map((item) => item.href),
      ...partners.map((item) => item.href),
      ...resourceLinks.map((item) => item.href),
    ].map((path) => `${site.url}${path}`).sort();
    expect(urls).toEqual(expected);
  });
});

describe("robots", () => {
  it("points crawlers at the sitemap", () => {
    const file = robots();
    expect(file.sitemap).toBe(`${site.url}/sitemap.xml`);
    expect(file.rules).toEqual({ userAgent: "*", allow: "/" });
  });
});
