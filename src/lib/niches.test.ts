import { describe, expect, it } from "vitest";
import { calculatorHref } from "./calculator-query";
import {
  calculatorHrefFor,
  getNiche,
  niches,
  requireNiche,
} from "./niches";

describe("niches", () => {
  it("ships STR as the first Phase 6 niche", () => {
    expect(niches.map((item) => item.slug)).toEqual(["str"]);
    const str = requireNiche("str");
    expect(str.href).toBe("/str");
    expect(str.occupancyType).toBe("str");
    expect(str.relatedResourceHref).toBe("/resources/short-term-rentals");
    expect(str.navLabel).toBe("STR");
  });

  it("deep-links the calculator with the niche occupancy default", () => {
    const str = requireNiche("str");
    expect(calculatorHrefFor(str)).toBe(calculatorHref("str"));
    expect(calculatorHrefFor(str)).toBe("/calculator?occupancy=str");
  });

  it("uses unique slugs and hrefs", () => {
    const slugs = niches.map((item) => item.slug);
    const hrefs = niches.map((item) => item.href);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs.every((href) => href.startsWith("/"))).toBe(true);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getNiche("bridge")).toBeUndefined();
    expect(() => requireNiche("bridge")).toThrow(/unknown niche/i);
  });
});
