import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { OccupancyType } from "@/lib/dscr";
import { calculatorEducationLinks } from "@/lib/resources";

export function EducationLinks({
  occupancyType,
}: {
  occupancyType: OccupancyType;
}) {
  const links = calculatorEducationLinks(occupancyType);

  return (
    <Card className="p-6">
      <p className="text-sm font-medium text-ink">
        {occupancyType === "str"
          ? "STR desk notes for this worksheet"
          : "Desk notes for this worksheet"}
      </p>
      <ul className="mt-3 space-y-2">
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
