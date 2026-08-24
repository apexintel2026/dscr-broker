import { calculateDeal, type DscrInputs, type DscrResult } from "@/lib/dscr";
import { decodeReportId } from "@/lib/dscr-codec";

export type LoadedReport = {
  inputs: DscrInputs;
  result: DscrResult;
  errors: string[];
};

/** Decode a shareable report id and re-run calculator math. Never throws. */
export function loadReport(id: string): LoadedReport | null {
  try {
    const inputs = decodeReportId(id);
    if (!inputs) return null;
    const { result, errors } = calculateDeal(inputs);
    if (!result) return null;
    return { inputs, result, errors };
  } catch {
    return null;
  }
}
