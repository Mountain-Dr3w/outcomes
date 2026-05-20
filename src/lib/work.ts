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
      "MissionOS Core is a pre-authorized, multi-tenant delivery platform for government software teams. The problem it addresses is structural. Every engagement had been rebuilding its production environment from scratch, including the security pipeline and compliance posture, and burning 12 to 18 months and most of the program budget before any mission code shipped. I led an eight-week surge from problem definition through internal proof, as service designer and acting product owner, with one question to answer: could we trust the platform enough to put it in front of a real delivery team for the next engagement.",
    sections: [
      {
        title: "I put a number on the status quo before pitching the platform",
        body: [
          "The case for the platform had to start with numbers, because the rebuild-from-scratch pattern had become invisible to the people repeating it. Teams were spending more than half their first six to nine months on path-to-production infrastructure. Time to first mission outcome in production sat at 211 days and was trending the wrong way. 38% of active project teams had been running nine to twelve months without an authorized path to production. The most expensive case in the portfolio had burned $12.6M over 351 days with zero approved outcomes. The inherited-environment side told a different story. 42% of 2025 outcomes came from teams that started with a path to production already standing, and 67% when you counted every team that began the year inside an authorized environment. Inherited paths produced more outcomes, faster, and the surge existed to test whether a shared platform could make that inheritance the default for the next engagement.",
          "I framed the eight weeks as a time-boxed experiment with explicit hypotheses and a customer-zero validation model held by a skeptical reviewer. The surge would prove internal viability. It would not prove external adoption, broad compliance acceptance, or the 180-day guarantee as a contract term. Conflating those would have burned credibility with the technical team and with leadership before week three.",
        ],
      },
      {
        title: "I planned the surge around four outcomes",
        body: [
          "The four were Repeatable Environment Standup, Developer-Led Delivery, Time to First Tenant Deploy, and Reusable Compliance. The order mattered. There's no pipeline to test until environments stand up, and no onboarding metric to measure until something exists for tenants to onboard into.",
          "Each outcome was something the surge could either demonstrate or fail to demonstrate. That distinction mattered more than it sounds. It meant leadership couldn't push the proof to claim things we hadn't shown, and engineering couldn't disappear into tooling preferences with no link to platform value. When someone proposed swapping in a new orchestration layer mid-surge, the test was whether it eliminated more surge work than it created. It didn't, so we stayed on the existing scaffolding and parked the new layer as post-surge work. The same test settled the build path: a cloud-native buildpack approach as the primary, a traditional container build as a fallback if the policy-engine migration stalled. The policy migration was the single highest-risk item in the surge, and the team needed a path that didn't block the benchmark if it slipped.",
          "The same discipline shaped the demos. Several external commitments were pulling at the team's calendar. A capabilities overview tied to a procurement vehicle. A proposed external workshop. A run of internal town halls. The risk was that internal evidence (what we were learning) would silently become external claims (what leadership felt free to say in those rooms). I wrote a demo contract that defined what each demo would and would not claim, in writing, before it happened. When a senior stakeholder floated a public narrative that overclaimed the compliance work, I pushed back with specifics about which claims the technical data did and did not support, and which people needed to weigh in before the framing locked.",
        ],
      },
      {
        title: "Building for the next owner",
        body: [
          "The customer-zero check kept the surge from grading its own homework. Acceptance was a small reference app, deployed in three steps. Stand up an instance, push code and see it deployed, make a change and see it reflected. The reviewer ran the path themselves, and manual interventions got reported instead of papered over. The Week 3 demo showed environments standing in the new stack, the reference app deploying end-to-end through the platform's own automation, and a precise list of what was still hand-rolled.",
          "The artifacts mattered as much as the demo. The formal product owner was split across other priorities, the technical PM hire was still open, and I knew I wouldn't be the one running this past the surge. Every record had to function as a steering tool. Documentation alone wouldn't do. The architecture document recorded the target state, then called out per layer which parts were surge dependencies and which were post-surge hardening. The risk register named eleven risks, each with a mitigation and an escalation trigger. The compliance work split platform-level posture from app-level posture, which unblocked a set of decisions that had been stuck for weeks under a one-size-fits-all framing. A licensed logging stack came out of the architecture and took roughly $900K a year in license fees with it, replaced by the open-source observability tools the platform was already running.",
          "The anti-patterns from that most expensive case got named and used as live evaluation criteria throughout the surge. Demo-driven development. Tool-first architecture. Overclaiming capability before validation. Treating curiosity and startup energy as a substitute for thinking from the tenant's perspective. Catching those patterns early was as much of the work as the architecture, because the next owner would inherit whichever ones survived.",
        ],
      },
    ],
    artifacts: [
      {
        label: "Touchpoints",
        body: "Current-state DevEx map across the developer journey. Each phase tagged with what the platform should take over, what developers keep, and what disappears.",
      },
      {
        label: "Tenant path",
        body: "Target-state diagram that splits responsibilities between tenants and the platform across provisioning, delivery, scanning, and evidence regeneration.",
      },
      {
        label: "Demo contract",
        body: "Written rules for what each demo would and would not claim, so internal proof points couldn't silently become external commitments.",
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
    eyebrow: "Service design at Rise8 · Space Force DevSecOps",
    year: "2026",
    outcome:
      "Onboarding to a Space Force platform got a visible spine. Tenant teams could see where they were, who owned the next step, and what they could do without waiting on someone else.",
    role: "Service design",
    summary:
      "FORGE is a Space Force ground systems platform that needed a real path to production for the application teams trying to use it. Rise8 was brought in to build that path. I joined the engagement as the service designer. The individual pieces of the platform mostly worked. The seams between them did not. Five internal teams owned different phases of onboarding, multiple outside contractors had overlapping responsibilities with no shared tooling, and tenants moving through the system had to figure out for themselves who owned what came next. New teams were supposed to be productive in a week. Real onboarding could stretch into months.",
    sections: [
      {
        title: "Mapping the journey before anything else",
        body: [
          "You can't redesign what you can't see. The first artifact I built was a service blueprint of the tenant journey end to end, seventeen phases from initial intake through production deployment. Four lanes per phase: what the tenant was doing, what was visible to them, what was happening backstage, and which support systems were in play. Until the blueprint existed, the internal teams had been having the same onboarding conversations for months without realizing they were each describing different segments of the same path.",
          "I ran event storming sessions in parallel to map the operating flow on the inside. The Domain-Driven Design framing surfaced something specific. The platform depended on tacit knowledge at almost every transition point. Tenants couldn't navigate the system because the system, internally, was a chain of human handoffs that assumed everyone already knew how it worked.",
          "The work happened inside a multi-contractor reality. Several organizations shared responsibility for different parts of the platform with no shared tooling and no shared vocabulary. The blueprint became the first place anyone could point to and say, 'this phase belongs to your team, and here is where the handoff to mine is failing.'",
        ],
      },
      {
        title: "The friction log",
        body: [
          "Platform teams tend to hear tenant complaints as anecdotes. I wanted them to read them as data. So I built a friction log with four columns: owning team, UX impact severity, breakage risk, and rationale. Every documented pain point had to go through those four fields before it could be discussed in a meeting.",
          "That changed the conversation. 'A tenant complained about X' became 'this is a high-severity issue with breakage risk, owned by your team, and here is why.' The log also surfaced repeating patterns that each lane had been treating as their own local problem. Outage communication gaps. Unclear support ownership. Undocumented ArgoCD expectations. Docker folder conventions that worked for the internal team but failed silently for tenants. The patterns shared a root. Internal practices had quietly become unspoken requirements for the people on the outside.",
        ],
      },
      {
        title: "The portal concept",
        body: [
          "By the time the portal concept came together, I knew what tenants needed and couldn't get. Where am I in the process. Who owns the next step. What can I do right now without waiting on anyone. The portal was built around those three questions. Status, ownership, and next action were the spine of the design, and every other piece of information sat in support of them.",
          "The services hub did something parallel for the tools. GitLab, Nucleus, ArgoCD, JFrog Artifactory, Tracer, and SD Elements had all existed before. Tenants found them through documentation and tribal knowledge, in that order. The hub put the full toolkit on one screen, with each tool's access state shown next to it. The platform stopped looking like six unrelated systems that happened to share users.",
          "None of this changed the platform's internal architecture. What it changed was how much of the platform's actual capability tenants could see and act on. That gap was where the months were getting lost.",
        ],
      },
      {
        title: "What I'd do differently",
        body: [
          "Two patterns I'd handle earlier next time.",
          "Bring tenant teams into the design work from week one. The internal retrospective on the engagement landed on the same point. Client enablement started too late, and you build a handoff problem into the work when you don't include the people who'll own it after you leave. The friction log was a good forcing function but it came from research with tenants, not collaboration with them. The next version of this work would put a tenant team in the room while the log was being built.",
          "Don't assume visibility alone shortens the timeline. Making the journey visible was necessary but not sufficient. A lot of what the blueprint exposed was structural. Manual provisioning that runs serially across several tools and takes weeks. Licensing constraints that prevent parallel work. Compliance scoping that lands after a project is already underway. A portal can show you that you're waiting. It can't make the wait shorter. The portal concept needed a companion roadmap for the automation work that would actually compress the timeline, and I'd start that earlier in the next engagement.",
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
        body: "Each row scored against owning team, UX impact severity, breakage risk, and rationale. The columns kept meetings on the issues that ranked highest rather than the ones argued loudest.",
      },
      {
        label: "Portal",
        body: "A tenant-facing view designed around three questions: where am I, who owns the next step, what can I do right now.",
      },
    ],
    links: [
      {
        label: "Rise8",
        href: "https://www.rise8.us",
      },
    ],
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
          "The friction log. Each row is a tenant pain point with the owning team, UX impact severity, breakage risk, and rationale. The columns kept meetings on the issues that ranked highest instead of the ones argued loudest.",
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
          "The services hub. One screen for the tenant toolkit (GitLab, Nucleus, ArgoCD, JFrog Artifactory, Tracer, SD Elements) with the tenant's access state shown alongside each. Tenants no longer needed to hunt through documentation to find which tools they had access to.",
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
