import { site } from "@/lib/site";
import type { DscrInputs, DscrResult } from "@/lib/dscr";

/**
 * Flattened HighLevel / Phase 0 calculator lead payload.
 * No arrays. Keys stay snake_case so the webhook schema is stable.
 */
export type LeadContact = {
  first_name: string;
  email: string;
  phone: string;
};

export type CalculatorLeadPayload = {
  first_name: string;
  email: string;
  phone: string;
  source: "calculator";
  niche: "core";
  occupancy_type: "ltr" | "str";
  rent_is_projection: "yes" | "no";
  purchase_price: number;
  down_payment: number;
  down_payment_percent: number;
  down_payment_mode: "percent" | "amount";
  loan_amount: number;
  ltv: number | "";
  monthly_gross_rent: number;
  interest_rate_estimate: number;
  term_years: number;
  interest_only: "yes" | "no";
  taxes_monthly: number;
  insurance_monthly: number;
  hoa_monthly: number;
  vacancy_percent: number;
  maintenance_percent: number;
  property_management_percent: number;
  monthly_pi: number;
  monthly_interest: number;
  monthly_debt_service: number;
  monthly_pitia: number;
  debt_service_label: "PITIA" | "ITIA";
  lender_dscr: number | "";
  dscr_display: number | "";
  dscr_band: "strong" | "acceptable" | "weak" | "";
  investor_cash_flow_monthly: number;
  cash_on_cash_annual: number | "";
  rent_needed_1_00: number | "";
  rent_needed_1_25: number | "";
  typical_ltv_max: number;
  ltv_exceeds_typical: "yes" | "no";
  binding_constraint: "none" | "ratio" | "ltv" | "ratio_and_ltv";
  report_id: string;
  report_url: string;
};

export function buildReportUrl(reportId: string, origin: string = site.url): string {
  return `${origin.replace(/\/$/, "")}/calculator/report/${reportId}`;
}

export function buildLeadPayload(args: {
  contact: LeadContact;
  inputs: DscrInputs;
  result: DscrResult;
  reportId: string;
  origin?: string;
}): CalculatorLeadPayload {
  const { contact, inputs, result, reportId } = args;
  const downPercent =
    inputs.purchasePrice > 0
      ? (result.downPayment / inputs.purchasePrice) * 100
      : 0;

  return {
    first_name: contact.first_name.trim(),
    email: contact.email.trim(),
    phone: contact.phone.trim(),
    source: "calculator",
    niche: "core",
    occupancy_type: inputs.occupancyType,
    rent_is_projection: result.rentIsProjection ? "yes" : "no",
    purchase_price: inputs.purchasePrice,
    down_payment: result.downPayment,
    down_payment_percent: Math.round(downPercent * 100) / 100,
    down_payment_mode: inputs.downPaymentMode,
    loan_amount: result.loanAmount,
    ltv: result.ltv === null ? "" : Math.round(result.ltv * 10000) / 10000,
    monthly_gross_rent: inputs.monthlyGrossRent,
    interest_rate_estimate: inputs.annualInterestRatePercent,
    term_years: inputs.termYears,
    interest_only: inputs.interestOnly ? "yes" : "no",
    taxes_monthly: result.taxesMonthly,
    insurance_monthly: result.insuranceMonthly,
    hoa_monthly: result.hoaMonthly,
    vacancy_percent: inputs.vacancyPercent,
    maintenance_percent: inputs.maintenancePercent,
    property_management_percent: inputs.propertyManagementPercent,
    monthly_pi: result.monthlyPrincipalAndInterest,
    monthly_interest: result.monthlyInterest,
    monthly_debt_service: result.monthlyDebtService,
    monthly_pitia: result.monthlyPitia,
    debt_service_label: result.debtServiceLabel,
    lender_dscr: result.lenderDscr === null ? "" : result.lenderDscr,
    dscr_display: result.dscrDisplay === null ? "" : result.dscrDisplay,
    dscr_band: result.dscrBand ?? "",
    investor_cash_flow_monthly: result.investorCashFlowMonthly,
    cash_on_cash_annual:
      result.cashOnCashAnnual === null ? "" : result.cashOnCashAnnual,
    rent_needed_1_00: result.rentNeededFor1_00 ?? "",
    rent_needed_1_25: result.rentNeededFor1_25 ?? "",
    typical_ltv_max: result.typicalLtvMax,
    ltv_exceeds_typical: result.ltvExceedsTypical ? "yes" : "no",
    binding_constraint: result.bindingConstraint,
    report_id: reportId,
    report_url: buildReportUrl(reportId, args.origin ?? site.url),
  };
}
