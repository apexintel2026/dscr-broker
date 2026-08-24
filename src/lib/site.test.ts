import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { faqs } from "./faq";
import { site } from "./site";

describe("broker legal identity", () => {
  it("stores the CA DRE entity line as the single source of truth", () => {
    expect(site.legalEntity).toBe(
      "GI Realty LLC, a California Real Estate Broker — CA DRE Lic# 01311868",
    );
    expect(site.legalEntity).not.toMatch(/NMLS/i);
    expect(site.equalHousingOpportunity).toBe("Equal Housing Opportunity");
  });

  it("uses that line in the FAQ instead of an NMLS placeholder", () => {
    const license = faqs.find((item) => item.q === "What is your license number?");
    expect(license?.a).toBe(site.legalEntity);
    expect(faqs.some((item) => /NMLS/i.test(item.q) || /NMLS/i.test(item.a))).toBe(
      false,
    );
  });

  it("commits a local Equal Housing Opportunity SVG, not a lender logo or HUD hotlink", () => {
    const svg = readFileSync(
      resolve(process.cwd(), "public/equal-housing-opportunity.svg"),
      "utf8",
    );
    expect(svg).toContain("<svg");
    expect(svg).toContain("Equal Housing Opportunity");
    expect(svg).not.toMatch(/Equal Housing Lender/i);
    expect(svg).not.toMatch(/https?:\/\/(?:www\.)?hud\.gov/i);
  });
});
