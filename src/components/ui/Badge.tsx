export function Badge({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent" | "warning" | "danger";
}) {
  const tones = {
    muted: "border-border bg-elevated text-muted",
    accent: "border-accent/30 bg-accent/10 text-accent",
    warning: "border-warning/30 bg-warning/10 text-warning",
    danger: "border-danger/30 bg-danger/10 text-danger",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-control border px-2.5 py-1 text-xs font-medium tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
