/**
 * Single-property DSCR math for dscr.broker.
 *
 * This module is UI-free on purpose. Content/Growth pages must import these
 * functions instead of forking formulas.
 *
 * Lender DSCR (qualification number):
 *   Gross Monthly Rent ÷ Monthly PITIA
 *
 * PITIA (amortizing, default):
 *   Principal + Interest + monthly Taxes + monthly Insurance + monthly HOA
 *
 * ITIA (interest-only toggle):
 *   Interest + monthly Taxes + monthly Insurance + monthly HOA
 *   (no principal — label ITIA, never call it PITIA)
 *
 * Investor cash flow is display-only and is NOT the lender DSCR:
 *   Rent − PITIA/ITIA − optional vacancy/maint/PM (% of rent)
 */

export const STRONG_DSCR = 1.25;
export const ACCEPTABLE_DSCR = 1.0;
export const TYPICAL_LTV = 0.75;

export type OccupancyType = "ltr" | "str";
export type AmountCadence = "monthly" | "annual";
export type DownPaymentMode = "percent" | "amount";
export type DscrBand = "strong" | "acceptable" | "weak";
export type BindingConstraint = "none" | "ratio" | "ltv" | "ratio_and_ltv";
export type DebtServiceLabel = "PITIA" | "ITIA";

export type DscrInputs = {
  purchasePrice: number;
  downPaymentMode: DownPaymentMode;
  /** Percent 0–100 when mode is `percent`; dollars when mode is `amount`. */
  downPaymentValue: number;
  monthlyGrossRent: number;
  occupancyType: OccupancyType;
  /** Annual rate as entered by the user (7.25 means 7.25%). Never a quoted rate. */
  annualInterestRatePercent: number;
  termYears: number;
  taxes: number;
  taxesCadence: AmountCadence;
  insurance: number;
  insuranceCadence: AmountCadence;
  hoa: number;
  hoaCadence: AmountCadence;
  vacancyPercent: number;
  maintenancePercent: number;
  propertyManagementPercent: number;
  interestOnly: boolean;
};

export type DscrResult = {
  downPayment: number;
  loanAmount: number;
  ltv: number | null;
  monthlyPrincipalAndInterest: number;
  monthlyInterest: number;
  monthlyDebtService: number;
  taxesMonthly: number;
  insuranceMonthly: number;
  hoaMonthly: number;
  monthlyPitia: number;
  debtServiceLabel: DebtServiceLabel;
  lenderDscr: number | null;
  dscrDisplay: number | null;
  dscrBand: DscrBand | null;
  investorCashFlowMonthly: number;
  vacancyMonthly: number;
  maintenanceMonthly: number;
  propertyManagementMonthly: number;
  cashOnCashAnnual: number | null;
  rentNeededFor1_00: number | null;
  rentNeededFor1_25: number | null;
  typicalLtvMax: number;
  ltvExceedsTypical: boolean;
  bindingConstraint: BindingConstraint;
  occupancyType: OccupancyType;
  rentIsProjection: boolean;
};

export function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}

export function roundRatio(value: number): number {
  return Math.round(value * 100) / 100;
}

export function normalizeMonthly(
  amount: number,
  cadence: AmountCadence,
): number {
  if (!Number.isFinite(amount) || amount < 0) return 0;
  return cadence === "annual" ? amount / 12 : amount;
}

/**
 * Standard US fully-amortizing monthly P&I.
 *
 * M = P · r · (1+r)^n / ((1+r)^n − 1)
 * r = annualRate / 12, n = termYears · 12
 * If r = 0, M = P / n.
 */
export function monthlyPrincipalAndInterest(
  loanAmount: number,
  annualInterestRatePercent: number,
  termYears: number,
): number {
  if (loanAmount <= 0 || termYears <= 0) return 0;
  const n = termYears * 12;
  const r = annualInterestRatePercent / 100 / 12;
  if (r === 0) return loanAmount / n;
  const factor = (1 + r) ** n;
  return (loanAmount * r * factor) / (factor - 1);
}

/** Monthly interest-only payment: P · (annualRate / 12). */
export function monthlyInterestOnly(
  loanAmount: number,
  annualInterestRatePercent: number,
): number {
  if (loanAmount <= 0) return 0;
  return loanAmount * (annualInterestRatePercent / 100 / 12);
}

