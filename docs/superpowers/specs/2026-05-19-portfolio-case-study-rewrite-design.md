# Portfolio case study rewrite: structure and voice

## Why

The case studies on the portfolio site have two related problems:

1. **Too many bins.** A single case study renders 10+ blocks (sidebar, giant outcome, summary, at-a-glance grid, vehicle box, what-shipped list, narrative sections, constraints list, decisions list, artifacts, visuals). Many cover the same ground 2–3 times.
2. **AI-flavored copy.** Templated rhetorical patterns ("turns X into Y", "where the weight goes", "leaves behind a record of...", em-dash sandwiches, punchy section-closing one-liners). Reads like a model filled in a template, not like a designer talking.

Goal: cut the structural noise and rewrite all four case studies in a human voice for an audience of fellow designers and engineers.

## Audience

Primary reader: fellow designers and engineers. They want craft, tradeoffs, the messy bits, real decisions. Voice can be opinionated and reflective. They will read the prose. We don't need to optimize for skim.

## Page shape

Sidebar (kept, mostly as-is):

- Title, year, role, one-line outcome, external links.

Right column, top to bottom:

1. **Opening.** 2–3 sentences, first person. Sets the scene with specificity. Replaces the current giant-outcome restatement plus summary paragraph.
2. **Narrative.** 2–3 sections per case study, each ~150–250 words. Headings are statements, not category labels.
3. **Visual evidence.** Existing screenshots, captions rewritten in the new voice.
4. **Artifacts.** Short bibliography of label plus one sentence each. Drops the four-field label/title/body/meta structure.

Removed entirely:

- "At a glance" 4-card grid.
- "Operating path / vehicle" box.
- "What shipped" list.
- "Constraints" list.
- "Decisions" list.

Target length per case study: ~500–700 words of prose total (opening plus narrative).

## Voice

First-person reflective essay. Specific, opinionated, contractions OK, varied sentence length. Visible decisions and small admissions where they're honest.

### Things to stop doing

- "It's not X, it's Y" constructions.
- "Here's the thing" / "In short" / "The result?" lead-ins.
- Triplets ("clean, repeatable, and shareable").
- Punchy one-liners closing every paragraph ("The launch question gets sharper.").
- "Robust," "seamless," "elegant," "thoughtful," "powerful" as adjectives.
- Formulas: "turns X into Y," "where the weight goes," "leaves behind a record of," "absorbs the burden of."
- Stacked noun chains ("operating needs, findings, fixes, and deployment state").
- Em dashes used as rhetorical pauses. Use periods, commas, colons, or parentheses instead. Roughly: max one em dash per case study, and only if it's the right tool for a specific sentence.
- Virtue-signal words used decoratively: "honest," "plain English," "intentional," "deliberate."
- The word "actually" doing rhetorical work.
- Section labels that sound profound but mean nothing ("the gap," "where it lands," "where the weight goes").

### Things to do

- Name one specific thing where the original lists four abstract ones.
- Show tradeoffs: what was tried first, what was almost done and changed.
- For client work (MissionOS Core, FORGE): acknowledge the consulting frame instead of abstracting around it. "I was leading discovery for an internal DevSecOps platform" reads more honestly than abstracting the work into "Government delivery teams were rebuilding setup."

## Per-project notes

### Velveteen

Personal project, full first-person voice. See worked example below.

### SBIR Radar

Personal project. Same voice and structure as Velveteen. Real specifics available: the HTML fallback decision when public APIs got unreliable, the editorial visual system call, the choice not to add accounts or monetization in v1.

### MissionOS Core

Client work (Rise8). Shift to first-person and acknowledge the consulting frame. Write about what was actually done: the touchpoint map across six developer phases, the four planning goals, the demo contract that kept claims bounded, the decision artifacts left for the next owner. Don't leak specifics that aren't already public.

### FORGE

Client work (Space Force DevSecOps). First-person, but the voice shifts because the role was service designer, not builder. More "I came in and made the invisible work discussable" than "I built X." Concrete material to draw on: five ownership lanes, the one-week onboarding target that stretched to months in practice, named platform tools (GitLab, Nucleus, ArgoCD, JFrog Artifactory, Tracer, SD Elements), the friction log structure (owning team, UX impact, breakage risk, rationale).

## Worked example: Velveteen

The approved draft, included so the implementation has a single source of truth for voice and structure.

### Opening

> Velveteen is the product I built for the awkward middle of AI-assisted development. The code runs locally. The project isn't ready for someone else. There's no Dockerfile, no env docs, no honest read on whether shipping it would leak secrets. I kept hitting that spot in my own projects and watching other people stall there too. The tools that got us to working-locally had nothing to say about getting out of it.

### Narrative 1: What was actually broken

