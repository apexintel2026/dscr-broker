import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { BookCta } from "@/components/BookCta";
import { CtaCluster } from "@/components/CtaCluster";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/ArticleLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { LENDER_DSCR_FORMULA } from "@/lib/dscr";
import { articleJsonLd } from "@/lib/metadata";
import {
  stateRelatedLinks,
  type StatePage,
} from "@/lib/states";

const LINK_MARKUP = /\[([^\]]+)\]\(([^)]+)\)/g;

function LinkedText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(LINK_MARKUP.source, "g");

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <Link key={`${match[2]}-${match.index}`} href={match[2]}>
        {match[1]}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
}

export function StateLanding({ state }: { state: StatePage }) {
  const related = stateRelatedLinks(state);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: state.seo.title,
          description: state.seo.description,
          path: state.href,
        })}
      />
      <PageHero
        eyebrow={state.hero.eyebrow}
        title={state.hero.title}
        description={state.hero.description}
      >
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
          <CtaCluster className="sm:w-auto" />
          <Button
            href={state.calculatorHref}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            {state.calculator.ctaLabel}
          </Button>
        </div>
        <p className="text-xs text-muted">
          Broker, not a lender. Business-purpose / non-owner-occupied only.
        </p>
      </PageHero>

      <Container as="article" className="max-w-3xl py-16">
        <div className="mb-8 space-y-2">
          <Badge>State desk notes</Badge>
          <p className="text-sm text-muted">
            Direct answers. Not a rate sheet and not a program matrix.
          </p>
        </div>
        <Prose>
          {state.sections.map((section) => (
            <Fragment key={section.heading}>
              <h2>{section.heading}</h2>
              <p>
                <LinkedText text={section.answer} />
              </p>
              {section.body?.map((paragraph) => (
                <p key={paragraph}>
                  <LinkedText text={paragraph} />
                </p>
              ))}
            </Fragment>
          ))}
        </Prose>
      </Container>

      <section className="border-y border-border bg-surface py-16">
        <Container>
          <Card elevated className="grid gap-6 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
            <div className="space-y-3 lg:col-span-8">
              <Badge>Calculator</Badge>
              <h2 className="text-2xl font-medium tracking-tight text-ink">
                {state.calculator.title}
              </h2>
              <p className="text-sm text-muted sm:text-base">
                {state.calculator.body}
              </p>
              <p className="font-mono text-sm text-ink">
                Lender DSCR = {LENDER_DSCR_FORMULA}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <Button href={state.calculatorHref}>
                {state.calculator.ctaLabel}
              </Button>
              <p className="text-xs text-muted lg:text-right">
                Same worksheet as /calculator. Math is not forked. Not a credit
                decision.
              </p>
            </div>
          </Card>
          <div className="mt-8 space-y-3">
            <p className="text-sm font-medium text-ink">Related</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-accent hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <BookCta title={state.bookCta.title} body={state.bookCta.body} />
    </>
  );
}
