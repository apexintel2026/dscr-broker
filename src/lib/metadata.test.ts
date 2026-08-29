import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  articleJsonLd,
  buildMetadata,
  defaultShareImage,
  faqPageJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "./metadata";
import { site } from "./site";

function pngSize(path: string) {
  const data = readFileSync(path);
  expect(data.subarray(0, 8)).toEqual(
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  );
  return {
    width: data.readUInt32BE(16),
    height: data.readUInt32BE(20),
  };
}

describe("default share image", () => {
  it("is a committed 1200×630 PNG without HUD or approval copy in the generator", () => {
    const size = pngSize(resolve(process.cwd(), "public/og.png"));
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(defaultShareImage).toMatchObject({
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: `${site.name} — ${site.tagline}`,
    });

    const generator = readFileSync(
      resolve(process.cwd(), "src/app/opengraph-image.tsx"),
      "utf8",
    );
    expect(generator).toContain("site.name");
    expect(generator).toContain("site.tagline");
    expect(generator).not.toMatch(/hud\.gov|Equal Housing Lender|get approved|see your rate/i);
  });
});

describe("buildMetadata", () => {
  it("keeps per-page titles, descriptions, and canonicals and adds the default share image", () => {
    const meta = buildMetadata({
      title: "About",
      description: "We broker DSCR files. We are not a lender.",
      path: "/about",
    });

    expect(meta.title).toBe("About");
    expect(meta.description).toBe("We broker DSCR files. We are not a lender.");
    expect(meta.alternates).toEqual({ canonical: "https://dscr.broker/about" });
    expect(meta.openGraph).toMatchObject({
      title: "About | dscr.broker",
      description: "We broker DSCR files. We are not a lender.",
      url: "https://dscr.broker/about",
      images: [defaultShareImage],
    });
    expect(meta.twitter).toMatchObject({
      card: "summary_large_image",
      images: ["/og.png"],
    });
  });

  it("keeps the home absolute title and article type", () => {
    const home = buildMetadata({
      title: site.name,
      description: site.description,
      path: "/",
    });
    expect(home.title).toEqual({
      absolute: `${site.name} — ${site.tagline}`,
    });

    const article = buildMetadata({
      title: "What is DSCR?",
      description: "Debt service coverage for investor loans.",
      path: "/resources/what-is-dscr",
      type: "article",
    });
    expect(article.openGraph).toMatchObject({
      type: "article",
      images: [defaultShareImage],
    });
  });
});

describe("sitewide schema helpers", () => {
  it("builds Organization as a RealEstateAgent, not a lender type", () => {
    const data = organizationJsonLd();
    const types = data["@type"];
    expect(types).toContain("Organization");
    expect(types).toContain("RealEstateAgent");
    expect(types).not.toContain("BankOrCreditUnion");
    expect(types).not.toContain("MortgageLender");
    expect(data.name).toBe(site.name);
    expect(data.legalName).toBe(site.companyName);
    expect(data.url).toBe(site.url);
    expect(data.description).toBe(site.description);
    expect(data.slogan).toBe(site.tagline);
    expect(data.telephone).toBe("+1-619-618-1419");
    expect(data.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "1741 Eastlake Pkwy, Ste 102-1101",
      addressLocality: "Chula Vista",
      addressRegion: "CA",
      postalCode: "91915",
      addressCountry: "US",
    });
    expect(site.legalEntity).toContain(data.identifier.value);
    expect(data.disambiguatingDescription).toMatch(/broker, not a lender/i);
    expect(JSON.stringify(data)).not.toMatch(/BankOrCreditUnion|MortgageLender|NMLS/i);
  });

  it("builds WebSite with url, name, and description", () => {
    const data = websiteJsonLd();
    expect(data["@type"]).toBe("WebSite");
    expect(data.url).toBe(site.url);
    expect(data.name).toBe(site.name);
    expect(data.description).toBe(site.description);
  });
});

describe("existing article and FAQ JSON-LD", () => {
  it("still emits Article/WebPage and FAQPage payloads", () => {
    const article = articleJsonLd({
      title: "What is DSCR?",
      description: "Debt service coverage for investor loans.",
      path: "/resources/what-is-dscr",
    });
    expect(article["@type"]).toEqual(["Article", "WebPage"]);
    expect(article.url).toBe("https://dscr.broker/resources/what-is-dscr");

    const faq = faqPageJsonLd(
      [{ q: "Are you the lender?", a: "No. We are a broker." }],
      "/resources/faq",
    );
    expect(faq["@type"]).toBe("FAQPage");
    expect(faq.mainEntity).toHaveLength(1);
  });
});

describe("home JSON-LD wiring", () => {
  it("renders Organization and WebSite with the shared JsonLd component", () => {
    const home = readFileSync(resolve(process.cwd(), "src/app/page.tsx"), "utf8");
    expect(home).toContain("organizationJsonLd");
    expect(home).toContain("websiteJsonLd");
    expect(home).toContain("<JsonLd data={organizationJsonLd()} />");
    expect(home).toContain("<JsonLd data={websiteJsonLd()} />");
  });
});
