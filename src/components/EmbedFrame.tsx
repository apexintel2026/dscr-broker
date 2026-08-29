import Script from "next/script";
import { cn } from "@/lib/cn";
import { GHL_FORM_EMBED_SCRIPT } from "@/lib/site";

/**
 * HighLevel conversion iframe. Official form_embed.js auto-resizes after
 * load. Eager load; height comes from initialHeight (px), not a viewport
 * cap. Skip HighLevel layout-wrapper attributes: those stay hidden until
 * iframeLoaded, which leaves a blank card when the widget is challenged.
 */
export function EmbedFrame({
  src,
  title,
  kind,
  initialHeight,
  className = "",
}: {
  src: string;
  title: string;
  kind: "form" | "booking";
  initialHeight: number;
  className?: string;
}) {
  const iframeId =
    kind === "form" ? "ghl-form-widget" : "ghl-booking-widget";

  return (
    <>
      <iframe
        id={iframeId}
        src={src}
        title={title}
        data-ghl-embed={kind}
        className={cn("ghl-embed-frame block w-full border-0 bg-transparent", className)}
        style={{ height: initialHeight, overflow: "hidden" }}
        allow="clipboard-write; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <Script
        id="highlevel-form-embed"
        src={GHL_FORM_EMBED_SCRIPT}
        strategy="afterInteractive"
      />
    </>
  );
}
