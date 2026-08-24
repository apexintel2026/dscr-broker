"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-16">
      <Card elevated className="mx-auto max-w-lg space-y-4 px-6 py-10 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          Error
        </p>
        <h1 className="text-2xl font-medium text-ink">The desk hit a snag.</h1>
        <p className="text-sm text-muted">
          That page failed to load. Try again, or book the call if you have a
          live file. Nothing here is a credit decision.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="secondary">
            Home
          </Button>
        </div>
      </Card>
    </Container>
  );
}
