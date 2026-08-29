"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function PrintSaveButton({ className = "" }: { className?: string }) {
  return (
    <Button
      type="button"
      className={cn("no-print", className)}
      onClick={() => window.print()}
    >
      Print / Save PDF
    </Button>
  );
}
