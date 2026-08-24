import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const CONTACT_FORM_HREF = "/contact#form";

export function CallMeNow({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex w-full flex-col items-stretch gap-1.5", className)}>
      <Button href={CONTACT_FORM_HREF} variant="danger" className="w-full">
        Call me now
      </Button>
      <p className="text-xs text-muted">Leave your number. We will call you.</p>
    </div>
  );
}
