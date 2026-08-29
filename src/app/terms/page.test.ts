import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { site } from "@/lib/site";

const termsPath = resolve(process.cwd(), "src/app/terms/page.tsx");

describe("/terms of use", () => {
  const page = readFileSync(termsPath, "utf8");
  const collapsed = page.replace(/\s+/g, " ");
  const haystack = collapsed.toLowerCase();

  it("is a complete website terms page, not a stub", () => {
    expect(collapsed).toContain("Terms of Use");
    expect(collapsed).toContain("August 29, 2026");
    expect(collapsed).toContain("{site.companyName}");
    expect(collapsed).toContain("{site.name}");
    expect(collapsed).toContain("{site.url}");
    expect(collapsed).toContain("{site.legalEntity}");
    expect(collapsed).toContain("{site.businessAddress}");
    expect(collapsed).toContain("{site.phoneDisplay}");
    expect(collapsed).toContain("{site.equalHousingOpportunity}");
    expect(collapsed).toContain("/privacy");
    expect(collapsed).toContain("Informational site only");
    expect(collapsed).toContain("No client relationship");
    expect(collapsed).toContain("Not a loan application or a commitment to lend");
    expect(collapsed).toContain("Broker, not a lender");
    expect(collapsed).toContain("third-party capital source");
    expect(collapsed).toContain("Business-purpose only");
    expect(collapsed).toContain("primary residences");
    expect(collapsed).toContain("Calculator and estimates");
    expect(collapsed).toContain("not credit decisions");
    expect(collapsed).toContain("HighLevel");
    expect(collapsed).toContain("TCPA-style");
    expect(collapsed).toContain("Equal Housing Opportunity");
    expect(collapsed).toContain("laws of the state of California");
    expect(collapsed).toContain("update these terms by posting");
    expect(haystack).not.toContain("placeholder");
    expect(haystack).not.toContain("incomplete");
    expect(haystack).not.toContain("not a complete terms");
    expect(haystack).not.toMatch(/\bnmls\b/);
    expect(haystack).not.toContain("apply now");
  });

  it("does not keep prior-brand strings or a privacy mailing block", () => {
    expect(haystack).not.toContain("hel" + "ler");
    expect(haystack).not.toContain("chris" + "hel" + "ler");
    expect(haystack).not.toContain("ask" + "hel" + "ler");
    expect(page).not.toMatch(/\bP\.?\s*O\.?\s*Box\b/i);
    expect(page).not.toMatch(/mailto:/i);
    expect(page).not.toContain("Request for California Disclosure Choices");
  });

  it("uses site identity, not invented product copy", () => {
    expect(site.legalEntity).toContain("01311868");
    expect(site.phoneDisplay).toBe("619-618-1419");
    expect(site.businessAddress).toContain("1741 Eastlake Pkwy");
    expect(page).toContain("site.phoneHref");
    expect(page).not.toMatch(/Equal Housing Lender/i);
  });
});
