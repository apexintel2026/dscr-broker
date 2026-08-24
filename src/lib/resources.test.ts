import { describe, expect, it } from "vitest";
import { calculatorEducationLinks, relatedResources } from "./resources";
import { articleJsonLd, faqPageJsonLd } from "./metadata";
import { faqJsonLdItems } from "./faq";
import { site } from "./site";

describe("calculatorEducationLinks", () => {
  it("surfaces the STR article first when occupancy is STR", () => {
    const links = calculatorEducationLinks("str");
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links.length).toBeLessThanOrEqual(3);
    expect(links[0]?.href).toBe("/resources/short-term-rentals");
    expect(links.map((item) => item.href)).toContain("/resources/what-is-dscr");
  });

  it("surfaces what-is-dscr and requirements for LTR", () => {
    const links = calculatorEducationLinks("ltr");
    expect(links.map((item) => item.href)).toEqual([
      "/resources/what-is-dscr",
      "/resources/requirements",
    ]);
  });
});

describe("relatedResources", () => {
  it("returns sibling articles for a known path", () => {
    const related = relatedResources("/resources/what-is-dscr");
    expect(related.length).toBeGreaterThan(0);
    expect(related.every((item) => item.href !== "/resources/what-is-dscr")).toBe(
      true,
    );
  });

  it("returns nothing for an unknown path", () => {
    expect(relatedResources("/resources/missing")).toEqual([]);
  });
});

describe("JSON-LD helpers", () => {
  it("builds Article/WebPage JSON-LD with a canonical URL", () => {
    const data = articleJsonLd({
      title: "What is DSCR?",
      description: "Debt service coverage for investor loans.",
      path: "/resources/what-is-dscr",
    });
    expect(data["@type"]).toEqual(["Article", "WebPage"]);
    expect(data.url).toBe("https://dscr.broker/resources/what-is-dscr");
    expect(data.headline).toBe("What is DSCR?");
  });

  it("builds FAQPage JSON-LD from the shared FAQ list", () => {
    const data = faqPageJsonLd(faqJsonLdItems, "/resources/faq");
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity.length).toBe(faqJsonLdItems.length);
    expect(data.mainEntity[0]).toMatchObject({
      "@type": "Question",
      name: "Are you the lender?",
    });
    const license = data.mainEntity.find(
      (item) => item.name === "What is your license number?",
    );
    expect(license?.acceptedAnswer.text).toBe(site.legalEntity);
    expect(
      data.mainEntity.some((item) => /NMLS/i.test(item.name)),
    ).toBe(false);
  });
});
