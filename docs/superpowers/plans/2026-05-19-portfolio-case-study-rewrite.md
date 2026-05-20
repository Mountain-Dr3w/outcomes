# Portfolio Case Study Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut the structural noise from the portfolio case study template (10+ blocks → 5 blocks) and rewrite all four case studies in a first-person reflective voice that avoids AI-speak patterns.

**Architecture:** The case study page (`src/app/work/[slug]/page.tsx`) and the data layer (`src/lib/work.ts`) are tightly coupled. We'll widen the types first (make removed fields optional) so the page can be reshaped without breaking the existing data, then rewrite the four case studies one at a time, and finally tighten the types again by removing the now-unused fields.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript strict, Tailwind v4. No tests in this repo and no tests required per project conventions.

**Linked spec:** [docs/superpowers/specs/2026-05-19-portfolio-case-study-rewrite-design.md](../specs/2026-05-19-portfolio-case-study-rewrite-design.md)

**Verification model:** No automated tests. After each task, run `npm run build` to catch type and lint errors, and visually inspect the affected page(s) at `http://localhost:3000` via `npm run dev`. Each task ends with a commit.

**Voice rules (apply to every prose rewrite):**

- First-person reflective essay. Contractions OK. Varied sentence length.
- **No em dashes** as rhetorical pauses. Use periods, commas, colons, or parentheses. Max one em dash per case study, only if no substitute reads as well.
- No "It's not X, it's Y" / "Here's the thing" / "The result?" patterns.
- No triplets ("clean, repeatable, and shareable").
- No punchy section-closing one-liners.
- No "robust," "seamless," "elegant," "thoughtful," "powerful."
- No formulas: "turns X into Y," "where the weight goes," "leaves behind a record of," "absorbs the burden of."
- No "actually" doing rhetorical work.
- Section headings are statements, not category labels.

---

## File Structure

**Modified files:**

- `src/lib/work.ts` — Type definitions and all four case study content entries
- `src/app/work/[slug]/page.tsx` — Case study page rendering

**Not modified (verified safe):**

- `src/app/page.tsx` — Only uses `title`, `year`, `slug`, `outcome` from `WorkItem`. None are being removed.
- `src/app/layout.tsx`, `src/app/globals.css` — Unrelated to this work.
- All files under `src/components/` — `MagneticLink`, `Reveal` continue to work as-is.
- `public/artifacts/*.png` — Unchanged. Same images reused with rewritten captions.

---

## Task 1: Widen the types in `work.ts` so removed fields are optional

This lets us reshape the page without breaking the existing data. Existing case study entries continue to type-check. Field removal happens at the end of the plan once all four rewrites are complete.

**Files:**

- Modify: `src/lib/work.ts:13-63` (the type definitions)

- [ ] **Step 1: Make removed fields optional on `WorkItem` and `WorkArtifact`**

Open `src/lib/work.ts`. Replace the type block at lines 13-63 with the updated version below. The data block below it stays untouched.

```typescript
export type WorkSlug = "velveteen" | "sbir-radar" | "missionos-core" | "forge";
export type WorkRole =
  | "Product design"
  | "Product design + full-stack build"
  | "Service design"
  | "Product strategy";

export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkArtifact {
  label: string;
  body: string;
  // Deprecated, will be removed in Task 7. Kept optional so old data still validates.
  title?: string;
  meta?: string;
}

export interface WorkSnapshot {
  label: string;
  body: string;
}

export interface WorkSection {
  title: string;
  body: string[];
  // Deprecated, will be removed in Task 7. Kept optional so old data still validates.
  label?: string;
}

export interface WorkVisual {
  label: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  layout?: "wide" | "landscape" | "portrait" | "phone";
}

export interface WorkItem {
  slug: WorkSlug;
  title: string;
  eyebrow: string;
  year: string;
  outcome: string;
  role: WorkRole;
  summary: string;
  sections: WorkSection[];
  artifacts: WorkArtifact[];
  links: WorkLink[];
  visuals?: WorkVisual[];
  image?: {
    src: string;
    alt: string;
  };
  // Deprecated, will be removed in Task 7. Optional so old data still validates.
  snapshot?: WorkSnapshot[];
  vehicle?: string;
  vehicleLabel?: string;
  proof?: string[];
  constraints?: string[];
  decisions?: string[];
}

export interface WritingItem {
  title: string;
  eyebrow: string;
  href: string;
  summary: string;
  proof: string[];
}
```

