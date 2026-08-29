import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { encodeReportId } from "./dscr-codec";
import type { DscrInputs } from "./dscr";
import {
  absoluteReportUrl,
  reportPath,
  scenarioSmsBody,
  scenarioSmsHref,
} from "./share-scenario";
import { site } from "./site";

const sample: DscrInputs = {
  purchasePrice: 400_000,
  downPaymentMode: "percent",
  downPaymentValue: 25,
  monthlyGrossRent: 3200,
  occupancyType: "ltr",
  annualInterestRatePercent: 7,
  termYears: 30,
  taxes: 400,
  taxesCadence: "monthly",
  insurance: 150,
  insuranceCadence: "monthly",
  hoa: 0,
  hoaCadence: "monthly",
  vacancyPercent: 0,
  maintenancePercent: 0,
  propertyManagementPercent: 0,
  interestOnly: false,
};

function read(rel: string) {
  return readFileSync(resolve(process.cwd(), rel), "utf8");
}

describe("share scenario", () => {
  it("builds a report URL and an SMS body with key figures", () => {
    const id = encodeReportId(sample);
    const url = absoluteReportUrl(id);
    expect(reportPath(id)).toBe(`/calculator/report/${id}`);
    expect(url).toBe(`${site.url}/calculator/report/${id}`);

    const body = scenarioSmsBody(url, {
      dscrDisplay: 1.26,
      purchasePrice: 400_000,
      monthlyGrossRent: 3200,
      occupancyType: "ltr",
    });
    expect(body).toContain("DSCR 1.26");
    expect(body).toContain("Price $400,000.00");
    expect(body).toContain("Rent $3,200.00");
    expect(body).toContain("LTR");
    expect(body).toContain(url);
    expect(body).not.toMatch(/received|contact form|lead/i);

    const href = scenarioSmsHref(url, {
      dscrDisplay: 1.26,
      purchasePrice: 400_000,
      monthlyGrossRent: 3200,
      occupancyType: "ltr",
    });
    expect(href.startsWith(`sms:${site.phoneHref}?body=`)).toBe(true);
    expect(href).toContain(encodeURIComponent(url));
  });

  it("still texts the report URL when figures are missing", () => {
    const url = "https://dscr.broker/calculator/report/abc";
    expect(scenarioSmsBody(url)).toBe(`DSCR scenario\n${url}`);
  });
});

describe("share report wiring", () => {
  it("makes copy + SMS the next step on results and the report page", () => {
    const share = read("src/components/calculator/ShareReport.tsx");
    const worksheet = read("src/components/calculator/CalculatorWorksheet.tsx");
    const report = read("src/app/calculator/report/[id]/page.tsx");
    const button = read("src/components/ui/Button.tsx");

    expect(share).toContain("Share this scenario");
    expect(share).toContain("Copy link");
    expect(share).toContain("Text these numbers to {site.phoneDisplay}");
    expect(share).toContain("scenarioSmsHref");
    expect(share).toContain("Leave the scenario");
    expect(share).toContain("not a contact form");
    expect(share).toContain("CtaCluster");
    expect(share).not.toContain("/api/leads");
    expect(share).not.toMatch(/desk received|snapshot forwarded/i);
    expect(worksheet).toContain("<ShareReport");
    expect(worksheet).toContain("dscrDisplay={parsed.result.dscrDisplay}");
    expect(report).toContain("<ShareReport");
    expect(report).toContain("showOpenReport={false}");
    expect(button).toContain('href.startsWith("/")');
  });
});
