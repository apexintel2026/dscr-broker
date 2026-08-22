import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const CONTACT_FORM_HREF = "/contact#form";

export function CallMeNow({
  className = "",
  fullWidth = false,
}: {
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Button
        href={CONTACT_FORM_HREF}
        variant="secondary"
        className={fullWidth ? "w-full sm:w-auto" : undefined}
      >
        Call me now
      </Button>
      <p className="text-xs text-muted">Leave your number. We will call you.</p>
    </div>
  );
}
