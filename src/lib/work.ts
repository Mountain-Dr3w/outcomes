export type WorkSlug = "velveteen" | "sbir-radar" | "missionos-core" | "seams";

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
  layout?: "wide" | "portrait";
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

export const workItems: WorkItem[] = [
  {
    slug: "velveteen",
    title: "Velveteen",
    eyebrow: "Product, infrastructure, security",
    year: "2026",
    outcome:
      "AI-built apps move from local experiment to live, scanned, shareable software.",
    vehicle:
      "A deployment platform that reads a GitHub repo, generates production scaffolding, runs security scanners, explains findings, and ships the app to a Velveteen URL.",
    role:
      "Founder, product designer, full-stack builder, infrastructure owner.",
    summary:
      "Velveteen exists for the moment after a useful app starts running locally. The builder has momentum, but production still asks the same questions: how does it run, what secrets does it need, what did the scanners find, and where can another person use it?",
    sections: [
      {
        label: "Situation",
        title: "A local app is not a launched product.",
        body: [
          "Coding tools made it easier for people to generate useful software. They did not make those people infrastructure operators. A repo could work on one laptop while still missing Docker, environment documentation, deployment standards, and any plain-language read on whether it was safe to share.",
          "Most deploy products start after those questions are already answered. Velveteen starts earlier, at the point where the builder has a GitHub repo and needs the product to become legible enough to ship.",
        ],
      },
      {
        label: "Intervention",
        title: "I turned deployment into a guided production review.",
        body: [
          "The product asks for a repo and a subdomain, then moves through a visible pipeline: clone, detect, scaffold, scan, explain, gate, deploy. Each stage produces an artifact the user can understand, not just a hidden build log.",
          "The generated Dockerfile, standards file, and environment guide make the project easier for the next coding session to continue. Scanner findings become short explanations and repair prompts instead of a wall of terminal output.",
        ],
      },
      {
        label: "Product shape",
        title: "The launch path teaches the standard.",
        body: [
          "I made the security pipeline the center of the product because launch without a fix path is theater. Gitleaks, Semgrep, Trivy, and Syft run before the public URL matters, and the UI keeps blocked states specific enough that a user can act.",
          "The system uses stronger reasoning for codebase scaffolding and lighter reasoning for scanner explanations, which keeps the pipeline economical without flattening the work into canned feedback.",
        ],
      },
      {
        label: "Outcome",
        title: "The question changes from can it run to what should change before it is shared.",
        body: [
          "Velveteen gives AI-built apps a repeatable path from repository to live URL. More importantly, it creates a record of what the app needs to be operated, reviewed, and handed back into the build loop.",
        ],
      },
    ],
    proof: [
      "Connected GitHub sign-in, repo selection, subdomain choice, deploy history, and live status screens into one launch flow.",
      "Built a seven-stage pipeline across clone, framework detection, scaffold, scan, explain, gate, and deploy.",
      "Paired a codebase-scaffolding model with a findings-explanation model so deep reasoning and high-volume interpretation stay separate.",
      "Ran Gitleaks, Semgrep, Trivy, and Syft so security checks shape the path to launch instead of sitting outside it.",
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
  },
  {
    slug: "sbir-radar",
    title: "SBIR Radar",
    eyebrow: "iOS, data pipeline, opportunity discovery",
    year: "2026",
    outcome:
      "Federal R&D opportunities become fast mobile triage instead of portal archaeology.",
    vehicle:
      "An iOS app and data pipeline that turn SBIR/STTR topics into searchable signals, deadlines, saved radars, and watchable opportunities.",
    role:
      "Product owner, iOS designer, SwiftUI builder, pipeline designer.",
    summary:
      "SBIR Radar came from a live search problem: federal R&D topics matter, but discovery happens across dense portals, stale links, acronyms, and deadline pressure. The app turns that crawl into a short mobile briefing.",
    sections: [
      {
        label: "Situation",
        title: "Good opportunities were buried in bad reading conditions.",
        body: [
          "SBIR and STTR topics can shape a company roadmap, but the discovery workflow asks founders to browse government portals like archivists. Topic pages mix agency language, shifting dates, inconsistent data, and long descriptions that rarely answer the first triage question: should I spend another hour on this?",
          "I was navigating the process myself and wanted the first version to serve that pressure honestly. It had to help someone scan, compare, save, and return without pretending the source material was cleaner than it is.",
        ],
      },
      {
        label: "Intervention",
        title: "I designed the app around triage, not database completeness.",
        body: [
          "The iOS experience treats each topic as a signal. A user can scan agency, deadline, phase, funding range, source status, and a plain summary before opening the full government page.",
          "Saved radars and watched opportunities create the loop: decide what matters, keep track of it, and come back when deadlines or source changes deserve attention.",
        ],
      },
      {
        label: "System",
        title: "The product needed a clean contract over messy sources.",
        body: [
          "The pipeline normalizes public topic data into a contract the app can trust. When structured APIs failed, the source strategy shifted toward HTML fallback, fixture-backed development, and source-health language in the interface.",
          "That choice kept the app moving while preserving honesty about the data. The product does not hide uncertainty; it shows the user what is known and where the official source still matters.",
        ],
      },
      {
        label: "Outcome",
        title: "Discovery becomes a repeatable scan instead of an occasional portal dive.",
        body: [
          "SBIR Radar gives a founder, operator, or grant writer a faster way to decide which opportunities deserve desk research. The first version favors useful reading and watchable intent over accounts, collaboration, or monetization.",
        ],
      },
    ],
    proof: [
      "Built an editorial iOS design system with feed rows, topic detail, deadline language, empty states, source-health labels, and snapshot coverage.",
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
    image: {
      src: "/artifacts/sbir-feed.png",
      alt: "SBIR Radar iOS feed snapshot showing a NASA SBIR opportunity and deadline.",
    },
  },
  {
    slug: "missionos-core",
    title: "MissionOS Core",
    eyebrow: "Service design, platform strategy, GovTech",
    year: "2026",
    outcome:
      "Delivery teams inherit a path to production instead of rebuilding one for each engagement.",
    vehicle:
      "A productized DevSecOps platform proof framed around environment standup, developer-led delivery, tenant onboarding, and reusable compliance.",
    role:
      "Service designer, acting product owner, artifact owner, stakeholder translator.",
    summary:
      "MissionOS Core translated a recurring platform bottleneck into a product-shaped proof. The work focused on the path a delivery team inherits before mission code can move with confidence: developer touchpoints, tenant setup, delivery mechanics, and compliance evidence.",
    sections: [
      {
        label: "Situation",
        title: "Teams were losing momentum before the mission product started.",
        body: [
          "Government software teams often inherit the hardest parts of delivery as bespoke setup work: environments, access, compliance artifacts, deployment paths, and the operating rules around all of them. Each team can solve those pieces, but solving them from scratch burns time before the actual mission product gets traction.",
          "I mapped the current-state developer path from pre-code through ongoing operations and marked which steps the platform should absorb, which steps a developer still owned, and which steps should disappear. That made the gap visible before the team argued about tools.",
        ],
      },
      {
        label: "Intervention",
        title: "I gave the proof four outcomes to organize around.",
        body: [
          "During an eight-week surge, I shaped the work around repeatable environment standup, developer-led delivery, time to first tenant deploy, and reusable compliance. Those outcomes gave leadership, engineering, and compliance a shared way to judge progress.",
          "The tenant-path artifact turned the target state into a simple operating promise: the tenant submits intake, pushes source code, and iterates; the platform provisions environments, runs the delivery path, scans the app, and regenerates evidence as the product changes.",
        ],
      },
      {
        label: "Tradeoffs",
        title: "A credible proof had to choose the smaller path first.",
        body: [
          "The target architecture needed room for stronger orchestration, but the surge window needed something teams could actually validate. We chose GitLab-native scaffolding for the proof and kept heavier platform moves as later hardening.",
          "Compliance evidence moved to the promotion gate, and tenant provisioning stayed separate from app onboarding. Those boundaries kept different operating events from collapsing into one overloaded workflow while the proof stayed honest about what it could demonstrate.",
        ],
      },
      {
        label: "Outcome",
        title: "The next owner inherited a product argument, not loose notes.",
        body: [
          "The work left behind a bounded proof with explicit claims, risks, and phase lines. It showed how a delivery team could inherit more of the path to production while keeping public claims disciplined and implementation choices traceable.",
        ],
      },
    ],
    proof: [
      "Led an eight-week internal proof from problem framing through demo contract, architecture decisions, and outcome tracking.",
      "Mapped current-state developer touchpoints across onboarding, repo setup, pipeline configuration, deployment, observability, and operations.",
      "Defined four planning outcomes that sequenced the work and kept platform value separate from tool preference.",
      "Authored architecture and decision artifacts that let the next product owner inherit context without relying on meeting memory.",
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
      "Frame the tenant path as a split of responsibilities instead of a feature list: what tenants still do, what the platform absorbs, and what no longer needs to exist.",
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
        body: "The slide separated what tenants do from what the platform handles, turning the proof into an operating model instead of a tool demo.",
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
    slug: "seams",
    title: "Seams",
    eyebrow: "Writing, positioning, project memory",
    year: "2026",
    outcome:
      "The designer-to-builder transition becomes visible while the work is still unfinished.",
    vehicle:
      "A writing site that documents technical decisions, design decisions, and the places where those become the same decision.",
    role:
      "Writer, editor, designer, builder.",
    summary:
      "Seams is the public notebook for the career transition I am making in real time. It documents what changes when design artifacts stop being only alignment tools and start helping software get built.",
    sections: [
      {
        label: "Situation",
        title: "The clean version of a transition usually arrives too late.",
        body: [
          "Designer-to-builder stories often get written after the uncertainty is gone. By then the useful parts disappear: the awkward first projects, the tools that pushed back, the moment a design decision became an implementation decision.",
          "I wanted a public record that kept those details while they still had texture. The writing needed to sound like work in progress, not a personal-brand recap.",
        ],
      },
      {
        label: "Intervention",
        title: "I built a quiet place for unfinished arguments.",
        body: [
          "Seams is a restrained MDX site for essays about building, product judgment, and artifacts written for both humans and models. The design keeps the surface sparse so each post can feel like a note from the workbench.",
          "The site also gives Velveteen and this portfolio a clearer source of language. Instead of inventing a polished story later, the writing records the arguments as they form.",
        ],
      },
      {
        label: "Practice",
        title: "The artifact became part of the operating system.",
        body: [
          "Writing changed how I made project docs. A useful artifact now has to help a teammate understand the choice and help a coding model continue the work without guessing.",
          "That raises the bar for specificity. Vague strategy language breaks faster when the next reader is a person trying to ship or a model trying to edit code.",
        ],
      },
      {
        label: "Outcome",
        title: "The transition has a memory while it is still moving.",
        body: [
          "Seams keeps the learning loop public. It captures the shift from shaping products at a distance to building the thing, watching it fail in specific ways, and improving the next artifact because of it.",
        ],
      },
    ],
    proof: [
      "Published essays on becoming a builder, process identity, and artifacts written for both humans and models.",
      "Built the site as a restrained MDX blog connected back to the Velveteen ecosystem.",
      "Used the writing to clarify the thesis behind Velveteen and the portfolio: closer loops produce better outcomes.",
      "Kept the voice specific to lived work, including the awkward parts of learning through shipped software.",
    ],
    constraints: [
      "The writing cannot sound like a launch essay or a generic personal brand page.",
      "The site needs to stay sparse enough that each post feels like a note from the workshop.",
      "The public story should capture work in progress without cleaning the story until it loses value.",
    ],
    decisions: [
      "Use a dark editorial surface, serif body type, and low-chrome navigation to keep attention on the argument.",
      "Treat artifacts as shared memory instead of process theater.",
      "Write before the story is finished so the useful mistakes remain visible.",
    ],
    artifacts: [
      {
        label: "Essay",
        title: "Becoming a builder",
        body: "The first post names the career shift from shaping work at a distance to building the thing and letting it push back.",
        meta: "April 2026",
      },
      {
        label: "Essay",
        title: "The artifacts changed",
        body: "Project docs now have two readers: teammates and models. That raises the standard for precision.",
        meta: "April 2026",
      },
      {
        label: "System",
        title: "Writing as operating memory",
        body: "The blog creates a public record of why design and implementation decisions moved together.",
        meta: "MDX, Next.js",
      },
    ],
    links: [
      { label: "Read Seams", href: "https://seams.velveteen.sh" },
      {
        label: "Becoming a builder",
        href: "https://seams.velveteen.sh/becoming-a-builder",
      },
    ],
  },
];

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return workItems.find((item) => item.slug === slug);
}
