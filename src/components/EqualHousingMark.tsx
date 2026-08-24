/** House-in-circle Equal Housing Opportunity mark — not an Equal Housing Lender logo. */
export function EqualHousingMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
      className={className ?? "mt-0.5 shrink-0"}
    >
      <circle
        cx="12"
        cy="12"
        r="10.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        fill="currentColor"
        d="M12 6.4 5.6 11.4h1.7V17.4h3.4v-3.6h2.6v3.6h3.4V11.4h1.7L12 6.4Z"
      />
    </svg>
  );
}
