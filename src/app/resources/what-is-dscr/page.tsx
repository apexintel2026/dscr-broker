import Link from "next/link";
import { ArticleLayout, Prose } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/Card";
import {
  ACCEPTABLE_DSCR,
  LENDER_DSCR_FORMULA,
  STRONG_DSCR,
} from "@/lib/dscr";
import { articleJsonLd, buildMetadata } from "@/lib/metadata";

const path = "/resources/what-is-dscr";
const title = "What is DSCR?";
const description =
  "Debt service coverage ratio for investor loans: how rental income is stacked against PITIA when the asset — not a W-2 — carries the file.";

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
});

export default function WhatIsDscrPage() {
  return (
    <ArticleLayout
      title={title}
      description="Debt service coverage is a ratio: income the property produces versus the debt service it has to carry."
      path={path}
      jsonLd={articleJsonLd({ title, description, path })}
    >
      <Prose>
        <h2>What is a DSCR loan?</h2>
        <p>
          A DSCR loan is a business-purpose, non-owner-occupied investor loan
          that desks the property’s rental income against the payment the asset
          has to carry — not the borrower’s W-2 or tax-return DTI.
        </p>
        <p>
          DSCR means debt service coverage ratio. On this desk it is how most
          investor files get mapped. The borrower story still matters for
          identity, reserves, and experience. The coverage ratio is about the
          property.
        </p>
        <p>
          That is a different conversation than a{" "}
          <Link href="/resources/dscr-vs-conventional">
            conventional or bank-statement file
          </Link>
          . We broker the file. We do not fund it. Nothing on this page is a
          commitment to lend.
        </p>

        <h2>How is lender DSCR calculated?</h2>
        <p>
          Lender DSCR is {LENDER_DSCR_FORMULA}. That is the qualification
          number on the{" "}
          <Link href="/calculator">calculator</Link>. Investor cash flow is a
          separate, labeled view and is never mixed into lender DSCR.
        </p>
        <p>
          If monthly PITIA (or ITIA) is zero or not yet entered, there is no
          ratio to show. The worksheet will not invent a coverage number.
        </p>
      </Prose>

      <Card className="p-6">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          Working definition
        </p>
        <p className="mt-3 font-mono text-lg text-ink">
          Lender DSCR = {LENDER_DSCR_FORMULA}
        </p>
        <p className="mt-2 text-sm text-muted">
          The live calculator on /calculator uses this formula. Investor cash
          flow is a separate, labeled view.
        </p>
      </Card>

      <Prose>
        <h2>What is PITIA, and when is it ITIA?</h2>
        <p>
          PITIA is principal + interest + monthly taxes + monthly insurance +
          monthly HOA. That is the default amortizing debt service the asset
          has to cover.
        </p>
        <p>
          ITIA is the interest-only version: interest + taxes + insurance +
          HOA, with no principal. If the worksheet is on interest-only, the
          label is ITIA — never PITIA. The ratio is still rent divided by that
          monthly total.
        </p>

        <h2>How is investor cash flow different from lender DSCR?</h2>
        <p>
          Investor cash flow is rent minus PITIA/ITIA minus optional vacancy,
          maintenance, and property-management percentages. It is display-only.
          It does not change lender DSCR.
        </p>
        <p>
          Operators run both numbers. Capital sources that use DSCR are looking
          at the coverage ratio, not your personal pro forma. Keep the labels
          honest on the{" "}
          <Link href="/calculator">worksheet</Link>.
        </p>

        <h2>What counts as rental income on a DSCR file?</h2>
        <p>
          Programs differ on what counts: in-place leases, market-rent support,
          or a haircut on short-term actuals. The calculator uses the monthly
          rent you enter. It does not scrape a channel or invent a rent to
          make coverage work.
        </p>
        <p>
          Short-term and mid-term product is still an asset file when occupancy
          is investment. See{" "}
          <Link href="/resources/short-term-rentals">short-term rentals</Link>{" "}
          for how that income is usually packaged.{" "}
          <Link href="/resources/requirements">Typical requirements</Link>{" "}
          covers occupancy, entity, and property type at a high level.
        </p>

        <h2>Who is a DSCR loan for?</h2>
        <p>
          Operators buying or refinancing non-owner-occupied residential
          investment property who need the asset — not a consumer DTI story —
          to carry the file.
        </p>
        <p>
          It is not for a primary residence. It is not a retail refinance
          product. If a conventional path is cleaner, we will say so on the{" "}
          <Link href="/book">30-minute call</Link> rather than force a DSCR
          structure onto a deal that does not need it.
        </p>

        <h2>Is a DSCR ratio a credit decision?</h2>
        <p>
          No. Bands on the worksheet are guidance only: Strong ≥{" "}
          {STRONG_DSCR.toFixed(2)}, Acceptable {ACCEPTABLE_DSCR.toFixed(2)}–
          {(STRONG_DSCR - 0.01).toFixed(2)}, Weak &lt;{" "}
          {ACCEPTABLE_DSCR.toFixed(2)}. They are not a lock, a quote, or an
          approval from this desk or from a capital source.
        </p>
        <p>
          If you want a file mapped, bring the address, the rent, and the hold
          plan to a 30-minute call.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
