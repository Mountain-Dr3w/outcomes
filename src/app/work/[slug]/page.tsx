import type { Metadata } from "next";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import {
  getNextWorkBySlug,
  getWorkBySlug,
  type WorkVisual,
  workItems,
} from "@/lib/work";

interface WorkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return workItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);

  if (!item) {
    return {};
  }

  return {
    title: item.title,
    description: item.outcome,
    openGraph: {
      title: `${item.title} | Drew McFarland`,
      description: item.outcome,
      url: `/work/${item.slug}`,
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);

  if (!item) {
    notFound();
  }

  const nextItem = getNextWorkBySlug(item.slug);

  return (
    <main id="main" className="min-h-[100dvh]">
      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <Link
              href="/#work"
              className="group -mx-2 inline-flex min-h-11 items-center gap-2 px-2 font-mono text-sm font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
            >
              <ArrowLeftIcon
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-0.5"
                size={14}
                weight="bold"
              />
              back to case studies
            </Link>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-[var(--text-primary)] sm:text-6xl">
              {item.title}
            </h1>
            <p className="mt-5 max-w-xs font-mono text-xs leading-6 text-[var(--text-muted)]">
              {item.year}
              <span aria-hidden="true"> · </span>
              {item.status}
            </p>
            <div className="mt-8 border-y border-[var(--border)] py-6">
              <p className="font-mono text-xs text-[var(--text-muted)]">
                role
              </p>
              <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                {item.role}
              </p>
            </div>
            {item.links.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {item.links.map((link) => (
                  <MagneticLink key={link.href} href={link.href} external>
                    {link.label}
                  </MagneticLink>
                ))}
              </div>
            ) : null}
          </aside>

          <div>
            <Reveal>
              <p className="max-w-4xl text-3xl leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.75rem]">
                {item.outcome}
              </p>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
                {item.summary}
              </p>
              <dl className="mt-9 grid border-y border-[var(--border)] sm:grid-cols-[0.8fr_1.2fr] sm:divide-x sm:divide-[var(--border)]">
                <div className="border-b border-[var(--border)] py-5 sm:border-b-0 sm:pr-6">
                  <dt className="font-mono text-xs text-[var(--accent)]">
                    for
                  </dt>
                  <dd className="mt-3 text-sm leading-6 text-[var(--text-primary)]">
                    {item.audience}
                  </dd>
                </div>
                <div className="py-5 sm:pl-6">
                  <dt className="font-mono text-xs text-[var(--accent)]">
                    what changed
                  </dt>
                  <dd className="mt-3 text-sm leading-6 text-[var(--text-primary)]">
                    {item.result}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <section className="mt-16 grid gap-12">
              {item.sections.map((section, index) => (
                <CaseStudySection
                  key={section.title}
                  title={section.title}
                  body={section.body}
                  visuals={item.visuals?.filter(
                    (visual) => visual.afterSection === index,
                  )}
                  delay={index * 0.04}
                />
              ))}
            </section>

            <Reveal>
              <section className="mt-16 border-t border-[var(--border)] pt-8">
                <h2 className="font-mono text-sm text-[var(--accent)]">
                  what came out of it
                </h2>
                <ul className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight.label}
                      className="grid gap-3 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:px-4"
                    >
                      <p className="font-semibold text-[var(--text-primary)]">
                        {highlight.label}
                      </p>
                      <p className="text-base leading-7 text-[var(--text-secondary)]">
                        {highlight.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section
                aria-labelledby="continue-heading"
                className="mt-20 grid gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-[0.22fr_1fr]"
              >
                <h2
                  id="continue-heading"
                  className="font-mono text-sm text-[var(--accent)]"
                >
                  continue
                </h2>
                <div>
                  <p className="font-mono text-xs text-[var(--text-muted)]">
                    next case
                  </p>
                  <Link
                    href={`/work/${nextItem.slug}`}
                    className="group mt-3 inline-flex items-baseline gap-3 font-serif text-3xl text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] sm:text-4xl"
                  >
                    {nextItem.title}
                    <span
                      aria-hidden="true"
                      className="font-sans text-xl transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-[var(--text-muted)]">
                    <Link
                      href="/resume"
                      className="inline-flex min-h-11 items-center transition-colors hover:text-[var(--accent)]"
                    >
                      resume
                    </Link>
                    <a
                      href="mailto:drewjmcfarland@live.com"
                      className="inline-flex min-h-11 items-center transition-colors hover:text-[var(--accent)]"
                    >
                      email Drew
                    </a>
                    <Link
                      href="/#work"
                      className="inline-flex min-h-11 items-center transition-colors hover:text-[var(--accent)]"
                    >
                      all work
                    </Link>
                  </div>
                </div>
              </section>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionVisuals({
  visuals,
}: {
  visuals: WorkVisual[];
}) {
  const phoneVisuals = visuals.filter((visual) => visual.layout === "phone");
  const standardVisuals = visuals.filter((visual) => visual.layout !== "phone");

  return (
    <div className="mt-10 grid gap-8 border-y border-[var(--border)] py-8">
      {phoneVisuals.length ? (
        <div className="overflow-x-auto pb-3">
          <div className="grid grid-flow-col auto-cols-[minmax(12rem,14rem)] gap-5 sm:grid-flow-row sm:grid-cols-3 sm:overflow-visible">
            {phoneVisuals.map((visual) => (
              <figure key={visual.src} className="grid gap-3">
                <a
                  href={visual.src}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-[2.35rem] bg-black p-2 shadow-[0_28px_70px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-1"
                >
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    width={visual.width}
                    height={visual.height}
                    className="h-auto w-full rounded-[1.8rem]"
                  />
                </a>
                <figcaption className="border-t border-[var(--border)] pt-3 font-mono text-xs leading-6 text-[var(--text-muted)]">
                  <span className="block text-[var(--accent)]">
                    {visual.label}
                  </span>
                  <span>{visual.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : null}

      {standardVisuals.map((visual) => {
        const isWide = visual.layout === "wide";
        const isLandscape = visual.layout === "landscape";

        return (
          <figure key={visual.src} className="grid gap-3">
            <div
              className={[
                "artifact-shadow overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-raised)]",
                isLandscape ? "p-3 sm:p-5" : "",
                isWide ? "overflow-x-auto" : "",
              ].join(" ")}
            >
              <a
                href={visual.src}
                target="_blank"
                rel="noreferrer"
                className={isLandscape ? "block" : undefined}
              >
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  width={visual.width}
                  height={visual.height}
                  className={
                    isLandscape
                      ? "h-auto w-full"
                      : isWide
                        ? "h-auto w-full max-w-none"
                        : "h-[30rem] w-full object-cover object-top sm:h-[38rem]"
                  }
                />
              </a>
            </div>
            <figcaption className="grid gap-2 border-t border-[var(--border)] pt-3 font-mono text-xs leading-6 text-[var(--text-muted)] sm:grid-cols-[8rem_1fr]">
              <span className="text-[var(--accent)]">{visual.label}</span>
              <span>{visual.caption}</span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function CaseStudySection({
  title,
  body,
  visuals,
  delay,
}: {
  title: string;
  body: string[];
  visuals?: WorkVisual[];
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="border-t border-[var(--border)] pt-8">
        <h2 className="max-w-3xl font-serif text-3xl leading-tight text-[var(--text-primary)] sm:text-4xl">
          {title}
        </h2>
        <div className="mt-6 grid max-w-3xl gap-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {visuals?.length ? <SectionVisuals visuals={visuals} /> : null}
      </article>
    </Reveal>
  );
}
