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

export interface WorkHighlight {
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
  audience: string;
  result: string;
  role: WorkRole;
  summary: string;
  sections: WorkSection[];
  highlights: WorkHighlight[];
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
      "Velveteen takes a GitHub repo, checks it for common security problems, and gives you a chance to fix them before it deploys.",
    status: "Live product",
    audience: "People deploying AI-built apps without an infrastructure team",
    result:
      "A user can connect a repo, review security problems, and deploy from one place.",
    role: "Product design + full-stack build",
    summary:
      "AI coding tools can get an app working locally without helping with the work that comes next: deployment files, secrets, vulnerable dependencies, and a safe path online. I built Velveteen to put those steps in one place. I designed the product, wrote the application, and run the service.",
    sections: [
      {
        title: "A working app was only half the job",
        body: [
          "AI coding tools can get someone to a working app without teaching them how to run it. That was my situation: the repo worked on my laptop, but secrets were in the wrong places, dependencies were hard to account for, and there was no reliable way to bring it back later. The next step was scattered across Docker documentation, security tools, and hosting guides. I built Velveteen to put that work in one place.",
        ],
      },
      {
        title: "Show problems before anything goes live",
        body: [
          "Most deployment products hide the infrastructure work. Velveteen shows each step and pauses when it finds a problem, before the app is deployed.",
          "It creates the missing deployment files, then runs four checks: Gitleaks for secrets, Semgrep for source-code issues, Trivy for container problems, and Syft for a software bill of materials. Raw scanner output is difficult to read, so Velveteen explains each finding in plain language and creates a prompt the user can paste into a coding assistant to fix it.",
          "A larger model writes the deployment files. A smaller model explains the higher-volume scanner results. That split keeps the service affordable to run.",
        ],
      },
      {
        title: "What I'm improving",
        body: [
          "The four security tools report problems in very different ways. A leaked AWS key looks nothing like a vulnerable Python dependency, and some explanations are clearer than others. I am testing those weaker cases and improving the prompts that handle them.",
        ],
      },
    ],
    highlights: [
      {
        label: "One place to deploy",
        body: "Connect a GitHub repo, create the missing deployment files, review problems, and deploy without moving between separate tools.",
      },
      {
        label: "Problems people can act on",
        body: "Velveteen turns output from four security tools into a plain explanation and a prompt for fixing the problem.",
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
        label: "Deployment in progress",
        src: "/artifacts/velveteen-running-pipeline-trimmed.png",
        alt: "Velveteen running pipeline screen showing completed clone and scaffold stages, a pre-build security warning, and an active build step.",
        caption:
          "The repo and deployment files are ready. The orange flag marks a security problem that must be reviewed before the app can go live. The remaining steps stay visible while the work runs.",
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
      "SBIR Radar puts the deadline, funding range, phase, and agency in the feed, so people can skip opportunities that are not a fit without opening every page.",
    status: "Working iOS prototype",
    audience: "Small teams looking for federal research and development funding",
    result:
      "In the prototype, readers can rule opportunities in or out from the feed and save searches they want to watch.",
    role: "Product design",
    summary:
      "People looking for federal research and development work have to open long government pages just to find the deadline, funding range, phase, or agency. SBIR Radar puts those basics in a mobile feed and lets people save the searches they care about. I built the iOS prototype and the data service behind it.",
    sections: [
      {
        title: "The slow part was opening every result",
        body: [
          "At first I treated SBIR discovery as a search problem. It was not. Search returns plenty of topics; the slow part is opening each government page and hunting for the deadline, funding range, phase, and agency. After three or four pages, a person can spend twenty minutes and still not know which opportunity deserves attention. I narrowed the first version to that decision.",
        ],
      },
      {
        title: "Put the basics in the feed",
        body: [
          "Each row shows the agency, deadline, phase, funding range, source status, and a short summary. That is enough to decide whether to open the full government page or keep scrolling.",
          "A saved radar watches an agency, phase, or set of keywords for new matches. The watchlist brings a topic back when its source changes or a deadline gets close. I left out CRM and collaboration features because the first version only needs to help one person find and revisit relevant work.",
        ],
      },
      {
        title: "The public data was unreliable",
        body: [
          "The public SBIR APIs did not provide dependable coverage. Fields changed between sources, and some endpoints stopped returning data. I added HTML parsing as a fallback and kept local examples of real topics so I could continue designing when a source was down.",
          "The app shows the source status next to each topic. If the data is stale or incomplete, the reader can see that before relying on it.",
        ],
      },
    ],
    highlights: [
      {
        label: "Opportunity feed",
        body: "Each topic shows the details a reader needs before deciding to open the government page.",
      },
      {
        label: "Saved radars",
        body: "A reader can save an agency, phase, or set of keywords and return when new topics match.",
      },
      {
        label: "Honest source status",
        body: "The app says when public data is stale or incomplete instead of presenting every topic as current.",
      },
    ],
    links: [],
    visuals: [
      {
        afterSection: 1,
        label: "Opportunities",
        src: "/artifacts/sbir-signals.png",
        alt: "SBIR Radar iPhone Signals tab showing searchable funding opportunities, filters, and deadline language.",
        caption:
          "Each row shows the agency, deadline, phase, funding range, and source status before the reader opens the full page.",
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
          "Each radar is a saved agency, phase, or set of keywords, with a count of new opportunities that match.",
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
          "The app shows when its public sources last updated and whether any are unavailable. Notification settings sit below that status.",
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
      "I mapped the full onboarding process so five platform teams could see why application teams were waiting months to reach production and who owned each delay.",
    status: "Client work at Rise8",
    audience: "Application teams onboarding to a Space Force software platform",
    result:
      "Five internal teams got their first shared map of the full onboarding process and a ranked list of the problems to fix.",
    role: "Service design",
    summary:
      "Application teams were supposed to reach production on FORGE in a week. Some waited months, moving between internal teams and contractors without knowing who owned the next step. As the service designer, I mapped the 17-step process, documented the recurring problems, and designed a portal concept around three questions: where am I, who owns this, and what can I do now? The map and problem log were delivered. The portal was not built.",
    sections: [
      {
        title: "Put the whole process on one page",
        body: [
          "I mapped 17 steps from the first intake conversation through production deployment. For each step, the map showed what the application team did, what they could see, what happened inside the platform team, and which systems were involved. Before that map existed, internal teams were describing different parts of onboarding as if each part were the whole process.",
          "I also ran event-storming sessions with the internal teams. They showed how often onboarding depended on someone remembering an unwritten rule or knowing who to call next.",
          "Several contractors shared responsibility but not tools or vocabulary. The map gave them a concrete way to identify the owner of each step and the handoffs that were failing.",
        ],
      },
      {
        title: "Turn complaints into a list teams could act on",
        body: [
          "Tenant complaints were easy to dismiss as one-off stories. I logged each problem with an owner, its effect on the application team, the risk of leaving it unfixed, and the reason it mattered. That gave meetings a common way to decide what needed attention first.",
          "The same problems kept appearing across teams: poor outage communication, unclear support ownership, undocumented ArgoCD requirements, and Docker conventions that failed without telling the application team why. What looked like separate complaints often came from an internal rule that had never been explained outside the platform team.",
        ],
      },
      {
        title: "Show teams where they are and what to do next",
        body: [
          "The portal concept answered three questions application teams kept asking: where am I in the process, who owns the next step, and what can I do now without waiting? The design put status, ownership, and the next action first.",
          "A second screen put GitLab, Nucleus, ArgoCD, JFrog Artifactory, Tracer, and SD Elements in one place and showed whether the team had access to each tool. Before that, people had to search documentation or ask someone which tools were available to them.",
          "The concept could make the process easier to follow, but it could not remove manual provisioning, licensing delays, or late compliance work. Those problems needed changes to the platform itself.",
        ],
      },
      {
        title: "What I'd do differently",
        body: [
          "I would bring application teams into the design work from the first week. The problem list came from research with them, but they were not in the room when internal teams decided how to respond. That made the eventual handoff harder than it needed to be.",
          "I would also start the automation roadmap earlier. A portal can explain a wait, but it cannot shorten manual provisioning, resolve licensing constraints, or move compliance work earlier. Those changes had to happen alongside the interface work.",
        ],
      },
    ],
    highlights: [
      {
        label: "One shared process",
        body: "Five internal teams could see all 17 onboarding steps, the owner of each step, and the handoffs between them.",
      },
      {
        label: "A ranked problem list",
        body: "Teams could compare onboarding problems by owner, effect on the application team, and the risk of leaving them unfixed.",
      },
      {
        label: "A portal concept",
        body: "The unbuilt concept showed application teams their status, the owner of the next step, and what they could do without waiting.",
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
          "The map covers 17 onboarding steps. Each step shows what the application team does, what they can see, what happens inside the platform team, and which systems are involved.",
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
          "The event-storming sessions showed where onboarding depended on an unwritten rule or on someone knowing who to call next.",
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
          "Each row names an onboarding problem, the team that owns it, its effect on the application team, and the risk of leaving it unfixed.",
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
          "The unbuilt portal concept shows the current review, the team handling it, progress through onboarding, and any action the application team can take next.",
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
          "The unbuilt services concept puts six platform tools on one screen and shows whether the application team has access to each one.",
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
