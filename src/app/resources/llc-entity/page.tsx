import { ArticleLayout, Prose } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "LLC and entity title",
  description:
    "Closing an investor loan in an LLC: vesting, operating agreements, EIN, and what capital sources typically review.",
  path: "/resources/llc-entity",
});

export default function LlcEntityPage() {
  return (
    <ArticleLayout
      title="LLC and entity title"
      description="Most investor files vest in an entity. The paperwork has to match the person sitting on the call."
    >
      <Prose>
        <p>
          Business-purpose loans are often closed in an LLC or other entity.
          That is normal. What stalls a file is a mismatch: property in the
          LLC, borrower talking as if it is personal, or an operating
          agreement that does not name the people who will sign.
        </p>
      </Prose>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["Articles / formation", "State filing that actually exists and is in good standing."],
          ["Operating agreement", "Members, managers, and who can bind the entity."],
          ["EIN", "Issued to the entity that will hold title."],
          ["Vesting", "How title reads today vs. how it will read at close."],
        ].map(([title, body]) => (
          <Card key={title} className="p-5">
            <h2 className="font-medium text-ink">{title}</h2>
            <p className="mt-2 text-sm text-muted">{body}</p>
          </Card>
        ))}
      </div>
      <Prose>
        <p>
          We are not your formation attorney. We will tell you what capital
          sources usually ask to see so you can have the packet ready.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
