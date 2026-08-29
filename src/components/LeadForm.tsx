import { EmbedFrame } from "@/components/EmbedFrame";
import { GHL_FORM_EMBED_HEIGHT, site } from "@/lib/site";

export function LeadForm({
  title = "Send the deal to the desk",
}: {
  title?: string;
}) {
  return (
    <EmbedFrame
      src={site.formWidgetUrl}
      title={title}
      kind="form"
      initialHeight={GHL_FORM_EMBED_HEIGHT}
    />
  );
}
