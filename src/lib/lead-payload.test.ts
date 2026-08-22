import { describe, expect, it } from "vitest";
import { calculateDeal, type DscrInputs } from "./dscr";
import { encodeReportId } from "./dscr-codec";
import { buildLeadPayload } from "./lead-payload";

describe("buildLeadPayload", () => {
  it("is flat, snake_case, and stamped calculator/core", () => {
    const inputs: DscrInputs = {
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
    const { result } = calculateDeal(inputs);
    const reportId = encodeReportId(inputs);
    const payload = buildLeadPayload({
      contact: { first_name: "Dee", email: "dee@example.com", phone: "" },
      inputs,
      result: result!,
      reportId,
      origin: "https://dscr.broker",
    });

    expect(payload.source).toBe("calculator");
    expect(payload.niche).toBe("core");
    expect(payload.occupancy_type).toBe("ltr");
    expect(payload.rent_is_projection).toBe("no");
    expect(payload.dscr_band).toBe("strong");
    expect(payload.report_url).toBe(
      `https://dscr.broker/calculator/report/${reportId}`,
    );
    expect(Array.isArray(payload)).toBe(false);
    expect(Object.values(payload).some((value) => Array.isArray(value))).toBe(
      false,
    );
  });
});