- [ ] **Step 2: Verify the build still passes**

Run: `npm run build`

Expected: Build succeeds. Existing data in `workItems` is still valid because the removed fields are now optional and the present fields are still typed correctly.

- [ ] **Step 3: Commit**

```bash
git add src/lib/work.ts
git commit -m "loosen WorkItem types ahead of case study rewrite"
```

---

## Task 2: Reshape the case study page (`page.tsx`)

Remove `AtAGlance`, the vehicle box, `EvidenceSection` calls for what-shipped/constraints/decisions, simplify `CaseStudySection` (drop eyebrow label, drop two-column grid), and simplify the artifacts rendering.

After this task, the page renders only the blocks defined in the spec: sidebar → opening (outcome + summary) → visuals (if any) → narrative sections → artifacts. The existing data still works because the page just stops looking at the removed fields.

**Files:**

- Modify: `src/app/work/[slug]/page.tsx` (whole file rewrite)

- [ ] **Step 1: Rewrite `src/app/work/[slug]/page.tsx`**

Replace the entire contents of `src/app/work/[slug]/page.tsx` with:

```typescript
import type { Metadata } from "next";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
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
      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 font-mono text-xs font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
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
            <p className="mt-5 font-mono text-sm text-[var(--text-muted)]">
              {item.year}
            </p>
            <div className="mt-8 border-y border-[var(--border)] py-6">
              <p className="font-mono text-xs text-[var(--text-muted)]">
                role
              </p>
              <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                {item.role}
              </p>
              <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
                {item.outcome}
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
              <p className="max-w-4xl text-4xl leading-tight text-[var(--text-primary)] sm:text-5xl">
                {item.outcome}
              </p>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
                {item.summary}
              </p>
            </Reveal>

            {item.visuals?.length ? (
              <VisualEvidence visuals={item.visuals} />
            ) : null}

            <section className="mt-16 grid gap-12">
              {item.sections.map((section, index) => (
                <CaseStudySection
                  key={section.title}
                  title={section.title}
                  body={section.body}
                  delay={index * 0.04}
                />
              ))}
            </section>

            <Reveal>
              <section className="mt-16 border-t border-[var(--border)] pt-8">
                <h2 className="font-mono text-sm text-[var(--accent)]">
                  artifacts
                </h2>
                <ul className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                  {item.artifacts.map((artifact) => (
                    <li
                      key={artifact.label}
                      className="py-5 text-base leading-7 text-[var(--text-secondary)] sm:px-4"
                    >
                      <span className="font-semibold text-[var(--text-primary)]">
                        {artifact.label}.
                      </span>{" "}
                      {artifact.body}
                    </li>
                  ))}
                </ul>
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
        </div>
      </section>
    </Reveal>
  );
}

function CaseStudySection({
  title,
  body,
  delay,
}: {
  title: string;
  body: string[];
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
      </article>
    </Reveal>
  );
}
```

Notes on what changed from the previous version:

- `AtAGlance` component definition and call removed.
- "Vehicle / operating path" section removed (it lived between `AtAGlance` and the visual evidence).
- "What shipped" `EvidenceSection` call removed.
- "Constraints" and "Decisions" `EvidenceSection` calls removed.
- `EvidenceSection` component definition removed entirely (now dead code).
- Narrative sections moved above the artifacts block. Visual evidence stays where it is.
- `CaseStudySection` simplified: dropped `label` prop, dropped the two-column grid, single column with title above body.
- Artifacts block rewritten as a simple list of `<li>` items, each with a bold label and body sentence. Dropped the `[0.32fr 1fr]` outer grid, the inner `[10rem 1fr]` grid, and the separate `title`/`meta` rendering.
- `item.image` rendering removed because no case study uses it in current data (and the spec covers visuals via `visuals` only). If the engineer finds an item using `image`, restore the block from the original file as-is, but no current data triggers this.

- [ ] **Step 2: Verify the build passes**

