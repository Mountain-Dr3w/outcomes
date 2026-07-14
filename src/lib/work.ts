export type WorkSlug = "velveteen" | "sbir-radar" | "forge";
export type WorkRole =
  | "Product design"
  | "Product design + full-stack build"
  | "Service design"
  | "Product strategy";

export interface WorkLink {
  label: string;
  href: string;
}

export type WorkEvidenceLevel =
  | "observed change"
  | "built capability"
  | "concept"
  | "still unproven";

export interface WorkEvidence {
  level: WorkEvidenceLevel;
  label: string;
  body: string;
}

export interface WorkSection {
  title: string;
  body: string[];
}

export interface WorkVisual {
  afterSection: number;
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
  status: string;
  scope: string;
  proof: string;
  role: WorkRole;
  summary: string;
  sections: WorkSection[];
  evidence: WorkEvidence[];
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
      "Built a live seven-stage deployment pipeline that makes four security checks inspectable before release.",
    status: "Live product · validation ongoing",
    scope: "Product design and full-stack build",
    proof:
      "The public product runs clone, detect, scaffold, scan, explain, gate, and deploy as one visible path.",
    role: "Product design + full-stack build",
    summary:
      "AI-assisted development gets you to a working repo faster than it gets you to a safe deployment. I built Velveteen to make the missing operational work visible: scaffolding, scanning, explanations, a human gate, then deployment. The product is live. Whether its explanations are consistently useful across every finding type is still under evaluation.",
    sections: [
      {
        title: "What was broken",
        body: [
          "I started from the framing that AI coding tools made building easier without making operating easier, but that undersells the problem. Installing Trivy or writing a Dockerfile isn't hard on its own. It's hard when you arrived at a working app by chatting your way there, because none of the usual operating muscle got built along the way and nothing in the toolchain tells you what to do next. The repo runs, and it's also full of secrets in the wrong places, dependencies you never chose, and no documentation for bringing it back up next month.",
        ],
      },
      {
        title: "I built it around the security review",
        body: [
          "The early decision that mattered most was making the security work visible. Most deployment products hide infrastructure so you don't have to think about it. I wanted the opposite: a pipeline you can watch, with a real pause for findings before anything goes live.",
          "The path is seven stages: clone, detect, scaffold, scan, explain, gate, deploy. Each stage leaves an artifact you can inspect. The scaffold step writes a Dockerfile, a standards file, and an env guide into your repo, so the project is more legible when you come back to it. The scan step runs four tools. Gitleaks looks for secrets, Semgrep checks the source, Trivy scans the container, Syft produces the SBOM. The explain step is the one I care about most: scanner output is close to unreadable for most people, so this step turns it into plain language alongside a prompt you can paste back into your coding assistant to fix what was found.",
          "The pipeline runs on two models. A bigger one handles scaffolding, where the reasoning is hard, and a smaller, cheaper one writes the explanations, which are high volume. Splitting them kept costs sane.",
        ],
      },
      {
        title: "What I'm still figuring out",
        body: [
          "The pipeline shape is settled, and the part I'm still watching is the explanation layer. The four scanners produce findings of very different shapes. A leaked AWS key reads nothing like a vulnerable Python dependency, and the model translating them into plain language handles some of those shapes much better than others. Getting the weak cases up to the standard of the good ones is most of the work ahead.",
        ],
      },
    ],
    evidence: [
      {
        level: "built capability",
        label: "Inspectable pipeline",
        body: "Seven stages from GitHub to live URL, each producing an artifact instead of hiding the work behind a spinner.",
      },
      {
        level: "built capability",
        label: "Security explanations",
        body: "Gitleaks, Semgrep, Trivy, and Syft output, translated into plain language with a fix prompt for your coding assistant.",
      },
      {
        level: "still unproven",
        label: "Explanation quality",
        body: "Usefulness still varies across finding types, and the portfolio does not yet claim adoption or task-time results.",
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
        afterSection: 1,
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
        afterSection: 1,
        label: "Running pipeline",
        src: "/artifacts/velveteen-running-pipeline-trimmed.png",
        alt: "Velveteen running pipeline screen showing completed clone and scaffold stages, a pre-build security warning, and an active build step.",
        caption:
          "Mid-pipeline. Clone and scaffold are done, and the orange flag is a pre-build security finding the build has to answer for. The rest of the path stays in view instead of collapsing into a spinner.",
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
      "Prototyped a faster way to triage federal R&D opportunities; task time and source coverage still need validation.",
    status: "Prototype · validation in progress",
    scope: "iOS product and public-data pipeline",
    proof:
      "The prototype brings six decision signals into each feed row before a reader opens the government source.",
    role: "Product design",
    summary:
      "Federal R&D discovery often fails at the reading step: agency, deadline, phase, funding, and source state are buried across inconsistent government pages. I prototyped a feed that puts those signals before the source page. The interaction and fallback pipeline exist; the claimed time savings and dependable source coverage have not yet been validated.",
    sections: [
      {
        title: "The bottleneck was reading",
        body: [
          "From the outside, the SBIR landscape looks like a search problem, and I spent a while imagining better databases and smarter filters. But search isn't what slows people down. You open a topic page on sbir.gov, scroll past two paragraphs of background, hunt for the deadline, fail to find a funding range without clicking through, and by the third or fourth topic you've burned twenty minutes and still don't know what to focus on. The reading is the expensive part, so the call I made for v1 was to skip the database ambitions and build a faster read.",
        ],
      },
      {
        title: "A feed of signals",
        body: [
          "Each topic in the app is a signal: agency, deadline, phase, funding range, source status, and a plain summary, all readable in a row before you tap in. Those fields are what you need to decide whether a topic deserves another five minutes of your attention. If it does, you tap through to the full government page. If it doesn't, you keep scrolling, and the topic cost you a couple of seconds.",
          "Saved radars and the watchlist are the other half of the product. You set your criteria once (agency, keywords, phase) and the radar collects new matches as they appear, while watched topics come back up when their source state changes or a deadline gets close. I kept CRM and collaboration features out on purpose. v1 has to earn its keep as a reading tool before it asks anyone to log in or pay.",
        ],
      },
      {
        title: "The pipeline turned out to be a bigger problem than the app",
        body: [
          "The plan was for the public SBIR APIs to do the heavy lifting, and they couldn't. Coverage was inconsistent, fields shifted between sources, and a few endpoints stopped returning what they had been returning. I moved the pipeline toward HTML fallback parsing, with fixture-backed development so design work could keep going against real topic shapes even while a source misbehaved. The interface reflects that reality too, which is why source state sits alongside every topic. If the data is stale or partial, the app says so rather than pretending the source is fine.",
          "This was the part of the project I'd been most ready to skip, and it's now the part I think about most, because the app only reads as well as the pipeline feeding it.",
        ],
      },
    ],
    evidence: [
      {
        level: "built capability",
        label: "Triage feed",
        body: "Each topic shows agency, deadline, phase, funding range, source status, and a plain summary before the full page.",
      },
      {
        level: "built capability",
        label: "Fallback pipeline",
        body: "A normalized contract over public SBIR data, with HTML fallback for when the structured APIs go quiet.",
      },
      {
        level: "still unproven",
        label: "Triage improvement",
        body: "No task-time study, sustained source-coverage result, or usage evidence is presented yet.",
      },
    ],
    links: [],
    visuals: [
      {
        afterSection: 1,
        label: "Signals",
        src: "/artifacts/sbir-signals.png",
        alt: "SBIR Radar iPhone Signals tab showing searchable funding opportunities, filters, and deadline language.",
        caption:
          "Signals. Each row shows agency, deadline, phase, funding range, and source state before you commit to opening the full page.",
        width: 1206,
        height: 2622,
        layout: "phone",
      },
      {
        afterSection: 1,
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
        afterSection: 2,
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
    slug: "forge",
    title: "FORGE",
    eyebrow: "Service design at Rise8 · Space Force DevSecOps",
    year: "2026",
    outcome:
      "Gave five platform teams a shared seventeen-stage view of onboarding and exposed the handoffs turning a one-week goal into months.",
    status: "Delivered service design · portal remained a concept",
    scope: "Five internal teams, multiple contractors, seventeen stages",
    proof:
      "The service blueprint became the first shared end-to-end picture of tenant onboarding across the internal teams.",
    role: "Service design",
    summary:
      "FORGE is a Space Force ground systems platform that needed a real path to production for application teams. I joined the Rise8 engagement as the service designer. Most individual pieces worked; onboarding failed at the seams between teams and contractors. The blueprint and friction log created a shared operating picture. The portal remained a concept, and interface work alone did not remove the structural waits.",
    sections: [
      {
        title: "Mapping the journey before anything else",
        body: [
          "The first artifact I built was a service blueprint of the tenant journey end to end: seventeen phases from initial intake through production deployment, with four lanes per phase covering what the tenant was doing, what was visible to them, what was happening backstage, and which support systems were in play. Until the blueprint existed, the internal teams had been having the same onboarding conversations for months without realizing they were each describing different segments of the same path.",
          "I ran event storming sessions in parallel to map the operating flow on the inside. The Domain-Driven Design framing made the core issue legible: the platform depended on tacit knowledge at almost every transition point. Tenants couldn't navigate the system because the system, internally, was a chain of human handoffs that assumed everyone already knew how it worked.",
          "The work happened inside a multi-contractor reality. Several organizations shared responsibility for different parts of the platform with no shared tooling and no shared vocabulary. The blueprint became the first place anyone could point to and say, 'this phase belongs to your team, and here is where the handoff to mine is failing.'",
        ],
      },
      {
        title: "The friction log",
        body: [
          "Platform teams tend to hear tenant complaints as anecdotes, so I built a friction log that forced every documented pain point through four fields before it could be discussed in a meeting: owning team, UX impact severity, breakage risk, and rationale. 'A tenant complained about X' became 'this is a high-severity issue with breakage risk, owned by your team, and here is why.'",
          "The log also exposed repeating patterns that each lane had been treating as its own local problem: gaps in outage communication, unclear support ownership, undocumented ArgoCD expectations, Docker folder conventions that worked for the internal team and failed silently for tenants. Nearly all of it traced back to internal practices that had hardened into unspoken requirements for the people on the outside.",
        ],
      },
      {
        title: "The portal concept",
        body: [
          "By the time the portal concept came together, I knew the three questions tenants couldn't get answered: where am I in the process, who owns the next step, and what can I do right now without waiting on anyone. Status, ownership, and next action became the spine of the design, and every other piece of information sat in support of them.",
          "The services hub did the same job for the tools. GitLab, Nucleus, ArgoCD, JFrog Artifactory, Tracer, and SD Elements had all existed before; tenants found them through documentation and tribal knowledge, in that order. The hub put the full toolkit on one screen with each tool's access state next to it, and the platform stopped looking like six unrelated systems that happened to share users.",
          "None of this changed the platform's internal architecture. It changed how much of the platform's capability tenants could see and act on, and that gap was where the months were getting lost.",
        ],
      },
      {
        title: "What I'd do differently",
        body: [
          "The first thing I'd change is bringing tenant teams into the design work from week one. The internal retrospective on the engagement landed on the same point: client enablement started too late, and you build a handoff problem into the work when you don't include the people who'll own it after you leave. The friction log was a useful forcing function, but it came out of research on tenants rather than collaboration with them. Next time, a tenant team is in the room while the log is being built.",
          "The second is not assuming visibility alone shortens the timeline. A lot of what the blueprint exposed was structural: manual provisioning that runs serially across several tools and takes weeks, licensing constraints that block parallel work, compliance scoping that lands after a project is already underway. A portal can show you that you're waiting, but it can't make the wait shorter. The concept needed a companion roadmap for the automation work that would compress the timeline, and I'd start that piece much earlier in the engagement.",
        ],
      },
    ],
    evidence: [
      {
        level: "observed change",
        label: "Shared operating picture",
        body: "Seventeen phases across tenant action, visible touchpoint, backstage work, and support systems gave five teams one end-to-end view.",
      },
      {
        level: "observed change",
        label: "Prioritized friction",
        body: "Owner, UX severity, breakage risk, and rationale gave meetings a shared basis for ranking issues.",
      },
      {
        level: "concept",
        label: "Tenant portal",
        body: "A concept organized around status, ownership, and next action; the portfolio does not present it as shipped.",
      },
      {
        level: "still unproven",
        label: "Onboarding duration",
        body: "The work exposed structural delays but does not claim that the one-week target was reached or that months of waiting disappeared.",
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
        afterSection: 0,
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
        afterSection: 0,
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
        afterSection: 1,
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
        afterSection: 2,
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
        afterSection: 2,
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
      "Seams is where I write about moving from designing software to building it while the move is still in progress: awkward first projects, tools that push back, and design decisions that turn out to be implementation decisions.",
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

const displayOrder: WorkSlug[] = ["forge", "velveteen", "sbir-radar"];

export const displayWorkItems = displayOrder.map((slug) => {
  const item = getWorkBySlug(slug);

  if (!item) {
    throw new Error(`Missing work item for ${slug}`);
  }

  return item;
});

export function getNextWorkBySlug(slug: WorkSlug): WorkItem {
  const index = displayWorkItems.findIndex((item) => item.slug === slug);
  return displayWorkItems[(index + 1) % displayWorkItems.length];
}
