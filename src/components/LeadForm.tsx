import { site } from "@/lib/site";

export function LeadForm({
  title = "Send the deal to the desk",
}: {
  title?: string;
}) {
  return (
    <iframe
      src={site.formWidgetUrl}
      title={title}
      className="block h-[min(90vh,820px)] min-h-[620px] w-full border-0 bg-elevated"
      allow="clipboard-write; fullscreen"
      loading="eager"
    />
  );
}
