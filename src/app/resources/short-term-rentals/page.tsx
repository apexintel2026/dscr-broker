import { ArticleLayout, Prose } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Short-term rentals",
  description:
    "How short-term and mid-term rental properties are usually packaged on a DSCR / business-purpose investor file.",
  path: "/resources/short-term-rentals",
});

export default function ShortTermRentalsPage() {
  return (
    <ArticleLayout
      title="Short-term rentals"
      description="STR files live or die on the rent story, the occupancy rules, and whether the program will take actuals."
    >
      <Prose>
        <p>
          A short-term rental can still be a business-purpose investor loan.
          The desk question is how income is documented — trailing actuals,
          market comps, or a hybrid — and whether local rules let the use
          continue.
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
    </ArticleLayout>
  );
}
