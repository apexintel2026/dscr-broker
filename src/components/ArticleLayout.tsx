import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { BookCta } from "@/components/BookCta";
import { JsonLd } from "@/components/JsonLd";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { relatedResources } from "@/lib/resources";

export function ArticleLayout({
  title,
  description,
  path,
  jsonLd,
  children,
}: {
  title: string;
  description: string;
  path: string;
  jsonLd?: unknown;
  children: React.ReactNode;
}) {
  const related = relatedResources(path);

  return (
    <>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <PageHero eyebrow="Resources" title={title} description={description}>
        <p className="text-sm text-muted">
          <Link href="/resources" className="hover:text-ink">
            ← All resources
          </Link>
        </p>
      </PageHero>
      <Container as="article" className="max-w-3xl space-y-8 py-12">
        {children}
        <div className="space-y-4 border-t border-border pt-8">
          <p className="text-sm text-muted">
            <Link href="/calculator" className="text-accent hover:underline">
              Run the calculator
            </Link>
            <span className="px-2 text-border">·</span>
            <Link href="/book" className="text-accent hover:underline">
              Book a 30-min call
            </Link>
          </p>
          {related.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-ink">Related</p>
              <ul className="grid gap-3 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group block h-full">
                      <Card className="h-full p-4 transition-colors duration-150 group-hover:border-muted">
                        <p className="text-sm font-medium text-ink">
                          {item.title}
                        </p>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
      <BookCta />
    </>
  );
}

export function Prose({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-4 text-base leading-7 text-muted",
        "[&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-ink [&_h2:first-child]:mt-0",
        "[&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-medium [&_h3]:text-ink",
        "[&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline",
        "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
        "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
        "[&_strong]:font-medium [&_strong]:text-ink",
        "[&_code]:font-mono [&_code]:text-sm [&_code]:text-ink",
        className,
      )}
    >
      {children}
    </div>
  );
}
