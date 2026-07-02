# Copy + design pass — de-AI the writing (2026-07-02)

Drew's read: the site copy "sounds disgustingly AI." Visual language is fine; small design fixes allowed.

## Diagnosis

The copy already avoids surface tells (no em dashes, sentence-case headings, concrete detail). What makes it read AI-generated is the **rhythm and rhetorical templates**:

1. **Manufactured punchline cadence** — nearly every paragraph ends on a mic-drop line ("The gap between 'I have code' and 'I have a thing I can deploy' is wider than it reads." / "The app reads only as well as the pipeline lets it." / "That gap was where the months were getting lost.").
2. **Staccato fragment stacks** — "The code runs locally. The project isn't ready for someone else." / "Outage communication gaps. Unclear support ownership. Undocumented ArgoCD expectations."
3. **Negative parallelism ("X, not Y" / "wasn't X. It was Y.")** — ~8 instances sitewide, including two section headings.
4. **Anadiplosis pivots** — "That isn't what slows people down. What slows people down is reading."
5. **Word-level tics** — "actually" (4x, incl. two headings), "surface(d/s)" (4x), "quietly became" (2x), "messy/awkward middle" cluster (3x), aphorisms ("You can't redesign what you can't see.").
6. **Duplicated lines** — friction-log "ranked highest / argued loudest" appears verbatim in both an artifact and a caption; hero and work-blurb both lean on "the way people work changed."

