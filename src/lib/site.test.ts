import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { faqs } from "./faq";
import { GHL_FORM_EMBED_SCRIPT, site } from "./site";

describe("broker legal identity", () => {
  it("stores the CA DRE entity line as the single source of truth", () => {
    expect(site.companyName).toBe("GI Realty, LLC");
    expect(site.legalEntity).toBe(
      "GI Realty LLC, a California Real Estate Broker — CA DRE Lic# 01311868",
    );
    expect(site.legalEntity).not.toMatch(/NMLS/i);
    expect(site.businessAddress).toBe(
      "1741 Eastlake Pkwy, Ste 102-1101, Chula Vista, CA 91915",
    );
    expect(site.equalHousingOpportunity).toBe("Equal Housing Opportunity");
    expect(site.phoneDisplay).toBe("619-618-1419");
  });

  it("points HighLevel resize at the official msgsndr script only", () => {
    expect(GHL_FORM_EMBED_SCRIPT).toBe(
      "https://link.msgsndr.com/js/form_embed.js",
    );
  });

  it("renders the business address in the footer company cluster, not /privacy", () => {
    const footer = readFileSync(
      resolve(process.cwd(), "src/components/Footer.tsx"),
      "utf8",
    );
    const privacy = readFileSync(
      resolve(process.cwd(), "src/app/privacy/page.tsx"),
      "utf8",
    );
    expect(footer).toContain("{site.legalEntity}");
    expect(footer).toContain("{site.businessAddress}");
    expect(footer).toContain("{site.equalHousingOpportunity}");
    expect(footer).not.toMatch(/NMLS/i);
    expect(privacy).not.toContain("site.businessAddress");
    expect(privacy).not.toMatch(/Eastlake/i);
    expect(privacy).not.toMatch(/Chula Vista/i);
    expect(privacy).not.toMatch(/\b91915\b/);
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
