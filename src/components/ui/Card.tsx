import { cn } from "@/lib/cn";

export function Card({
  children,
  className = "",
  elevated = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
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
