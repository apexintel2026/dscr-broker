"use client";

import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0b0e14] font-sans text-[#f4f6f8] antialiased">
        <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-[#9aa6b2]">
            Error
          </p>
          <h1 className="mt-3 text-2xl font-medium">The desk hit a snag.</h1>
          <p className="mt-3 text-sm text-[#9aa6b2]">
            Reload the page, or go home. We are a broker, not a lender.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-md bg-[#3ddc97] px-4 py-2.5 text-sm font-medium text-[#0b0e14]"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-[#2a3444] bg-[#1a2230] px-4 py-2.5 text-sm font-medium"
            >
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
