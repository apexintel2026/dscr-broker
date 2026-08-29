import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  GHL_BOOKING_EMBED_HEIGHT,
  GHL_FORM_EMBED_HEIGHT,
  GHL_FORM_EMBED_SCRIPT,
} from "@/lib/site";

function read(rel: string) {
  return readFileSync(resolve(process.cwd(), rel), "utf8");
}

describe("HighLevel conversion embeds", () => {
  const embed = read("src/components/EmbedFrame.tsx");
  const form = read("src/components/LeadForm.tsx");
  const booking = read("src/components/BookingCalendar.tsx");
  const panel = read("src/components/EmbedPanel.tsx");
  const contact = read("src/app/contact/page.tsx");
  const book = read("src/app/book/page.tsx");
  const css = read("src/app/globals.css");

  it("uses the official form_embed.js resize script and a tall initial height", () => {
    expect(GHL_FORM_EMBED_SCRIPT).toBe(
      "https://link.msgsndr.com/js/form_embed.js",
    );
    expect(GHL_FORM_EMBED_HEIGHT).toBeGreaterThanOrEqual(900);
    expect(GHL_BOOKING_EMBED_HEIGHT).toBeGreaterThanOrEqual(900);
    expect(embed).toContain("GHL_FORM_EMBED_SCRIPT");
    expect(embed).toContain("next/script");
    expect(embed).toContain("afterInteractive");
    expect(embed).toContain("initialHeight");
    expect(embed).not.toMatch(/loading=["']lazy["']/);
    expect(embed).not.toMatch(/min\(90vh/);
    expect(form).not.toMatch(/min\(90vh/);
    expect(form).not.toContain("min-h-[620px]");
    expect(booking).not.toMatch(/min\(90vh/);
    expect(booking).not.toContain("min-h-[700px]");
  });

  it("keeps a visible call/text path above each widget and does not elevate an empty box", () => {
    expect(panel).toContain("PhoneLinks");
    expect(panel).not.toMatch(/\belevated\b/);
    expect(contact).toContain("EmbedPanel");
    expect(contact).toContain("LeadForm");
    expect(book).toContain("EmbedPanel");
    expect(book).toContain("BookingCalendar");
    expect(book).toContain("LeadForm");
    expect(css).toContain("iframe.ghl-embed-frame");
    expect(embed).toContain("ghl-embed-frame");
    expect(embed).not.toMatch(/data-layout=/);
  });
});

describe("Equal Housing Opportunity mark", () => {
  it("renders an inline SVG, not next/image on the public file", () => {
    const mark = read("src/components/EqualHousingMark.tsx");
    expect(mark).toContain("<svg");
    expect(mark).toContain("fillRule=\"evenodd\"");
    expect(mark).toContain("Equal Housing Opportunity");
    expect(mark).not.toMatch(/from ["']next\/image["']/);
    expect(mark).not.toContain("equal-housing-opportunity.svg");
    expect(mark).not.toMatch(/Equal Housing Lender/i);
  });
});
