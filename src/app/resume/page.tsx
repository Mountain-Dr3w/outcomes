import type { Metadata } from "next";
import {
  ArrowLeftIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { resume } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for Drew McFarland, a product designer and strategist, USAF veteran, and active Secret clearance holder.",
  openGraph: {
    title: "Resume | Drew McFarland",
    description:
      "Product design, strategy, and design operations experience across GovTech, defense, and infrastructure products.",
    url: "/resume",
  },
};

export default function ResumePage() {
  return (
    <main id="main" className="min-h-[100dvh]">
      <header className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12 lg:max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-sm">
          <Link
            href="/"
            className="group -mx-2 inline-flex min-h-11 items-center gap-2 px-2 text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeftIcon
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-0.5"
              size={14}
              weight="bold"
            />
            home
          </Link>
          <a
            href={resume.pdfHref}
            download
            className="group inline-flex min-h-11 items-center gap-2 border border-[var(--border-strong)] bg-[rgba(246,242,234,0.04)] px-4 py-2 text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] active:translate-y-px"
            aria-label={`Download ${resume.name} resume PDF`}
          >
            <DownloadSimpleIcon
              aria-hidden="true"
              size={16}
              weight="bold"
              className="text-[var(--accent)] transition-transform group-hover:translate-y-0.5"
            />
            Download PDF
          </a>
        </div>

        <div className="mt-10 grid gap-8 border-t border-[var(--border)] pt-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <p className="font-mono text-sm text-[var(--accent)]">resume</p>
          </div>
          <div>
            <h1 className="max-w-3xl font-serif text-4xl font-light italic leading-tight text-[var(--text-primary)] sm:text-5xl">
              {resume.name}
            </h1>
            <p className="mt-6 max-w-3xl font-serif text-xl leading-9 text-[var(--text-secondary)] sm:text-2xl sm:leading-10">
              {resume.headline}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-[var(--text-muted)]">
              <a
                href={resume.websiteHref}
                className="-mx-2 inline-flex min-h-11 items-center px-2 transition-colors hover:text-[var(--accent)]"
              >
                {resume.website}
              </a>
              <a
                href={`mailto:${resume.email}`}
                className="-mx-2 inline-flex min-h-11 items-center px-2 transition-colors hover:text-[var(--accent)]"
              >
                {resume.email}
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8 lg:max-w-6xl lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <h2 className="font-mono text-sm text-[var(--accent)]">
              experience
            </h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-[var(--text-secondary)]">
              Product design, strategy, and design operations roles where
              research had to turn into shipped operational change.
            </p>
          </aside>

          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {resume.experience.map((item) => (
              <article key={item.organization} className="py-8 sm:px-6 sm:py-10">
                <h3 className="font-serif text-3xl leading-tight text-[var(--text-primary)] sm:text-4xl">
                  {item.organization}
                </h3>

                <div className="mt-7 grid gap-8">
                  {item.roles.map((role) => (
                    <section
                      key={`${item.organization}-${role.title}`}
                      aria-labelledby={`${item.organization}-${role.title}`
                        .toLowerCase()
                        .replaceAll(/[^a-z0-9]+/g, "-")}
                    >
                      <div className="grid gap-2 border-l border-[var(--border-strong)] pl-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-5 sm:pl-5">
                        <h4
                          id={`${item.organization}-${role.title}`
                            .toLowerCase()
                            .replaceAll(/[^a-z0-9]+/g, "-")}
                          className="text-xl leading-tight text-[var(--text-primary)]"
                        >
                          {role.title}
                        </h4>
                        <p className="font-mono text-xs text-[var(--text-muted)]">
                          {role.period}
                        </p>
                      </div>
                      <ul className="mt-5 grid gap-3 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
                        {role.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="grid grid-cols-[0.75rem_1fr] gap-3"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.88rem] h-px bg-[var(--accent)]"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-[var(--border)] pt-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <h2 className="font-mono text-sm text-[var(--accent)]">
              education
            </h2>
          </div>
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {resume.education.map((item) => (
              <article
                key={item.degree}
                className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:px-4"
              >
                <h3 className="text-base leading-7 text-[var(--text-primary)] sm:text-lg">
                  {item.degree}
                </h3>
                <p className="font-mono text-xs leading-7 text-[var(--text-muted)]">
                  {item.school}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
