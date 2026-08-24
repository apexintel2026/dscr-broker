import { describe, expect, it } from "vitest";
import {
  ACCEPTABLE_DSCR,
  LENDER_DSCR_FORMULA,
  STRONG_DSCR,
  TYPICAL_LTV,
  bindingConstraint,
  calculateDeal,
  cashOnCashAnnual,
  dscrBand,
  investorCashFlowMonthly,
  lenderDscr,
  monthlyInterestOnly,
  monthlyPrincipalAndInterest,
  normalizeMonthly,
  rentNeededForDscr,
  resolveLoan,
  roundCents,
  type DscrInputs,
} from "./dscr";

/** Independently computed: $300,000 @ 7.00% / 30 years. */
const PI_300K_7_30 = 1995.91;

function baseInputs(overrides: Partial<DscrInputs> = {}): DscrInputs {
  return {
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
    ...overrides,
  };
}

describe("monthlyPrincipalAndInterest", () => {
  it("matches the standard US amortizing payment for $300k at 7% / 30 years", () => {
    expect(roundCents(monthlyPrincipalAndInterest(300_000, 7, 30))).toBe(
      PI_300K_7_30,
    );
  });

  it("uses P / n when the rate is 0%", () => {
    expect(roundCents(monthlyPrincipalAndInterest(300_000, 0, 30))).toBe(833.33);
  });

  it("returns 0 for a zero loan or term", () => {
    expect(monthlyPrincipalAndInterest(0, 7, 30)).toBe(0);
    expect(monthlyPrincipalAndInterest(300_000, 7, 0)).toBe(0);
  });
});

describe("monthlyInterestOnly", () => {
  it("is P × annualRate / 12", () => {
    expect(monthlyInterestOnly(300_000, 7)).toBe(1750);
  });
});

describe("resolveLoan", () => {
  it("supports percent down", () => {
    expect(resolveLoan(400_000, "percent", 25)).toEqual({
      downPayment: 100_000,
      loanAmount: 300_000,
      ltv: 0.75,
    });
  });

  it("supports dollar down", () => {
    expect(resolveLoan(400_000, "amount", 80_000)).toEqual({
      downPayment: 80_000,
      loanAmount: 320_000,
      ltv: 0.8,
    });
  });
});

describe("normalizeMonthly", () => {
  it("divides annual amounts by 12", () => {
    expect(normalizeMonthly(4800, "annual")).toBe(400);
    expect(normalizeMonthly(400, "monthly")).toBe(400);
  });
});

describe("lender DSCR vs investor cash flow", () => {
  it("uses gross rent ÷ PITIA and does not mix vacancy into lender DSCR", () => {
    expect(lenderDscr(3200, 2545.91)).toBeCloseTo(3200 / 2545.91, 8);
    const cash = investorCashFlowMonthly({
      monthlyGrossRent: 3200,
      monthlyPitia: 2545.91,
      vacancyPercent: 5,
      maintenancePercent: 5,
      propertyManagementPercent: 8,
    });
    expect(cash.vacancyMonthly).toBe(160);
    expect(cash.maintenanceMonthly).toBe(160);
    expect(cash.propertyManagementMonthly).toBe(256);
    expect(cash.cashFlow).toBe(roundCents(3200 - 2545.91 - 160 - 160 - 256));
    expect(lenderDscr(3200, 2545.91)).not.toBe(cash.cashFlow);
  });
});

describe("bands and rent needed", () => {
  it("bands on the displayed two-decimal ratio", () => {
    expect(dscrBand(1.25)).toBe("strong");
    expect(dscrBand(1.24)).toBe("acceptable");
    expect(dscrBand(1.0)).toBe("acceptable");
    expect(dscrBand(0.99)).toBe("weak");
    expect(dscrBand(null)).toBe(null);
  });

  it("computes rent needed at 1.00 and 1.25", () => {
    expect(rentNeededForDscr(2545.91, ACCEPTABLE_DSCR)).toBe(2545.91);
    expect(rentNeededForDscr(2545.91, STRONG_DSCR)).toBe(3182.39);
  });
});