> The framing I started with was that AI coding tools made building easier without making operating easier. That undersells it. You can install Trivy. You can write a Dockerfile. The deeper problem is that if you reached a working app by chatting your way through it, you don't have the muscle for any of that, and you don't have a clear next step either. The repo runs. It's also full of secrets in the wrong places, dependencies you never picked, and no documentation explaining how to bring it back up next month. The gap between "I have code" and "I have a thing I can deploy" is wider than it reads.

### Narrative 2: I built it around the security review

> The early decision that mattered most was making the security work visible. Most deployment products hide infrastructure so you don't have to think about it. I wanted the opposite: a pipeline you can watch, with a real pause for findings before anything goes live.
>
> The path is seven stages: clone, detect, scaffold, scan, explain, gate, deploy. Each one produces something you can look at. The scaffold step writes a Dockerfile, a standards file, and an env guide into your repo, so the project is more legible when you come back to it. The scan step runs four tools. Gitleaks looks for secrets, Semgrep checks the source, Trivy scans the container, Syft produces the SBOM. The explain step is the one I care about most. Scanner output is usually unreadable. This step turns it into something a person can read, alongside a prompt you can paste back into your coding assistant to fix what it found.
>
> Two models do the work, not one. A bigger model handles scaffolding, where reasoning matters. A smaller, cheaper one handles explanations, which are high volume. Splitting them kept costs sane.

### Narrative 3: What I'm still figuring out

> The pipeline shape is settled. Seven stages, the gate, the artifacts on the side. What I'm watching is the explanation layer. The four scans produce findings of very different shapes. A leaked AWS key reads nothing like a vulnerable Python dependency, and the model translating them into plain language has a much easier time with some than others. If the next version of Velveteen lives or dies, it's there.

### Visual captions

- Onboarding: *The screen you hit right before launching. GitHub connected, repo picked, framework auto-detected, subdomain claimed. I wanted everything you'd normally do across four pages to sit in one place, so you can see exactly what you're about to do before you do it.*
- Running pipeline: *Mid-pipeline. Clone and scaffold are done. The orange flag is a pre-build security finding the build is now reckoning with. The rest of the path stays in view. Nothing hidden behind a spinner.*

### Artifacts

- **Pipeline.** Seven stages from GitHub to live URL, each producing something visible.
- **Security explanations.** Gitleaks, Semgrep, Trivy, and Syft output, translated into plain language with a fix prompt for your coding assistant.
- **Generated scaffolding.** A Dockerfile, a standards file, and an env guide written into the repo before it ships.

## Code changes

### `src/lib/work.ts`

- Remove `WorkItem.snapshot`.
- Remove `WorkItem.vehicle` and `WorkItem.vehicleLabel`.
- Remove `WorkItem.proof`.
- Remove `WorkItem.constraints` and `WorkItem.decisions`.
- Simplify `WorkArtifact` from `{ label, title, body, meta }` to `{ label, body }`. Label is the short heading (e.g. "Pipeline"). Body is the one-sentence description.
- Remove `WorkSection.label`. Headings are now statements rendered as `WorkSection.title`. The eyebrow label is gone.
- Remove the `WorkSnapshot` type (becomes unused once `snapshot` is removed from `WorkItem`).
- Rewrite the content of all four `workItems` entries in the new voice.

### `src/app/work/[slug]/page.tsx`

- Remove the `AtAGlance` component and its call.
- Remove the "vehicle / operating path" section block.
- Remove the "What shipped" `EvidenceSection` call.
- Remove the "Constraints" and "Decisions" `EvidenceSection` calls.
- `EvidenceSection` becomes dead code after these removals and can be deleted.
- Simplify the artifacts section: drop the inner sub-grid `[10rem 1fr]` and the `meta` column. Each artifact renders as a bold label, period, then body sentence on one line (with sensible wrapping). The outer `[0.32fr 1fr]` grid that holds the "artifacts" heading on the left can stay or collapse; pick whichever reads cleaner once the inner structure is simpler.
- `CaseStudySection`: drop the eyebrow label entirely. The component now takes only `title` and `body`. The outer grid changes from `[0.32fr 1fr]` to a single column so the title and body stack and the prose gets the full width below the heading.
- Sidebar stays as-is.

### `src/app/page.tsx`

- Verify it doesn't break when the schema changes. Adjust only what's necessary. No copy rewrites here.

## Implementation order

1. Schema changes to `WorkItem` and related types.
2. Page rendering changes.
3. Velveteen content (approved draft from the worked example above).
4. SBIR Radar content (draft, then check-in with Drew for specifics).
5. MissionOS Core content (draft, then check-in).
6. FORGE content (draft, then check-in).

Each rewrite step flags places where a specific moment, number, or sentence from Drew would replace something abstract. Drew confirms or supplies the detail before that draft moves to final.

## Out of scope

- Home page / work index redesign.
- Writing section redesign.
- Visual evidence component behavior. Screenshots, layouts, and the gallery UI stay the same; only the caption text strings change.
- Analytics, SEO metadata changes, or routing changes.

## Open questions

None at design time. Specific factual details may need user confirmation during rewriting, flagged inline in each draft.
