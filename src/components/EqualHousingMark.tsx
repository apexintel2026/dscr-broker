import Image from "next/image";

/** HUD Equal Housing Opportunity mark from /equal-housing-opportunity.svg — not the lender logo. */
export function EqualHousingMark({ className }: { className?: string }) {
  return (
    <Image
      src="/equal-housing-opportunity.svg"
      alt="Equal Housing Opportunity"
      width={32}
      height={32}
      className={className ?? "mt-0.5 h-8 w-8 shrink-0"}
      unoptimized
    />
  );
}
