import Link from "next/link";

import { AnimatedBench } from "@/components/animated-bench";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import { workItems, writingItems } from "@/lib/work";

const operatingNotes = [
  "I try to name the change I'm after before I name a product. The product is just how you get there.",
  "I'd rather build the smallest version that can prove the idea than write a long doc about it.",
  "I write everything down. The next person picking the work up, sometimes me and sometimes a model, needs context I would have left in someone's head a few years ago.",
];

export default function Home() {
  return (
    <main id="main">
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-5 py-5 font-mono text-xs text-[var(--text-muted)] sm:px-8 sm:text-sm lg:px-12">
        <Link
          href="/"
          className="text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
        >
          Drew McFarland
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-3 sm:gap-5">
          <a
            href="#writing"
            className="transition-colors hover:text-[var(--text-primary)]"
          >
            writing
          </a>
          <a
            href="#work"
            className="transition-colors hover:text-[var(--text-primary)]"
          >
            work
          </a>
          <a
            href="#contact"
            className="transition-colors hover:text-[var(--text-primary)]"
          >
            contact
          </a>
        </nav>
      </header>

      <section className="grid min-h-[100dvh] w-full min-w-0 items-end gap-8 px-5 pb-10 pt-24 sm:px-8 sm:pb-12 lg:grid-cols-[0.86fr_1.14fr] lg:px-12 lg:pb-8 lg:pt-28">
        <div className="w-full min-w-0 max-w-2xl pb-4 lg:pb-14">
          <p className="font-mono text-sm text-[var(--accent)]">
            Drew McFarland
          </p>
          <h1 className="mt-5 max-w-[9ch] font-serif text-5xl leading-[0.96] text-[var(--text-primary)] sm:max-w-2xl sm:text-7xl lg:text-8xl">
            Designer who builds.
          </h1>
          <p className="mt-7 max-w-xl text-2xl leading-tight text-[var(--text-primary)] sm:text-3xl">
            I&apos;ve been a designer for almost a decade. A couple years ago I
            started building the software too.
          </p>
          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            Most of my work sits somewhere between figuring out why something is
            broken, building the smallest version that proves a path through it,
            and writing it down well enough that someone else can keep going.
            Lately that&apos;s mostly GovTech and infrastructure; the kind of
            project where the hard part isn&apos;t the idea, it&apos;s getting to
            something that actually runs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticLink href="#work">View work</MagneticLink>
            <MagneticLink href="#writing">Read writing</MagneticLink>
            <MagneticLink href="https://linkedin.com/in/drewux/" external>
              Contact Drew
            </MagneticLink>
          </div>
        </div>

        <AnimatedBench />
      </section>

      <section className="border-y border-[var(--border)] px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <p className="font-mono text-sm text-[var(--text-muted)]">
            how i work
          </p>
          <div className="grid gap-6 md:grid-cols-[1fr_0.82fr_1.18fr]">
            {operatingNotes.map((note, index) => (
              <Reveal key={note} delay={index * 0.05}>
                <div className="border-t border-[var(--border-strong)] pt-4">
                  <p className="font-mono text-xs text-[var(--accent)]">
                    0{index + 1}
                  </p>
                  <p className="mt-4 max-w-xs text-base leading-7 text-[var(--text-secondary)]">
                    {note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="writing"
        className="border-b border-[var(--border)] px-5 py-16 sm:px-8 lg:px-12 lg:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.46fr_1fr]">
          <div>
            <p className="font-mono text-sm text-[var(--accent)]">writing</p>
            <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight text-[var(--text-primary)] sm:text-5xl">
              Notes from the workbench while the work is still messy.
            </h2>
          </div>

          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {writingItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid gap-5 py-7 transition-colors hover:bg-[rgba(246,242,234,0.025)] sm:grid-cols-[8rem_1fr_auto] sm:items-start sm:px-4"
                >
                  <div className="font-mono text-xs text-[var(--text-muted)]">
                    <p className="text-[var(--accent)]">{item.title}</p>
                    <p className="mt-2">{item.eyebrow}</p>
                  </div>
                  <div>
                    <p className="max-w-3xl text-2xl leading-tight text-[var(--text-primary)] sm:text-3xl">
                      {item.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.proof.map((proof) => (
                        <span
                          key={proof}
                          className="border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--text-muted)]"
                        >
                          {proof}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[var(--text-faint)] transition-colors group-hover:text-[var(--accent)]">
                    read
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.46fr_1fr]">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="font-mono text-sm text-[var(--accent)]">selected work</p>
            <h2 className="mt-4 max-w-sm font-serif text-4xl leading-tight text-[var(--text-primary)] sm:text-5xl">
              A few projects. I&apos;m trying to say what changed and what proves
              it.
            </h2>
          </div>

          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {workItems.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.04}>
                <Link
                  href={`/work/${item.slug}`}
                  className="group grid gap-5 py-7 transition-colors hover:bg-[rgba(246,242,234,0.025)] sm:grid-cols-[8rem_1fr_auto] sm:items-start sm:px-4"
                >
                  <div className="font-mono text-xs text-[var(--text-muted)]">
                    <p>{item.year}</p>
                    <p className="mt-2 text-[var(--accent)]">{item.title}</p>
                  </div>
                  <div>
                    <p className="max-w-3xl text-2xl leading-tight text-[var(--text-primary)] sm:text-3xl">
                      {item.outcome}
                    </p>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                      {item.vehicle}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[var(--text-faint)] transition-colors group-hover:text-[var(--accent)]">
                    open
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <Reveal>
          <div className="grid gap-8 border-y border-[var(--border)] py-12 lg:grid-cols-[0.8fr_1.2fr]">
            <p className="font-mono text-sm text-[var(--text-muted)]">
              the thread
            </p>
            <div>
              <p className="max-w-3xl font-serif text-3xl leading-tight text-[var(--text-primary)] sm:text-4xl">
                Strategy is only worth something when it changes what gets shipped.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                The thread through all of it: find the actual constraint, build a small thing that proves a path through it, and leave enough behind that nobody needs a handoff meeting to keep going.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <footer
        id="contact"
        className="border-t border-[var(--border)] px-5 py-10 sm:px-8 lg:px-12"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-sm text-[var(--accent)]">
              Drew McFarland
            </p>
            <p className="mt-3 max-w-lg text-base leading-7 text-[var(--text-secondary)]">
              Designer who builds. Mostly GovTech and infrastructure work, the part of the job where a hard problem becomes something that actually runs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticLink href="https://github.com/Mountain-Dr3w" external>
              GitHub
            </MagneticLink>
            <MagneticLink href="https://seams.velveteen.sh" external>
              Seams
            </MagneticLink>
            <MagneticLink href="https://velveteen.sh" external>
              Velveteen
            </MagneticLink>
          </div>
        </div>
      </footer>
    </main>
  );
}