Fix philosophy: keep every concrete fact (tool names, seventeen phases, numbers), keep the genuinely human bits ("in that order", "top billing", "stopped returning what they had been returning", parentheticals), convert fragment stacks into full sentences with varied length, and allow **at most one earned punchy contrast per case study** (e.g. FORGE's "productive in a week / stretch into months").

## Design fixes (visual language stays)

- `src/app/not-found.tsx` is completely unstyled bare HTML against an otherwise polished site → restyle with site tokens (mono eyebrow, italic serif heading, bordered mono link, matches hero idiom).
- `src/app/layout.tsx` `metadataBase` + OG `url` say `outcomes.velveteen.sh`; the site lives at `work.velveteen.sh` (resume.ts already says so) → fix both.
- `src/app/work/[slug]/page.tsx` renders `item.outcome` twice on the same screen (aside + hero) → drop the aside copy of it.
- Resume bullets: **leave unchanged** — resume genre, and the downloadable PDF must not drift from the page.

## Task A — `src/lib/work.ts` (all replacements below are exact final copy)

### Velveteen

- `summary` →
  "Velveteen is the product I built for the stretch of AI-assisted development where the code runs locally but the project isn't ready for anyone else. There's no Dockerfile or env documentation, and no honest answer to whether deploying would leak a secret. I kept hitting that wall in my own projects and watched other people stall in the same place, because the tools that get you to a working app have nothing to say about what comes after it."
- section 1 `title` → "What was broken"
- section 1 `body[0]` →
  "I started from the framing that AI coding tools made building easier without making operating easier, but that undersells the problem. Installing Trivy or writing a Dockerfile isn't hard on its own. It's hard when you arrived at a working app by chatting your way there, because none of the usual operating muscle got built along the way and nothing in the toolchain tells you what to do next. The repo runs, and it's also full of secrets in the wrong places, dependencies you never chose, and no documentation for bringing it back up next month."
- section 2 `body[1]` →
  "The path is seven stages: clone, detect, scaffold, scan, explain, gate, deploy. Each stage leaves an artifact you can inspect. The scaffold step writes a Dockerfile, a standards file, and an env guide into your repo, so the project is more legible when you come back to it. The scan step runs four tools. Gitleaks looks for secrets, Semgrep checks the source, Trivy scans the container, Syft produces the SBOM. The explain step is the one I care about most: scanner output is close to unreadable for most people, so this step turns it into plain language alongside a prompt you can paste back into your coding assistant to fix what was found."
- section 2 `body[2]` →
  "The pipeline runs on two models. A bigger one handles scaffolding, where the reasoning is hard, and a smaller, cheaper one writes the explanations, which are high volume. Splitting them kept costs sane."
- section 3 `body[0]` →
  "The pipeline shape is settled, and the part I'm still watching is the explanation layer. The four scanners produce findings of very different shapes. A leaked AWS key reads nothing like a vulnerable Python dependency, and the model translating them into plain language handles some of those shapes much better than others. Getting the weak cases up to the standard of the good ones is most of the work ahead."
- visuals: "Running pipeline" `caption` →
  "Mid-pipeline. Clone and scaffold are done, and the orange flag is a pre-build security finding the build has to answer for. The rest of the path stays in view instead of collapsing into a spinner."
- Unchanged: `outcome`, section 2 title + `body[0]`, all three `artifacts`, onboarding caption.

### SBIR Radar

- section 1 `title` → "The bottleneck was reading"
- section 1 `body[0]` →
  "From the outside, the SBIR landscape looks like a search problem, and I spent a while imagining better databases and smarter filters. But search isn't what slows people down. You open a topic page on sbir.gov, scroll past two paragraphs of background, hunt for the deadline, fail to find a funding range without clicking through, and by the third or fourth topic you've burned twenty minutes and still don't know what to focus on. The reading is the expensive part, so the call I made for v1 was to skip the database ambitions and build a faster read."
- section 2 `title` → "A feed of signals"
- section 2 `body[0]` →
  "Each topic in the app is a signal: agency, deadline, phase, funding range, source status, and a plain summary, all readable in a row before you tap in. Those fields are what you need to decide whether a topic deserves another five minutes of your attention. If it does, you tap through to the full government page. If it doesn't, you keep scrolling, and the topic cost you a couple of seconds."
- section 2 `body[1]` →
  "Saved radars and the watchlist are the other half of the product. You set your criteria once (agency, keywords, phase) and the radar collects new matches as they appear, while watched topics come back up when their source state changes or a deadline gets close. I kept CRM and collaboration features out on purpose. v1 has to earn its keep as a reading tool before it asks anyone to log in or pay."
- section 3 `body[0]` →
  "The plan was for the public SBIR APIs to do the heavy lifting, and they couldn't. Coverage was inconsistent, fields shifted between sources, and a few endpoints stopped returning what they had been returning. I moved the pipeline toward HTML fallback parsing, with fixture-backed development so design work could keep going against real topic shapes even while a source misbehaved. The interface reflects that reality too, which is why source state sits alongside every topic. If the data is stale or partial, the app says so rather than pretending the source is fine."
- section 3 `body[1]` →
  "This was the part of the project I'd been most ready to skip, and it's now the part I think about most, because the app only reads as well as the pipeline feeding it."
- artifact "Loop" `body` →
  "Saved radars match new topics against the criteria you care about. The watchlist brings them back when a deadline approaches or source state changes."
- visuals: "Signals" `caption` →
  "Signals. Each row shows agency, deadline, phase, funding range, and source state before you commit to opening the full page."
- Unchanged: `outcome`, `summary`, section 3 title, artifacts "Feed" + "Pipeline", "My Radars" + "Settings" captions.

### FORGE

- `outcome` →
  "Tenant teams onboarding to a Space Force platform could finally see where they were, who owned the next step, and what they could do without waiting on anyone."
- `summary` →
  "FORGE is a Space Force ground systems platform that needed a real path to production for the application teams trying to use it, and Rise8 was brought in to build that path. I joined the engagement as the service designer. Most individual pieces of the platform worked; the seams between them were where onboarding fell apart. Five internal teams owned different phases, multiple outside contractors had overlapping responsibilities, and tenants had to figure out for themselves who owned whatever came next. New teams were supposed to be productive in a week. Real onboarding could stretch into months."
- section 1 `body[0]` →
  "The first artifact I built was a service blueprint of the tenant journey end to end: seventeen phases from initial intake through production deployment, with four lanes per phase covering what the tenant was doing, what was visible to them, what was happening backstage, and which support systems were in play. Until the blueprint existed, the internal teams had been having the same onboarding conversations for months without realizing they were each describing different segments of the same path."
- section 1 `body[1]` →
  "I ran event storming sessions in parallel to map the operating flow on the inside. The Domain-Driven Design framing made the core issue legible: the platform depended on tacit knowledge at almost every transition point. Tenants couldn't navigate the system because the system, internally, was a chain of human handoffs that assumed everyone already knew how it worked."
- section 2 `body[0]` →
  "Platform teams tend to hear tenant complaints as anecdotes, so I built a friction log that forced every documented pain point through four fields before it could be discussed in a meeting: owning team, UX impact severity, breakage risk, and rationale. 'A tenant complained about X' became 'this is a high-severity issue with breakage risk, owned by your team, and here is why.'"
- section 2 `body[1]` →
  "The log also exposed repeating patterns that each lane had been treating as its own local problem: gaps in outage communication, unclear support ownership, undocumented ArgoCD expectations, Docker folder conventions that worked for the internal team and failed silently for tenants. Nearly all of it traced back to internal practices that had hardened into unspoken requirements for the people on the outside."
- section 3 `body[0]` →
  "By the time the portal concept came together, I knew the three questions tenants couldn't get answered: where am I in the process, who owns the next step, and what can I do right now without waiting on anyone. Status, ownership, and next action became the spine of the design, and every other piece of information sat in support of them."
- section 3 `body[1]` →
  "The services hub did the same job for the tools. GitLab, Nucleus, ArgoCD, JFrog Artifactory, Tracer, and SD Elements had all existed before; tenants found them through documentation and tribal knowledge, in that order. The hub put the full toolkit on one screen with each tool's access state next to it, and the platform stopped looking like six unrelated systems that happened to share users."
- section 3 `body[2]` →
  "None of this changed the platform's internal architecture. It changed how much of the platform's capability tenants could see and act on, and that gap was where the months were getting lost."
- section 4 `body` → replace all three paragraphs with exactly two:
  1. "The first thing I'd change is bringing tenant teams into the design work from week one. The internal retrospective on the engagement landed on the same point: client enablement started too late, and you build a handoff problem into the work when you don't include the people who'll own it after you leave. The friction log was a useful forcing function, but it came out of research on tenants rather than collaboration with them. Next time, a tenant team is in the room while the log is being built."
  2. "The second is not assuming visibility alone shortens the timeline. A lot of what the blueprint exposed was structural: manual provisioning that runs serially across several tools and takes weeks, licensing constraints that block parallel work, compliance scoping that lands after a project is already underway. A portal can show you that you're waiting, but it can't make the wait shorter. The concept needed a companion roadmap for the automation work that would compress the timeline, and I'd start that piece much earlier in the engagement."
- artifact "Friction log" `body` →
  "Each row scored against owning team, UX impact severity, breakage risk, and rationale, so meetings could rank issues instead of re-arguing them."
- Unchanged: section titles (all four), section 1 `body[2]`, artifacts "Blueprint" + "Portal", all five captions.

### Writing (Seams)

- `summary` →
  "Seams is where I write about moving from designing software to building it while the move is still in progress: awkward first projects, tools that push back, and design decisions that turn out to be implementation decisions."

## Task B — pages + metadata

### `src/app/page.tsx`

- Hero paragraph →
  "I've watched plenty of polished work ship and change nothing, at Kessel Run and everywhere since. So I plan around the outcome instead of the artifact: a project counts when the way people work is different afterward."
- Work-section blurb →
  "Three projects from 2026, picked because I can show you what changed for the people using them. For older work, reach out. I love to talk shop and I'm happy to walk through the back catalog."
- (Keep apostrophe escaping consistent with the file's existing `&apos;` usage.)

### `src/app/layout.tsx`

- `metadataBase` → `new URL("https://work.velveteen.sh")`
- `description` → "Portfolio of Drew McFarland, a product designer who also builds: GovTech, defense, and developer infrastructure work with the outcomes to show for it."
- `openGraph.description` → "Case studies in GovTech, defense, and developer infrastructure from a product designer who also builds."
- `openGraph.url` → "https://work.velveteen.sh"

### `src/app/not-found.tsx`

Full-page restyle using site tokens (currently bare HTML):

```tsx
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
```

### `src/app/work/[slug]/page.tsx`

Remove the muted duplicate outcome paragraph in the aside (the `<p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">{item.outcome}</p>` inside the role block). The outcome already leads the main column.

## Verify + ship

1. `npm run build` green.
2. Commit via git-commit conventions with explicit pathspec (repo has unrelated staged deletions + dirty README/deck — do not sweep them in).
3. Push to origin/main (branch is ahead 4; those ride along, as requested).
