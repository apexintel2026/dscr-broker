import { site } from "@/lib/site";

export function BookingCalendar() {
  return (
    <iframe
      src={site.bookingWidgetUrl}
      title="Book a 30-minute strategy call"
      className="block h-[min(90vh,880px)] min-h-[700px] w-full border-0 bg-elevated"
      allow="clipboard-write; fullscreen"
      loading="eager"
    />
  );
}
