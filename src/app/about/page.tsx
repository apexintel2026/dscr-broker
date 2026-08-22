import { BookCta } from "@/components/BookCta";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "dscr.broker is an investor loan desk. We broker DSCR and business-purpose files. We are not a lender and we do not fund loans.",
  path: "/about",
});

const points = [
  {
    title: "Broker, not a lender",
    body: "We desk investor files and introduce them to capital sources. Credit decisions and funding sit with those sources.",
  },
  {
    title: "Business purpose only",
    body: "Non-owner-occupied investment property. If you need a primary-residence loan, this is the wrong desk.",
  },
  {
    title: "Operator to operator",
    body: "Bring the deal, not a pre-qualification fantasy. We will tell you if the file is worth running.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`${site.name} is the investor loan desk.`}
        description="A focused brokerage for DSCR and business-purpose investor loans. The KPI is a 30-minute strategy call — not a lead form that pretends to be a decision."
      />
      <Container className="grid gap-4 py-12 md:grid-cols-3">
        {points.map((item) => (
          <Card key={item.title} elevated className="p-6">
            <h2 className="font-medium text-ink">{item.title}</h2>
            <p className="mt-2 text-sm text-muted">{item.body}</p>
          </Card>
        ))}
      </Container>
      <BookCta />
    </>
  );
}
