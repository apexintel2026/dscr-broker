import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/ArticleLayout";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${site.name}. Informational site only; broker, not a lender; not a loan application or a commitment to lend.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description={`Last updated: August 29, 2026. Rules for using ${site.name}. Informational only — not a loan application or a commitment to lend.`}
      />
      <Container as="article" className="max-w-3xl py-12">
        <Prose>
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            {site.name}
          </p>
          <p>
            These terms govern your use of {site.name} ({site.url}) (the
            &quot;Site&quot;). {site.companyName} operates the Site. By using
            the Site you agree to these terms and to our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <h2>Informational site only</h2>
          <p>
            The Site explains business-purpose / DSCR investor loans and how
            to reach the desk. Content is informational. It is not legal,
            tax, or credit advice, and it is not an offer of credit.
          </p>

          <h2>No client relationship</h2>
          <p>
            Using the Site, running the calculator, submitting a form, or
            booking a call does not create a client, agency, or fiduciary
            relationship with {site.companyName} or anyone else.
          </p>

          <h2>Not a loan application or a commitment to lend</h2>
          <p>
            Nothing on the Site is a loan application, a lock, or a
            commitment to lend. If a loan is originated, a
            third-party capital source underwrites and funds it under its own
            guidelines. We do not make that credit decision.
          </p>

          <h2>Broker, not a lender</h2>
          <p>
            {site.legalEntity}. We broker investor files. We do not fund
            loans. Third-party capital sources underwrite.
          </p>

          <h2>Business-purpose only</h2>
          <p>
            Content is for non-owner-occupied, business-purpose activity. It
            is not consumer-purpose advice and it is not for primary
            residences. If you need an owner-occupied loan, this is the wrong
            desk.
          </p>

          <h2>Calculator and estimates</h2>
          <p>
            The calculator and other figures on the Site are estimates. They
            are not credit decisions, approvals, or a representation that a
            deal will clear.
          </p>

          <h2>Third-party widgets</h2>
          <p>
            Forms and scheduling on the Site are hosted by HighLevel and
            other third parties. Their terms, availability, and data handling
            apply to those widgets. A widget that fails to load does not
            change these terms.
          </p>

          <h2>Privacy and consent</h2>
          <p>
            Our <Link href="/privacy">Privacy Policy</Link> governs personal
            data and TCPA-style call, text, and email consent. Read it before
            you submit a form or book a call.
          </p>

          <h2>Equal Housing Opportunity</h2>
          <p>
            {site.equalHousingOpportunity}. We follow fair housing law.
          </p>

          <h2>License</h2>
          <p>
            {site.legalEntity}. Business address: {site.businessAddress}.
            Call or text{" "}
            <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the state of California,
            without regard to conflict-of-law rules.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms by posting the new version on this
            page. Continued use of the Site after a post means you accept the
            updated terms.
          </p>
          <p>Last updated on August 29, 2026.</p>
        </Prose>
      </Container>
    </>
  );
}
