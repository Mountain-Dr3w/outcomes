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

export interface WorkItem {
  slug: WorkSlug;
  title: string;
  eyebrow: string;
  year: string;
  outcome: string;
  vehicle: string;
  role: string;
  summary: string;
  proof: string[];
  constraints: string[];
  decisions: string[];
  artifacts: WorkArtifact[];
  links: WorkLink[];
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
      "Velveteen targets the last-mile problem for people who can build useful software with coding tools but cannot judge whether the result is safe to launch.",
    proof: [
      "Connected GitHub sign-in, repo selection, subdomain choice, deploy history, and live status screens.",
      "Built a seven-stage pipeline across clone, framework detection, scaffold, scan, explain, gate, and deploy.",
      "Paired Sonnet for codebase scaffolding with Haiku for finding explanations to keep reasoning and volume work separate.",
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
      "SBIR Radar reduces the time between checking for new funding topics and deciding which ones deserve desk research.",
    proof: [
      "Built an editorial iOS design system with feed rows, topic detail, deadline language, empty states, and snapshot coverage.",
      "Modeled topics across pipeline, backend, and iOS so source changes can flow into the app without hand cleanup.",
      "Shipped a fixture-backed app foundation with real topics while backend deployment waits on external credentials.",
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
      "MissionOS Core turned a recurring infrastructure bottleneck into a time-boxed product experiment with explicit claims, risks, and phase boundaries.",
    proof: [
      "Led an eight-week internal proof from problem framing through demo contract, architecture decisions, and outcome tracking.",
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
    ],
    artifacts: [
      {
        label: "Outcomes",
        title: "Four outcomes became the planning spine",
        body: "Repeatable environment standup, developer-led delivery, time to first tenant deploy, and reusable compliance carried the work.",
        meta: "Public-safe summary",
      },
      {
        label: "ADR",
        title: "Target architecture met surge reality",
        body: "The architecture document recorded what the platform should become and which parts the proof had to validate first.",
        meta: "Phase boundaries",
      },
      {
        label: "Demo contract",
        title: "The proof bounded its claims",
        body: "Demo framing separated internal evidence from external claims so the team could move without inflating the result.",
        meta: "Claim control",
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
      "Seams gives the product work a public memory. It records what changed when design artifacts began serving humans and coding agents.",
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
