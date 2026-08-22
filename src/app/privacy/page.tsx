import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy",
  description:
    "Privacy placeholder for dscr.broker. Full policy ships with production intake and calendar credentials.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        description="Placeholder policy for Phase 1. Replace before collecting real lead or calendar data."
      />
      <Container className="max-w-3xl space-y-6 py-12 text-sm leading-7 text-muted">
        <p>
          {site.name} is a marketing site for a mortgage broker / investor
          loan desk. /book embeds a HighLevel scheduling widget. /contact
          (and a /book fallback) embed a HighLevel form — submissions go to
          that vendor. Calculator lead notes are sent only if you submit the
          optional calculator form. We do not run analytics pixels in this
          build.
        </p>
        <p>
          When intake and scheduling go live, this page will describe what we
          collect (name, contact, deal notes), why we collect it (to desk a
          business-purpose file), and who we share it with (capital sources
          and service providers such as the scheduling vendor).
        </p>
        <p>
          We do not sell personal information. Do not send Social Security
          numbers, full credit reports, or account credentials through this
          site.
        </p>
        <p>
          Questions: {site.email}. This placeholder is not legal advice and
          is not a final privacy policy.
        </p>
      </Container>
    </>
  );
}
