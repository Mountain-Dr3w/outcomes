import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-[100dvh] items-center px-5 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-5xl lg:max-w-7xl">
        <p className="font-mono text-sm text-[var(--accent)]">404</p>
        <h1 className="mt-4 max-w-lg font-serif text-4xl font-light italic leading-tight text-[var(--text-primary)] sm:text-5xl">
          nothing at this address.
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-[var(--text-secondary)]">
          The page moved, or it never existed. The work is still on the home
          page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center gap-2 border border-[var(--border-strong)] bg-[rgba(246,242,234,0.04)] px-4 py-2 font-mono text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
        >
          back home
        </Link>
      </div>
    </main>
  );
}
