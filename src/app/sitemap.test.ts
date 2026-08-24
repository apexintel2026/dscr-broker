import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { niches } from "@/lib/niches";
import { resourceLinks, site } from "@/lib/site";

describe("sitemap", () => {
  it("includes core routes, STR niche, and resource articles", () => {
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
      ...resourceLinks.map((item) => item.href),
    ];
    for (const path of expected) {
      expect(urls).toContain(`${site.url}${path}`);
    }
    expect(urls).toContain(`${site.url}/str`);
    expect(urls).toContain(`${site.url}/resources/what-is-dscr`);
    expect(urls).toContain(`${site.url}/resources/short-term-rentals`);
  });
});

describe("robots", () => {
  it("points crawlers at the sitemap", () => {
    const file = robots();
    expect(file.sitemap).toBe(`${site.url}/sitemap.xml`);
    expect(file.rules).toEqual({ userAgent: "*", allow: "/" });
  });
});
