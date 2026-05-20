export type WorkSlug = "velveteen" | "sbir-radar" | "missionos-core";

export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkArtifact {
  label: string;
  title: string;
  body: string;
  meta?: string;
}

export interface WorkSection {
  label: string;
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
  layout?: "wide" | "portrait" | "phone";
}

export interface WorkItem {
  slug: WorkSlug;
  title: string;
  eyebrow: string;
  year: string;
  outcome: string;
  vehicle: string;
  role: string;
  summary: string;
  sections: WorkSection[];
  proof: string[];
  constraints: string[];
  decisions: string[];
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
      "AI-built apps move from 'works on my laptop' to a live, scanned URL without the infrastructure team you'd usually need.",
    vehicle:
      "You connect a GitHub repo and pick a subdomain. Velveteen figures out the framework, generates the infra files you're missing, runs a security pipeline, explains what it finds, and ships the app to a live URL.",
    role:
      "Founder, product designer, full-stack builder, infrastructure owner.",
    summary:
      "Velveteen exists for the awkward moment right after a useful app starts running locally. You've got momentum, but production still asks the same questions: how does it run, what secrets does it need, what did the scanners find, and where can someone else actually use it?",
    sections: [
      {
        label: "the gap",
        title: "A local app still needs a launch path.",
        body: [
          "AI coding tools got good enough that a lot more people can build working software. They didn't make those same people into infrastructure operators. A repo can work on one laptop while still missing Docker, env docs, deploy standards, and any plain-language read on whether it's even safe to share.",
          "Most deploy products start after those questions are already answered. Velveteen starts earlier, when you've got a GitHub repo and need it to become legible enough to ship.",
        ],
      },
      {
        label: "what i built",
        title: "Deployment starts with production review.",
        body: [
          "The product asks for a repo and a subdomain, then walks through a visible pipeline: clone, detect, scaffold, scan, explain, gate, deploy. Each stage produces a readable artifact.",
          "The generated Dockerfile, standards file, and env guide leave the project easier to pick back up next time you sit down with it. Scanner findings come back as short explanations and prompts you can paste straight into your coding tool.",
        ],
      },
      {
        label: "where the weight goes",
        title: "The security pipeline is the point.",
        body: [
          "I put the security pipeline at the center of the product because deployment without a fix path is theater. Gitleaks, Semgrep, Trivy, and Syft run before the public URL matters, and the UI keeps blocked states specific enough that you actually know what to do next.",
          "Under the hood, heavier reasoning runs on codebase scaffolding and lighter reasoning handles scanner explanations. That keeps the pipeline cheap to run without flattening everything into canned-feedback noise.",
        ],
      },
      {
        label: "where it lands",
        title: "The question changes from 'can it run' to 'what should change before I share it.'",
        body: [
          "Velveteen gives AI-built apps a repeatable path from repo to live URL. More than that, it leaves a record of what the app actually needs to be operated, reviewed, and handed back into the next coding session.",
        ],
      },
    ],
    proof: [
      "Connected GitHub sign-in, repo selection, subdomain choice, deploy history, and live status screens into one launch flow.",
      "Built a seven-stage pipeline across clone, framework detection, scaffold, scan, explain, gate, and deploy.",
      "Paired a codebase-scaffolding model with a findings-explanation model so deep reasoning and high-volume interpretation stay separate.",
      "Ran Gitleaks, Semgrep, Trivy, and Syft so security checks shape the path to launch.",
    ],
    constraints: [
      "The user may lack Docker, TLS, scanner output, or environment variable context.",
      "Every blocking state needs a next action the user can hand back to their coding tool.",
      "The first version has to stay small enough to run on lean infrastructure and expose real deployment behavior.",
    ],
    decisions: [
      "Make the security pipeline the product edge. Deployment alone leaves the user without a fix path.",
      "Use one Next.js app, a worker, Postgres, Docker, and Caddy before introducing orchestration.",
      "Generate standards and environment docs beside the Dockerfile so the project becomes easier for the next coding session to read.",
    ],
    artifacts: [
      {
        label: "Pipeline",
        title: "Seven stages, one launch decision",
        body: "The status page turns infrastructure work into visible progress: clone, detect, scaffold, scan, explain, gate, deploy.",
        meta: "GitHub to live URL",
      },
      {
        label: "Security",
        title: "Findings become fix prompts",
        body: "Scanner output becomes plain English plus a prompt the user can paste into their coding assistant.",
        meta: "Gitleaks, Semgrep, Trivy, Syft",
      },
      {
        label: "Scaffold",
        title: "The repo learns how to run",
        body: "Generated Dockerfiles, standards, and env docs make the project legible before it goes live.",
        meta: "Next.js, Drizzle, graphile-worker",
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
        src: "/artifacts/velveteen-onboarding-review.png",
        alt: "Velveteen onboarding review screen showing connected GitHub, chosen repo, subdomain, detected framework, and launch action.",
        caption:
          "The launch review collapses GitHub connection, repo selection, framework detection, and subdomain choice into one confirmation step.",
        width: 760,
        height: 760,
        layout: "wide",
      },
      {
        label: "Running pipeline",
        src: "/artifacts/velveteen-running-pipeline.png",
        alt: "Velveteen running pipeline screen showing completed clone and scaffold stages, a pre-build security warning, and an active build step.",
        caption:
          "The status screen turns infrastructure into visible progress: scaffold complete, security finding noted, build running, deploy path still in view.",
        width: 760,
        height: 620,
        layout: "wide",
      },
    ],
  },
  {
    slug: "sbir-radar",
    title: "SBIR Radar",
    eyebrow: "iOS, data pipeline, opportunity discovery",
    year: "2026",
    outcome:
      "Federal R&D opportunities become a fast mobile scan that replaces an afternoon in government portals.",
    vehicle:
      "An iOS app and data pipeline that turn SBIR and STTR topics into searchable signals: agency, deadline, funding range, and a plain summary you can read in line at a coffee shop.",
    role:
      "Product owner, iOS designer, SwiftUI builder, pipeline designer.",
    summary:
      "SBIR Radar came out of a real search problem I was running into myself. Federal R&D topics matter, but discovery happens across dense portals, stale links, agency acronyms, and deadline pressure. The app turns that crawl into a short mobile briefing.",
    sections: [
      {
        label: "the wall",
        title: "Good opportunities were buried in bad reading conditions.",
        body: [
          "SBIR and STTR topics can shape a company's roadmap, but the discovery workflow asks founders to browse government portals like archivists. Topic pages mix agency language, shifting dates, inconsistent data, and long descriptions that rarely answer the first triage question: should I spend another hour on this?",
          "I was running this process myself and wanted the first version to serve that pressure honestly. It had to help me scan, compare, save, and return without pretending the source material was cleaner than it actually is.",
        ],
      },
      {
        label: "what i built",
        title: "I designed the app around triage, not database completeness.",
        body: [
          "The iOS experience treats each topic as a signal. You can scan agency, deadline, phase, funding range, source status, and a plain summary before opening the full government page.",
          "Saved radars and watched opportunities close the loop: decide what matters, keep track of it, and come back when deadlines or source changes actually deserve attention.",
        ],
      },
      {
        label: "the contract",
        title: "The product needed a clean contract over messy sources.",
        body: [
          "The pipeline normalizes public topic data into a contract the app can trust. When structured APIs failed, the source strategy shifted toward HTML fallback, fixture-backed development, and source-health language in the interface.",
          "That choice kept the app moving while staying honest about the data. The product tells you what's known and where the official source still matters.",
        ],
      },
      {
        label: "where it lands",
        title: "Discovery becomes a repeatable scan.",
        body: [
          "SBIR Radar gives a founder, operator, or grant writer a faster way to decide which opportunities deserve desk research. The first version favors useful reading and watchable intent over accounts, collaboration, or monetization.",
        ],
      },
    ],
    proof: [
      "Built an editorial iOS design system with feed rows, topic detail, deadline language, empty states, source-health labels, and snapshot coverage.",
      "Redesigned the app around four native tabs: Signals, My Radars, Watchlist, and Settings.",
      "Modeled topics across pipeline, backend, and iOS so source changes can flow into the app without hand cleanup.",
      "Shipped a fixture-backed app foundation with real topics while external deployment credentials remained outside the product work.",
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
        label: "Watchlist",
        src: "/artifacts/sbir-watchlist.png",
        alt: "SBIR Radar iPhone Watchlist tab showing an empty state for starred opportunities.",
        caption:
          "The watchlist keeps pursuit candidates separate from broad discovery.",
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
      "Government delivery teams inherit a working path to production before each engagement rebuilds one by hand.",
    vehicle:
      "An eight-week internal proof for a DevSecOps platform, built around the four things teams keep reinventing: environment standup, developer-led delivery, tenant onboarding, and reusable compliance.",
    role:
      "Service designer, acting product owner, artifact owner, stakeholder translator.",
    summary:
      "MissionOS Core was an eight-week internal proof against a recurring problem I'd watched a lot of teams hit: government delivery teams keep rebuilding the same setup work, including environments, access, compliance artifacts, and deployment paths, before anyone can write a line of mission code. The work mapped that path and showed how a platform could absorb most of it.",
    sections: [
      {
        label: "what was happening",
        title: "Teams were losing momentum before the mission product even started.",
        body: [
          "Government software teams often inherit the hardest parts of delivery as bespoke setup work: environments, access, compliance artifacts, deployment paths, and the operating rules around all of them. Each team can solve those pieces, but solving them from scratch every time burns weeks before the actual mission product gets any traction.",
          "I mapped the current-state developer path from pre-code through ongoing operations and marked which steps the platform should absorb, which steps a developer still owned, and which steps should disappear. That made the gap visible before the team could fall into arguing about tools.",
        ],
      },
      {
        label: "what i shaped",
        title: "I gave the proof four things to organize around.",
        body: [
          "During the eight-week surge, I shaped the work around repeatable environment standup, developer-led delivery, time to first tenant deploy, and reusable compliance. Those four gave leadership, engineering, and compliance a shared way to judge whether the work was moving.",
          "The tenant-path artifact turned the target state into a simple operating promise: the tenant submits intake, pushes source code, and iterates; the platform provisions environments, runs the delivery path, scans the app, and regenerates evidence as the product changes.",
        ],
      },
      {
        label: "tradeoffs",
        title: "A credible proof had to choose the smaller path first.",
        body: [
          "The target architecture had room for stronger orchestration, but the surge window needed something teams could actually validate. We chose GitLab-native scaffolding for the proof and held heavier platform moves for later hardening.",
          "Compliance evidence moved to the promotion gate, and tenant provisioning stayed separate from app onboarding. Those boundaries kept different operating events from collapsing into one overloaded workflow while the proof stayed honest about what it could actually demonstrate.",
        ],
      },
      {
        label: "what got left behind",
        title: "The next owner inherited something they could actually build on.",
        body: [
          "The work left behind a bounded proof with explicit claims, risks, and phase lines. It showed how a delivery team could inherit more of the path to production while keeping public claims disciplined and the implementation choices traceable.",
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