Run: `npm run build`

Expected: Build succeeds. The data in `workItems` still has all the old fields (`snapshot`, `proof`, `constraints`, etc.); the page just no longer references them.

- [ ] **Step 3: Visual spot-check**

Run: `npm run dev` (in a separate terminal). Open `http://localhost:3000/work/velveteen` in a browser.

Expected: The page renders without errors. The old narrative sections (with category labels "the gap", "where it lands", etc.) are still there because the data hasn't been rewritten yet. The sidebar, the outcome/summary block, the visual evidence, the narrative sections, and the artifacts list are all visible. The vehicle box, at-a-glance grid, what-shipped/constraints/decisions lists are gone.

If the page renders, the structural reshape is done. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/app/work/[slug]/page.tsx
git commit -m "reshape case study page: drop snapshot/vehicle/proof/constraints/decisions blocks"
```

---

## Task 3: Rewrite Velveteen content

Apply the approved Velveteen draft from the spec. This is the only case study where no user check-in is needed; the prose is already locked.

**Files:**

- Modify: `src/lib/work.ts:75-201` (the Velveteen entry within `workItems`)

- [ ] **Step 1: Replace the Velveteen entry in `workItems`**

In `src/lib/work.ts`, locate the entry starting with `slug: "velveteen"` and replace the entire object (from the opening `{` through the closing `},` before the SBIR Radar entry) with:

```typescript
  {
    slug: "velveteen",
    title: "Velveteen",
    eyebrow: "Product, infrastructure, security",
    year: "2026",
    outcome:
      "AI-built apps get a repeatable path from GitHub repo to live, scanned URL.",
    role: "Product design + full-stack build",
    summary:
      "Velveteen is the product I built for the awkward middle of AI-assisted development. The code runs locally. The project isn't ready for someone else. There's no Dockerfile, no env docs, no honest read on whether shipping it would leak secrets. I kept hitting that spot in my own projects and watching other people stall there too. The tools that got us to working-locally had nothing to say about getting out of it.",
    sections: [
      {
        title: "What was actually broken",
        body: [
          "The framing I started with was that AI coding tools made building easier without making operating easier. That undersells it. You can install Trivy. You can write a Dockerfile. The deeper problem is that if you reached a working app by chatting your way through it, you don't have the muscle for any of that, and you don't have a clear next step either. The repo runs. It's also full of secrets in the wrong places, dependencies you never picked, and no documentation explaining how to bring it back up next month. The gap between \"I have code\" and \"I have a thing I can deploy\" is wider than it reads.",
        ],
      },
      {
        title: "I built it around the security review",
        body: [
          "The early decision that mattered most was making the security work visible. Most deployment products hide infrastructure so you don't have to think about it. I wanted the opposite: a pipeline you can watch, with a real pause for findings before anything goes live.",
          "The path is seven stages: clone, detect, scaffold, scan, explain, gate, deploy. Each one produces something you can look at. The scaffold step writes a Dockerfile, a standards file, and an env guide into your repo, so the project is more legible when you come back to it. The scan step runs four tools. Gitleaks looks for secrets, Semgrep checks the source, Trivy scans the container, Syft produces the SBOM. The explain step is the one I care about most. Scanner output is usually unreadable. This step turns it into something a person can read, alongside a prompt you can paste back into your coding assistant to fix what it found.",
          "Two models do the work, not one. A bigger model handles scaffolding, where reasoning matters. A smaller, cheaper one handles explanations, which are high volume. Splitting them kept costs sane.",
        ],
      },
      {
        title: "What I'm still figuring out",
        body: [
          "The pipeline shape is settled. Seven stages, the gate, the artifacts on the side. What I'm watching is the explanation layer. The four scans produce findings of very different shapes. A leaked AWS key reads nothing like a vulnerable Python dependency, and the model translating them into plain language has a much easier time with some than others. If the next version of Velveteen lives or dies, it's there.",
        ],
      },
    ],
    artifacts: [
      {
        label: "Pipeline",
        body: "Seven stages from GitHub to live URL, each producing something visible.",
      },
      {
        label: "Security explanations",
        body: "Gitleaks, Semgrep, Trivy, and Syft output, translated into plain language with a fix prompt for your coding assistant.",
      },
      {
        label: "Generated scaffolding",
        body: "A Dockerfile, a standards file, and an env guide written into the repo before it ships.",
      },
    ],
    links: [
      { label: "Visit Velveteen", href: "https://velveteen.sh" },
      {
        label: "Under the hood",
        href: "https://velveteen.sh/about/under-the-hood",
      },
    ],
    visuals: [
      {
        label: "Onboarding",
        src: "/artifacts/velveteen-onboarding-review-trimmed.png",
        alt: "Velveteen onboarding review screen showing connected GitHub, chosen repo, subdomain, detected framework, and launch action.",
        caption:
          "The screen you hit right before launching. GitHub connected, repo picked, framework auto-detected, subdomain claimed. I wanted everything you'd normally do across four pages to sit in one place, so you can see exactly what you're about to do before you do it.",
        width: 760,
        height: 612,
        layout: "landscape",
      },
      {
        label: "Running pipeline",
        src: "/artifacts/velveteen-running-pipeline-trimmed.png",
        alt: "Velveteen running pipeline screen showing completed clone and scaffold stages, a pre-build security warning, and an active build step.",
        caption:
          "Mid-pipeline. Clone and scaffold are done. The orange flag is a pre-build security finding the build is now reckoning with. The rest of the path stays in view. Nothing hidden behind a spinner.",
        width: 760,
        height: 493,
        layout: "landscape",
      },
    ],
  },
