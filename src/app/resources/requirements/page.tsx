import { ArticleLayout, Prose } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Typical requirements",
  description:
    "What business-purpose investor files usually need: occupancy, entity, reserves, property type, and a rent story the desk can use.",
  path: "/resources/requirements",
});

const items = [
  {
    title: "Occupancy",
    body: "Non-owner-occupied. Business purpose. Not a primary residence and not a consumer cash-out story dressed up as investment.",
  },
  {
    title: "Property",
    body: "1–4 residential, small multifamily, and some STR product. Mixed-use and heavier commercial is a different desk conversation.",
  },
  {
    title: "Income on the asset",
    body: "Leases, market rent support, or STR actuals — whatever the program will accept. We do not invent a rent number to make coverage work.",
  },
  {
    title: "Entity and title",
    body: "Many files vest in an LLC. Operating agreement, EIN, and a clean chain of title matter more than a logo on the articles.",
  },
  {
    title: "Reserves and experience",
    body: "Capital sources vary. First deal vs. tenth deal changes the conversation. Reserves are reviewed by the lender, not by this site.",
  },
  {
    title: "Credit and identity",
    body: "Still part of most files. Coverage does not erase identity, background, or tradeline review at the capital source.",
  },
];

export default function RequirementsPage() {
  return (
    <ArticleLayout
      title="Typical requirements"
      description="A working list — not a rate sheet, not a promise that any file will clear."
    >
      <Prose>
        <p>
          Every capital source writes its own overlay. Treat this as the
          common skeleton we see on business-purpose investor files, not a
          checklist that unlocks a decision.
        </p>
      </Prose>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Card key={item.title} className="p-5">
            <h2 className="font-medium text-ink">{item.title}</h2>
            <p className="mt-2 text-sm text-muted">{item.body}</p>
          </Card>
        ))}
      </div>
    </ArticleLayout>
  );
}
