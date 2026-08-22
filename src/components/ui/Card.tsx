import { cn } from "@/lib/cn";

export function Card({
  children,
  className = "",
  elevated = false,
}: {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-border",
        elevated ? "bg-elevated" : "bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}
