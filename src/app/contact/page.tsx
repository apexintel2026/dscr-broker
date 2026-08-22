import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact the dscr.broker desk about a business-purpose investor loan. Prefer a 30-minute strategy call when you have a live deal.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write the desk."
        description="If you have a live deal, book the call. Use this form for a short note. Phase 1 does not send email or hit a webhook."
      />
      <Container className="grid gap-6 py-12 lg:grid-cols-12">
        <Card elevated className="p-6 lg:col-span-7">
          <ContactForm />
        </Card>
        <Card className="space-y-4 p-6 lg:col-span-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Email</p>
            <p className="mt-1 font-mono text-sm text-ink">{site.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Call</p>
            <p className="mt-1 text-sm text-muted">
              30 minutes, strategy only —{" "}
              <a href="/book" className="text-accent hover:underline">
                /book
              </a>
            </p>
          </div>
          <p className="text-xs text-muted">
            Broker, not a lender. Business-purpose / non-owner-occupied only.
          </p>
        </Card>
      </Container>
    </>
  );
}
