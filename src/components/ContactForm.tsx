"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/thank-you");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block space-y-1.5">
        <span className="text-xs text-muted">Name</span>
        <input
          name="name"
          required
          autoComplete="name"
          className="w-full rounded-control border border-border bg-elevated px-3 py-2.5 text-sm text-ink"
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-xs text-muted">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-control border border-border bg-elevated px-3 py-2.5 text-sm text-ink"
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-xs text-muted">Deal notes</span>
        <textarea
          name="notes"
          rows={5}
          placeholder="Address, rents, PITIA, entity, hold plan."
          className="w-full rounded-control border border-border bg-elevated px-3 py-2.5 text-sm text-ink placeholder:text-muted"
        />
      </label>
      <p className="text-xs text-muted">
        Phase 1 routes this form to a thank-you page only. No webhook, no CRM
        write. Do not send documents here.
      </p>
      <Button type="submit">Send to the desk</Button>
    </form>
  );
}
