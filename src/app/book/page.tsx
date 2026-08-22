import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Book a 30-min call",
  description:
    "Book a 30-minute strategy call with the dscr.broker desk. HighLevel calendar embed lands in Phase 2.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Book a 30-minute strategy call"
        description="Bring the address, the rent story, and how you intend to hold the asset. We desk investor loans. We do not fund them."
      />

      <Container className="grid gap-6 py-12 lg:grid-cols-12">
        <Card className="p-6 lg:col-span-4">
          <h2 className="font-medium text-ink">What to have ready</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Property address and unit mix</li>
            <li>In-place or expected rent</li>
            <li>Estimated PITIA</li>
            <li>Entity vs. personal vest</li>
            <li>Hold plan (LTR, STR, mid-term)</li>
          </ul>
          <p className="mt-6 text-xs text-muted">
            The call is a desk review, not a credit decision.
          </p>
        </Card>

        <Card elevated className="lg:col-span-8">
          <div
            id="highlevel-calendar-embed"
            data-embed="highlevel-calendar"
            className="flex min-h-[28rem] flex-col items-center justify-center gap-4 border-2 border-dashed border-border px-6 py-12 text-center"
          >
            <Badge tone="warning">HighLevel embed — Phase 2</Badge>
            <h2 className="max-w-md text-xl font-medium text-ink">
              Calendar iframe slot
            </h2>
            <p className="max-w-md text-sm text-muted">
              Replace this region with the HighLevel scheduling iframe. No
              calendar credentials ship in Phase 1. Until then, send the desk
              a note and we will hold a time.
            </p>
            {/*
              Phase 2: drop the HighLevel iframe here, e.g.
              <iframe src="https://api.leadconnectorhq.com/widget/booking/..." />
            */}
            <Button href="/contact" variant="secondary">
              Contact the desk instead
            </Button>
          </div>
        </Card>
      </Container>
    </>
  );
}
