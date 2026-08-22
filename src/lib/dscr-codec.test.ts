import { describe, expect, it } from "vitest";
import { calculateDeal, type DscrInputs } from "./dscr";
import { decodeReportId, encodeReportId } from "./dscr-codec";

const sample: DscrInputs = {
  purchasePrice: 400_000,
  downPaymentMode: "amount",
  downPaymentValue: 100_000,
  monthlyGrossRent: 3200,
  occupancyType: "str",
  annualInterestRatePercent: 7.25,
  termYears: 30,
  taxes: 4800,
  taxesCadence: "annual",
  insurance: 150,
  insuranceCadence: "monthly",
  hoa: 0,
  hoaCadence: "monthly",
  vacancyPercent: 5,
  maintenancePercent: 3,
  propertyManagementPercent: 8,
  interestOnly: true,
};

describe("report id codec", () => {
  it("round-trips inputs and keeps calculated numbers identical", () => {
    const id = encodeReportId(sample);
    const decoded = decodeReportId(id);
    expect(decoded).toEqual(sample);
    expect(calculateDeal(sample).result).toEqual(calculateDeal(decoded!).result);
  });

  it("returns null for garbage", () => {
    expect(decodeReportId("not-a-report")).toBeNull();
    expect(decodeReportId("")).toBeNull();
  });
});
