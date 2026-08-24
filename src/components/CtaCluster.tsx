import { CallMeNow } from "@/components/CallMeNow";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function CtaCluster({
  bookHref = "/book",
  bookLabel = "Book a 30-min call",
  className = "",
}: {
  bookHref?: string;
  bookLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex w-full flex-col items-stretch gap-3", className)}
    >
      <Button href={bookHref} className="w-full">
        {bookLabel}
      </Button>
      <CallMeNow />
    </div>
  );
}
