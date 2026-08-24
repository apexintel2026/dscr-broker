import { describe, expect, it } from "vitest";
import { encodeReportId } from "./dscr-codec";
import type { DscrInputs } from "./dscr";
import { loadReport } from "./report";

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

describe("loadReport", () => {
  it("returns a scored snapshot for a valid id", () => {
    const report = loadReport(encodeReportId(sample));
    expect(report).not.toBeNull();
    expect(report?.result.dscrDisplay).toBe(1.26);
  });

  it("returns null for garbage without throwing", () => {
    expect(loadReport("not-a-report")).toBeNull();
    expect(loadReport("")).toBeNull();
    expect(loadReport("%")).toBeNull();
  });

  it("returns null when decoded inputs fail validation", () => {
    expect(loadReport(encodeReportId({ ...sample, purchasePrice: 0 }))).toBeNull();
  });

  it("allows zero rent (weak coverage) without crashing", () => {
    const report = loadReport(
      encodeReportId({ ...sample, monthlyGrossRent: 0 }),
    );
    expect(report).not.toBeNull();
    expect(report?.result.lenderDscr).toBe(0);
    expect(report?.result.dscrBand).toBe("weak");
  });
});
