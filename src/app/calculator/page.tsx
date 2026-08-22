import { CalculatorWorksheet } from "@/components/calculator/CalculatorWorksheet";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "DSCR calculator",
  description:
    "Ungated single-property DSCR calculator. Lender DSCR is rent ÷ PITIA. Investor cash flow is labeled separately. Book a 30-minute strategy call.",
  path: "/calculator",
});

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculator"
        title="Desk the numbers before you book the hour."
        description="Lender DSCR is Gross Monthly Rent ÷ Monthly PITIA. Investor cash flow is a separate view. Rate is your estimate — not a quote. Not a credit decision."
      />
      <Container className="py-12">
        <CalculatorWorksheet />
      </Container>
    </>
  );
}
