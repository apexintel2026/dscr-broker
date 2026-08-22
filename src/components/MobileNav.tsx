"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-border bg-elevated text-ink"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
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

      {open ? (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-border bg-surface"
        >
          <nav aria-label="Mobile" className="flex flex-col px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-border py-3 text-sm text-ink last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="py-3 text-sm text-muted"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
