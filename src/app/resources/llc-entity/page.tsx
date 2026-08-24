import Link from "next/link";
import { ArticleLayout, Prose } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/Card";
import { articleJsonLd, buildMetadata } from "@/lib/metadata";

const path = "/resources/llc-entity";
const title = "LLC and entity title";
const description =
  "Closing an investor loan in an LLC: vesting, operating agreements, EIN, and what capital sources typically review.";

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
});

const items = [
  [
    "Articles / formation",
    "State filing that actually exists and is in good standing.",
  ],
  [
    "Operating agreement",
    "Members, managers, and who can bind the entity.",
  ],
  ["EIN", "Issued to the entity that will hold title."],
  [
    "Vesting",
    "How title reads today vs. how it will read at close.",
  ],
] as const;

export default function LlcEntityPage() {
  return (
    <ArticleLayout
      title={title}
      description="Most investor files vest in an entity. The paperwork has to match the person sitting on the call."
      path={path}
      jsonLd={articleJsonLd({ title, description, path })}
    >
      <Prose>
        <h2>Can you close a DSCR loan in an LLC?</h2>
        <p>
          Often yes. Business-purpose investor loans commonly close in an LLC
          or other entity. That is normal on this desk. What stalls a file is a
          mismatch between title, the entity documents, and who is actually
          signing.
        </p>
        <p>
          We are not your formation attorney and we are not the capital source.
          We will tell you what programs we can broker usually ask to see so
          you can have the packet ready. See{" "}
          <Link href="/resources/requirements">typical requirements</Link> for
          the rest of the skeleton.
        </p>
      </Prose>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(([itemTitle, body]) => (
          <Card key={itemTitle} className="p-5">
            <h2 className="font-medium text-ink">{itemTitle}</h2>
            <p className="mt-2 text-sm text-muted">{body}</p>
          </Card>
        ))}
      </div>

      <Prose>
        <h2>What entity documents do capital sources typically review?</h2>
        <p>
          Formation / articles, an operating agreement that names members and
          managers, an EIN for the entity that will hold title, good standing,
          and a chain of title that matches the vest at close.
        </p>
        <p>
          Multi-member agreements need to show who can bind the entity.
          Single-member files still need documents that exist — not a verbal
          “it’s just me.” If the agreement is silent on borrowing, fix that
          before the file is in motion.
        </p>

        <h2>Do you still review the people behind the LLC?</h2>
        <p>
          Yes, at the capital source. Entity vesting does not erase identity,
          credit, or experience review of the members or guarantors the program
          requires. Coverage on the asset is not a substitute for knowing who
          is on the call.
        </p>
        <p>
          Personal guarantees are common on these files. Whether a given
          source requires one is an overlay, not a promise from this site.
        </p>

        <h2>What vesting mismatches stall a file?</h2>
        <p>
          Property already in the LLC while the borrower talks as if it is
          personal. Property in a personal name with a last-minute entity vest
          and no assignment path. An EIN issued to a different legal name than
          title. An operating agreement that does not name the signers.
        </p>
        <p>
          Purchase vs. refinance changes the sequence. On a purchase, the
          entity needs to be the one that can take title. On a refinance, title
          today has to match the borrower the program will accept — or there
          has to be a clean path to get there.
        </p>

        <h2>Is a brand-new LLC a problem?</h2>
        <p>
          Not automatically. Seasoning of the entity vs. seasoning of the
          property are different questions, and overlays differ. A brand-new
          LLC with no documents and no EIN is a problem. Formation is not the
          same as a complete packet.
        </p>
        <p>
          First deal vs. tenth deal still matters for{" "}
          <Link href="/resources/requirements">experience overlays</Link>.
          Entity age does not replace that conversation.
        </p>

        <h2>Should the calculator change if I borrow in an LLC?</h2>
        <p>
          No. Lender DSCR is still rent ÷ PITIA (or ITIA if interest-only).
          Entity vs. personal vest does not change the worksheet math. Run the{" "}
          <Link href="/calculator">calculator</Link> for coverage, then{" "}
          <Link href="/book">book a 30-minute call</Link> with the vest you
          actually intend.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
