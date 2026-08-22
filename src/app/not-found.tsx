import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-16">
      <Card elevated className="mx-auto max-w-lg space-y-4 px-6 py-10 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          404
        </p>
        <h1 className="text-2xl font-medium text-ink">Page not on the desk.</h1>
        <p className="text-sm text-muted">
          That route is not part of Phase 1. Head home or book the call.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Home</Button>
          <Button href="/book" variant="secondary">
            Book a 30-min call
          </Button>
        </div>
      </Card>
    </Container>
  );
}
