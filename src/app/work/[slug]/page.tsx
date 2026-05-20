import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import { getWorkBySlug, workItems } from "@/lib/work";

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

  return (
    <main id="main" className="min-h-[100dvh]">
      <header className="flex items-center justify-between border-b border-[var(--border)] px-5 py-5 font-mono text-sm text-[var(--text-muted)] sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
        >
          Drew McFarland
        </Link>
        <Link href="/#work" className="transition-colors hover:text-[var(--text-primary)]">
          all work
        </Link>
      </header>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <p className="font-mono text-sm text-[var(--accent)]">{item.eyebrow}</p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-[var(--text-primary)] sm:text-6xl">
              {item.title}
            </h1>
            <p className="mt-5 font-mono text-sm text-[var(--text-muted)]">
              {item.year}
            </p>
            <div className="mt-8 border-y border-[var(--border)] py-6">
              <p className="font-mono text-xs text-[var(--text-muted)]">role</p>
              <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                {item.role}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {item.links.map((link) => (
                <MagneticLink key={link.href} href={link.href} external>
                  {link.label}
                </MagneticLink>
              ))}
            </div>
          </aside>

          <div>
            <Reveal>
              <p className="max-w-4xl text-4xl leading-tight text-[var(--text-primary)] sm:text-5xl">
                {item.outcome}
              </p>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
                {item.summary}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <section className="mt-14 border-y border-[var(--border)] py-8">
                <p className="font-mono text-xs text-[var(--accent)]">what I built</p>
                <p className="mt-4 max-w-3xl text-2xl leading-snug text-[var(--text-primary)]">
                  {item.vehicle}
                </p>
              </section>
            </Reveal>

            {item.image ? (
              <Reveal delay={0.08}>
                <figure className="mt-12 grid gap-4 lg:grid-cols-[0.76fr_0.24fr]">
                  <div className="paper-shadow overflow-hidden bg-[var(--paper)]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={1170}
                      height={1800}
                      className="h-[30rem] w-full object-cover object-top sm:h-[38rem] lg:h-[46rem]"
                      priority
                    />
                  </div>
                  <figcaption className="border-t border-[var(--border)] pt-4 font-mono text-xs leading-6 text-[var(--text-muted)] lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                    Real snapshot artifact from the SBIR Radar SwiftUI test
                    suite.
                  </figcaption>
                </figure>
              </Reveal>
            ) : null}

            {item.visuals?.length ? (
              <VisualEvidence visuals={item.visuals} />
            ) : null}

            <section className="mt-16 grid gap-10">
              {item.sections.map((section, index) => (
                <CaseStudySection
                  key={section.title}
                  label={section.label}
                  title={section.title}
                  body={section.body}
                  delay={index * 0.04}
                />
              ))}
            </section>

            <div className="mt-16 grid gap-10">
              <EvidenceSection title="What shipped" items={item.proof} />
              <EvidenceSection title="Constraints" items={item.constraints} />
              <EvidenceSection title="Decisions" items={item.decisions} />
            </div>

            <Reveal>
              <section className="mt-16">
                <div className="grid gap-6 border-t border-[var(--border)] pt-8 lg:grid-cols-[0.32fr_1fr]">
                  <p className="font-mono text-sm text-[var(--accent)]">
                    artifacts
                  </p>
                  <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
                    {item.artifacts.map((artifact) => (
                      <article
                        key={artifact.title}
                        className="grid gap-4 py-6 sm:grid-cols-[10rem_1fr] sm:px-4"
                      >
                        <div className="font-mono text-xs text-[var(--text-muted)]">
                          <p className="text-[var(--accent)]">{artifact.label}</p>
                          {artifact.meta ? <p className="mt-2">{artifact.meta}</p> : null}
                        </div>
                        <div>
                          <h2 className="text-2xl leading-tight text-[var(--text-primary)]">
                            {artifact.title}
                          </h2>
                          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                            {artifact.body}
                          </p>
                        </div>
                      </article>
                    ))}
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

function VisualEvidence({
  visuals,
}: {
  visuals: NonNullable<(typeof workItems)[number]["visuals"]>;
}) {
  const phoneVisuals = visuals.filter((visual) => visual.layout === "phone");
  const standardVisuals = visuals.filter((visual) => visual.layout !== "phone");

  return (
    <Reveal delay={0.08}>
      <section className="mt-14 border-y border-[var(--border)] py-8">
        <div className="grid gap-6 lg:grid-cols-[0.22fr_1fr]">
          <p className="font-mono text-sm text-[var(--accent)]">
            visual evidence
          </p>
          <div className="grid gap-8">
            {phoneVisuals.length ? (
              <div className="overflow-x-auto pb-3">
                <div className="grid grid-flow-col auto-cols-[minmax(12rem,14rem)] gap-5 lg:grid-flow-row lg:grid-cols-4 lg:overflow-visible">
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

              return (
                <figure key={visual.src} className="grid gap-3">
                  <div
                    className={[
                      "artifact-shadow overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-raised)]",
                      isWide ? "overflow-x-auto" : "",
                    ].join(" ")}
                  >
                    <a href={visual.src} target="_blank" rel="noreferrer">
                      <Image
                        src={visual.src}
                        alt={visual.alt}
                        width={visual.width}
                        height={visual.height}
                        className={
                          isWide
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
        </div>
      </section>
    </Reveal>
  );
}

function CaseStudySection({
  label,
  title,
  body,
  delay,
}: {
  label: string;
  title: string;
  body: string[];
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="grid gap-5 border-t border-[var(--border)] pt-8 lg:grid-cols-[0.32fr_1fr]">
        <p className="font-mono text-sm text-[var(--accent)]">{label}</p>
        <div>
          <h2 className="max-w-3xl font-serif text-3xl leading-tight text-[var(--text-primary)] sm:text-4xl">
            {title}
          </h2>
          <div className="mt-6 grid max-w-3xl gap-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function EvidenceSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <Reveal>
      <section className="grid gap-6 border-t border-[var(--border)] pt-8 lg:grid-cols-[0.32fr_1fr]">
        <h2 className="font-mono text-sm text-[var(--accent)]">{title}</h2>
        <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {items.map((item) => (
            <li
              key={item}
              className="py-5 text-base leading-7 text-[var(--text-secondary)] sm:px-4"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
