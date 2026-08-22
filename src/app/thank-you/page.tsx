import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Thank you",
  description:
    "We have the note. The dscr.broker desk will follow up. This is not a credit decision or a commitment to lend.",
  path: "/thank-you",
});

export default function ThankYouPage() {
  return (
    <Container className="py-16">
      <Card elevated className="mx-auto max-w-xl space-y-4 px-6 py-10 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          Received
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-ink">
          We have the note.
        </h1>
        <p className="text-muted">
          This confirmation is not a credit decision, a lock, or a commitment
          to lend. If you have a live deal, book the 30-minute call so we can
          desk it.
        </p>
        <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
          <Button href="/book">Book a 30-min call</Button>
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </Card>
    </Container>
  );
}
