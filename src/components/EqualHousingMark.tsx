import { cn } from "@/lib/cn";

/**
 * HUD Equal Housing Opportunity mark (house + equals). Inline graphic so
 * Chromium does not apply a transparent image color to the evenodd paths
 * at footer size. Not the lender lockup.
 */
export function EqualHousingMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={32}
      height={32}
      role="img"
      aria-label="Equal Housing Opportunity"
      className={cn("mt-0.5 h-8 w-8 shrink-0", className)}
    >
      <title>Equal Housing Opportunity</title>
      <rect width="100" height="100" fill="#ffffff" />
      <path
        fill="#000000"
        fillRule="evenodd"
        d="M50 6 L94 38 V94 H6 V38 Z M50 22 L78 42 V80 H22 V42 Z"
      />
      <rect x="34" y="48" width="32" height="8" fill="#000000" />
      <rect x="34" y="62" width="32" height="8" fill="#000000" />
    </svg>
  );
}