export function resolveLoan(
  purchasePrice: number,
  downPaymentMode: DownPaymentMode,
  downPaymentValue: number,
): { downPayment: number; loanAmount: number; ltv: number | null } {
  const price = Number.isFinite(purchasePrice) ? Math.max(0, purchasePrice) : 0;
  const raw = Number.isFinite(downPaymentValue) ? Math.max(0, downPaymentValue) : 0;
  const downPayment =
    downPaymentMode === "percent" ? (price * raw) / 100 : Math.min(raw, price);
  const loanAmount = Math.max(0, price - downPayment);
  const ltv = price > 0 ? loanAmount / price : null;
  return {
    downPayment: roundCents(downPayment),
    loanAmount: roundCents(loanAmount),
    ltv,
  };
}

export function lenderDscr(
  grossMonthlyRent: number,
  monthlyPitia: number,
): number | null {
  if (monthlyPitia <= 0) return null;
  return grossMonthlyRent / monthlyPitia;
}

export function dscrBand(dscrDisplay: number | null): DscrBand | null {
  if (dscrDisplay === null) return null;
  if (dscrDisplay >= STRONG_DSCR) return "strong";
  if (dscrDisplay >= ACCEPTABLE_DSCR) return "acceptable";
  return "weak";
}

export function rentNeededForDscr(
  monthlyPitia: number,
  targetDscr: number,
): number | null {
  if (monthlyPitia <= 0) return null;
  return roundCents(monthlyPitia * targetDscr);
}

export function investorCashFlowMonthly(args: {
  monthlyGrossRent: number;
  monthlyPitia: number;
  vacancyPercent: number;
  maintenancePercent: number;
  propertyManagementPercent: number;
}): {
  cashFlow: number;
  vacancyMonthly: number;
  maintenanceMonthly: number;
  propertyManagementMonthly: number;
} {
  const rent = Math.max(0, args.monthlyGrossRent);
  const vacancyMonthly = roundCents(rent * (Math.max(0, args.vacancyPercent) / 100));
  const maintenanceMonthly = roundCents(
    rent * (Math.max(0, args.maintenancePercent) / 100),
  );
  const propertyManagementMonthly = roundCents(
    rent * (Math.max(0, args.propertyManagementPercent) / 100),
  );
  const cashFlow = roundCents(
    rent -
      args.monthlyPitia -
      vacancyMonthly -
      maintenanceMonthly -
      propertyManagementMonthly,
  );
  return {
    cashFlow,
    vacancyMonthly,
    maintenanceMonthly,
    propertyManagementMonthly,
  };
}

export function cashOnCashAnnual(
  monthlyCashFlow: number,
  downPayment: number,
): number | null {
  if (downPayment <= 0) return null;
  return (monthlyCashFlow * 12) / downPayment;
}

export function bindingConstraint(
  band: DscrBand | null,
  ltv: number | null,
  typicalLtvMax = TYPICAL_LTV,
): BindingConstraint {
  const ratioBinds = band !== null && band !== "strong";
  const ltvBinds = ltv !== null && ltv > typicalLtvMax + 1e-9;
  if (ratioBinds && ltvBinds) return "ratio_and_ltv";
  if (ratioBinds) return "ratio";
  if (ltvBinds) return "ltv";
  return "none";
}

export function validateDscrInputs(inputs: DscrInputs): string[] {
  const errors: string[] = [];
  if (!Number.isFinite(inputs.purchasePrice) || inputs.purchasePrice <= 0) {
    errors.push("Purchase price must be greater than 0.");
  }
  if (!Number.isFinite(inputs.monthlyGrossRent) || inputs.monthlyGrossRent < 0) {
    errors.push("Monthly rent cannot be negative.");
  }
  if (
    !Number.isFinite(inputs.annualInterestRatePercent) ||
    inputs.annualInterestRatePercent < 0
  ) {
    errors.push("Interest rate estimate cannot be negative.");
  }
  if (!inputs.interestOnly && (!Number.isFinite(inputs.termYears) || inputs.termYears <= 0)) {
    errors.push("Term (years) is required for an amortizing payment.");
  }
  if (
    inputs.downPaymentMode === "percent" &&
    Number.isFinite(inputs.downPaymentValue) &&
    inputs.downPaymentValue > 100
  ) {
    errors.push("Down payment percent cannot exceed 100.");
  }
  return errors;
}

