import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const CONTACT_FORM_HREF = "/contact#form";

export function CallMeNow({
  className = "",
  fullWidth = false,
  showHint = true,
}: {
  className?: string;
  fullWidth?: boolean;
  showHint?: boolean;
}) {
  const button = (
    <Button
      href={CONTACT_FORM_HREF}
      variant="urgent"
      className={fullWidth ? "w-full sm:w-auto" : undefined}
    >
      Call me now
    </Button>
  );

  if (!showHint) {
    return button;
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      {button}
      <p className="text-xs text-muted">Leave your number. We will call you.</p>
    </div>
  );
}
