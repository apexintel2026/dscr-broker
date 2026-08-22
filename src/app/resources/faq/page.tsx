import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Direct answers about dscr.broker: we are a broker, not a lender; business-purpose only; the call is a 30-minute desk review.",
  path: "/resources/faq",
});

const faqs = [
  {
    q: "Are you the lender?",
    a: "No. dscr.broker is a broker / investor loan desk. We package and shop business-purpose files to capital sources. We do not fund loans.",
  },
  {
    q: "Is this a commitment to lend?",
    a: "No. Nothing on this site is a commitment to lend, a credit decision, or a lock. Those sit with the capital source.",
  },
  {
    q: "Can I use this for a primary residence?",
    a: "No. This desk is business-purpose / non-owner-occupied only.",
  },
  {
    q: "What happens on the 30-minute call?",
    a: "We review the deal, the occupancy, and whether a program we can broker is even in range. If it is, we list the next documents.",
  },
  {
    q: "Does the calculator decide anything?",
    a: "No. It computes lender DSCR (rent ÷ PITIA) and an investor cash-flow view for orientation. It is not a credit decision, a lock, or a quote.",
  },
  {
    q: "Do you publish rates here?",
    a: "No. Pricing is deal-specific and set by the capital source, not by a page on this site.",
  },
  {
    q: "What is your NMLS number?",
    a: "TBD. It will be posted in the footer once issued / confirmed.",
  },
];

export default function FaqPage() {
  return (
    <ArticleLayout
      title="FAQ"
      description="Short answers. If you need a file reviewed, book the call."
    >
      <div className="space-y-4">
        {faqs.map((item) => (
          <Card key={item.q} className="p-5">
            <h2 className="font-medium text-ink">{item.q}</h2>
            <p className="mt-2 text-sm text-muted">{item.a}</p>
          </Card>
        ))}
      </div>
    </ArticleLayout>
  );
}
