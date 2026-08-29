import Link from "next/link";
import { BookCta } from "@/components/BookCta";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { niches } from "@/lib/niches";
import { partners } from "@/lib/partners";
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
        description="Operator notes on DSCR, occupancy, entity, and STR. No rate shopping. No retail refinance copy."
      />
      <Container className="space-y-10 py-12">
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-ink">Niches</h2>
          <ul
            className={`grid gap-4 ${niches.length > 1 ? "sm:grid-cols-2" : ""}`}
          >
            {niches.map((niche) => (
              <li key={niche.slug}>
                <Link href={niche.href} className="group block h-full">
                  <Card
                    elevated
                    className="h-full p-6 transition-colors duration-150 group-hover:border-muted"
                  >
                    <Badge tone="accent">{niche.navLabel}</Badge>
                    <h3 className="mt-3 text-lg font-medium text-ink">
                      {niche.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      {niche.seo.description}
                    </p>
                    <p className="mt-4 text-sm text-accent">Open landing →</p>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-ink">Partners</h2>
          <ul
            className={`grid gap-4 ${partners.length > 1 ? "sm:grid-cols-2" : ""}`}
          >
            {partners.map((partner) => (
              <li key={partner.slug}>
                <Link href={partner.href} className="group block h-full">
                  <Card
                    elevated
                    className="h-full p-6 transition-colors duration-150 group-hover:border-muted"
                  >
                    <Badge tone="accent">{partner.hubLabel}</Badge>
                    <h3 className="mt-3 text-lg font-medium text-ink">
                      {partner.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      {partner.seo.description}
                    </p>
                    <p className="mt-4 text-sm text-accent">Open landing →</p>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-ink">Desk notes</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {resourceLinks.map((item) => (
              <Link key={item.href} href={item.href} className="group">
                <Card elevated className="h-full p-6 transition-colors duration-150 group-hover:border-muted">
                  <h3 className="text-lg font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.summary}</p>
                  <p className="mt-4 text-sm text-accent">Read →</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Container>
      <BookCta />
    </>
  );
}
