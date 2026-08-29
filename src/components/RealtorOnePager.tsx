import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PrintSaveButton } from "@/components/PrintSaveButton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { articleJsonLd } from "@/lib/metadata";
import { realtorOnePager } from "@/lib/realtor-one-pager";
import { site } from "@/lib/site";

export function RealtorOnePager() {
  const sheet = realtorOnePager;

  return (
    <div className="one-pager-root min-h-screen bg-page px-4 py-2 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          title: sheet.seo.title,
          description: sheet.seo.description,
          path: sheet.href,
        })}
      />

      <div className="no-print mx-auto flex w-full max-w-[8.5in] items-center justify-between gap-3 py-4">
        <Link
          href="/realtors"
          className="text-sm text-accent hover:underline"
        >
          ← For realtors
        </Link>
        <PrintSaveButton className="shrink-0" />
      </div>

      <article className="one-pager-sheet mx-auto w-full max-w-[8.5in] space-y-6 border border-border bg-elevated px-6 py-8 sm:px-10 sm:py-10">
        <header className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            {site.name}
          </p>
          <Badge>Partner one-pager</Badge>
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {sheet.title}
          </h1>
          <p className="max-w-2xl text-base text-muted sm:text-lg">
            {sheet.lede}
          </p>
        </header>

        <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
          <section>
            <h2 className="text-sm font-medium uppercase tracking-wider text-ink">
              {sheet.when.title}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              {sheet.when.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-sm font-medium uppercase tracking-wider text-ink">
              {sheet.need.title}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              {sheet.need.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="space-y-3 border-t border-border pt-6">
          <div className="no-print flex flex-col gap-3 sm:flex-row">
            <Button href={sheet.run.href} className="w-full sm:w-auto">
              {sheet.run.label}
            </Button>
            <Button
              href={sheet.book.href}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {sheet.book.label}
            </Button>
          </div>
          <p className="font-mono text-sm text-ink">
            {sheet.run.label}: {sheet.run.url}
          </p>
          <p className="font-mono text-sm text-ink">
            {sheet.book.label}: {sheet.book.url}
          </p>
          <p className="text-sm text-muted">
            {sheet.textPrefix}{" "}
            <a
              href={`sms:${site.phoneHref}`}
              className="font-mono text-accent hover:underline"
            >
              {site.phoneDisplay}
            </a>
          </p>
        </section>

        <div className="space-y-1 border-t border-border pt-6">
          <p className="text-base font-medium text-ink">{sheet.closer}</p>
          <p className="text-xs text-muted">{sheet.brokerLine}</p>
        </div>
      </article>

      <p className="no-print mx-auto max-w-[8.5in] py-4 text-xs text-muted">
        Use Print / Save PDF in the dialog to send this sheet. Browser print is
        enough.
      </p>
    </div>
  );
}
