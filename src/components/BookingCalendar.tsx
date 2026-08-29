import { EmbedFrame } from "@/components/EmbedFrame";
import { GHL_BOOKING_EMBED_HEIGHT, site } from "@/lib/site";

export function BookingCalendar() {
  return (
    <EmbedFrame
      src={site.bookingWidgetUrl}
      title="Book a 30-minute strategy call"
      kind="booking"
      initialHeight={GHL_BOOKING_EMBED_HEIGHT}
    />
  );
}
