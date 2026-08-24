import Link from "next/link";
import { ArticleLayout, Prose } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/Card";
import { articleJsonLd, buildMetadata } from "@/lib/metadata";

const path = "/resources/dscr-vs-conventional";
const title = "DSCR vs. conventional";
const description =
  "How a DSCR / business-purpose investor file differs from a conventional mortgage or a bank-statement loan that still underwrites the borrower first.";

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
});

const rows = [
  [
    "Primary question",
    "Does the asset cover the debt?",
    "Can the borrower carry the payment?",
    "Do deposits support the stated income?",
  ],
  [
    "Occupancy",
    "Non-owner-occupied / investment",
    "Often owner-occupied or second home",
    "Varies; still a borrower-income file",
  ],
  [
    "Use",
    "Business purpose",
    "Consumer purpose",
    "Often consumer or mixed",
  ],
  [
    "Income story",
    "Rents and coverage",
    "W-2, tax returns, DTI",
    "Bank deposits as income proxy",
  ],
  [
    "Vesting",
    "Often LLC or entity",
    "Typically individual",
    "Typically individual",
  ],
];

export default function DscrVsConventionalPage() {
  return (
    <ArticleLayout
      title={title}
      description="Same building. Different file. DSCR underwrites the asset. Conventional and bank-statement still underwrite the person."
      path={path}
      jsonLd={articleJsonLd({ title, description, path })}
    >
      <Prose>
        <h2>How is a DSCR loan different from a conventional mortgage?</h2>
        <p>
          A conventional mortgage underwrites the borrower: W-2s, tax returns,
          and debt-to-income. A DSCR loan underwrites the asset: rental income
          stacked against PITIA on a business-purpose, non-owner-occupied file.
        </p>
        <p>
          Conventional investor loans still exist. They can be the cleaner path
          when personal income is strong, the property is straightforward, and
          you want a consumer-purpose product. DSCR is the path when the deal
          has to stand on cash flow. See{" "}
          <Link href="/resources/what-is-dscr">what DSCR is</Link> for the
          ratio itself.
        </p>

        <h2>How is a DSCR loan different from a bank-statement loan?</h2>
        <p>
          A bank-statement loan still underwrites the borrower. It uses
          deposits as a proxy for income instead of tax returns. A DSCR loan
          does not treat your operating account as the income story — the rent
          on the property is the income story.
        </p>
        <p>
          Self-employed investors often look at both. Bank-statement can fit
          when personal deposits are clean and DTI still has to work.
          DSCR fits when you want the asset to carry the file and occupancy is
          investment. Neither is a way to finance a primary residence on this
          desk.
        </p>
      </Prose>

      <div className="grid gap-4 sm:hidden">
        {[
          { heading: "DSCR desk", col: 1 as const, accent: true },
          { heading: "Conventional", col: 2 as const, accent: false },
          { heading: "Bank-statement", col: 3 as const, accent: false },
        ].map((column) => (
          <Card key={column.heading} className="p-5">
            <p
              className={`text-xs font-medium uppercase tracking-wider ${
                column.accent ? "text-accent" : "text-muted"
              }`}
            >
              {column.heading}
            </p>
            <dl className="mt-3 space-y-3">
              {rows.map((row) => (
                <div key={row[0]}>
                  <dt className="text-xs text-muted">{row[0]}</dt>
                  <dd className="mt-0.5 text-sm text-ink">{row[column.col]}</dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}
      </div>

      <Card className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium"> </th>
              <th className="px-4 py-3 font-medium text-accent">DSCR desk</th>
              <th className="px-4 py-3 font-medium">Conventional</th>
              <th className="px-4 py-3 font-medium">Bank-statement</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, dscr, conv, bank]) => (
              <tr key={label} className="border-b border-border last:border-b-0">
                <th className="px-4 py-3 font-medium text-ink">{label}</th>
                <td className="px-4 py-3 text-muted">{dscr}</td>
                <td className="px-4 py-3 text-muted">{conv}</td>
                <td className="px-4 py-3 text-muted">{bank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Prose>
        <h2>When does conventional still make more sense?</h2>
        <p>
          When personal income and DTI are already strong, occupancy is not a
          fight, and you want a consumer-purpose product on a simple 1–4 unit.
          We will say that on the call rather than force a DSCR structure onto
          a deal that does not need it.
        </p>
        <p>
          Conventional is usually the wrong conversation when the hold is
          clearly investment, title is in an entity, or personal DTI is the
          thing that would stall a retail file.
        </p>

        <h2>When does DSCR usually win?</h2>
        <p>
          When the property’s rent can cover PITIA, occupancy is
          non-owner-occupied, and the file is business-purpose — especially if
          personal tax returns or DTI would be the binding constraint on a
          conventional path.
        </p>
        <p>
          Coverage still has to work. Run the{" "}
          <Link href="/calculator">calculator</Link> for orientation, then{" "}
          <Link href="/book">book a 30-minute call</Link> if you want the file
          mapped. Worksheet bands are not a credit decision.
        </p>

        <h2>Does vesting change the product?</h2>
        <p>
          Often. DSCR / business-purpose files commonly close in an LLC.
          Conventional and bank-statement files more often vest in an
          individual. If the property is already in an entity, that is a DSCR
          conversation more often than a retail one. See{" "}
          <Link href="/resources/llc-entity">LLC and entity title</Link>.
        </p>

        <h2>Is this desk a conventional or bank-statement lender?</h2>
        <p>
          No. We broker business-purpose investor files. We are not the capital
          source. If a conventional or bank-statement path is the better fit,
          we will say so — we will not pretend this site originates those
          products.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
