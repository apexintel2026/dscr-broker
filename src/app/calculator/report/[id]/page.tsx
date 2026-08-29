import Link from "next/link";
import { DealSummary } from "@/components/calculator/DealSummary";
import { ShareReport } from "@/components/calculator/ShareReport";
import { BookCta } from "@/components/BookCta";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { loadReport } from "@/lib/report";
import { money } from "@/lib/format";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const report = loadReport(id);
  return {
    ...buildMetadata({
      title: report
        ? `Deal score ${report.result.dscrDisplay?.toFixed(2) ?? "—"}`
        : "Deal report",
      description:
        "Shareable DSCR deal score from dscr.broker. Orientation only — not a credit decision or a commitment to lend.",
      path: `/calculator/report/${id}`,
    }),
    robots: report ? undefined : { index: false, follow: false },
  };
}

export default async function CalculatorReportPage({ params }: Props) {
  const { id } = await params;
  const report = loadReport(id);

  if (!report) {
    return (
      <>
        <PageHero
          eyebrow="Deal score"
          title="This snapshot could not be opened."
          description="The link is incomplete, expired, or the numbers no longer decode. Run the calculator again — nothing here is a credit decision."
        />
        <Container className="py-12">
          <Card elevated className="mx-auto max-w-lg space-y-4 px-6 py-10 text-center">
            <p className="text-sm text-muted">
              That shareable link did not decode. Open the calculator and run
              the deal again.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/calculator">Open the calculator</Button>
              <Button href="/book" variant="secondary">
                Book a 30-min call
              </Button>
            </div>
          </Card>
        </Container>
      </>
    );
  }

  const { inputs, result, errors } = report;

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
          <DealSummary inputs={inputs} result={result} showCta={false} />
        </div>
        <div className="space-y-4 lg:col-span-5">
          <Card elevated className="p-6">
            <ShareReport
              reportId={id}
              dscrDisplay={result.dscrDisplay}
              purchasePrice={inputs.purchasePrice}
              monthlyGrossRent={inputs.monthlyGrossRent}
              occupancyType={inputs.occupancyType}
              showOpenReport={false}
            />
          </Card>
          <Card className="space-y-3 p-6">
            <h2 className="text-sm font-medium text-ink">Inputs used</h2>
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
