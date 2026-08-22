import Link from "next/link";
import { BookCta } from "@/components/BookCta";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { resourceLinks } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Resources",
  description:
    "Plain-language notes on DSCR, investor occupancy, entity title, and how a brokered business-purpose file actually works.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Desk notes"
        title="Read the file the way a desk reads it."
        description="Short pieces for operators. No rate shopping. No retail refinance copy."
      />
      <Container className="grid gap-4 py-12 sm:grid-cols-2">
        {resourceLinks.map((item) => (
          <Link key={item.href} href={item.href} className="group">
            <Card elevated className="h-full p-6 transition-colors duration-150 group-hover:border-muted">
              <h2 className="text-lg font-medium text-ink">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{item.summary}</p>
              <p className="mt-4 text-sm text-accent">Read →</p>
            </Card>
          </Link>
        ))}
      </Container>
      <BookCta />
    </>
  );
}
