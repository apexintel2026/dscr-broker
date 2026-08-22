import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Send a deal note to the dscr.broker desk. Broker, not a lender. Prefer a 30-minute strategy call when you have a live file.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write the desk."
        description="Send the deal. We will reach out. This is a desk note, not a credit decision. We are a broker, not a lender."
      />
      <Container className="grid gap-6 py-12 lg:grid-cols-12">
        <Card elevated className="overflow-hidden lg:col-span-7">
          <LeadForm title="Contact the dscr.broker desk" />
        </Card>
        <Card className="space-y-4 p-6 lg:col-span-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Email</p>
            <p className="mt-1 font-mono text-sm text-ink">{site.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Call</p>
            <p className="mt-1 text-sm text-muted">
              30 minutes. Desk review, not a credit decision.
            </p>
            <Button href="/book" className="mt-3">
              Book a 30-min call
            </Button>
          </div>
          <p className="text-xs text-muted">
            Broker, not a lender. Business-purpose / non-owner-occupied only.
            Submissions go to the desk in HighLevel — not a local thank-you
            page.
          </p>
        </Card>
      </Container>
    </>
  );
}
