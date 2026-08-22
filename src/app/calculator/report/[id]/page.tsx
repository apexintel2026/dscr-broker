import { BookCta } from "@/components/BookCta";
import { ComingSoon } from "@/components/ComingSoon";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return buildMetadata({
    title: `Deal report ${id}`,
    description:
      "Placeholder DSCR report route. Phase 2 will render a desk-ready snapshot for a specific deal id.",
    path: `/calculator/report/${id}`,
  });
}

export default async function CalculatorReportPage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <PageHero
        eyebrow="Report"
        title="Deal report"
        description="This route will host a shareable, desk-ready snapshot. The id is live so Phase 2 can drop in without a new page."
      />

      <Container className="space-y-6 py-12">
        <Card className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">
              Report id
            </p>
            <p className="font-mono text-lg text-ink">{id}</p>
          </div>
          <p className="text-sm text-muted">Not a credit decision. Not a quote.</p>
        </Card>
        <ComingSoon
          title="Live reports ship in Phase 2"
          body="PDF export, DSCR math, and a capital-source-ready summary will land here. Book a 30-minute call if you need a file reviewed now."
        />
      </Container>

      <BookCta />
    </>
  );
}
