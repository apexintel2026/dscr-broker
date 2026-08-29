import { PhoneLinks } from "@/components/PhoneLinks";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

/**
 * Conversion card around a HighLevel widget. Phone path stays visible
 * even if the iframe is blank. Surface card only — no unused min-height
 * shell around the widget.
 */
export function EmbedPanel({
  id,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card id={id} className={cn("overflow-hidden", className)}>
      <div className="border-b border-border px-6 py-4">
        <h2 className="font-medium text-ink">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
        <PhoneLinks size="md" className="mt-3" />
      </div>
      {children}
    </Card>
  );
}
