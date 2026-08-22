import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="space-y-4 py-12 sm:py-16">
        {eyebrow ? <Badge>{eyebrow}</Badge> : null}
        <h1 className="max-w-3xl text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base text-muted sm:text-lg">{description}</p>
        {children}
      </Container>
    </section>
  );
}
