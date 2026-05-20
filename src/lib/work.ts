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
          "Signals. Searchable topics surface agency, deadline, phase, funding range, and source state before you open the full page.",
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
    role: "Service design",
    summary:
      "FORGE is a cloud platform and DevSecOps environment for Space Force application teams. I came in as a service designer when the platform itself was working but the tenant experience around it was a mess. Five internal teams owned different phases of onboarding, and a tenant moving through the system had to figure out for themselves which team owned what came next. The target was for a new tenant to be productive within a week. Real paths could stretch into months.",
    sections: [
      {
        title: "I had to make the whole journey visible before anything else",
        body: [
          "You can't redesign what you can't see. The first thing I did was map the tenant journey end to end as a service blueprint, across seventeen phases from initial intake through production deployment. The blueprint showed four lanes for each phase: what the tenant was doing, what was visible to them, what was happening backstage, and which support systems were in play. Until that artifact existed, the five internal teams had been having the same conversations about onboarding for months without realizing they were each describing different segments of the same broken path.",
          "I ran event storming sessions alongside the blueprint to map the internal operating flow. The Domain-Driven Design framing exposed something specific: the platform depended on tacit knowledge at most of its transition points. Tenants couldn't navigate the system because the system, internally, was a chain of human handoffs that assumed everyone already knew how it worked.",
        ],
      },
      {
        title: "The friction log turned pain into something the teams could prioritize",
        body: [
          "Most platform teams hear tenant complaints as anecdotes. I wanted them to read them as data. So I built a friction log with four columns: owning team, UX impact severity, breakage risk, and rationale. Every documented pain point had to go through those four fields before it could be discussed. That changed the meeting. Conversations stopped being 'a tenant complained about X' and started being 'this is a high-severity issue with breakage risk, owned by this team, and here's why it matters.'",
          "The log surfaced repeated patterns that the five lanes had been treating as their own problems: outage communication gaps, unclear support ownership, limited tenant access to pairing rooms, undocumented ArgoCD expectations, Docker folder conventions that worked for the internal team but failed silently for tenants. These weren't five disconnected issues. They were the same issue in different costumes. The pattern was that internal practices had become invisible requirements for external tenants.",
        ],
      },
      {
        title: "The portal turned status into the answer to three questions",
        body: [
          "By the time the portal concept came together, I knew what tenants needed and couldn't get. They needed to know where they were in the process, who currently owned the next step, and what they could do right now without waiting on anyone. The portal answered those three questions on every screen. Status, ownership, and next action were the spine of the design, and every other piece of information sat in support of those three.",
          "The services hub did something parallel for the tools. GitLab, Nucleus, ArgoCD, JFrog Artifactory, Tracer, and SD Elements had all existed before, but they had been a scavenger hunt through documentation and tribal knowledge. The hub made the full toolkit visible from one place, with the access state shown alongside each one. The platform stopped looking like six unrelated systems that happened to share users.",
          "None of this changed the platform's internal architecture. What it changed was the gap between what the platform was capable of and what tenants could see, find, and act on. That gap was where the months were getting lost.",
        ],
      },
    ],
    artifacts: [
      {
        label: "Blueprint",
        body: "Seventeen phases mapped across tenant action, visible touchpoint, backstage work, and support systems. The first artifact that gave five internal teams a shared picture.",
      },
      {
        label: "Friction log",
        body: "Four columns (owning team, UX impact severity, breakage risk, rationale) turned scattered complaints into a prioritization queue with names on it.",
      },
      {
        label: "Portal",
        body: "A tenant-facing view designed around three questions: where am I, who owns the next step, what can I do right now.",
      },
    ],
    links: [],
    visuals: [
      {
        label: "Service blueprint",
        src: "/artifacts/forge-service-blueprint.png",
        alt: "FORGE service blueprint mapping the tenant journey across onboarding phases, backstage work, support systems, and friction points.",
        caption:
          "The service blueprint. Seventeen onboarding phases across the top. Four lanes per phase: tenant action, visible touchpoint, backstage work, and support system. The first time the whole tenant journey existed in one place.",
        width: 4096,
        height: 2435,
        layout: "landscape",
      },
      {
        label: "Event storm",
        src: "/artifacts/forge-event-storm.png",
        alt: "FORGE event storming board showing commands, domain events, decision points, and hotspots across the internal platform workflow.",
        caption:
          "The event storm. Commands, events, decision points, and hotspots laid out across the internal flow. The hotspots are the places where the platform was relying on someone in the room remembering what to do next.",
        width: 4096,
        height: 1315,
        layout: "wide",
      },
      {
        label: "Friction log",
        src: "/artifacts/forge-friction-log.png",
        alt: "FORGE friction log categorizing onboarding pain points by owner, impact, breakage risk, and rationale.",
        caption:
          "The friction log. Each row is a tenant pain point with the owning team, UX impact severity, breakage risk, and rationale. The columns are why meetings stopped being about anecdotes.",
        width: 4096,
        height: 2209,
        layout: "landscape",
      },
      {
        label: "Onboarding portal",
        src: "/artifacts/forge-portal-onboarding.png",
        alt: "FORGE onboarding portal concept showing current review status, assigned team, progress, pending actions, and direct task links.",
        caption:
          "The onboarding portal concept. Status of the current review, assigned team, progress through the seventeen phases, pending tenant actions, and direct task links. Designed around the three questions tenants couldn't get answered before: where am I, who owns this, what do I do next.",
        width: 4096,
        height: 2283,
        layout: "landscape",
      },
      {
        label: "Services hub",
        src: "/artifacts/forge-portal-services.png",
        alt: "FORGE platform services hub showing tenant access to development tools and services from a single dashboard.",
        caption:
          "The services hub. One screen for the tenant toolkit (GitLab, Nucleus, ArgoCD, JFrog Artifactory, Tracer, SD Elements) with the tenant's access state shown alongside each. The hub replaced the scavenger hunt with a directory.",
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
