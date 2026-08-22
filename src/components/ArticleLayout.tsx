import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { BookCta } from "@/components/BookCta";
import { Container } from "@/components/ui/Container";

export function ArticleLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Resources" title={title} description={description}>
        <p className="text-sm text-muted">
          <Link href="/resources" className="hover:text-ink">
            ← All resources
          </Link>
        </p>
      </PageHero>
      <Container as="article" className="max-w-3xl space-y-8 py-12">
        {children}
      </Container>
      <BookCta />
    </>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 text-base leading-7 text-muted">{children}</div>;
}
