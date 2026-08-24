import Link from "next/link";
import { BookCta } from "@/components/BookCta";
import { CallMeNow } from "@/components/CallMeNow";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { calculatorHrefFor, type Niche } from "@/lib/niches";
import { LENDER_DSCR_FORMULA } from "@/lib/dscr";
import { articleJsonLd } from "@/lib/metadata";

export function NicheLanding({ niche }: { niche: Niche }) {
  const calculatorHref = calculatorHrefFor(niche);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: niche.seo.title,
          description: niche.seo.description,
          path: niche.href,
        })}
      />
      <PageHero
        eyebrow={niche.hero.eyebrow}
        title={niche.hero.title}
        description={niche.hero.description}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
          <Button href="/book">Book a 30-min call</Button>
          <Button href={calculatorHref} variant="secondary">
            {niche.calculator.ctaLabel}
          </Button>
          <CallMeNow />
        </div>
        <p className="text-xs text-muted">
          Broker, not a lender. Business-purpose / non-owner-occupied only.
        </p>
      </PageHero>

      <section className="py-16">
        <Container>
          <div className="mb-8 space-y-2">
            <Badge>Why DSCR</Badge>
            <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              {niche.why.title}
            </h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {niche.why.items.map((item) => (
              <li key={item.title}>
                <Card elevated className="h-full p-6">
                  <h3 className="text-lg font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.body}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-16">
        <Container className="space-y-6">
          <div className="space-y-2">
            <Badge>Income method</Badge>
            <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              {niche.incomeVsLtr.title}
            </h2>
            <p className="max-w-2xl text-muted">{niche.incomeVsLtr.intro}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {niche.incomeVsLtr.columns.map((column) => (
              <Card key={column.title} className="p-6">
                <h3 className="font-medium text-ink">{column.title}</h3>
                <p className="mt-2 text-sm text-muted">{column.body}</p>
              </Card>
            ))}
          </div>
          <p className="max-w-2xl text-sm text-muted">
            {niche.incomeVsLtr.note}
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Card elevated className="grid gap-6 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
            <div className="space-y-3 lg:col-span-8">
              <Badge>Calculator</Badge>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                {niche.calculator.title}
              </h2>
              <p className="text-sm text-muted sm:text-base">
                {niche.calculator.body}
              </p>
              <p className="font-mono text-sm text-ink">
                Lender DSCR = {LENDER_DSCR_FORMULA}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <Button href={calculatorHref}>{niche.calculator.ctaLabel}</Button>
              <p className="text-xs text-muted lg:text-right">
                Same formula as /calculator. Occupancy starts on{" "}
                {niche.occupancyType.toUpperCase()}. Math is not forked.
              </p>
            </div>
          </Card>
          <p className="mt-6 text-sm">
            <Link
              href={niche.relatedResourceHref}
              className="text-accent hover:underline"
            >
              Desk notes for this occupancy →
            </Link>
          </p>
        </Container>
      </section>

      <BookCta title={niche.bookCta.title} body={niche.bookCta.body} />
    </>
  );
}
