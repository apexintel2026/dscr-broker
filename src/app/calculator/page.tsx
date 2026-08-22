import { BookCta } from "@/components/BookCta";
import { ComingSoon } from "@/components/ComingSoon";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "DSCR calculator",
  description:
    "DSCR calculator shell for investor deals. Phase 2 adds the math. Book a 30-minute strategy call to desk a file now.",
  path: "/calculator",
});

const fields = [
  { label: "Monthly rent", hint: "In-place or market" },
  { label: "PITIA", hint: "Principal, interest, taxes, insurance, HOA" },
  { label: "Other income", hint: "Optional — other property cash flow" },
  { label: "Vacancy / expense", hint: "Phase 2 input" },
];

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculator"
        title="Desk the numbers before you book the hour."
        description="This is the calculator shell. Phase 2 will compute DSCR and produce a shareable report. No live math in this build — and no implied credit decision."
      />

      <Container className="grid gap-6 py-12 lg:grid-cols-12">
        <Card className="space-y-5 p-6 lg:col-span-7">
          <p className="text-sm font-medium text-ink">Deal inputs</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.label} className="block space-y-1.5">
                <span className="text-xs text-muted">{field.label}</span>
                <input
                  disabled
                  placeholder={field.hint}
                  className="w-full rounded-control border border-border bg-elevated px-3 py-2.5 font-mono text-sm text-ink placeholder:text-muted/70 disabled:cursor-not-allowed disabled:opacity-70"
                />
              </label>
            ))}
          </div>
          <p className="text-xs text-muted">
            Inputs are disabled until Phase 2. They exist so the desk layout is
            real, not a blank page.
          </p>
        </Card>

        <div className="space-y-6 lg:col-span-5">
          <ComingSoon
            title="DSCR engine is next"
            body="Coverage ratio, cash-flow snapshot, and /calculator/report/[id] will render a live result. Until then, book a call and we desk the file by hand."
          />
        </div>
      </Container>

      <BookCta title="Skip the wait. Book the desk." />
    </>
  );
}
