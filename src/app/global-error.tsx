"use client";

import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-[100dvh] items-center bg-[var(--bg)] px-5 text-[var(--text-primary)] sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-5xl lg:max-w-7xl">
            <p className="font-mono text-sm text-[var(--accent)]">
              runtime error
            </p>
            <h1 className="mt-4 max-w-xl font-serif text-4xl font-light italic leading-tight sm:text-5xl">
              something went wrong.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[var(--text-secondary)]">
              The page did not finish loading. Try it once more, or return to
              the case studies.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex min-h-11 items-center border border-[var(--border-strong)] bg-[rgba(246,242,234,0.04)] px-4 py-2 font-mono text-sm transition-colors hover:border-[var(--accent)]"
              >
                try again
              </button>
              <Link
                href="/#work"
                className="inline-flex min-h-11 items-center px-4 py-2 font-mono text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                back to work
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