```

Notes:

- `snapshot`, `vehicle`, `vehicleLabel`, `proof`, `constraints`, `decisions` are removed from this entry. The types still permit them (optional), but the data no longer carries them.
- Section objects no longer have `label`. They have `title` and `body`.
- Artifact objects no longer have `title` or `meta`. They have `label` and `body`.

- [ ] **Step 2: Verify the build passes**

Run: `npm run build`

Expected: Build succeeds.

- [ ] **Step 3: Visual spot-check**

Run: `npm run dev`. Visit `http://localhost:3000/work/velveteen`.

Expected:

- Sidebar unchanged.
- Big outcome line at top, summary paragraph below it (with the new "awkward middle" opener).
- Visual evidence with the two new captions.
- Three narrative sections with statement-style headings ("What was actually broken", "I built it around the security review", "What I'm still figuring out"). No eyebrow labels above headings.
- Artifacts list at the bottom, three items, each a bold label and one sentence.

Stop the dev server when done.

- [ ] **Step 4: Commit**

```bash
git add src/lib/work.ts
git commit -m "rewrite Velveteen case study content"
```

---

## Task 4: Draft and rewrite SBIR Radar content

SBIR Radar is a personal project, so first-person voice applies fully. Before finalizing, ask Drew to confirm three specifics that are inferred from the existing copy but worth verifying.

**Files:**

- Modify: `src/lib/work.ts` (the SBIR Radar entry within `workItems`, currently around lines 202-339)

- [ ] **Step 1: Ask Drew the check-in questions before drafting**

Use AskUserQuestion (or surface as a direct chat message if AskUserQuestion is unavailable) to confirm:

1. The HTML fallback story: the current copy says "When structured APIs failed, the strategy shifted toward HTML fallback, fixture-backed development, and source-health language in the interface." Confirm this is what actually happened, or correct the framing.
2. The "no accounts, no monetization in v1" decision: confirm this was a deliberate call, not a delay.
3. Whether there's a specific moment Drew remembers — a topic he tried to triage in the old way, a portal experience that pushed him over the edge, or a user he watched struggle — that could anchor the opening.

Wait for Drew's answers before writing prose. If he supplies a moment, use it. If he says skip, write the opening using the existing material.

- [ ] **Step 2: Draft the new SBIR Radar entry**

Replace the existing SBIR Radar entry in `src/lib/work.ts` with a new object that follows the same shape as the Velveteen entry from Task 3:

