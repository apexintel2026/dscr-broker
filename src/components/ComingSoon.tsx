import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function ComingSoon({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <Card elevated className="px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-xl space-y-4 text-center">
        <Badge tone="warning">Coming in Phase 2</Badge>
        <h2 className="text-xl font-medium tracking-tight text-ink sm:text-2xl">
          {title}
        </h2>
        <p className="text-sm text-muted sm:text-base">{body}</p>
      </div>
    </Card>
  );
}