describe("calculateDeal — amortizing LTR", () => {
  it("example A: 25% down, 7% / 30, $3,200 rent → strong", () => {
    const { errors, result } = calculateDeal(baseInputs());
    expect(errors).toEqual([]);
    expect(result).not.toBeNull();
    if (!result) return;

    expect(result.loanAmount).toBe(300_000);
    expect(result.monthlyPrincipalAndInterest).toBe(PI_300K_7_30);
    expect(result.monthlyPitia).toBe(roundCents(PI_300K_7_30 + 400 + 150));
    expect(result.debtServiceLabel).toBe("PITIA");
    expect(result.dscrDisplay).toBe(1.26);
    expect(result.dscrBand).toBe("strong");
    expect(result.rentIsProjection).toBe(false);
    expect(result.ltv).toBeCloseTo(TYPICAL_LTV, 8);
    expect(result.ltvExceedsTypical).toBe(false);
    expect(result.bindingConstraint).toBe("none");
    expect(result.rentNeededFor1_00).toBe(result.monthlyPitia);
    expect(result.rentNeededFor1_25).toBe(roundCents(result.monthlyPitia * 1.25));
    expect(result.investorCashFlowMonthly).toBe(
      roundCents(3200 - result.monthlyPitia),
    );
    expect(result.cashOnCashAnnual).toBeCloseTo(
      cashOnCashAnnual(result.investorCashFlowMonthly, 100_000) ?? 0,
      8,
    );
  });
});

describe("calculateDeal — interest-only", () => {
  it("example B: same deal on IO uses ITIA, not PITIA", () => {
    const { result } = calculateDeal(baseInputs({ interestOnly: true }));
    expect(result).not.toBeNull();
    if (!result) return;

    expect(result.monthlyInterest).toBe(1750);
    expect(result.monthlyPrincipalAndInterest).toBe(0);
    expect(result.monthlyDebtService).toBe(1750);
    expect(result.monthlyPitia).toBe(2300);
    expect(result.debtServiceLabel).toBe("ITIA");
    expect(result.lenderDscr).toBeCloseTo(3200 / 2300, 8);
    expect(result.dscrDisplay).toBe(1.39);
    expect(result.dscrBand).toBe("strong");
    expect(result.rentNeededFor1_00).toBe(2300);
    expect(result.rentNeededFor1_25).toBe(2875);
  });
});

describe("calculateDeal — STR weak + LTV", () => {
  it("example C: STR projection, 80% LTV, coverage below 1.00", () => {
    const { result } = calculateDeal(
      baseInputs({
        purchasePrice: 350_000,
        downPaymentMode: "percent",
        downPaymentValue: 20,
        monthlyGrossRent: 2200,
        occupancyType: "str",
        annualInterestRatePercent: 7.5,
        taxes: 350,
        insurance: 120,
        hoa: 75,
        vacancyPercent: 10,
        maintenancePercent: 5,
        propertyManagementPercent: 10,
      }),
    );
    expect(result).not.toBeNull();
    if (!result) return;

    const expectedPi = roundCents(monthlyPrincipalAndInterest(280_000, 7.5, 30));
    expect(result.loanAmount).toBe(280_000);
    expect(result.monthlyPrincipalAndInterest).toBe(expectedPi);
    expect(result.monthlyPitia).toBe(roundCents(expectedPi + 350 + 120 + 75));
    expect(result.rentIsProjection).toBe(true);
    expect(result.occupancyType).toBe("str");
    expect(result.dscrBand).toBe("weak");
    expect(result.dscrDisplay).not.toBeNull();
    expect(result.dscrDisplay ?? 0).toBeLessThan(1);
    expect(result.ltvExceedsTypical).toBe(true);
    expect(result.bindingConstraint).toBe("ratio_and_ltv");
    expect(result.lenderDscr).toBeCloseTo(2200 / result.monthlyPitia, 8);
    expect(result.investorCashFlowMonthly).toBe(
      roundCents(
        2200 -
          result.monthlyPitia -
          220 -
          110 -
          220,
      ),
    );
  });
});

describe("bindingConstraint", () => {
  it("names ratio, LTV, both, or neither", () => {
    expect(bindingConstraint("strong", 0.75)).toBe("none");
    expect(bindingConstraint("acceptable", 0.75)).toBe("ratio");
    expect(bindingConstraint("strong", 0.8)).toBe("ltv");
    expect(bindingConstraint("weak", 0.8)).toBe("ratio_and_ltv");
  });
});

describe("calculateDeal validation", () => {
  it("requires a purchase price", () => {
    const { errors, result } = calculateDeal(baseInputs({ purchasePrice: 0 }));
    expect(result).toBeNull();
    expect(errors.length).toBeGreaterThan(0);
  });

  it("zero rent still returns a result and does not throw", () => {
    const { errors, result } = calculateDeal(
      baseInputs({ monthlyGrossRent: 0 }),
    );
    expect(errors).toEqual([]);
    expect(result).not.toBeNull();
    expect(result?.lenderDscr).toBe(0);
    expect(result?.dscrDisplay).toBe(0);
    expect(result?.dscrBand).toBe("weak");
  });
});

describe("LENDER_DSCR_FORMULA", () => {
  it("states rent ÷ PITIA/ITIA and nothing else", () => {
    expect(LENDER_DSCR_FORMULA).toBe(
      "Gross Monthly Rent ÷ Monthly PITIA (or ITIA if IO)",
    );
  });
});