export function calculateDeal(inputs: DscrInputs): {
  errors: string[];
  result: DscrResult | null;
} {
  const errors = validateDscrInputs(inputs);
  if (errors.length > 0) {
    return { errors, result: null };
  }

  const { downPayment, loanAmount, ltv } = resolveLoan(
    inputs.purchasePrice,
    inputs.downPaymentMode,
    inputs.downPaymentValue,
  );

  const monthlyInterest = roundCents(
    monthlyInterestOnly(loanAmount, inputs.annualInterestRatePercent),
  );
  const monthlyPi = inputs.interestOnly
    ? 0
    : roundCents(
        monthlyPrincipalAndInterest(
          loanAmount,
          inputs.annualInterestRatePercent,
          inputs.termYears,
        ),
      );
  const monthlyDebtService = inputs.interestOnly ? monthlyInterest : monthlyPi;
  const taxesMonthly = roundCents(
    normalizeMonthly(inputs.taxes, inputs.taxesCadence),
  );
  const insuranceMonthly = roundCents(
    normalizeMonthly(inputs.insurance, inputs.insuranceCadence),
  );
  const hoaMonthly = roundCents(normalizeMonthly(inputs.hoa, inputs.hoaCadence));
  const monthlyPitia = roundCents(
    monthlyDebtService + taxesMonthly + insuranceMonthly + hoaMonthly,
  );
  const debtServiceLabel: DebtServiceLabel = inputs.interestOnly ? "ITIA" : "PITIA";

  const rawDscr = lenderDscr(inputs.monthlyGrossRent, monthlyPitia);
  const dscrDisplay = rawDscr === null ? null : roundRatio(rawDscr);
  const band = dscrBand(dscrDisplay);

  const cash = investorCashFlowMonthly({
    monthlyGrossRent: inputs.monthlyGrossRent,
    monthlyPitia,
    vacancyPercent: inputs.vacancyPercent,
    maintenancePercent: inputs.maintenancePercent,
    propertyManagementPercent: inputs.propertyManagementPercent,
  });

  const result: DscrResult = {
    downPayment,
    loanAmount,
    ltv,
    monthlyPrincipalAndInterest: monthlyPi,
    monthlyInterest,
    monthlyDebtService,
    taxesMonthly,
    insuranceMonthly,
    hoaMonthly,
    monthlyPitia,
    debtServiceLabel,
    lenderDscr: rawDscr,
    dscrDisplay,
    dscrBand: band,
    investorCashFlowMonthly: cash.cashFlow,
    vacancyMonthly: cash.vacancyMonthly,
    maintenanceMonthly: cash.maintenanceMonthly,
    propertyManagementMonthly: cash.propertyManagementMonthly,
    cashOnCashAnnual: cashOnCashAnnual(cash.cashFlow, downPayment),
    rentNeededFor1_00: rentNeededForDscr(monthlyPitia, ACCEPTABLE_DSCR),
    rentNeededFor1_25: rentNeededForDscr(monthlyPitia, STRONG_DSCR),
    typicalLtvMax: TYPICAL_LTV,
    ltvExceedsTypical: ltv !== null && ltv > TYPICAL_LTV + 1e-9,
    bindingConstraint: bindingConstraint(band, ltv),
    occupancyType: inputs.occupancyType,
    rentIsProjection: inputs.occupancyType === "str",
  };

  return { errors: [], result };
}

export function guidanceForBand(band: DscrBand | null): string {
  if (band === "strong") {
    return "Likely more programs to desk. Coverage is in a range capital sources commonly look at. This is not a credit decision.";
  }
  if (band === "acceptable") {
    return "Borderline. Some programs look here; others want 1.25+. A call is the next step — not a decision.";
  }
  if (band === "weak") {
    return "Needs higher rent or a lower price / payment. Coverage is below 1.00 on this estimate.";
  }
  return "Enter a deal to see coverage. Nothing here is a quote or a credit decision.";
}
