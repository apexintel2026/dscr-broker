import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0E14",
          color: "#F4F6F8",
          padding: 72,
          border: "16px solid #1A2230",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 28, color: "#9AA6B2" }}>{site.name}</div>
          <div style={{ fontSize: 22, color: "#3DDC97" }}>{site.navSubtitle}</div>
        </div>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.1,
            fontWeight: 500,
            maxWidth: 900,
          }}
        >
          {site.tagline}
        </div>
        <div style={{ fontSize: 24, color: "#9AA6B2" }}>
          Broker, not a lender. Business-purpose only.
        </div>
      </div>
    ),
    { ...size },
  );
}
