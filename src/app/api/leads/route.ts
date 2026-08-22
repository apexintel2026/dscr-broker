import { NextResponse } from "next/server";
import { calculateDeal } from "@/lib/dscr";
import { decodeReportId } from "@/lib/dscr-codec";
import { buildLeadPayload } from "@/lib/lead-payload";
import { site } from "@/lib/site";

type Body = {
  first_name?: string;
  email?: string;
  phone?: string;
  report_id?: string;
};

function originFromRequest(request: Request): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get("origin") ||
    site.url
  );
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const firstName = (body.first_name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const reportId = (body.report_id ?? "").trim();

  if (!firstName) {
    return NextResponse.json({ error: "First name is required." }, { status: 400 });
  }
  if (!email && !phone) {
    return NextResponse.json(
      { error: "Email or phone is required." },
      { status: 400 },
    );
  }
  if (email && !isEmail(email)) {
    return NextResponse.json({ error: "Email looks invalid." }, { status: 400 });
  }
  if (phone && phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "Phone looks invalid." }, { status: 400 });
  }

  const inputs = decodeReportId(reportId);
  if (!inputs) {
    return NextResponse.json({ error: "Unknown report." }, { status: 400 });
  }
  const { result } = calculateDeal(inputs);
  if (!result) {
    return NextResponse.json({ error: "Deal is incomplete." }, { status: 400 });
  }

  const payload = buildLeadPayload({
    contact: { first_name: firstName, email, phone },
    inputs,
    result,
    reportId,
    origin: originFromRequest(request),
  });

  const webhookUrl = process.env.HIGHLEVEL_WEBHOOK_URL?.trim();
  let webhook: "sent" | "skipped" | "failed" = "skipped";

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      webhook = response.ok ? "sent" : "failed";
      if (!response.ok) {
        console.error("[calculator lead] webhook status", response.status);
      }
    } catch (error) {
      webhook = "failed";
      console.error("[calculator lead] webhook error", error);
    }
  } else {
    console.log(
      "[calculator lead] HIGHLEVEL_WEBHOOK_URL unset — payload logged only",
      payload,
    );
  }

  return NextResponse.json({
    ok: true,
    report_id: reportId,
    report_url: payload.report_url,
    webhook,
  });
}
