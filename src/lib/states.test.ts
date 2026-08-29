import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { articleJsonLd, buildMetadata } from "./metadata";
import { niches, requireNiche } from "./niches";
import { partners, requirePartner } from "./partners";
import {
  defaultStateRelatedLinks,
  getState,
  requireState,
  stateRelatedLinks,
  states,
} from "./states";

const FORBIDDEN_COPY =
  /get approved|see your rate|NMLS|apply now|apply button|referral fee|we pay|commission/i;

function flattenCopy(value: unknown): string {
  return JSON.stringify(value);
}

function read(rel: string) {
  return readFileSync(resolve(process.cwd(), rel), "utf8");
}

describe("states", () => {
  it("ships Texas and Florida as the V1 property-state set", () => {
    expect(states.map((item) => item.slug)).toEqual(["texas", "florida"]);
    expect(requireState("texas").href).toBe("/texas");
    expect(requireState("texas").abbreviation).toBe("TX");
    expect(requireState("florida").href).toBe("/florida");
    expect(requireState("florida").abbreviation).toBe("FL");
  });

  it("keeps unique SEO from each other, STR, and realtors", () => {
    const texas = requireState("texas");
    const florida = requireState("florida");
    const str = requireNiche("str");
    const realtors = requirePartner("realtors");
    const titles = [
      texas.seo.title,
      florida.seo.title,
      str.seo.title,
      realtors.seo.title,
    ];
    const descriptions = [
      texas.seo.description,
      florida.seo.description,
      str.seo.description,
      realtors.seo.description,
    ];
    const hrefs = [texas.href, florida.href, str.href, realtors.href];
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(niches.some((item) => item.href === texas.href)).toBe(false);
    expect(partners.some((item) => item.href === florida.href)).toBe(false);
  });

  it("uses unique slugs and clean public hrefs", () => {
    const slugs = states.map((item) => item.slug);
    const hrefs = states.map((item) => item.href);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs).toEqual(["/texas", "/florida"]);
  });

  it("returns undefined for an unknown slug so later states can be cloned", () => {
    expect(getState("georgia")).toBeUndefined();
    expect(() => requireState("georgia")).toThrow(/unknown state/i);
  });

  it("answers AEO questions in H2s with a direct first-paragraph answer", () => {
    for (const state of states) {
      expect(state.sections.length).toBeGreaterThanOrEqual(4);
      for (const section of state.sections) {
        expect(section.heading.endsWith("?")).toBe(true);
        expect(section.answer.length).toBeGreaterThan(20);
      }
    }
    expect(requireState("texas").sections[0]?.heading).toMatch(/texas investors/i);
    expect(requireState("florida").sections[0]?.heading).toMatch(
      /florida investors/i,
    );
  });

  it("cross-links calculator, book, desk notes, STR, and realtors", () => {
    const required = defaultStateRelatedLinks.map((item) => item.href);
    for (const state of states) {
      const hrefs = stateRelatedLinks(state).map((item) => item.href);
      for (const href of required) {
        expect(hrefs).toContain(href);
      }
      expect(flattenCopy(state)).toContain("/calculator");
      expect(flattenCopy(state)).toContain("/book");
      expect(flattenCopy(state)).toContain("/resources/what-is-dscr");
      expect(flattenCopy(state)).toContain("/resources/requirements");
      expect(flattenCopy(state)).toContain("/realtors");
    }
    expect(flattenCopy(requireState("florida"))).toContain("/str");
    expect(flattenCopy(requireState("florida"))).toMatch(/llc|entity/i);
  });

  it("stays silent on approval, rates, NMLS, and apply CTAs", () => {
    expect(flattenCopy(states)).not.toMatch(FORBIDDEN_COPY);
    expect(flattenCopy(states)).toMatch(/broker, not a lender/i);
    expect(flattenCopy(states)).toMatch(/business-purpose/i);
    expect(flattenCopy(states)).toMatch(/non-owner-occupied/i);
    expect(flattenCopy(states)).not.toMatch(/Newfi|Funder|ACC\b/i);
  });

  it("does not claim a Texas or Florida mortgage license", () => {
    const texas = flattenCopy(requireState("texas"));
    const florida = flattenCopy(requireState("florida"));
    expect(texas).toMatch(/does not claim a Texas residential mortgage license/i);
    expect(florida).toMatch(
      /does not claim a Florida residential mortgage license/i,
    );
    expect(texas).toMatch(
      /shops business-purpose files in states where capital sources do not require a residential mortgage license/i,
    );
    expect(texas).toMatch(/concentration states on public wholesale matrices/i);
    expect(texas).not.toMatch(/Texas mortgage license #|licensed in Texas/i);
    expect(florida).not.toMatch(/Florida mortgage license #|licensed in Florida/i);
  });

  it("builds Article/WebPage JSON-LD and unique metadata for both states", () => {
    for (const state of states) {
      const data = articleJsonLd({
        title: state.seo.title,
        description: state.seo.description,
        path: state.href,
      });
      expect(data["@type"]).toEqual(["Article", "WebPage"]);
      expect(data.url).toBe(`https://dscr.broker${state.href}`);
      expect(data.headline).toBe(state.seo.title);

      const meta = buildMetadata({
        title: state.seo.title,
        description: state.seo.description,
        path: state.href,
        type: "article",
      });
      expect(meta.title).toBe(state.seo.title);
      expect(meta.description).toBe(state.seo.description);
      expect(meta.alternates).toEqual({
        canonical: `https://dscr.broker${state.href}`,
      });
      expect(meta.openGraph).toMatchObject({ type: "article" });
    }
  });
});

describe("state landing wiring", () => {
  it("renders StateLanding from thin /texas and /florida routes with CtaCluster CTAs", () => {
    const landing = read("src/components/StateLanding.tsx");
    expect(landing).toContain("CtaCluster");
    expect(landing).toContain("articleJsonLd");
    expect(landing).toContain("LENDER_DSCR_FORMULA");
    expect(landing).toContain("stateRelatedLinks");
    expect(landing).not.toMatch(FORBIDDEN_COPY);

    for (const slug of ["texas", "florida"] as const) {
      const page = read(`src/app/${slug}/page.tsx`);
      expect(page).toContain(`requireState("${slug}")`);
      expect(page).toContain("StateLanding");
      expect(page).toContain('type: "article"');
    }
  });

  it("does not add Texas or Florida to the primary header nav", () => {
    const header = read("src/components/Header.tsx");
    const site = read("src/lib/site.ts");
    expect(header).not.toMatch(/texas|florida/i);
    expect(site).not.toMatch(/href: "\/texas"/);
    expect(site).not.toMatch(/href: "\/florida"/);
    expect(site).toContain('href: "/str"');
  });
});
