import { site } from "@/lib/site";
import { EmbedFrame } from "@/components/EmbedFrame";

export function LeadForm({
  title = "Send the deal to the desk",
}: {
  title?: string;
}) {
  return (
    <EmbedFrame
      src={site.formWidgetUrl}
      title={title}
      className="h-[min(90vh,820px)] min-h-[620px]"
    />
  );
}
