import { money, ratio } from "@/lib/format";
import { site } from "@/lib/site";

export type ScenarioShareFigures = {
  dscrDisplay?: number | null;
  purchasePrice?: number;
  monthlyGrossRent?: number;
  occupancyType?: "ltr" | "str";
};

export function reportPath(reportId: string): string {
  return `/calculator/report/${reportId}`;
}

export function absoluteReportUrl(
  reportId: string,
  origin: string = site.url,
): string {
  return `${origin}${reportPath(reportId)}`;
}

export function scenarioSmsBody(
  reportUrl: string,
  figures?: ScenarioShareFigures,
): string {
  const bits: string[] = [];
  if (
    figures?.dscrDisplay != null &&
    Number.isFinite(figures.dscrDisplay)
  ) {
    bits.push(`DSCR ${ratio(figures.dscrDisplay)}`);
  }
  if (
    figures?.purchasePrice != null &&
    Number.isFinite(figures.purchasePrice)
  ) {
    bits.push(`Price ${money(figures.purchasePrice)}`);
  }
  if (
    figures?.monthlyGrossRent != null &&
    Number.isFinite(figures.monthlyGrossRent)
  ) {
    bits.push(`Rent ${money(figures.monthlyGrossRent)}`);
  }
  if (figures?.occupancyType === "str") bits.push("STR");
  if (figures?.occupancyType === "ltr") bits.push("LTR");

  if (bits.length === 0) {
    return `DSCR scenario\n${reportUrl}`;
  }
  return `${bits.join(" · ")}\n${reportUrl}`;
}

export function scenarioSmsHref(
  reportUrl: string,
  figures?: ScenarioShareFigures,
  phoneHref: string = site.phoneHref,
): string {
  return `sms:${phoneHref}?body=${encodeURIComponent(
    scenarioSmsBody(reportUrl, figures),
  )}`;
}
