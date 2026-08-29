import Link from "next/link";
import { BookCta } from "@/components/BookCta";
import { CtaCluster } from "@/components/CtaCluster";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/JsonLd";
import { niches } from "@/lib/niches";
import { howItWorksSteps, site } from "@/lib/site";
import {
  buildMetadata,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/metadata";

export const metadata = buildMetadata({
  title: site.name,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <section className="border-b border-border">
        <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:items-center">
          <div className="space-y-6 lg:col-span-7">
            <Badge tone="accent">{site.navSubtitle}</Badge>
            <h1 className="text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {site.tagline}
            </h1>
            <p className="max-w-xl text-base text-muted sm:text-lg">
              DSCR and business-purpose financing for investors. We desk the
              file and broker it to capital sources. We are not the lender.
            </p>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
              <CtaCluster className="sm:w-auto" />
              <Button
                href="/calculator"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Open the calculator
              </Button>
            </div>
            <p className="text-xs text-muted">
              Non-owner-occupied / business-purpose only. Not a commitment to
              lend.
            </p>
          </div>

          <Card elevated className="p-6 lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Deal snapshot
            </p>
            <p className="mt-4 font-mono text-5xl tracking-tight text-accent">
              DSCR
            </p>
            <p className="mt-1 font-mono text-sm text-muted">
              Live DSCR on /calculator. Rent ÷ PITIA.
            </p>
            <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Occupancy</dt>
                <dd className="font-mono text-ink">Investment</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Use</dt>
                <dd className="font-mono text-ink">Business purpose</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Desk</dt>
                <dd className="font-mono text-ink">Brokered file</dd>
              </div>
            </dl>
          </Card>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <Badge>Calculator</Badge>
              <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                Run the deal before you book the hour.
              </h2>
              <p className="max-w-2xl text-muted">
                Ungated. Lender DSCR is rent ÷ PITIA. Investor cash flow is
                labeled separately. Share a report URL, then book the call.
              </p>
            </div>
            <Button href="/calculator" variant="secondary">
              View calculator
            </Button>
          </div>
          <Card className="grid gap-0 overflow-hidden md:grid-cols-3">
            {[
              ["Income", "In-place or market rent — not a paystub story."],
              ["PITIA", "Debt service the asset has to cover."],
              ["Coverage", "The ratio the desk actually uses."],
            ].map(([title, body]) => (
              <div
                key={title}
                className="border-b border-border px-6 py-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  {title}
                </p>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </div>
            ))}
          </Card>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-8 space-y-2">
            <Badge>Niches</Badge>
            <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Start with the hold you actually have.
            </h2>
            <p className="max-w-2xl text-muted">
              Same desk, same formula. Occupancy and income method change the
              file — not a different calculator.
            </p>
          </div>
          <ul
            className={`grid gap-4 ${niches.length > 1 ? "md:grid-cols-2" : "max-w-xl"}`}
          >
            {niches.map((niche) => (
              <li key={niche.slug}>
                <Card elevated className="flex h-full flex-col p-6">
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">
                    {niche.navLabel}
                  </p>
                  <h3 className="mt-3 text-lg font-medium text-ink">
                    {niche.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted">
                    {niche.hero.description}
                  </p>
                  <p className="mt-4">
                    <Link
                      href={niche.href}
                      className="text-sm text-accent hover:underline"
                    >
                      {niche.navLabel} landing →
                    </Link>
                  </p>
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
              Three steps. Then a call.
            </h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {howItWorksSteps.map((step) => (
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
          <p className="mt-6 text-sm">
            <Link href="/how-it-works" className="text-accent hover:underline">
              Full process →
            </Link>
          </p>
        </Container>
      </section>

      <BookCta />
    </>
  );
}
