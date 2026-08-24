import Link from "next/link";
import { ArticleLayout, Prose } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/Card";
import { articleJsonLd, buildMetadata } from "@/lib/metadata";

const path = "/resources/short-term-rentals";
const title = "Short-term rentals";
const description =
  "How short-term and mid-term rental properties are usually packaged on a DSCR / business-purpose investor file.";

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
});

export default function ShortTermRentalsPage() {
  return (
    <ArticleLayout
      title={title}
      description="STR files live or die on the rent story, the occupancy rules, and whether the program will take actuals."
      path={path}
      jsonLd={articleJsonLd({ title, description, path })}
    >
      <Prose>
        <h2>Can you use a DSCR loan on an Airbnb or short-term rental?</h2>
        <p>
          Yes, when the property is non-owner-occupied and the use is
          business-purpose. A short-term rental can still be an investor file.
          The desk questions are how income is documented and whether local or
          HOA rules let the use continue.
        </p>
        <p>
          It is not a consumer vacation-home loan. If you stay in the property,
          occupancy is the fight. This desk does not desk primary residences.
        </p>

        <h2>How is STR income usually documented?</h2>
        <p>
          Trailing actuals from the channel, market comps, or a hybrid —
          whichever the capital source will accept. Many programs haircut
          short-term gross. Some want 12 months of in-place history. None of
          that is decided by this website.
        </p>
        <p>
          We do not scrape Airbnb or VRBO. The{" "}
          <Link href="/calculator?occupancy=str">calculator</Link> STR toggle
          marks rent as a projection (<code>rent_is_projection=yes</code>). You
          still type the monthly number. Lender DSCR remains rent ÷ PITIA (or
          ITIA if interest-only). For the conversion page, see{" "}
          <Link href="/str">DSCR for short-term rentals</Link>.
        </p>
      </Prose>

      <div className="grid gap-4">
        <Card className="p-5">
          <h2 className="font-medium text-ink">What we ask first</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>In-place channel history (12 months when you have it)</li>
            <li>Nightly vs. mid-term mix</li>
            <li>HOA / municipal STR restrictions</li>
            <li>Whether you will keep STR or convert to long-term</li>
          </ul>
        </Card>
        <Card className="p-5">
          <h2 className="font-medium text-ink">What this page is not</h2>
          <p className="mt-2 text-sm text-muted">
            It is not a pricing engine and not a claim that STR income will be
            used as submitted. The capital source sets the income method.
          </p>
        </Card>
      </div>

      <Prose>
        <h2>What local and HOA rules matter?</h2>
        <p>
          Municipal licensing, night caps, owner-occupancy rules, and HOA
          short-term bans. If the use is not allowed, the rent story does not
          matter. Bring the actual restriction, not a hope that enforcement is
          loose.
        </p>
        <p>
          Mid-term (30+ day) can be a different overlay than nightly. If you
          are converting from nightly to mid-term to clear a rule, say that on
          the call. Do not hide it in the rent number.
        </p>

        <h2>How should you run STR numbers on the calculator?</h2>
        <p>
          Switch occupancy to STR (or{" "}
          <Link href="/calculator?occupancy=str">open the calculator with STR already on</Link>
          ), enter a monthly rent you can defend, and keep vacancy /
          maintenance / PM in the investor view. Those percentages do not
          change lender DSCR. They are there so you can see cash flow without
          mixing it into the qualification ratio.
        </p>
        <p>
          See{" "}
          <Link href="/resources/what-is-dscr">what DSCR is</Link> for the
          formula.{" "}
          <Link href="/resources/requirements">Typical requirements</Link>{" "}
          still apply: occupancy, entity, reserves, credit, experience. STR
          does not skip them.
        </p>

        <h2>What if you convert the property to long-term?</h2>
        <p>
          Then the file is an LTR rent story — leases or market rent — not
          trailing nightly actuals. Say which hold you actually intend. Capital
          sources underwrite the use you will have after close, not the listing
          photos from last summer.
        </p>
        <p>
          If you want the file mapped,{" "}
          <Link href="/book">book a 30-minute call</Link> with the address, the
          channel history you have, and the hold plan — or start on the{" "}
          <Link href="/str">STR landing</Link>.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
