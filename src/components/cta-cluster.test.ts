import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

function read(rel: string) {
  return readFileSync(resolve(process.cwd(), rel), "utf8");
}

describe("stacked CTA alignment", () => {
  it("keeps Book and Call me now in a stretch column of equal width", () => {
    const cluster = read("src/components/CtaCluster.tsx");
    expect(cluster).toContain("flex-col");
    expect(cluster).toContain("items-stretch");
    expect(cluster).toContain('href={bookHref}');
    expect(cluster).toContain('bookHref = "/book"');
    expect(cluster).toContain('className="w-full"');
  });

  it("stretches Call me now to the cluster width and keeps the contact form destination", () => {
    const call = read("src/components/CallMeNow.tsx");
    expect(call).toContain('export const CONTACT_FORM_HREF = "/contact#form"');
    expect(call).toContain("w-full");
    expect(call).not.toContain("sm:w-auto");
    expect(call).toContain("Leave your number. We will call you.");
  });

  it("uses the shared cluster in every stacked Book + Call me now site", () => {
    expect(read("src/components/BookCta.tsx")).toContain("CtaCluster");
    expect(read("src/components/BookCta.tsx")).not.toContain("items-end");
    expect(read("src/app/page.tsx")).toContain("CtaCluster");
    expect(read("src/components/NicheLanding.tsx")).toContain("CtaCluster");
    expect(read("src/components/PartnerLanding.tsx")).toContain("CtaCluster");
    expect(read("src/components/calculator/DealSummary.tsx")).toContain(
      "CtaCluster",
    );
  });
});
