import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export function BookCta({
  title = "Book a 30-minute strategy call",
  body = "Bring the address, the rent roll, and the hold plan. We desk investor loans. We do not fund them.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-16">
      <Container>
        <Card elevated className="px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl space-y-2">
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                {title}
              </h2>
              <p className="text-sm text-muted sm:text-base">{body}</p>
            </div>
            <Button href="/book" className="shrink-0">
              Book a 30-min call
            </Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}
