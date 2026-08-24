import type { OccupancyType } from "@/lib/dscr";

/**
 * Occupancy default for /calculator. Unknown or missing → LTR.
 * Niche landings deep-link with `?occupancy=str` (or `ltr`).
 */
export function occupancyFromQuery(
  value: string | string[] | undefined,
): OccupancyType {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "str" || raw === "ltr") return raw;
  return "ltr";
}

export function calculatorHref(occupancy: OccupancyType = "ltr"): string {
  return occupancy === "ltr"
    ? "/calculator"
    : `/calculator?occupancy=${occupancy}`;
}
