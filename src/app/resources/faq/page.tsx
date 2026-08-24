import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/Card";
import { faqs, faqJsonLdItems, objections } from "@/lib/faq";
import { buildMetadata, faqPageJsonLd } from "@/lib/metadata";

const path = "/resources/faq";
const title = "FAQ";
const description =
  "Direct answers about dscr.broker: we are a broker, not a lender; business-purpose only; the call is a 30-minute desk review. Common objections included.";

export const metadata = buildMetadata({
  title,
  description,
  path,
});

function QaList({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.q} className="p-5">
          <h2 className="font-medium text-ink">{item.q}</h2>
          <p className="mt-2 text-sm text-muted">{item.a}</p>
        </Card>
      ))}
    </div>
  );
}

export default function FaqPage() {
  return (
    <ArticleLayout
      title={title}
      description="Short answers. If you need a file reviewed, book the call."
      path={path}
      jsonLd={faqPageJsonLd(faqJsonLdItems, path)}
    >
      <QaList items={faqs} />

      <div className="space-y-3">
        <h2 className="text-xl font-medium tracking-tight text-ink">
          Common objections
        </h2>
        <p className="text-sm text-muted">
          These are the ones we hear on the desk. Direct answers. Not a credit
          decision.
        </p>
      </div>
      <QaList items={objections} />
    </ArticleLayout>
  );
}
