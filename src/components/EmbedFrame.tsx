import { cn } from "@/lib/cn";

/**
 * HighLevel (and similar) iframe. Reserved min-height avoids layout shift;
 * loading=lazy keeps it off the critical path on content pages.
 */
export function EmbedFrame({
  src,
  title,
  className = "",
}: {
  src: string;
  title: string;
  className?: string;
}) {
  return (
    <iframe
      src={src}
      title={title}
      className={cn("block w-full border-0 bg-elevated", className)}
      allow="clipboard-write; fullscreen"
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
