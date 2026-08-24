/**
 * Public feature flags. NEXT_PUBLIC_* values are inlined at build time.
 */

/** Calculator "Send snapshot" / LeadCapture. Default off — Phase 5 webhook is paused. */
export function isCalculatorLeadCaptureEnabled(): boolean {
  return process.env.NEXT_PUBLIC_CALCULATOR_LEAD_CAPTURE === "true";
}
