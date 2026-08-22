import { ArticleLayout, Prose } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "DSCR vs. conventional",
  description:
    "How a DSCR / business-purpose investor file differs from a conventional mortgage that underwrites the borrower first.",
  path: "/resources/dscr-vs-conventional",
});

const rows = [
  ["Primary question", "Does the asset cover the debt?", "Can the borrower carry the payment?"],
  ["Occupancy", "Non-owner-occupied / investment", "Often owner-occupied or second home"],
  ["Use", "Business purpose", "Consumer purpose"],
  ["Income story", "Rents and coverage", "W-2, tax returns, DTI"],
  ["Vesting", "Often LLC or entity", "Typically individual"],
];

export default function DscrVsConventionalPage() {
  return (
    <ArticleLayout
      title="DSCR vs. conventional"
      description="Same building. Different file. One path underwrites the asset. The other underwrites the person."
    >
      <Prose>
        <p>
          Conventional investor loans still exist. They can be the cleaner
          path when personal income is strong, the property is straightforward,
          and you want a consumer-purpose product. DSCR is the path when the
          deal has to stand on cash flow.
        </p>
      </Prose>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium"> </th>
              <th className="px-4 py-3 font-medium text-accent">DSCR desk</th>
              <th className="px-4 py-3 font-medium">Conventional</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, dscr, conv]) => (
              <tr key={label} className="border-b border-border last:border-b-0">
                <th className="px-4 py-3 font-medium text-ink">{label}</th>
                <td className="px-4 py-3 text-muted">{dscr}</td>
                <td className="px-4 py-3 text-muted">{conv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Prose>
        <p>
          We broker business-purpose investor files. If a conventional path is
          the better fit, we will say so on the call — we will not force a
          DSCR structure onto a deal that does not need it.
        </p>
      </Prose>
    </ArticleLayout>
  );
}
