"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { fieldInputClass } from "@/components/calculator/fields";

export function ShareReport({ reportId }: { reportId: string }) {
  const [url, setUrl] = useState(`/calculator/report/${reportId}`);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(`${window.location.origin}/calculator/report/${reportId}`);
  }, [reportId]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-ink">Shareable deal score</p>
      <p className="text-xs text-muted">
        Same math in another tab. No login. Not a credit package.
      </p>
      <input readOnly value={url} className={fieldInputClass} />
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={copy}>
          {copied ? "Copied" : "Copy link"}
        </Button>
        <Button href={`/calculator/report/${reportId}`} variant="ghost">
          Open report
        </Button>
      </div>
    </div>
  );
}
