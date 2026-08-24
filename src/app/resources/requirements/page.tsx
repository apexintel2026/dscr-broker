import Link from "next/link";
import { ArticleLayout, Prose } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/Card";
import { articleJsonLd, buildMetadata } from "@/lib/metadata";

const path = "/resources/requirements";
const title = "Typical requirements";
const description =
  "What business-purpose investor files usually need: occupancy, entity, reserves, property type, and a rent story the desk can use — not a program matrix.";

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
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
      title={title}
      description="A working list — not a rate sheet, not a promise that any file will clear."
      path={path}
      jsonLd={articleJsonLd({ title, description, path })}
    >
      <Prose>
        <h2>What does a DSCR file usually need?</h2>
        <p>
          A business-purpose, non-owner-occupied property, a rent story the
          desk can use, and enough borrower / entity identity for a capital
          source to review — plus whatever overlays that source writes on
          reserves, credit, and experience.
        </p>
        <p>
          Every capital source writes its own overlay. Treat this as the common
          skeleton we see on investor files, not a checklist that unlocks a
          decision. There is no program matrix on this site.
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

      <Prose>
        <h2>What occupancy is required?</h2>
        <p>
          Non-owner-occupied. Business purpose only. This desk does not handle
          primary residences or consumer-purpose cash-out dressed up as
          investment.
        </p>
        <p>
          Second homes and owner-occupied product belong on a different file.
          If occupancy is the fight, say so on the{" "}
          <Link href="/book">call</Link> — do not force the deal into a DSCR
          box.
        </p>

        <h2>What property types show up on these files?</h2>
        <p>
          Most files we desk are 1–4 residential, small multifamily, and some
          short-term or mid-term rental product. Mixed-use and heavier
          commercial is a different conversation.
        </p>
        <p>
          Warrantable vs. non-warrantable condo, rural, and odd unit mix are
          overlays — not a yes/no from this page.{" "}
          <Link href="/resources/short-term-rentals">Short-term rentals</Link>{" "}
          have their own income and use issues.
        </p>

        <h2>Do you need an LLC or other entity?</h2>
        <p>
          Not always, but many business-purpose investor files vest in an LLC.
          The paperwork has to match the person sitting on the call: formation,
          operating agreement, EIN, and how title will read at close.
        </p>
        <p>
          We are not your formation attorney. See{" "}
          <Link href="/resources/llc-entity">LLC and entity title</Link> for
          what capital sources typically ask to see.
        </p>

        <h2>What about reserves?</h2>
        <p>
          Reserves are reviewed by the capital source, not by this site. Months
          of PITIA, seasoning of funds, and whether gift or business capital
          counts all vary by overlay. We do not publish a reserve grid here.
        </p>
        <p>
          Bring a honest picture of liquidity to the call. Do not treat a
          worksheet band as proof that reserves will clear.
        </p>

        <h2>How do credit and experience show up?</h2>
        <p>
          Coverage does not erase tradeline review, identity, or background at
          the capital source. First deal vs. tenth deal changes overlays. A
          thin experience file can still be a conversation; it is not an
          automatic path.
        </p>
        <p>
          We do not score credit on this site and we do not issue a decision.
          If experience or credit is likely to bind, we will say so on the
          call.
        </p>

        <h2>What income documentation does the asset need?</h2>
        <p>
          A rent story the program will accept: in-place leases, market-rent
          support, or short-term actuals. The{" "}
          <Link href="/calculator">calculator</Link> uses the monthly rent you
          type. It does not create income.
        </p>
        <p>
          Lender DSCR is still rent ÷ PITIA (or ITIA if interest-only). See{" "}
          <Link href="/resources/what-is-dscr">what DSCR is</Link> for that
          math. If you want the file mapped,{" "}
          <Link href="/book">book a 30-minute call</Link>.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
