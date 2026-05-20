import Link from "next/link";

import { workItems } from "@/lib/work";

export default function Home() {
  return (
    <main id="main" className="min-h-[100dvh]">
      <header className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:max-w-7xl lg:px-12 lg:py-20">
        <div className="flex items-center justify-between gap-3 font-mono text-sm">
          <Link
            href="/"
            className="-mx-2 inline-flex min-h-11 items-center gap-2 px-2 text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
          >
            <VelveteenMark className="h-[18px] w-[18px] text-[var(--accent)]" />
            <span>Drew McFarland</span>
          </Link>
          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-1 text-[var(--text-muted)] sm:gap-2"
          >
            <a
              href="https://seams.velveteen.sh"
              className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-[var(--accent)]"
            >
              Blog
            </a>
            <a
              href="#work"
              className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-[var(--accent)]"
            >
              Work
            </a>
            <Link
              href="/resume"
              className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-[var(--accent)]"
            >
              Resume
            </Link>
          </nav>
        </div>

        <div className="mt-14 grid gap-10 sm:mt-20 lg:gap-20 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <h1 className="max-w-lg font-serif text-4xl font-light italic leading-tight text-[var(--text-primary)] sm:text-5xl">
              outcomes over everything.
            </h1>
          </div>

          <div className="max-w-3xl space-y-8">
            <div className="space-y-5 font-serif text-lg leading-8 text-[var(--text-secondary)] sm:text-xl sm:leading-9">
              <p>
                I&apos;ve spent enough years watching good-looking work fail to
                land that I&apos;ve stopped trusting the artifact. I plan around
                the outcome. If a project shipped and the way people work
                didn&apos;t change, I count it as a miss.
              </p>
            </div>
            <dl className="grid grid-cols-[6rem_1fr] gap-x-6 gap-y-3 border-t border-[var(--border)] pt-6 font-mono text-xs">
              <dt className="text-[var(--text-muted)]">role</dt>
              <dd className="text-[var(--text-primary)]">
                Sr Product Designer and Product Lead, Rise8
              </dd>
              <dt className="text-[var(--text-muted)]">background</dt>
              <dd className="text-[var(--text-primary)]">
                Nine years on GovTech and defense platforms, mostly at Kessel
                Run, now at Rise8
              </dd>
              <dt className="text-[var(--text-muted)]">clearance</dt>
              <dd className="text-[var(--text-primary)]">
                Active Secret, USAF veteran
              </dd>
              <dt className="text-[var(--text-muted)]">open to</dt>
              <dd className="text-[var(--text-primary)]">
                Senior IC and design leadership roles.{" "}
                <a
                  href="mailto:drewjmcfarland@live.com"
                  className="text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  drewjmcfarland@live.com
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </header>

      <section
        id="work"
        aria-labelledby="work-heading"
        className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 sm:pb-24 lg:max-w-7xl lg:px-12 lg:pb-32"
      >
        <div className="grid gap-10 border-t border-[var(--border)] pt-12 sm:pt-16 lg:grid-cols-[0.34fr_0.66fr] lg:gap-20 lg:pt-20">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <h2
              id="work-heading"
              className="font-mono text-sm text-[var(--accent)]"
            >
              work
            </h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-[var(--text-secondary)]">
              These are the projects where I think the way people work
              actually changed. All from 2026. For older work, reach out. I
              love to talk shop and would be happy to walk through it.
            </p>
          </div>

          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {workItems.map((item) => (
              <article key={item.slug}>
                <Link
                  href={`/work/${item.slug}`}
                  className="group block py-10 transition-colors hover:bg-[rgba(246,242,234,0.025)] sm:px-6 sm:py-12"
                >
                  <div className="flex items-baseline justify-between gap-5">
                    <h3 className="font-serif text-3xl leading-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)] sm:text-4xl">
                      {item.title}
                    </h3>
                    <span className="shrink-0 font-mono text-xs text-[var(--text-muted)]">
                      {item.year}
                    </span>
                  </div>
                  <div className="mt-6 max-w-3xl border-l border-[var(--border-strong)] pl-4 sm:pl-5">
                    <p className="font-mono text-xs text-[var(--accent)]">
                      Outcome
                    </p>
                    <p className="mt-2 text-base leading-7 text-[var(--text-primary)] sm:text-lg sm:leading-8">
                      {item.outcome}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-5xl flex-wrap gap-x-3 gap-y-2 border-t border-[var(--border)] px-5 py-10 font-mono text-sm text-[var(--text-muted)] sm:px-8 sm:py-12 lg:max-w-7xl lg:px-12">
        <div className="grid w-full gap-4 lg:grid-cols-[0.34fr_0.66fr]">
          <p className="text-[var(--accent)]">Drew McFarland</p>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            <a
              href="https://seams.velveteen.sh"
              className="-mx-2 inline-flex min-h-11 items-center px-2 transition-colors hover:text-[var(--accent)]"
            >
              seams
            </a>
            <a
              href="https://linkedin.com/in/drewux/"
              className="-mx-2 inline-flex min-h-11 items-center px-2 transition-colors hover:text-[var(--accent)]"
            >
              linkedin
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function VelveteenMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="7" y="2" width="5" height="13" fill="currentColor" />
      <rect x="20" y="2" width="5" height="13" fill="currentColor" />
      <rect x="3" y="13" width="26" height="17" fill="currentColor" />
      <rect x="9" y="19" width="4" height="4" fill="var(--bg)" />
      <rect x="19" y="19" width="4" height="4" fill="var(--bg)" />
    </svg>
  );
}
