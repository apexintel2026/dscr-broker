import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { articleJsonLd, buildMetadata } from "./metadata";
import { niches, requireNiche } from "./niches";
import {
  getPartner,
  partnerPublicPaths,
  partners,
  requirePartner,
} from "./partners";
import { realtorOnePager } from "./realtor-one-pager";

const FORBIDDEN_COPY =
  /get approved|see your rate|NMLS|referral fee|we pay|commission|apply now|sms blast|text blast/i;

function flattenCopy(value: unknown): string {
  return JSON.stringify(value);
}

describe("partners", () => {
  it("ships realtors as the first partner landing at /realtors", () => {
    expect(partners.map((item) => item.slug)).toEqual(["realtors"]);
    const realtors = requirePartner("realtors");
    expect(realtors.href).toBe("/realtors");
    expect(realtors.calculatorHref).toBe("/calculator");
    expect(realtors.relatedResourceHref).toBe("/resources");
    expect(realtors.footerLabel).toBe("For realtors");
    expect(realtors.hubLabel).toBe("Realtors");
    expect(realtors.onePager).toEqual({
      href: realtorOnePager.href,
      ctaLabel: realtorOnePager.ctaLabel,
    });
    expect(partnerPublicPaths()).toEqual([
      "/realtors",
      "/realtors/when-to-send",
    ]);
  });

  it("keeps unique SEO from the STR niche", () => {
    const realtors = requirePartner("realtors");
    const str = requireNiche("str");
    expect(realtors.seo.title).not.toBe(str.seo.title);
    expect(realtors.seo.description).not.toBe(str.seo.description);
    expect(realtors.href).not.toBe(str.href);
    expect(niches.some((item) => item.href === realtors.href)).toBe(false);
  });

  it("uses unique slugs and hrefs", () => {
    const slugs = partners.map((item) => item.slug);
    const hrefs = partners.map((item) => item.href);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs.every((href) => href.startsWith("/"))).toBe(true);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPartner("cpa")).toBeUndefined();
    expect(() => requirePartner("cpa")).toThrow(/unknown partner/i);
  });

  it("stays silent on compensation, approval, rates, and NMLS", () => {
    expect(flattenCopy(partners)).not.toMatch(FORBIDDEN_COPY);
    expect(flattenCopy(partners)).toMatch(/broker, not a lender/i);
    expect(flattenCopy(partners)).toMatch(/business-purpose/i);
    expect(flattenCopy(partners)).toMatch(/non-owner-occupied/i);
  });

  it("builds Article/WebPage JSON-LD and unique metadata for /realtors", () => {
    const realtors = requirePartner("realtors");
    const data = articleJsonLd({
      title: realtors.seo.title,
      description: realtors.seo.description,
      path: realtors.href,
    });
    expect(data["@type"]).toEqual(["Article", "WebPage"]);
    expect(data.url).toBe("https://dscr.broker/realtors");
    expect(data.headline).toBe(realtors.seo.title);

    const meta = buildMetadata({
      title: realtors.seo.title,
      description: realtors.seo.description,
      path: realtors.href,
      type: "article",
    });
    expect(meta.title).toBe(realtors.seo.title);
    expect(meta.description).toBe(realtors.seo.description);
    expect(meta.alternates).toEqual({
      canonical: "https://dscr.broker/realtors",
    });
    expect(meta.openGraph).toMatchObject({ type: "article" });
  });
});

describe("realtor landing wiring", () => {
  it("renders PartnerLanding from a thin /realtors route with CtaCluster CTAs", () => {
    const page = readFileSync(
      resolve(process.cwd(), "src/app/realtors/page.tsx"),
      "utf8",
    );
    const landing = readFileSync(
      resolve(process.cwd(), "src/components/PartnerLanding.tsx"),
      "utf8",
    );
    expect(page).toContain('requirePartner("realtors")');
    expect(page).toContain("PartnerLanding");
    expect(page).toContain("type: \"article\"");
    expect(landing).toContain("CtaCluster");
    expect(landing).toContain("articleJsonLd");
    expect(landing).toContain("LENDER_DSCR_FORMULA");
    expect(landing).toContain("partner.onePager.ctaLabel");
    expect(landing).not.toMatch(FORBIDDEN_COPY);
  });

  it("does not add realtors to the primary header nav", () => {
    const header = readFileSync(
      resolve(process.cwd(), "src/components/Header.tsx"),
      "utf8",
    );
    const site = readFileSync(resolve(process.cwd(), "src/lib/site.ts"), "utf8");
    expect(header).not.toMatch(/realtors/i);
    expect(site).not.toMatch(/href: "\/realtors"/);
  });
});
