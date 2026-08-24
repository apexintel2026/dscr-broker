import type { OccupancyType } from "@/lib/dscr";
import { resourceLinks } from "@/lib/site";

export type ResourceLink = (typeof resourceLinks)[number];

function pick(hrefs: readonly string[]): ResourceLink[] {
  return hrefs
    .map((href) => resourceLinks.find((item) => item.href === href))
    .filter((item): item is ResourceLink => item != null);
}

export function relatedResources(path: string): ResourceLink[] {
  const current = resourceLinks.find((item) => item.href === path);
  if (!current) return [];
  return pick(current.related);
}

/**
 * 1–3 education links from calculator results.
 * STR occupancy surfaces the STR article; otherwise what-is-dscr + requirements.
 */
export function calculatorEducationLinks(
  occupancyType: OccupancyType,
): ResourceLink[] {
  if (occupancyType === "str") {
    return pick([
      "/resources/short-term-rentals",
      "/resources/what-is-dscr",
      "/resources/requirements",
    ]);
  }
  return pick(["/resources/what-is-dscr", "/resources/requirements"]);
}
