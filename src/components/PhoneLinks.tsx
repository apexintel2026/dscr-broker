import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function PhoneLinks({
  className = "",
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const text = size === "md" ? "text-sm" : "text-xs";

  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
        text,
        className,
      )}
    >
      <span className="text-muted">Call or text us.</span>
      <a
        href={`tel:${site.phoneHref}`}
        className="font-mono tracking-tight text-ink transition-colors duration-150 hover:text-accent"
      >
        {site.phoneDisplay}
      </a>
      <a
        href={`sms:${site.phoneHref}`}
        className="text-accent transition-colors duration-150 hover:underline"
      >
        Text
      </a>
    </p>
  );
}
