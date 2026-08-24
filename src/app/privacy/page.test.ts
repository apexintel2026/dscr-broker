import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { site } from "@/lib/site";

const privacyPath = resolve(process.cwd(), "src/app/privacy/page.tsx");
const srcRoot = resolve(process.cwd(), "src");

function walkSource(dir: string): string[] {
  const files: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      files.push(...walkSource(full));
    } else if (/\.(ts|tsx|js|jsx|md|css)$/.test(name)) {
      files.push(full);
    }
  }
  return files;
}

describe("/privacy policy", () => {
  const page = readFileSync(privacyPath, "utf8");
  const collapsed = page.replace(/\s+/g, " ");

  it("is the full rebranded policy, not a placeholder", () => {
    expect(site.companyName).toBe("GI Realty, LLC");
    expect(site.name).toBe("dscr.broker");
    expect(site.url).toBe("https://dscr.broker");
    expect(site.phoneDisplay).toBe("619-618-1419");
    expect(collapsed).toContain("Privacy Policy");
    expect(collapsed).toContain("August 24, 2026");
    expect(collapsed).toContain("{site.companyName}");
    expect(collapsed).toContain("{site.name}");
    expect(collapsed).toContain("{site.url}");
    expect(collapsed).toContain("{site.phoneDisplay}");
    expect(collapsed).toContain("/contact");
    expect(collapsed).toContain("HighLevel");
    expect(collapsed).toContain(
      "Data will not be shared with third parties for marketing or promotional purposes.",
    );
    expect(collapsed).toContain(
      "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.",
    );
    expect(collapsed).toContain("Text messaging originator opt-in data");
    expect(collapsed).toContain("Request for California Disclosure Choices");
    expect(collapsed).toContain("EXPRESS WRITTEN CONSENT");
    expect(collapsed).toContain("REPLY &quot;STOP&quot;");
    expect(collapsed).toContain("Cal. Bus. &amp; Prof. Code");
    expect(collapsed).toContain("We do not abide by Do Not Track");
    expect(collapsed).toContain("broker, not a lender");
    expect(collapsed.toLowerCase()).not.toContain("placeholder");
  });

  it("contacts via company, phone, and /contact — no street address or invented inbox", () => {
    expect(page).toContain("Call or text");
    expect(page).not.toMatch(/Saxony/i);
    expect(page).not.toMatch(/Encinitas/i);
    expect(page).not.toMatch(/\b92024\b/);
    expect(page).not.toMatch(/\bP\.?\s*O\.?\s*Box\b/i);
    expect(page).not.toMatch(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
    expect(page).not.toMatch(/mailto:/i);
  });

  it("does not keep prior-brand or listing-platform strings", () => {
    const haystack = page.toLowerCase();
    expect(haystack).not.toContain("hel" + "ler");
    expect(haystack).not.toContain("chris" + "hel" + "ler");
    expect(haystack).not.toContain("briv" + "ity");
    expect(haystack).not.toContain("ask" + "hel" + "ler");
  });
});

describe("src tree brand check", () => {
  it("has no prior-brand strings in application source", () => {
    const hits: string[] = [];
    const needles = ["hel" + "ler", "chris" + "hel" + "ler", "briv" + "ity"];
    for (const file of walkSource(srcRoot)) {
      const text = readFileSync(file, "utf8").toLowerCase();
      for (const needle of needles) {
        if (text.includes(needle)) {
          hits.push(`${file}: ${needle}`);
        }
      }
    }
    expect(hits).toEqual([]);
  });
});
