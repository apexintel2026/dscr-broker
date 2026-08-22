import { BookCta } from "@/components/BookCta";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { howItWorksSteps } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "How it works",
  description:
    "How the dscr.broker desk works: send the deal, we map it to business-purpose programs we can broker, then you book a 30-minute strategy call.",
  path: "/how-it-works",
});

const extras = [
  {
    title: "What we need to start",
    body: "Property address, unit mix, in-place or expected rent, estimated PITIA, entity vs. personal vest, and your hold plan. Experience helps. It is not the whole file.",
  },
  {
    title: "What we do not do",
    body: "We do not fund loans, set a rate sheet, or issue a credit decision. Those sit with the capital source. We package and broker the file.",
  },
  {
    title: "What the call is for",
    body: "Thirty minutes to pressure-test structure, occupancy, and program fit. If the deal is worth running, we list the next documents — not a pitch deck.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="Send the deal. We desk it. You book the hour."
        description="A brokered investor-loan file, not a retail refinance. Direct, document-led, business-purpose only."
      />

      <Container className="space-y-6 py-12">
        <ol className="grid gap-4 md:grid-cols-3">
          {howItWorksSteps.map((step) => (
            <li key={step.n}>
              <Card elevated className="h-full p-6">
                <p className="font-mono text-sm text-accent">{step.n}</p>
                <h2 className="mt-3 text-lg font-medium text-ink">{step.title}</h2>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </Card>
            </li>
          ))}
        </ol>
        <div className="grid gap-4 md:grid-cols-3">
          {extras.map((item) => (
            <Card key={item.title} className="p-6">
              <h3 className="font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </Container>

      <BookCta />
    </>
  );
}
