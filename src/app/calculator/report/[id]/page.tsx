import Link from "next/link";
import { notFound } from "next/navigation";
import { DealSummary } from "@/components/calculator/DealSummary";
import { BookCta } from "@/components/BookCta";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { calculateDeal } from "@/lib/dscr";
import { decodeReportId } from "@/lib/dscr-codec";
import { money } from "@/lib/format";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const inputs = decodeReportId(id);
  const result = inputs ? calculateDeal(inputs).result : null;
  return buildMetadata({
    title: result
      ? `Deal score ${result.dscrDisplay?.toFixed(2) ?? "—"}`
      : "Deal report",
    description:
      "Shareable DSCR deal score from dscr.broker. Orientation only — not a credit decision or a commitment to lend.",
    path: `/calculator/report/${id}`,
  });
}

export default async function CalculatorReportPage({ params }: Props) {
  const { id } = await params;
  const inputs = decodeReportId(id);
  if (!inputs) notFound();
  const { result, errors } = calculateDeal(inputs);
  if (!result) notFound();

  return (
    <>
      <PageHero
        eyebrow="Deal score"
        title="Shareable DSCR snapshot"
        description="Same formula as the calculator. No login. Not a quote, lock, or credit decision."
      >
        <div className="flex flex-wrap gap-2">
          <Badge>
            {inputs.occupancyType === "str" ? "STR projection" : "LTR"}
          </Badge>
          <Badge>{result.debtServiceLabel}</Badge>
          <Badge>Price {money(inputs.purchasePrice)}</Badge>
        </div>
      </PageHero>

      <Container className="grid gap-6 py-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <DealSummary inputs={inputs} result={result} />
        </div>
        <div className="space-y-4 lg:col-span-5">
          <Card className="space-y-3 p-6">
            <p className="text-sm font-medium text-ink">Inputs used</p>
            <dl className="space-y-2 text-sm">
              <Row label="Gross monthly rent" value={money(inputs.monthlyGrossRent)} />
              <Row
                label="Rate estimate"
                value={`${inputs.annualInterestRatePercent.toFixed(2)}%`}
              />
              <Row label="Term" value={`${inputs.termYears} years`} />
              <Row
                label="Amortization"
                value={inputs.interestOnly ? "Interest-only (ITIA)" : "Amortizing (PITIA)"}
              />
            </dl>
            {errors.length > 0 ? (
              <p className="text-xs text-danger">{errors.join(" ")}</p>
            ) : null}
            <p className="text-xs text-muted">
              Broker, not a lender. Business-purpose / non-owner-occupied only.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Button href="/book">Book a free 30-min strategy call</Button>
              <Button href="/calculator" variant="secondary">
                Adjust this deal
              </Button>
            </div>
          </Card>
          <p className="text-sm text-muted">
            <Link href="/calculator" className="text-accent hover:underline">
              ← Back to calculator
            </Link>
          </p>
        </div>
      </Container>
      <BookCta title="Book a free 30-min strategy call" />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-mono text-ink">{value}</dd>
    </div>
  );
}
