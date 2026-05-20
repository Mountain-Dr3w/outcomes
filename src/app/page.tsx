import Link from "next/link";

import { AnimatedBench } from "@/components/animated-bench";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";
import { workItems } from "@/lib/work";

const operatingNotes = [
  "Name the change the work has to create before naming the product.",
  "Build the smallest working vehicle that can test the claim.",
  "Leave a decision trail clear enough for the next person or model to inherit.",
];

export default function Home() {
  return (
    <main id="main">
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 font-mono text-sm text-[var(--text-muted)] sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
        >
          Outcomes
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-5">
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

      <section className="grid min-h-[100dvh] items-end gap-8 px-5 pb-10 pt-24 sm:px-8 sm:pb-12 lg:grid-cols-[0.86fr_1.14fr] lg:px-12 lg:pb-8 lg:pt-28">
        <div className="max-w-2xl pb-4 lg:pb-14">
          <p className="font-mono text-sm text-[var(--accent)]">
            Drew McFarland
          </p>
          <h1 className="mt-5 font-serif text-6xl leading-[0.96] text-[var(--text-primary)] sm:text-7xl lg:text-8xl">
            Outcomes
          </h1>
          <p className="mt-7 max-w-xl text-2xl leading-tight text-[var(--text-primary)] sm:text-3xl">
            I ship outcomes. Products are the vehicle.
          </p>
          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            I am a designer by training and a builder by choice. I work across
            service design, product strategy, and implementation: define the
            outcome, build the proof, and leave behind an artifact a team can
            operate.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticLink href="#work">View work</MagneticLink>
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
            operating thesis
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

      <section id="work" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.46fr_1fr]">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="font-mono text-sm text-[var(--accent)]">selected work</p>
            <h2 className="mt-4 max-w-sm font-serif text-4xl leading-tight text-[var(--text-primary)] sm:text-5xl">
              Case studies about what changed, not just what shipped.
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
              proof pattern
            </p>
            <div>
              <p className="max-w-3xl font-serif text-3xl leading-tight text-[var(--text-primary)] sm:text-4xl">
                Strategy matters when it changes what ships.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                The common thread is a loop: find the real constraint, build a
                vehicle that can prove a path, and make the work clear enough
                for someone else to use without a handoff meeting.
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
              Designer-builder focused on GovTech, infrastructure, and products
              that shorten the distance between a hard problem and working
              software.
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
