import Link from "next/link";
import { BookCta } from "@/components/BookCta";
import { CtaCluster } from "@/components/CtaCluster";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { LENDER_DSCR_FORMULA } from "@/lib/dscr";
import { articleJsonLd } from "@/lib/metadata";
import type { Partner } from "@/lib/partners";

export function PartnerLanding({ partner }: { partner: Partner }) {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: partner.seo.title,
          description: partner.seo.description,
          path: partner.href,
        })}
      />
      <PageHero
        eyebrow={partner.hero.eyebrow}
        title={partner.hero.title}
        description={partner.hero.description}
      >
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
          <CtaCluster className="sm:w-auto" />
          <Button
            href={partner.calculatorHref}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            {partner.calculator.ctaLabel}
          </Button>
        </div>
        <p className="text-xs text-muted">
          Broker, not a lender. Business-purpose / non-owner-occupied only.
        </p>
      </PageHero>

      <section className="py-16">
        <Container>
          <div className="mb-8 space-y-2">
            <Badge>Why refer</Badge>
            <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              {partner.why.title}
            </h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {partner.why.items.map((item) => (
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
        <Container>
          <div className="mb-8 space-y-2">
            <Badge>How it works</Badge>
            <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              {partner.steps.title}
            </h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {partner.steps.items.map((step) => (
              <li key={step.n}>
                <Card elevated className="h-full p-6">
                  <p className="font-mono text-sm text-accent">{step.n}</p>
                  <h3 className="mt-3 text-lg font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{step.body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Card elevated className="grid gap-6 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
            <div className="space-y-3 lg:col-span-8">
              <Badge>Calculator</Badge>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                {partner.calculator.title}
              </h2>
              <p className="text-sm text-muted sm:text-base">
                {partner.calculator.body}
              </p>
              <p className="font-mono text-sm text-ink">
                Lender DSCR = {LENDER_DSCR_FORMULA}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <Button href={partner.calculatorHref}>
                {partner.calculator.ctaLabel}
              </Button>
              <p className="text-xs text-muted lg:text-right">
                Same worksheet as /calculator. Math is not forked. Not a credit
                decision.
              </p>
            </div>
          </Card>
          <p className="mt-6 text-sm">
            <Link
              href={partner.relatedResourceHref}
              className="text-accent hover:underline"
            >
              Desk notes →
            </Link>
          </p>
        </Container>
      </section>

      <BookCta title={partner.bookCta.title} body={partner.bookCta.body} />
    </>
  );
}
