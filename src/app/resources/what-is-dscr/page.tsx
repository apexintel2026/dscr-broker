import { ArticleLayout, Prose } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "What is DSCR?",
  description:
    "Debt service coverage ratio for investor loans: how rental income is stacked against PITIA when the asset — not a W-2 — carries the file.",
  path: "/resources/what-is-dscr",
});

export default function WhatIsDscrPage() {
  return (
    <ArticleLayout
      title="What is DSCR?"
      description="Debt service coverage is a ratio: income the property produces versus the debt service it has to carry."
    >
      <Prose>
        <p>
          DSCR is how most business-purpose investor files get desked. The
          question is whether the asset covers its own PITIA — principal,
          interest, taxes, insurance, and HOA — with enough room for the
          program.
        </p>
        <p>
          That is a different conversation than a conventional consumer
          mortgage. The borrower story still matters for identity, reserves,
          and experience. The coverage ratio is about the property.
        </p>
      </Prose>
      <Card className="p-6">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          Working definition
        </p>
        <p className="mt-3 font-mono text-lg text-ink">
          Lender DSCR = Gross Monthly Rent ÷ Monthly PITIA
        </p>
        <p className="mt-2 text-sm text-muted">
          The live calculator on /calculator uses this formula. Investor cash
          flow is a separate, labeled view.
        </p>
      </Card>
      <Prose>
        <p>
          Programs differ on what counts as income: in-place leases, market
          rents, or a haircut on short-term actuals. They also differ on the
          coverage floor they will look at. None of that is a credit decision
          from this desk.
        </p>
        <p>
          If you want a file mapped, bring the address, the rent, and the hold
          plan to a 30-minute call.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
