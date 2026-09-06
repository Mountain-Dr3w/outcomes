import { emmyWork } from "./emmy-work";
import { legacyWorkItems } from "./legacy-work";

export type WorkSlug =
  | "jigsaw"
  | "emmys-milestones"
  | "veriflux"
  | "velveteen"
  | "sbir-radar"
  | "space-force-cloud-platform";
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
  takeaway?: string;
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
  chapter?: string;
  takeaway?: string;
  provenance?: string;
  metrics?: {
    value: string;
    label: string;
    context?: string;
  }[];
  cover?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    position?: string;
  };
  sections: WorkSection[];
  highlights: WorkHighlight[];
  links: WorkLink[];
  coverage?: { title: string; publisher: string; date: string; dateLabel: string; href: string; summary: string; }[];
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
    eyebrow: "Independent product / Deployment",
    year: "2026",
    outcome:
      "Getting an AI-built app from a working repo to a reviewed deployment.",
    status: "Live product",
    audience: "People deploying AI-built apps without an infrastructure team",
    result:
      "A running service that connects GitHub, prepares deployment files, and makes security findings part of the launch decision.",
    role: "Product design",
    summary:
      "Getting my own apps online kept turning into another project. The code ran locally; deployment still meant sorting out Docker, environment variables, and security findings. I designed Velveteen to bring that work into one review before launch.",
    chapter: "From repo to running service",
    takeaway:
      "The important interaction is the review before launch: a person can see a finding, understand it, and take it back to their coding tool.",
    provenance: "Independent product. Screens show a design refresh of the original setup and deployment workflows, using representative states from the working application. Launchpad is the example app shown in this design refresh.",
    cover: {
      src: "/artifacts/redesigned/velveteen-launchpad-build.png",
      alt: "Velveteen mobile deployment identifying Launchpad as the app, with build progress and a security finding awaiting review.",
      width: 390,
      height: 844,
    },
    sections: [
      {
        title: "Preparing the repository",
        body: [
          "A missing Dockerfile was a small problem on its own. It became harder when I also had dependencies I hadn't chosen, environment variables to account for, and no useful record of how to start the project again. Following separate hosting and security guides meant repeatedly reconstructing what the app needed.",
          "I made preparation part of deployment. Velveteen detects the project and creates the missing deployment files, including a Dockerfile and an environment guide. Those files stay with the repo, where the next person working on it can find them. That mattered to me because I was often that next person.",
        ],
      },
      {
        title: "Reviewing a deployment on mobile",
        body: [
          "Before launch, the review screen gathers the connected GitHub account, chosen repo, detected framework, and subdomain. I wanted someone to check the destination and the source together before starting work that takes time to run.",
          "For the mobile flow, I put the app name, current build, and security finding first. Finished and upcoming steps expand on demand. The review action stays within reach at the bottom of the screen, so checking a finding doesn't mean scrolling past the entire pipeline.",
        ],
      },
      {
        title: "Explaining security findings",
        body: [
          "I connected Gitleaks for exposed secrets, Semgrep for source-code issues, and Trivy for container vulnerabilities. Syft records the software inside the build. Running those tools was only part of the work: their output assumes the reader already knows how to investigate and repair what they find.",
          "Each finding gets a plain-language explanation and a prompt to take back to a coding assistant. I designed the review around understanding the issue and working on a fix before the app goes live.",
        ],
      },
      {
        title: "What still needs work",
        body: [
          "Velveteen now runs as a live service, from connecting a repository through deployment.",
          "The explanations are uneven. An exposed AWS key needs different guidance from a vulnerable Python dependency, and some findings are still easier to act on than others. I’m testing those cases and revising the prompts.",
        ],
      },
    ],
    highlights: [
      {
        label: "Designed, built, and operated",
        body: "I own the interface, application, and running service.",
      },
      {
        label: "Review before launch",
        body: "Security findings include an explanation and a prompt for working on a fix in a coding assistant.",
      },
    ],
    links: [
      { label: "Explore the design", href: "/studies/velveteen/review" },
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
        src: "/artifacts/redesigned/velveteen-launchpad-setup.png",
        alt: "Velveteen onboarding review screen showing connected GitHub, chosen repo, subdomain, detected framework, and launch action.",
        caption:
          "Mobile redesign: Launchpad is explicitly labeled as the app. Its repository, framework, and public address are visible before the Deploy Launchpad action.",
        width: 390,
        height: 844,
        layout: "phone",
      },
      {
        afterSection: 1,
        label: "Deployment in progress",
        src: "/artifacts/redesigned/velveteen-launchpad-build.png",
        alt: "Velveteen running pipeline screen showing completed clone and scaffold stages, a pre-build security warning, and an active build step.",
        caption:
          "Mobile redesign: the current build and security finding fit in the first view. Finished steps, upcoming steps, and deployment details expand below; security review stays at the bottom.",
        width: 390,
        height: 844,
        layout: "phone",
      },
    ],
  },
  {
    slug: "sbir-radar",
    title: "SBIR Radar",
    eyebrow: "iOS / Opportunity discovery",
    year: "2026",
    outcome:
      "Finding and following federal research funding.",
    status: "Working iOS prototype",
    audience: "Small teams looking for federal research and development funding",
    result:
      "An iOS prototype with an opportunity feed, saved searches, and visible source coverage.",
    role: "Product design",
    summary:
      "SBIR Radar is a personal project I designed to make federal research funding easier to explore. For a small team, finding a promising opportunity means sorting through long listings from different agencies, each presenting deadlines, funding, and eligibility differently. I built an iOS prototype for that first pass: compare the essentials, save a useful search, and decide which topics deserve a closer look.",
    chapter: "Find the work worth pursuing",
    takeaway:
      "The feed carries the information needed for a first pass, while source status tells the reader how much to rely on it.",
    provenance: "Personal project. Screens show a design refresh of the iOS prototype. Topics, deadlines, counts, and source states are representative samples, not live funding information.",
    cover: {
      src: "/artifacts/redesigned/sbir-compact-opportunities.png",
      alt: "Redesigned SBIR Radar feed with opportunity titles, deadlines, source attribution, and save controls.",
      width: 430,
      height: 932,
      position: "top",
    },
    sections: [
      {
        title: "Choosing what belongs in the feed",
        body: [
          "I started with search, then narrowed the design to what happens after the results arrive. A relevant title doesn't tell you whether the deadline is workable, whether the funding fits, or whether the topic is at the right phase. Those details can eliminate an opportunity before anyone needs to read the full brief.",
          "I put the agency, deadline, phase, and a short summary in each feed row. Keeping those fields in a consistent order lets the reader compare topics without opening and closing a series of government pages. Topic details retain the source reference and make missing funding information explicit.",
        ],
      },
      {
        title: "Saved searches and saved topics",
        body: [
          "Finding a useful topic once is only part of discovery. Agencies publish new work, source material changes, and deadlines approach. I separated a saved search, called a radar, from the watchlist of individual topics. A radar holds an agency, phase, or set of keywords; the watchlist holds the opportunities someone has already chosen to follow.",
          "My Radars shows saved searches and their match counts. The watchlist holds individual topics to revisit as deadlines approach. This version focuses on an individual search; it doesn’t include CRM or team collaboration.",
        ],
      },
      {
        title: "Showing gaps in the source data",
        body: [
          "The public APIs were inconsistent. Fields varied across sources and some endpoints stopped returning data. I added HTML parsing as a fallback, and kept local examples of real topics so a source outage wouldn't stop the design work. That let me continue building, but it also exposed a problem the app had to communicate.",
          "A well-formatted feed can make incomplete data look dependable. I brought source status into the topic rows and added coverage and last-sync information to Settings. The reader needs to know when a result is stale or a source is unavailable before treating the feed as a complete picture of the available work.",
        ],
      },
      {
        title: "The next test is a real funding search",
        body: [
          "The working prototype brings the feed, saved radars, and source status into one app. It demonstrates the interaction and the data handling; I haven't measured whether it improves how teams choose opportunities.",
          "I want to test it with someone doing a real funding search: which details still send them to the government page, and do they notice when a source is out of date?",
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
        label: "Source coverage",
        body: "The app says when public data is stale or incomplete instead of presenting every topic as current.",
      },
    ],
    links: [{ label: "Explore the design", href: "/studies/sbir-radar/opportunities" }],
    visuals: [
      {
        afterSection: 1,
        label: "Opportunities",
        src: "/artifacts/redesigned/sbir-compact-opportunities.png",
        alt: "Refreshed SBIR Radar opportunity feed with readable topic summaries, deadlines, source labels, and saved-topic controls.",
        caption:
          "Refreshed design: deadlines sit beside the agency, while source and phase stay below each summary. A coverage warning links to disconnected sources.",
        width: 430,
        height: 932,
        layout: "phone",
      },
      {
        afterSection: 1,
        label: "My Radars",
        src: "/artifacts/redesigned/sbir-compact-radars.png",
        alt: "Refreshed SBIR Radar saved searches with agency, phase, keywords, and sample match counts.",
        caption:
          "Refreshed design: each saved search shows its criteria and match count. Opening one filters the opportunity feed; individual topics are saved separately.",
        width: 430,
        height: 932,
        layout: "phone",
      },
      {
        afterSection: 2,
        label: "Source coverage",
        src: "/artifacts/redesigned/sbir-compact-sources.png",
        alt: "Refreshed SBIR Radar source coverage with connected and disconnected feeds, last sync, and notification controls.",
        caption:
          "Refreshed design: incomplete coverage is stated above the source list. The two disconnected feeds remain visible, rather than disappearing from the list.",
        width: 430,
        height: 932,
        layout: "phone",
      },
    ],
  },
  {
    slug: "space-force-cloud-platform",
    title: "Space Force Cloud Platform",
    eyebrow: "Rise8 · service design for a USSF cloud platform",
    year: "2026",
    outcome:
      "From months of onboarding to a first deployment in 4.5 days.",
    status: "Delivered service design + onboarding portal",
    audience: "Application teams onboarding to a USSF cloud platform",
    result:
      "Eight application teams onboarded; self-service onboarding reached 90% and onboarding support tickets fell by 80%.",
    role: "Service design",
    summary:
      "This cloud platform was meant to speed up software delivery, but application teams could wait months to reach their first deployment. I owned the onboarding design at Rise8, working across five internal teams to find where people stalled and design a path they could follow without repeatedly asking for help.",
    chapter: "Who owns the next step?",
    takeaway:
      "Named owners, visible readiness, and clear next actions helped 90% of teams complete onboarding without a support handoff.",
    provenance:
      "Client work at Rise8. The platform name and identifying details are generalized. Portal screens are a design refresh using a representative team; the service blueprint, event storm, and friction log are original artifacts.",
    metrics: [
      {
        value: "4.5 days",
        label: "Onboarding to first deployment",
        context: "Down from months",
      },
      {
        value: "90%",
        label: "Self-service onboarding",
        context: "Up from 6–7%",
      },
      {
        value: "80%",
        label: "Fewer onboarding support tickets",
      },
    ],
    cover: {
      src: "/artifacts/redesigned/space-force-workspace-readiness.png",
      alt: "Redesigned onboarding portal showing the Phoenix team at the approved stage, its next step, and its request record.",
      width: 1440,
      height: 1000,
    },
    sections: [
      {
        title: "Mapping 17 steps across five teams",
        body: [
          "Each internal team could explain its part of onboarding. An application team had to get through all of them, across contractors that didn't share the same tools or vocabulary. Nobody had a complete view of what that team was being asked to do, or what happened while it waited.",
          "I built a service blueprint covering 17 steps. For each one, I put the application team's action beside the touchpoint it could see, the internal work it couldn't, and the systems supporting it. Event-storming sessions with the platform teams helped fill in the dependencies. Putting the sequence on one map exposed handoffs that had previously relied on someone knowing who to call.",
        ],
      },
      {
        title: "Finding the undocumented setup rules",
        body: [
          "One pipeline expected Docker files in a folder named after the image. That convention wasn't documented, so a new team could fail a build without knowing what it had done wrong. Teams also copied existing ArgoCD repo structures as examples; when an example was wrong, they inherited its mistakes. These were specific, repeatable causes of rework.",
          "I recorded each issue with an owning team, its effect on the application team, what could break, and a rationale for its priority. The same log covered outage communication and unclear support ownership. It gave the five teams a way to compare problems in a meeting and assign the work, instead of treating each complaint as an isolated support request.",
        ],
      },
      {
        title: "Designing the onboarding portal",
        body: [
          "The portal followed three questions application teams couldn't get answered: where am I in the process, who owns the next step, and what can I do right now? The service blueprint established ownership across the teams. In the portal, a readiness score and completed and pending stages made progress visible without a status meeting.",
          "The services view brought the platform's six development tools, including GitLab and ArgoCD, into one place. This addressed another recurring support question: which tools are part of the platform? In the refreshed screens below, I kept the current onboarding stage separate from the service catalog so browsing a tool couldn't be mistaken for having access to it.",
        ],
      },
      {
        title: "First deployment in 4.5 days",
        body: [
          "Eight application teams went through the revised onboarding. Time from onboarding to first deployment fell from months to 4.5 days, beating the original one-week target. Self-service completion rose from 6–7% to 90%, and onboarding support tickets fell by 80%.",
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
        label: "Self-service onboarding",
        body: "The portal showed teams their readiness, the owner of the next step, and the action they could take now.",
      },
    ],
    links: [{ label: "Explore the design", href: "/studies/space-force/readiness" }],
    visuals: [
      {
        afterSection: 0,
        label: "Service blueprint",
        src: "/artifacts/space-force-cloud-platform-service-blueprint.png",
        alt: "Space Force Cloud Platform service blueprint mapping the application team's journey across onboarding steps, internal work, support systems, and recurring problems.",
        caption:
          "The map covers 17 onboarding steps. Each step shows what the application team does, what they can see, what happens inside the platform team, and which systems are involved.",
        width: 1624,
        height: 969,
        layout: "landscape",
      },
      {
        afterSection: 0,
        label: "Event storm",
        src: "/artifacts/space-force-cloud-platform-event-storm.png",
        alt: "Space Force Cloud Platform event-storming board showing commands, events, decisions, and problem areas across the internal workflow.",
        caption:
          "The event-storming sessions showed where onboarding depended on an unwritten rule or on someone knowing who to call next.",
        width: 2188,
        height: 718,
        layout: "wide",
      },
      {
        afterSection: 1,
        label: "Friction log",
        src: "/artifacts/space-force-cloud-platform-problem-log.png",
        alt: "Space Force Cloud Platform problem log organizing onboarding issues by owner, effect on application teams, risk, and rationale.",
        caption:
          "Each row names an onboarding problem, the team that owns it, its effect on the application team, and the risk of leaving it unfixed.",
        width: 1708,
        height: 921,
        layout: "landscape",
      },
      {
        afterSection: 2,
        label: "Onboarding readiness",
        src: "/artifacts/redesigned/space-force-workspace-readiness.png",
        alt: "Refreshed Space Force Cloud Platform readiness screen with five onboarding stages, approval details, and the Phoenix request record.",
        caption:
          "Refreshed design: the current status leads the page, beside a five-step onboarding sequence. Phoenix is approved, but its environment is not active. The request record opens below.",
        width: 1440,
        height: 1000,
        layout: "landscape",
      },
      {
        afterSection: 2,
        label: "Services hub",
        src: "/artifacts/redesigned/space-force-workspace-services.png",
        alt: "Refreshed Space Force Cloud Platform catalog showing six development tools, category filters, search, and selected-service details.",
        caption:
          "Refreshed design: a searchable list replaces the tool grid. Selecting a service explains its purpose; catalog availability does not imply that the team has access.",
        width: 1440,
        height: 1000,
        layout: "landscape",
      },
    ],
  },
  emmyWork,
  ...legacyWorkItems,
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

const displayOrder: WorkSlug[] = [
  "jigsaw",
  "space-force-cloud-platform",
  "emmys-milestones",
  "velveteen",
  "veriflux",
  "sbir-radar",
];

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
