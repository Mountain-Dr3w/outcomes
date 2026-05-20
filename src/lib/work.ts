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
    role: "Product design",
    summary:
      "SBIR Radar is the iOS app I built for the part of federal R&D discovery that nobody enjoys: scanning topic pages on government portals to figure out which ones are worth another hour of your time. The information you need to make that call (which agency, when's it due, what phase, how much money, is the source even current) is buried under inconsistent fields, agency shorthand, and dense topic descriptions. I wanted that triage to take minutes instead of an afternoon.",
    sections: [
      {
        title: "Triage was the actual problem",
        body: [
          "The instinct, looking at the SBIR landscape from the outside, is to think the problem is search. You imagine a better database, or smarter filters. That isn't what slows people down. What slows people down is reading. You open a topic page on sbir.gov, you scroll past two paragraphs of background, you hunt for the deadline, you fail to find a funding range without clicking through, and by the third or fourth topic you've already burned twenty minutes and you still don't know what to focus on. The decision that mattered for v1 was that I wasn't building a better database. I was building a faster read.",
        ],
      },
      {
        title: "I designed it as a feed of signals, not a search engine",
        body: [
          "Each topic in the app is a signal. Agency, deadline, phase, funding range, source status, plain summary. All readable in a row before you tap in. Those fields aren't optional cosmetic detail. They're the only things that matter when you're deciding whether a topic is worth another five minutes. If the answer is yes, you tap to the full government page. If no, you keep scrolling and you've lost two seconds, not five.",
          "Saved radars and the watchlist are the second half of the product. You decide what matters once (agency, keywords, phase) and the radar surfaces matches as they appear. Watched topics show up when their source state changes or a deadline gets close. None of this is a CRM or a collaboration tool, and that was the second deliberate call. v1 has to earn its keep as a reading tool before asking anyone to log in or pay for it.",
        ],
      },
      {
        title: "The pipeline turned out to be a bigger problem than the app",
        body: [
          "The plan was for the SBIR public APIs to do the heavy lifting. They couldn't. Coverage was inconsistent, fields shifted between sources, and a few endpoints stopped returning what they had been returning. I moved the pipeline toward HTML fallback parsing, with fixture-backed development so the design work could keep going against real topic shapes even when the source was misbehaving. The interface had to reflect that reality too, which is why source state shows up alongside every topic. If the data is stale or partial, the app says so, instead of pretending the source is fine.",
          "This was the part of the project I'd been most ready to skip. It became the thing I think most about now. The app reads only as well as the pipeline lets it.",
        ],
      },
    ],
    artifacts: [
      {
        label: "Feed",
        body: "Each topic shows agency, deadline, phase, funding range, source status, and a plain summary. Enough to decide whether to open the full page.",
      },
      {
        label: "Pipeline",
        body: "A normalized contract over public SBIR data, with HTML fallback for when the structured APIs go quiet.",
      },
      {
        label: "Loop",
        body: "Saved radars match new topics against the criteria you care about. The watchlist surfaces them when deadlines or source state shifts.",
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
          "The Signals tab. Each row is a topic, with the fields you need to decide whether to open the full page: agency, deadline, phase, funding range, source state. Filters at the top, saved stars on the side, deadline language up front so you don't have to do the date math.",
        width: 1206,
        height: 2622,
        layout: "phone",
      },
      {
        label: "My Radars",
        src: "/artifacts/sbir-my-radars.png",
        alt: "SBIR Radar iPhone My Radars tab showing watched saved searches with match counts.",
        caption:
          "My Radars. Each row is a saved search you've turned into a watcher. Agency, phase, keywords, and a running count of fresh matches that fit those criteria.",
        width: 1206,
        height: 2622,
        layout: "phone",
      },
      {
        label: "Settings",
        src: "/artifacts/sbir-settings.png",
        alt: "SBIR Radar iPhone Settings tab showing source coverage, sync status, and notification controls.",
        caption:
          "Settings. Source coverage and sync state get top billing because the app is only useful if the pipeline is up. Notification controls are below.",
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
    role: "Product strategy",
    summary:
      "MissionOS Core was an eight-week internal proof I led for a recurring GovTech delivery problem: government software teams kept burning the first weeks of an engagement rebuilding the same delivery setup before any mission product could start. Environments, access, pipelines, deployment paths, compliance artifacts. Every team solved these from scratch, every time. The proof was supposed to show what that work amounted to, and what a shared platform could take on instead.",
    sections: [
      {
        title: "I started by mapping the parts that were already happening",
        body: [
          "Before I could argue for a platform, I had to show what teams were already doing without one. I mapped the developer journey across six touchpoints (onboarding, repo setup, pipeline configuration, deployment, observability, and operations) and tagged each step with what the platform should take over, what developers should still own, and what should disappear entirely. The map was the first thing that made the conversation move. Until then, leadership, engineering, and compliance had been talking about a 'platform' that meant different things to each of them. The map was the same diagram in all three rooms.",
        ],
      },
      {
        title: "The four goals were how we kept the proof honest",
        body: [
          "The work could have stretched in any direction, so I anchored the eight weeks around four planning goals: repeatable environment standup, developer-led delivery, time to first tenant deploy, and reusable compliance. Each one was something we could either demonstrate or fail to demonstrate. That mattered more than it sounds. It meant leadership couldn't push the proof to claim things we hadn't shown, and engineering couldn't disappear into tooling preferences that had nothing to do with platform value. The goals separated 'this is the path' from 'this is the toolchain I happen to like.'",
          "The same discipline shaped the demo. The team wanted the demo to do double duty as a marketing artifact, which is how internal proofs become public claims you regret later. I built a demo contract that distinguished internal evidence (what we were learning) from external claims (what we were allowed to say outside the room). It was unglamorous and probably the most useful thing I produced that quarter.",
        ],
      },
      {
        title: "What got left behind was the point",
        body: [
          "Internal proofs often end with a slide deck and a vague handoff. This one ended with a tenant path artifact and a stack of decision records. The tenant path split responsibilities by owner: tenants still submit intake, push code, and iterate; the platform provisions environments, runs delivery, scans the app, and regenerates compliance evidence as the product changes. That separation was the operating model itself. The diagram showed which work belonged to which side and what could be safely retired.",
          "The decision records were just as important. The next owner could pick up what we'd tried, what we'd ruled out, and what was still soft, without having to reconstruct it from meeting memory. The proof gave leadership enough to commit to a real product investment without losing the discipline of what we hadn't yet shown.",
        ],
      },
    ],
    artifacts: [
      {
        label: "Touchpoints",
        body: "Current-state map across six developer phases, tagged with what the platform should take over, what developers keep, and what disappears.",
      },
      {
        label: "Tenant path",
        body: "Target-state diagram that splits responsibilities between tenants and the platform across provisioning, delivery, scanning, and evidence regeneration.",
      },
      {
        label: "Demo contract",
        body: "A written distinction between internal evidence and external claims, so leadership could share results without overstating them.",
      },
    ],
    visuals: [
      {
        label: "DevEx gap analysis",
        src: "/artifacts/missionos-devex-touchpoints.png",
        alt: "MissionOS Core workshop board mapping current-state developer touchpoints across pre-code, repo setup, pipeline configuration, deployment, observability, and operations.",
        caption:
          "The workshop board. Six developer touchpoints across the top, with what we found tenants were currently doing themselves at each phase. The colored tags mark where a shared platform would change the answer.",
        width: 4096,
        height: 1479,
        layout: "wide",
      },
      {
        label: "Tenant path",
        src: "/artifacts/missionos-tenant-path.png",
        alt: "MissionOS Core tenant path slide showing what tenants do versus what the platform handles across onboard, provision, push, deliver, and operate.",
        caption:
          "Target state. The slide separates what tenants still do (intake, push code, iterate) from what the platform takes over (provisioning, delivery, scanning, evidence regeneration). It became the operating model people referred back to throughout the proof.",
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
