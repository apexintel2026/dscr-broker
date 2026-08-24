import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { OccupancyType } from "@/lib/dscr";
import { niches } from "@/lib/niches";
import { calculatorEducationLinks } from "@/lib/resources";

export function EducationLinks({
  occupancyType,
}: {
  occupancyType: OccupancyType;
}) {
  const links = calculatorEducationLinks(occupancyType);
  const niche = niches.find((item) => item.occupancyType === occupancyType);

  return (
    <Card className="p-6">
      <h3 className="text-sm font-medium text-ink">
        {occupancyType === "str"
          ? "STR desk notes for this worksheet"
          : "Desk notes for this worksheet"}
      </h3>
      <ul className="mt-3 space-y-2">
        {niche ? (
          <li>
            <Link
              href={niche.href}
              className="text-sm text-accent hover:underline"
            >
              {niche.name} →
            </Link>
          </li>
        ) : null}
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-accent hover:underline"
            >
              {link.title} →
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
