import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { DscrInputs, DscrResult } from "@/lib/dscr";
import { guidanceForBand } from "@/lib/dscr";
import { money, percentFromFraction, percentPoints, ratio } from "@/lib/format";

const bandTone = {
  strong: "accent",
  acceptable: "warning",
  weak: "danger",
} as const;

const bandLabel = {
  strong: "Strong · ≥ 1.25",
  acceptable: "Acceptable · 1.00–1.24",
  weak: "Weak · < 1.00",
} as const;

const constraintCopy = {
  none: "Neither typical LTV nor the 1.25 coverage floor is the tighter item on this estimate.",
  ratio: "Coverage is the tighter item. Rent needed for 1.25 is listed below.",
  ltv: "LTV is above a typical 75% illustration. More down or a lower price is the tighter item.",
  ratio_and_ltv:
    "Both coverage and a typical 75% LTV illustration are offside. Higher rent or a lower price / loan is the next lever.",
} as const;

export function DealSummary({
  inputs,
  result,
  showCta = true,
}: {
  inputs: DscrInputs;
  result: DscrResult;
  showCta?: boolean;
}) {
  const band = result.dscrBand;
  const dscrColor =
    band === "strong"
      ? "text-accent"
      : band === "acceptable"
        ? "text-warning"
        : band === "weak"
          ? "text-danger"
          : "text-ink";

  return (
    <div className="space-y-4">
      <Card elevated className="p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          Lender DSCR
        </p>
        <p className={`mt-2 font-mono text-5xl tracking-tight ${dscrColor}`}>
          {result.dscrDisplay === null ? "—" : ratio(result.dscrDisplay)}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {band ? (
            <Badge tone={bandTone[band]}>{bandLabel[band]}</Badge>
          ) : (
            <Badge>No PITIA yet</Badge>
          )}
          <Badge>
            {result.rentIsProjection ? "STR projection" : "LTR rent"}
          </Badge>
          <Badge>{result.debtServiceLabel}</Badge>
        </div>
        <p className="mt-4 text-sm text-muted">{guidanceForBand(band)}</p>
        {showCta ? (
          <Button href="/book" className="mt-5 w-full sm:w-auto">
            Book a free 30-min strategy call
          </Button>
        ) : null}
      </Card>

      <Card className="grid gap-0 sm:grid-cols-2">
        <Metric
          label={inputs.interestOnly ? "Monthly interest" : "Monthly P&I"}
          value={money(result.monthlyDebtService)}
          hint={
            inputs.interestOnly
              ? "Interest only — no principal"
              : "Amortizing P&I"
          }
        />
        <Metric
          label={`Monthly ${result.debtServiceLabel}`}
          value={money(result.monthlyPitia)}
          hint="Qualification debt service"
        />
        <Metric
          label="Investor cash flow"
          value={money(result.investorCashFlowMonthly)}
          hint="Display only — not lender DSCR"
        />
        <Metric
          label="Cash-on-cash"
          value={
            result.cashOnCashAnnual === null
              ? "—"
              : percentFromFraction(result.cashOnCashAnnual)
          }
          hint="Annual CF ÷ down payment"
        />
      </Card>

      <Card className="space-y-3 p-6">
        <p className="text-sm font-medium text-ink">Transparent math</p>
        <Formula
          label={`Lender DSCR = Gross monthly rent ÷ ${result.debtServiceLabel}`}
          detail={`${money(inputs.monthlyGrossRent)} ÷ ${money(result.monthlyPitia)} = ${
            result.dscrDisplay === null ? "—" : ratio(result.dscrDisplay)
          }`}
        />
        <Formula
          label={
            inputs.interestOnly
              ? "ITIA = Interest + Taxes + Insurance + HOA"
              : "PITIA = P&I + Taxes + Insurance + HOA"
          }
          detail={`${money(result.monthlyDebtService)} + ${money(result.taxesMonthly)} + ${money(result.insuranceMonthly)} + ${money(result.hoaMonthly)} = ${money(result.monthlyPitia)}`}
        />
        <Formula
          label="Investor cash flow = Rent − debt service − vacancy − maint − PM"
          detail={`${money(inputs.monthlyGrossRent)} − ${money(result.monthlyPitia)} − ${money(result.vacancyMonthly)} − ${money(result.maintenanceMonthly)} − ${money(result.propertyManagementMonthly)} = ${money(result.investorCashFlowMonthly)}`}
        />
        <p className="text-xs text-muted">
          Vacancy, maintenance, and property management never enter lender
          DSCR. They are an investor view only.
        </p>
      </Card>

      <Card className="space-y-3 p-6">
        <p className="text-sm font-medium text-ink">Coverage and leverage</p>
        <dl className="space-y-2 text-sm">
          <Row
            label="Rent needed for 1.00"
            value={
              result.rentNeededFor1_00 === null
                ? "—"
                : money(result.rentNeededFor1_00)
            }
          />
          <Row
            label="Rent needed for 1.25"
            value={
              result.rentNeededFor1_25 === null
                ? "—"
                : money(result.rentNeededFor1_25)
            }
          />
          <Row
            label="Loan / LTV"
            value={`${money(result.loanAmount)} · ${
              result.ltv === null ? "—" : percentFromFraction(result.ltv)
            }`}
          />
          <Row
            label="Typical 75% LTV check"
            value={
              result.ltvExceedsTypical
                ? `Above ${percentFromFraction(result.typicalLtvMax)} (illustration, not a quote)`
                : `At or under ${percentFromFraction(result.typicalLtvMax)} (illustration, not a quote)`
            }
          />
        </dl>
        <p className="text-sm text-muted">
          {constraintCopy[result.bindingConstraint]} Down{" "}
          {percentPoints(
            inputs.purchasePrice > 0
              ? (result.downPayment / inputs.purchasePrice) * 100
              : 0,
          )}{" "}
          / {money(result.downPayment)}.
        </p>
      </Card>
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border-b border-border px-6 py-5 last:border-b-0 sm:border-b sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0">
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 font-mono text-xl text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}

function Formula({ label, detail }: { label: string; detail: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-sm text-ink">{detail}</p>
    </div>
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
