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
  // Deprecated, will be removed once all case studies are rewritten. Kept optional so old data still validates.
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
  // Deprecated, will be removed once all case studies are rewritten. Kept optional so old data still validates.
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
  // Deprecated, will be removed once all case studies are rewritten. Optional so old data still validates.
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

export const workItems: WorkItem[] = [
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
  {
    slug: "sbir-radar",
    title: "SBIR Radar",
    eyebrow: "iOS, data pipeline, opportunity discovery",
    year: "2026",
    outcome:
      "Federal R&D opportunities become a mobile triage feed instead of an afternoon in government portals.",
    vehicle:
      "An iOS app and data pipeline that turn SBIR and STTR topics into searchable signals: agency, deadline, phase, funding range, source health, and a plain summary.",
    vehicleLabel: "operating path",
    role: "Product design",
    summary:
      "SBIR Radar came from a real discovery problem: valuable federal R&D topics were scattered across dense portals, agency language, stale links, and deadlines. The app turns that search into a short mobile briefing for scan, save, and follow-up decisions.",
    snapshot: [
      {
        label: "What it is",
        body: "A native iOS app and topic pipeline for scanning SBIR and STTR funding opportunities.",
      },
      {
        label: "Impact",
        body: "Reduced opportunity discovery to a fast mobile read with triage fields, source health, saved searches, and watchlists.",
      },
      {
        label: "My role",
        body: "Designed the mobile IA, signal feed, topic details, saved radar loop, watchlist behavior, and reliability language.",
      },
      {
        label: "Key artifacts",
        body: "Signals feed, My Radars, Watchlist, Settings, normalized topic contract, and HTML fallback strategy.",
      },
    ],
    sections: [
      {
        label: "the wall",
        title: "Good opportunities were buried in bad reading conditions.",
        body: [
          "SBIR and STTR topics can shape a company's roadmap, but discovery often starts in portals that bury the first decision: is this worth another hour? Topic pages mix agency language, shifting dates, inconsistent fields, and long descriptions.",
        ],
      },
      {
        label: "what i built",
        title: "I designed the app around triage, not database completeness.",
        body: [
          "The iOS experience treats each topic as a signal. Agency, deadline, phase, funding range, source status, and summary are readable before the user opens the full government page.",
          "Saved radars and watched opportunities close the loop: decide what matters, track it, and return when deadlines or source changes deserve attention.",
        ],
      },
      {
        label: "the contract",
        title: "The product needed a clean contract over messy sources.",
        body: [
          "The pipeline normalizes public topic data into a contract the app can trust. When structured APIs failed, the strategy shifted toward HTML fallback, fixture-backed development, and source-health language in the interface.",
        ],
      },
      {
        label: "where it lands",
        title: "Discovery becomes a repeatable scan.",
        body: [
          "SBIR Radar gives founders, operators, and grant writers a faster way to decide which opportunities deserve desk research. The first version favors useful reading and watchable intent over accounts, collaboration, or monetization.",
        ],
      },
    ],
    proof: [
      "Built an editorial iOS design system with feed rows, topic detail, deadline language, empty states, source-health labels, and snapshot coverage.",
      "Redesigned the app around four native tabs: Signals, My Radars, Watchlist, and Settings.",
      "Modeled topics across pipeline, backend, and iOS so source changes can flow into the app without hand cleanup.",
      "Shipped a fixture-backed app foundation that kept design and pipeline work testable against real topic shapes.",
      "Used source health and fallback parsing when public SBIR APIs became unreliable.",
    ],
    constraints: [
      "Official portals expose valuable data through inconsistent APIs and dense listing pages.",
      "The app has to serve newcomers without procurement shorthand.",
      "Mobile triage should reveal whether a topic deserves deeper reading before the full source review.",
    ],
    decisions: [
      "Use an editorial visual system so opportunities read like a briefing.",
      "Treat saved searches and watchlists as the alert loop, with richer database features deferred.",
      "Keep v1 free, accountless, and focused on useful reading before monetization or collaboration.",
    ],
    artifacts: [
      {
        label: "Feed",
        title: "Scan first, research second",
        body: "The feed gives each topic a headline, agency, deadline, funding range, and source state before the user opens the portal.",
        meta: "SwiftUI snapshot artifact",
      },
      {
        label: "Pipeline",
        title: "Dirty sources, clean contract",
        body: "The Python pipeline fetches, normalizes, dedupes, diffs, and publishes topic snapshots for iOS and Workers.",
        meta: "SBIR.gov HTML fallback",
      },
      {
        label: "Loop",
        title: "Saved radars drive the product",
        body: "The phase-two plan centers saved searches, watchlists, and trusted notifications before expanding the database.",
        meta: "Alert loop first",
      },
    ],
    links: [
      {
        label: "GitHub owner",
        href: "https://github.com/Mountain-Dr3w",
      },
    ],
    visuals: [
      {
        label: "Signals",
        src: "/artifacts/sbir-signals.png",
        alt: "SBIR Radar iPhone Signals tab showing searchable funding opportunities, filters, and deadline language.",
        caption:
          "Searchable signal feed with filters, source labels, saved stars, and deadline language.",
        width: 1206,
        height: 2622,
        layout: "phone",
      },
      {
        label: "My Radars",
        src: "/artifacts/sbir-my-radars.png",
        alt: "SBIR Radar iPhone My Radars tab showing watched saved searches with match counts.",
        caption:
          "Saved searches become watched radars with agency, phase, keywords, and match counts.",
        width: 1206,
        height: 2622,
        layout: "phone",
      },
      {
        label: "Settings",
        src: "/artifacts/sbir-settings.png",
        alt: "SBIR Radar iPhone Settings tab showing source coverage, sync status, and notification controls.",
        caption:
          "Settings expose source coverage, sync state, and notification controls without burying source reliability.",
        width: 1206,
        height: 2622,
        layout: "phone",
      },
    ],
  },
  {
    slug: "missionos-core",
    title: "MissionOS Core",
    eyebrow: "Service design, platform strategy, GovTech",
    year: "2026",
    outcome:
      "Government delivery teams get a reusable path to production instead of rebuilding setup work for every engagement.",
    vehicle:
      "An eight-week internal platform proof that mapped the current developer journey, defined a target responsibility split, and bounded what the platform could credibly demonstrate.",
    vehicleLabel: "proof shape",
    role: "Product strategy",
    summary:
      "MissionOS Core was an internal proof for a recurring GovTech delivery problem: teams were rebuilding environments, access, delivery paths, and compliance evidence before mission-product work could start. The proof made that burden visible and showed which parts a platform could absorb.",
    snapshot: [
      {
        label: "What it is",
        body: "An internal DevSecOps platform proof for government software teams that needed reusable setup and delivery patterns.",
      },
      {
        label: "Impact",
        body: "Gave leadership, engineering, and compliance a shared benchmark for what the platform should absorb and what developers should still own.",
      },
      {
        label: "My role",
        body: "Framed the proof, mapped the current developer path, defined four planning goals, and wrote the architecture and decision artifacts.",
      },
      {
        label: "Key artifacts",
        body: "Current-state DevEx map, target tenant path, demo contract, claim boundaries, and phase-line decisions.",
      },
    ],
    sections: [
      {
        label: "what was happening",
        title: "Teams were losing momentum before the mission product even started.",
        body: [
          "Government software teams often inherit delivery setup as bespoke work: environments, access, compliance artifacts, deployment paths, and operating rules. Each team can solve those pieces, but solving them from scratch burns time before the mission product gets traction.",
          "I mapped six developer touchpoints from pre-code through operations: onboarding, repo setup, pipeline configuration, deployment, observability, and operations. Then I marked what the platform should absorb, what developers should still own, and what should disappear.",
        ],
      },
      {
        label: "what i shaped",
        title: "I gave the proof four things to organize around.",
        body: [
          "During the eight-week surge, I shaped the work around repeatable environment standup, developer-led delivery, time to first tenant deploy, and reusable compliance. Those goals gave leadership, engineering, and compliance a shared way to judge progress.",
          "The tenant-path artifact turned the target state into four platform jobs: provision environments, run delivery, scan the app, and regenerate evidence as the product changes. Tenants still submit intake, push code, and iterate.",
        ],
      },
      {
        label: "what got left behind",
        title: "The next owner inherited something they could actually build on.",
        body: [
          "The work left behind explicit claims, risks, phase lines, and decision records. The next owner could see what had been proven, what still needed hardening, and how to keep public claims disciplined.",
        ],
      },
    ],
    proof: [
      "Led an eight-week internal proof from problem framing through demo contract, architecture decisions, and progress tracking.",
      "Mapped current-state developer touchpoints across onboarding, repo setup, pipeline configuration, deployment, observability, and operations.",
      "Defined four planning goals that sequenced the work and kept platform value separate from tool preference.",
      "Wrote the architecture and decision artifacts so the next product owner could inherit the context without relying on meeting memory.",
      "Kept public and internal claims bounded so leadership, engineering, and compliance could trust the proof.",
    ],
    constraints: [
      "Government delivery teams cannot treat compliance, infrastructure, and access as afterthoughts.",
      "The proof had to show internal trust without overstating external authorization, adoption, or guarantee claims.",
      "Platform choices needed fallback paths because one stalled policy migration could block the whole benchmark.",
    ],
    decisions: [
      "Use GitLab-native scaffolding for the proof window and reserve heavier orchestration for later hardening.",
      "Put compliance artifacts at the promotion gate so onboarding stayed focused on launch momentum.",
      "Separate tenant provisioning from app onboarding to avoid coupling two different operating events.",
      "Frame the tenant path through responsibilities: what tenants still do, what the platform absorbs, and what no longer needs to exist.",
    ],
    artifacts: [
      {
        label: "Touchpoints",
        title: "The gap map made platform absorption visible",
        body: "The workshop board tracked each developer step from pre-code to ongoing operations and scored how much burden still sat outside the platform.",
        meta: "Current-state map",
      },
      {
        label: "Tenant path",
        title: "The target state became a responsibility split",
        body: "The slide separated what tenants do from what the platform handles, giving the proof an operating model with more weight than a tool demo.",
        meta: "Day 0 to operate",
      },
      {
        label: "Demo contract",
        title: "The proof bounded its claims",
        body: "Demo framing separated internal evidence from external claims so the team could move without inflating the result.",
        meta: "Claim control",
      },
    ],
    visuals: [
      {
        label: "DevEx gap analysis",
        src: "/artifacts/missionos-devex-touchpoints.png",
        alt: "MissionOS Core workshop board mapping current-state developer touchpoints across pre-code, repo setup, pipeline configuration, deployment, observability, and operations.",
        caption:
          "Workshop artifact mapping current-state developer touchpoints and where platform absorption still needed to replace manual tenant work.",
        width: 4096,
        height: 1479,
        layout: "wide",
      },
      {
        label: "Tenant path",
        src: "/artifacts/missionos-tenant-path.png",
        alt: "MissionOS Core tenant path slide showing what tenants do versus what the platform handles across onboard, provision, push, deliver, and operate.",
        caption:
          "Target-state artifact separating tenant responsibilities from platform-owned work across onboarding, provisioning, delivery, and operations.",
        width: 7680,
        height: 4320,
        layout: "wide",
      },
    ],
    links: [
      {
        label: "Rise8",
        href: "https://www.rise8.us",
      },
    ],
  },
  {
    slug: "forge",
    title: "FORGE",
    eyebrow: "Service design, DevSecOps, onboarding",
    year: "2026",
    outcome:
      "Space Force application teams moved from opaque platform onboarding toward visible status, ownership, support routes, and self-service access.",
    vehicle:
      "A service blueprint, event-stormed operating map, friction log, and onboarding portal concept that exposed status, owners, blockers, support paths, and platform services from intake through production.",
    vehicleLabel: "service path",
    role: "Service design",
    summary:
      "FORGE is a cloud platform and DevSecOps environment for Space Force application teams. When I joined, onboarding lacked a shared picture: tenants moved across disconnected tools, siloed teams, and undocumented requirements without knowing what came next.",
    snapshot: [
      {
        label: "What it is",
        body: "A DevSecOps and cloud platform for Space Force application teams moving from intake to production deployment.",
      },
      {
        label: "Impact",
        body: "Made a months-long onboarding path visible through phases, owners, support routes, pending actions, and service access.",
      },
      {
        label: "My role",
        body: "Mapped the tenant journey, facilitated discovery, created the friction log, and designed onboarding and services portal concepts.",
      },
      {
        label: "Key artifacts",
        body: "17-phase service blueprint, event-storming map, friction log, onboarding portal, and platform services hub.",
      },
    ],
    sections: [
      {
        label: "the failure mode",
        title: "No one owned the whole tenant journey.",
        body: [
          "The platform had strong internal capabilities, but the tenant experience was fragmented across five internal ownership lanes. Each team owned a different part of the path, and tenants were expected to know how those pieces fit together.",
          "The onboarding target was one week, but real paths could stretch into months. Teams got stuck on unclear handoffs, missing support routes, and requirements that were known internally but invisible to new tenants.",
        ],
      },
      {
        label: "map",
        title: "I made the invisible work discussable.",
        body: [
          "I facilitated workshops to build a service blueprint across 17 phases, from initial intake through production deployment. The artifact showed tenant actions, visible touchpoints, backstage work, and support systems in one view.",
          "Event storming brought the internal operating flow into the same conversation and exposed handoffs that depended on tacit knowledge.",
        ],
      },
      {
        label: "friction",
        title: "Pain points became an operating artifact.",
        body: [
          "I established a friction log with owning team, UX impact severity, breakage risk, and rationale. That moved the conversation from anecdotes to prioritizable service-design work.",
          "The log surfaced repeated patterns: outage communication gaps, unclear support ownership, limited pairing access, undocumented ArgoCD expectations, and Docker folder conventions.",
        ],
      },
      {
        label: "solution",
        title: "The portal turned onboarding into status, ownership, and next actions.",
        body: [
          "The portal concept gave tenants a persistent view of status, assigned team, progress, pending actions, and direct links. It answered the questions that had created support churn: where am I, who owns this, and what do I do next?",
          "A services hub made GitLab, Nucleus, ArgoCD, JFrog Artifactory, Tracer, and SD Elements legible as a connected platform instead of a scavenger hunt through documentation and tribal knowledge.",
          "Against an estimated 6-7% tenant self-service baseline, the work reframed time-to-deployment as an operating problem: less ambiguity, clearer accountability, and blockers visible to both tenants and internal teams.",
        ],
      },
    ],
    proof: [
      "Created a comprehensive service blueprint spanning 17 phases from intake through production deployment.",
      "Facilitated event storming sessions using Domain-Driven Design principles to reveal commands, state changes, decisions, and failure points.",
      "Established a friction log that categorized problems by owning team, UX impact severity, what could break, and why it mattered.",
      "Designed a self-service onboarding portal with status, assigned team, progress, pending actions, and direct links.",
      "Centralized platform service discovery for GitLab, Nucleus, ArgoCD, JFrog Artifactory, Tracer, and SD Elements.",
    ],
    constraints: [
      "Five internal teams held different parts of the tenant journey.",
      "External tenants could not rely on the same internal Slack and pairing-room access as delivery teams.",
      "Undocumented repo and Docker conventions created repeat failures for new tenants.",
      "The platform had to support mission-critical teams without exposing them to internal organizational complexity.",
    ],
    decisions: [
      "Use the service blueprint as the shared artifact before jumping to another tool.",
      "Treat the friction log as service data, not a complaint tracker.",
      "Make ownership visible on every action, blocker, and support path.",
      "Link to existing platform tools instead of trying to replace them inside the portal.",
    ],
    artifacts: [
      {
        label: "Blueprint",
        title: "Seventeen phases made the journey discussable",
        body: "The service blueprint connected tenant-visible steps, backstage work, support systems, and handoff failures across the onboarding path.",
        meta: "Intake to production",
      },
      {
        label: "Friction log",
        title: "Pain points got owners and severity",
        body: "The log categorized platform friction by owning team, UX impact, what could break, and why each issue mattered.",
        meta: "Support and handoffs",
      },
      {
        label: "Portal",
        title: "Status became the interface",
        body: "The onboarding portal showed progress, assigned teams, pending actions, and service access in one tenant-facing view.",
        meta: "Self-service onboarding",
      },
    ],
    links: [],
    visuals: [
      {
        label: "Service blueprint",
        src: "/artifacts/forge-service-blueprint.png",
        alt: "FORGE service blueprint mapping the tenant journey across onboarding phases, backstage work, support systems, and friction points.",
        caption:
          "The service blueprint made a fragmented 17-phase onboarding journey visible enough for teams to reason about handoffs and failure points.",
        width: 4096,
        height: 2435,
        layout: "landscape",
      },
      {
        label: "Event storm",
        src: "/artifacts/forge-event-storm.png",
        alt: "FORGE event storming board showing commands, domain events, decision points, and hotspots across the internal platform workflow.",
        caption:
          "Event storming exposed where the platform depended on tacit knowledge and human intervention at transition points.",
        width: 4096,
        height: 1315,
        layout: "wide",
      },
      {
        label: "Friction log",
        src: "/artifacts/forge-friction-log.png",
        alt: "FORGE friction log categorizing onboarding pain points by owner, impact, breakage risk, and rationale.",
        caption:
          "The friction log turned scattered tenant pain into a prioritizable operating artifact with ownership and impact.",
        width: 4096,
        height: 2209,
        layout: "landscape",
      },
      {
        label: "Onboarding portal",
        src: "/artifacts/forge-portal-onboarding.png",
        alt: "FORGE onboarding portal concept showing current review status, assigned team, progress, pending actions, and direct task links.",
        caption:
          "The onboarding view answered status, ownership, and next-action questions that had previously created support churn.",
        width: 4096,
        height: 2283,
        layout: "landscape",
      },
      {
        label: "Services hub",
        src: "/artifacts/forge-portal-services.png",
        alt: "FORGE platform services hub showing tenant access to development tools and services from a single dashboard.",
        caption:
          "The services hub made the tenant toolkit discoverable without asking teams to chase documentation or tribal knowledge.",
        width: 4096,
        height: 2277,
        layout: "landscape",
      },
    ],
  },
];

export const writingItems: WritingItem[] = [
  {
    title: "Seams",
    eyebrow: "Writing, positioning, project memory",
    href: "https://seams.velveteen.sh",
    summary:
      "Seams is where I write about the designer-to-builder transition while it's still messy: the awkward first projects, the tools that pushed back, and the moments where a design decision quietly became an implementation decision.",
    proof: [
      "Becoming a builder",
      "The artifacts changed",
      "Project memory for humans and models",
    ],
  },
];

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return workItems.find((item) => item.slug === slug);
}
