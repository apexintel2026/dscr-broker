import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms",
  description:
    "Terms of use placeholder for dscr.broker. Informational site; not a commitment to lend; broker not a lender.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms"
        description="Placeholder terms for Phase 1. Informational only."
      />
      <Container className="max-w-3xl space-y-6 py-12 text-sm leading-7 text-muted">
        <p>
          {site.name} provides information about business-purpose / DSCR
          investor loans and a way to request a 30-minute strategy call. Use
          of this site does not create a client relationship, a loan
          application, or a commitment to lend.
        </p>
        <p>
          We are a broker, not a lender. Any loan, if originated, is made by
          a third-party capital source under its own guidelines. Nothing here
          is an offer of credit, a lock, or a representation that a deal will
          clear.
        </p>
        <p>
          Content is for non-owner-occupied, business-purpose activity only.
          It is not for primary residences and is not consumer-purpose
          mortgage advice.
        </p>
        <p>
          NMLS ID: TBD. Equal Housing Opportunity. This placeholder is not a
          complete terms of use and is not legal advice.
        </p>
      </Container>
    </>
  );
}
