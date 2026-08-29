"use client";

import { useEffect, useMemo, useState } from "react";
import { CtaCluster } from "@/components/CtaCluster";
import { Button } from "@/components/ui/Button";
import { fieldInputClass } from "@/components/calculator/fields";
import {
  absoluteReportUrl,
  reportPath,
  scenarioSmsHref,
  type ScenarioShareFigures,
} from "@/lib/share-scenario";
import { site } from "@/lib/site";

export function ShareReport({
  reportId,
  dscrDisplay,
  purchasePrice,
  monthlyGrossRent,
  occupancyType,
  showOpenReport = true,
}: {
  reportId: string;
  dscrDisplay?: number | null;
  purchasePrice?: number;
  monthlyGrossRent?: number;
  occupancyType?: ScenarioShareFigures["occupancyType"];
  showOpenReport?: boolean;
}) {
  const figures = useMemo(
    () => ({ dscrDisplay, purchasePrice, monthlyGrossRent, occupancyType }),
    [dscrDisplay, purchasePrice, monthlyGrossRent, occupancyType],
  );
  const [url, setUrl] = useState(absoluteReportUrl(reportId));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(absoluteReportUrl(reportId, window.location.origin));
  }, [reportId]);

  const smsHref = scenarioSmsHref(url, figures);

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
    <div className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-ink">Share this scenario</h2>
        <p className="text-sm text-muted">
          Copy the report URL or text the numbers. Leave the scenario, not a contact form.
        </p>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-ink">Shareable report URL</span>
        <input
          readOnly
          value={url}
          aria-label="Shareable report URL"
          onFocus={(event) => event.currentTarget.select()}
          className={`${fieldInputClass} text-base`}
        />
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button
          type="button"
          variant="secondary"
          onClick={copy}
          className="w-full sm:w-auto"
        >
          {copied ? "Copied" : "Copy link"}
        </Button>
        <Button href={smsHref} className="w-full sm:w-auto">
          Text these numbers to {site.phoneDisplay}
        </Button>
        {showOpenReport ? (
          <Button
            href={reportPath(reportId)}
            variant="ghost"
            className="w-full sm:w-auto"
          >
            Open report
          </Button>
        ) : null}
      </div>
      <CtaCluster bookLabel="Book a free 30-min strategy call" />
    </div>
  );
}
