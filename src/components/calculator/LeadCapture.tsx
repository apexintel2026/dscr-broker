"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { fieldInputClass } from "@/components/calculator/fields";

export function LeadCapture({ reportId }: { reportId: string }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          email,
          phone,
          report_id: reportId,
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Could not send the snapshot.");
        return;
      }
      setStatus("done");
      setMessage(
        "Desk has the snapshot. Book the call if you want the file reviewed.",
      );
    } catch {
      setStatus("error");
      setMessage("Network error. The report URL still works.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="text-sm font-medium text-ink">Send this deal to the desk</p>
      <p className="text-xs text-muted">
        Optional. Results are already ungated. First name plus email or phone.
      </p>
      <label className="block space-y-1.5">
        <span className="text-xs text-muted">First name</span>
        <input
          name="first_name"
          required
          autoComplete="given-name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className={fieldInputClass}
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-xs text-muted">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldInputClass}
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs text-muted">Phone</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={fieldInputClass}
          />
        </label>
      </div>
      <Button type="submit" disabled={status === "saving" || status === "done"}>
        {status === "saving" ? "Sending…" : "Send snapshot"}
      </Button>
      {message ? (
        <p className={`text-xs ${status === "error" ? "text-danger" : "text-muted"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
