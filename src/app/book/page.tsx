import { BookingCalendar } from "@/components/BookingCalendar";
import { EmbedPanel } from "@/components/EmbedPanel";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Book a 30-min call",
  description:
    "Book a 30-minute strategy call with the dscr.broker desk. Desk review, not a credit decision. We are a broker, not a lender.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Book a 30-minute strategy call"
        description="Bring the address, the rent story, and how you intend to hold the asset. This is a desk review, not a credit decision. We desk investor loans. We do not fund them."
      />

      <Container className="grid gap-6 py-12 lg:grid-cols-12">
        <Card className="order-2 p-6 lg:order-1 lg:col-span-4">
          <h2 className="font-medium text-ink">What to have ready</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Property address and unit mix</li>
            <li>In-place or expected rent</li>
            <li>Estimated PITIA</li>
            <li>Entity vs. personal vest</li>
            <li>Hold plan (LTR, STR, mid-term)</li>
          </ul>
          <p className="mt-6 text-xs text-muted">
            The call is a desk review, not a credit decision. Not ready to
            pick a time? Use the form below — send the deal, we will reach
            out.
          </p>
        </Card>

        <EmbedPanel
          className="order-1 lg:order-2 lg:col-span-8"
          title="Pick a time"
          description="Hosted by HighLevel. Prefer a voice? Call or text the desk."
        >
          <BookingCalendar />
        </EmbedPanel>
      </Container>

      <Container className="pb-12">
        <EmbedPanel
          title="Send the deal, we will reach out"
          description="Fallback if you do not want to pick a time yet. Same desk. Broker, not a lender."
        >
          <LeadForm title="Send the deal to the dscr.broker desk" />
        </EmbedPanel>
      </Container>
    </>
  );
}