- `slug`, `title`, `eyebrow`, `year`, `outcome`, `role`: keep current values.
- `summary`: 2-3 sentences, first-person, opens the case study. Drop the current "SBIR Radar came from a real discovery problem..." phrasing — it's too pitch-deck. Replace with a specific first-person opening, ideally using whatever Drew confirms in Step 1.
- `sections`: 2-3 narrative sections. Suggested shape:
  1. What the experience was actually like before (cover what's currently in "the wall" — buried opportunities, inconsistent portals, agency language — but in first person with concrete detail).
  2. The triage-not-database call (cover what's currently in "what i built" plus the editorial design decision: scan-first reading, agency/deadline/phase/funding/source-health as fields, saved radars + watchlist as the alert loop).
  3. The contract story (cover what's currently in "the contract" — APIs failed, HTML fallback, fixture-backed dev, source-health language).
- `artifacts`: three items, `{ label, body }` only. Label is the short heading (e.g. "Signals", "Pipeline", "Loop"). Body is one sentence in the new voice.
- `links`: keep as-is.
- `visuals`: keep the same three phone screenshots. Rewrite each `caption` in first-person voice. Existing captions are description-style ("Searchable signal feed with filters..."); rewrite to story-style ("Here's the Signals tab. I built it around triage..."). Keep `label`, `src`, `alt`, `width`, `height`, `layout` unchanged.

Drop the entire `snapshot`, `vehicle`, `vehicleLabel`, `proof`, `constraints`, `decisions` fields. They don't appear in the new entry.

Apply the voice rules in full. No em dashes (zero, not "one allowed"). No "the wall / the contract / where it lands" framings.

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`

Expected: Build succeeds.

- [ ] **Step 4: Visual spot-check**

Run: `npm run dev`. Visit `http://localhost:3000/work/sbir-radar`.

Expected: New opener, 2-3 narrative sections with statement headings, three phone screenshots with rewritten captions, three artifacts at the bottom. No vehicle box, no at-a-glance grid, no proof/constraints/decisions lists.

Stop the dev server.

- [ ] **Step 5: Self-audit for AI-speak**

Before committing, re-read the new SBIR Radar prose and grep your own work:

```bash
grep -c '—' src/lib/work.ts
```

Expected: The em dash count should not have increased from before this task. If you introduced any, replace them with periods, commas, colons, or parentheses.

Also scan visually for the banned patterns from the voice rules section above. If any slipped in ("It's not X, it's Y", "Here's the thing", triplets, "robust/seamless/elegant", formulaic verbs), revise.

- [ ] **Step 6: Commit**

```bash
git add src/lib/work.ts
git commit -m "rewrite SBIR Radar case study content"
```

---

## Task 5: Draft and rewrite MissionOS Core content

MissionOS Core is Rise8 client work, an internal proof for a GovTech DevSecOps platform. The voice shifts: acknowledge the consulting frame directly instead of abstracting around it. Don't leak anything that isn't already in the existing copy.

**Files:**

- Modify: `src/lib/work.ts` (the MissionOS Core entry within `workItems`)

- [ ] **Step 1: Ask Drew the check-in questions before drafting**

Ask Drew to confirm or supply:

1. Is "I was leading discovery for an internal DevSecOps platform proof at Rise8" the right framing for the opener, or does the work-history phrasing need to be different?
2. The current copy lists six developer touchpoints (onboarding, repo setup, pipeline configuration, deployment, observability, operations) and four planning goals (repeatable environment standup, developer-led delivery, time to first tenant deploy, reusable compliance). Confirm these are accurate. If any can be made more specific without breaching confidentiality, supply the detail.
3. Is there a real moment — a meeting where the touchpoint map clicked, a stakeholder pushback, a claim that almost shipped that you had to walk back — that could anchor a section?

Wait for answers before drafting.

- [ ] **Step 2: Draft the new MissionOS Core entry**

Replace the existing MissionOS Core entry. Same shape as Velveteen and SBIR Radar. Suggested narrative arc (2-3 sections):

1. What the proof was actually for. Acknowledge consulting frame directly. The current copy abstracts it ("Government delivery teams often inherit delivery setup as bespoke work"); replace with a first-person framing of what Drew walked into and why the proof existed.
2. What he shaped. Touchpoint map, four planning goals, the responsibility split (what tenants do, what the platform absorbs, what disappears). The current "tenant path" framing is OK as a concept; remove the AI-templated verbs around it.
3. What got left behind. The decision artifacts, the bounded claims for the demo contract, what the next owner could pick up. Don't pitch — describe.

Drop `snapshot`, `vehicle`, `vehicleLabel`, `proof`, `constraints`, `decisions`. Keep `links`, `visuals` (rewriting captions in the new voice). Rebuild `artifacts` as `{ label, body }` only.

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`

Expected: Build succeeds.

- [ ] **Step 4: Visual spot-check**

Run: `npm run dev`. Visit `http://localhost:3000/work/missionos-core`. Same expectations as Task 4 Step 4.

- [ ] **Step 5: Self-audit for AI-speak**

```bash
grep -c '—' src/lib/work.ts
```

Expected: No new em dashes. Visually re-scan for banned patterns.

- [ ] **Step 6: Commit**

```bash
git add src/lib/work.ts
git commit -m "rewrite MissionOS Core case study content"
```

---

## Task 6: Draft and rewrite FORGE content

FORGE is Space Force DevSecOps client work. Same consulting frame as MissionOS Core, but Drew has more concrete material to draw on (five ownership lanes, one-week → months onboarding, named tools, friction log structure). The role here was service designer, so the voice is "I came in and made the invisible work discussable" rather than "I built X."

**Files:**

- Modify: `src/lib/work.ts` (the FORGE entry within `workItems`)

- [ ] **Step 1: Ask Drew the check-in questions before drafting**

Ask Drew to confirm or supply:

1. The current copy says "The onboarding target was one week, but real paths could stretch into months." Is the one-week/months gap accurate? Is there a more specific number or a story behind it?
2. The friction log structure (owning team, UX impact severity, breakage risk, rationale) — confirm this is the right framing or correct.
3. Is there a specific friction-log entry, a tenant journey he watched, or a workshop moment that could anchor the opening? The current copy is heavy on the artifacts but light on the people.

Wait for answers before drafting.

- [ ] **Step 2: Draft the new FORGE entry**

Replace the existing FORGE entry. Same shape. Suggested narrative arc (2-3 sections):

1. What the experience was actually like. Five ownership lanes, the gap between intended onboarding and real onboarding, the tribal-knowledge problem. Use first person, acknowledge being brought in to a platform with strong internals but a broken tenant experience.
2. What he made discussable. Service blueprint across the 17 phases, event storming for the internal flow, the friction log as a prioritization tool. Avoid "made invisible work visible" exactly because that phrasing is now AI-templated in his other case studies; find a real version.
3. What the portal concept changed. Status, ownership, next-action questions. The services hub linking GitLab/Nucleus/ArgoCD/JFrog/Tracer/SD Elements. Don't claim outcomes that aren't there (the original mentions a "6-7% tenant self-service baseline" — keep that kind of specific framing if confirmed, but don't claim adoption or shipped wins beyond what was actually verified).

Drop the removed fields. Keep `links`, `visuals` (rewrite captions). Rebuild `artifacts`.

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`

- [ ] **Step 4: Visual spot-check**

Run: `npm run dev`. Visit `http://localhost:3000/work/forge`. Same expectations.

- [ ] **Step 5: Self-audit for AI-speak**

```bash
grep -c '—' src/lib/work.ts
```

Expected: No new em dashes. Visually re-scan.

- [ ] **Step 6: Commit**

```bash
git add src/lib/work.ts
git commit -m "rewrite FORGE case study content"
```

---

## Task 7: Tighten the types and remove dead fields

Now that all four case studies have been rewritten and no longer carry the deprecated fields, remove them from the type definitions. The page already doesn't reference them.

**Files:**

- Modify: `src/lib/work.ts` (the type definitions section)

- [ ] **Step 1: Update the type definitions**

In `src/lib/work.ts`, replace the type block with the cleaned-up version:

```typescript
export type WorkSlug = "velveteen" | "sbir-radar" | "missionos-core" | "forge";
export type WorkRole =
  | "Product design"
  | "Product design + full-stack build"
  | "Service design"
  | "Product strategy";

export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkArtifact {
  label: string;
  body: string;
}

export interface WorkSection {
  title: string;
  body: string[];
}

export interface WorkVisual {
  label: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  layout?: "wide" | "landscape" | "portrait" | "phone";
}

export interface WorkItem {
  slug: WorkSlug;
  title: string;
  eyebrow: string;
  year: string;
  outcome: string;
  role: WorkRole;
  summary: string;
  sections: WorkSection[];
  artifacts: WorkArtifact[];
  links: WorkLink[];
  visuals?: WorkVisual[];
  image?: {
    src: string;
    alt: string;
  };
}

export interface WritingItem {
  title: string;
  eyebrow: string;
  href: string;
  summary: string;
  proof: string[];
}
```

Changes from Task 1:

- `WorkSnapshot` interface removed.
- `WorkArtifact.title?` and `WorkArtifact.meta?` removed.
- `WorkSection.label?` removed.
- `WorkItem.snapshot?`, `vehicle?`, `vehicleLabel?`, `proof?`, `constraints?`, `decisions?` removed.

- [ ] **Step 2: Verify the build passes**

Run: `npm run build`

Expected: Build succeeds. If TypeScript reports a missing field on any `workItems` entry, it means a rewrite (Task 3-6) left a deprecated field in place. Find and remove it.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: No errors. If there are unused-import warnings related to removed types, clean those up.

- [ ] **Step 4: Commit**

```bash
git add src/lib/work.ts
git commit -m "remove deprecated WorkItem fields and WorkSnapshot type"
```

---

## Task 8: Final verification across all four case studies

End-to-end check that nothing was missed.

- [ ] **Step 1: Run a clean build**

Run: `npm run build && npm run lint`

Expected: Both succeed with no errors.

- [ ] **Step 2: Visual walkthrough of all four case studies**

Run: `npm run dev`.

Visit each of the four URLs and confirm:

- `http://localhost:3000/work/velveteen`
- `http://localhost:3000/work/sbir-radar`
- `http://localhost:3000/work/missionos-core`
- `http://localhost:3000/work/forge`

For each page, verify:

- The sidebar renders (back link, title, year, role, outcome line, external links).
- The opening (big outcome + summary paragraph) renders with the new voice.
- Visual evidence renders with rewritten captions (where applicable).
- 2-3 narrative sections render with statement-style headings (no eyebrow labels above headings).
- Artifacts list at the bottom: 3 items, each a bold label and one sentence.
- No "at a glance" grid, no vehicle/operating-path box, no "what shipped" list, no "constraints" list, no "decisions" list.

Also visit `http://localhost:3000/` and confirm the work index still renders (it should — it only uses `title`, `year`, `slug`, `outcome`).

- [ ] **Step 3: Final em dash audit**

Run: `grep -c '—' src/lib/work.ts`

Expected: A small number, ideally 0. If above 4 (one per case study), revisit each entry and replace.

Run: `grep -E "It's not.*it's|here's the thing|in short|the result\?|seamless|robust|elegant|turns .* into|where the weight|leaves behind a record" src/lib/work.ts`

Expected: No matches. If any appear, revise the affected case study.

- [ ] **Step 4: Stop the dev server and confirm with Drew**

Surface the four URLs (or screenshots if convenient) and ask Drew to read through each one. If he flags voice or content issues, address them as a separate amendment commit.

- [ ] **Step 5: Optional final commit**

If any cleanup was needed during the audit:

```bash
git add src/lib/work.ts
git commit -m "polish case study copy after audit"
```

---

## Self-Review Notes

- **Spec coverage:** Page shape, voice rules, per-project notes, code changes — all covered by Tasks 1-8.
- **Placeholder scan:** Tasks 4-6 leave the actual prose to the implementer because Drew opted to draft from existing material plus check-ins. This isn't a placeholder; it's the deliberate workflow. Each of those tasks includes the structure, the suggested arc, and the check-in questions. The Velveteen task (3) contains the full final prose, since that was already locked.
- **Type consistency:** `WorkArtifact` shape (`label`, `body`) and `WorkSection` shape (`title`, `body`) are consistent across Tasks 1, 3, and 7.
- **Open coupling:** The page changes in Task 2 do not reference any field that gets removed in Task 7. The data rewrites in Tasks 3-6 do not introduce any field that is missing in Task 7. Order is safe.
