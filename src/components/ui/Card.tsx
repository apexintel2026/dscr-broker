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
      className={`rounded-card border border-border ${
        elevated ? "bg-elevated" : "bg-surface"
      } ${className}`}
    >
      {children}
    </div>
  );
}
