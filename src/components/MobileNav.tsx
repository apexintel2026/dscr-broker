"use client";

import { useEffect, useId, useRef, useState } from "react";
import { NavLink } from "@/components/NavLink";
import { navLinks } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const panelId = `mobile-nav-${reactId}`;

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    const firstLink = panelRef.current?.querySelector("a");
    firstLink?.focus();

    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-border bg-elevated text-ink"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden className="flex flex-col gap-1.5">
          <span
            className={`block h-0.5 w-4 bg-ink transition-transform duration-150 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-4 bg-ink transition-opacity duration-150 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-4 bg-ink transition-transform duration-150 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-surface"
      >
        <nav aria-label="Mobile" className="flex flex-col px-4 py-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className="border-b border-border py-3 text-sm text-ink last:border-b-0"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            href="/contact"
            className="py-3 text-sm text-muted"
            onClick={() => setOpen(false)}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
