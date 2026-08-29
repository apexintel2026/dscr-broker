import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { articleJsonLd, buildMetadata } from "./metadata";
import { requireNiche } from "./niches";
import { requirePartner } from "./partners";
import { realtorOnePager } from "./realtor-one-pager";
import { requireState } from "./states";
import { site } from "./site";

const FORBIDDEN_COPY =
  /get approved|see your rate|NMLS|referral fee|we pay|commission|apply now|sms blast|text blast|California|Utah|Arizona|\bUT\b|\bAZ\b/i;

function flattenCopy(value: unknown): string {
  return JSON.stringify(value);
}

function read(rel: string) {
  return readFileSync(resolve(process.cwd(), rel), "utf8");
}

describe("realtor one-pager", () => {
  it("lives at /realtors/when-to-send with unique SEO", () => {
    expect(realtorOnePager.href).toBe("/realtors/when-to-send");
    expect(realtorOnePager.ctaLabel).toBe("Print this one-pager");

    const realtors = requirePartner("realtors");
    const str = requireNiche("str");
    const texas = requireState("texas");
    const florida = requireState("florida");
    const titles = [
      realtorOnePager.seo.title,
      realtors.seo.title,
      str.seo.title,
      texas.seo.title,
      florida.seo.title,
    ];
    const descriptions = [
      realtorOnePager.seo.description,
      realtors.seo.description,
      str.seo.description,
      texas.seo.description,
      florida.seo.description,
    ];
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("stays a desk send-sheet: broker, not a lender, no referral fees or state targeting", () => {
    const copy = flattenCopy(realtorOnePager);
    expect(copy).not.toMatch(FORBIDDEN_COPY);
    expect(copy).toMatch(/broker, not a lender/i);
    expect(copy).toMatch(/we desk DSCR/i);
    expect(copy).toMatch(/we do not fund/i);
    expect(copy).toMatch(/not a credit decision/i);
    expect(realtorOnePager.run.url).toBe(`${site.url}/calculator`);
    expect(realtorOnePager.book.url).toBe(`${site.url}/book`);
    expect(realtorOnePager.closer).toMatch(/you stay the realtor/i);
  });

  it("builds unique Article metadata for the one-pager route", () => {
    const meta = buildMetadata({
      title: realtorOnePager.seo.title,
      description: realtorOnePager.seo.description,
      path: realtorOnePager.href,
      type: "article",
    });
    expect(meta.title).toBe(realtorOnePager.seo.title);
    expect(meta.alternates).toEqual({
      canonical: "https://dscr.broker/realtors/when-to-send",
    });

    const data = articleJsonLd({
      title: realtorOnePager.seo.title,
      description: realtorOnePager.seo.description,
      path: realtorOnePager.href,
    });
    expect(data.url).toBe("https://dscr.broker/realtors/when-to-send");
    expect(data.headline).toBe(realtorOnePager.seo.title);
  });
});

describe("realtor one-pager wiring", () => {
  it("renders a dedicated print route and links it from /realtors", () => {
    const page = read("src/app/realtors/when-to-send/page.tsx");
    const sheet = read("src/components/RealtorOnePager.tsx");
    const landing = read("src/components/PartnerLanding.tsx");
    const partners = read("src/lib/partners.ts");

    expect(page).toContain("RealtorOnePager");
    expect(page).toContain("type: \"article\"");
    expect(sheet).toContain("PrintSaveButton");
    expect(sheet).toContain("one-pager-root");
    expect(sheet).toContain("one-pager-sheet");
    expect(sheet).toContain(site.phoneDisplay);
    expect(landing).toContain("Print this one-pager");
    expect(landing).toContain("partner.onePager");
    expect(partners).toContain("realtorOnePager.href");
    expect(sheet).not.toMatch(FORBIDDEN_COPY);
    expect(landing).not.toMatch(FORBIDDEN_COPY);
  });

  it("does not embed the calculator or add Apply", () => {
    const sheet = read("src/components/RealtorOnePager.tsx");
    expect(sheet).not.toContain("CalculatorWorksheet");
    expect(sheet).not.toMatch(/apply now|lender matcher/i);
  });
});
