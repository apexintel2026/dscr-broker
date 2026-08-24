import { site } from "@/lib/site";
import { EmbedFrame } from "@/components/EmbedFrame";

export function BookingCalendar() {
  return (
    <EmbedFrame
      src={site.bookingWidgetUrl}
      title="Book a 30-minute strategy call"
      className="h-[min(90vh,880px)] min-h-[700px]"
    />
  );
}
