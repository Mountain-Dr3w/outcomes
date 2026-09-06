import type { WorkItem } from "./work";

export const crewWork: WorkItem = {
  slug: "isr-crew",
  title: "The Black Pearl",
  eyebrow: "USAF / Analyst workspace",
  year: "",
  outcome: "From a document full of links to a four-minute start to the mission.",
  status: "Case study",
  audience: "Air Force ISR analysts",
  result: "Time-to-on-mission fell from roughly 45 minutes to about 4.",
  role: "Product design",
  summary: "An analyst’s day started with a Word document full of hyperlinks. We brought that starting point into a web app, giving the crew one place to get oriented, track work, and reach their tools.",
  overview: {
    problem: "Analysts spent roughly 45 minutes getting oriented and into the tools they needed before they could get on mission.",
    solution: "A crew page brings shift context, requests, tasks, and tool access into one workspace.",
    impact: "Time-to-on-mission dropped to about 4 minutes."
  },
  metrics: [
    { label: "Before", value: "~45 min", context: "Time-to-on-mission" },
    { label: "After", value: "~4 min", context: "Time-to-on-mission" },
    { label: "Time returned", value: "~41 min", context: "Per start, based on the reported before-and-after times" }
  ],
  cover: { src: "/artifacts/redesigned/black-pearl-shift-current.png", alt: "The Black Pearl with shift context, the next task and its map, and a tools table.", width: 1440, height: 1000 },
  sections: [
    { title: "The work before the work", body: [
      "Before an analyst could begin, they had to get their working environment together. The starting point was a Word document containing hyperlinks. It provided access to the pieces of the job, but the crew still needed a place to orient themselves, track requests and tasks, and open the tools for the day.",
      "We moved that starting point into The Black Pearl, a web app for the crew. The opportunity was bigger than organizing links: the crew page could put the work beside the tools needed to do it."
    ] },
    { title: "From rough layout to working screen", body: [
      "The early layouts below are reconstructed to explain the design decisions. They show the progression from putting everything on one page to giving the next task a clear place in the interface.",
      "Step through five stages, from gathering the pieces on one page to refining the working screen. Each stage isolates a change in hierarchy, context, or visual treatment."
    ] },
    { title: "Start with the shift", body: [
      "The shift title, current times, and Changeover button establish the day’s context. Changeover opens a short handoff so the incoming analyst can understand what changed before opening individual requests. Reviewing the handoff is an explicit action; simply visiting the page doesn’t count as having read it.",
      "The next assigned task sits directly below, with its due time and a clear action. The full request list has its own view, where owners and statuses can be compared without crowding the shift home."
    ] },
    { title: "Keep the next action in context", body: [
      "Selecting a request opens a detail panel over the workspace. The panel brings together the request, its next step, related material, and the tool needed to act on it.",
      "Ownership is visible. An unassigned request offers ‘Assign to me’; an owned request offers its working tool. Waiting on input remains different from being complete. Those distinctions keep a tidy queue from hiding unfinished work."
    ] },
    { title: "A front door, not another destination", body: [
      "The crew page is designed to get analysts into their work. Tools remain directly accessible, while the selected request gives those shortcuts a purpose. The analyst doesn’t have to navigate a separate application directory to find the next step.",
      "The home keeps the day’s context, the next task, and tool access together. This is the central design decision: reduce the effort of assembling a working environment at the start of every shift."
    ] },
    { title: "What changed", body: [
      "Time-to-on-mission fell from roughly 45 minutes to about 4. That is approximately 41 minutes returned at the start of a shift.",
      "The improvement belongs to the start-up workflow. It doesn’t claim that analysis itself became faster or that the crew produced better intelligence. The product made it easier to reach the point where that work could begin."
    ] }
  ],
  highlights: [],
  links: [{ label: "Explore the design", href: "/studies/isr-crew/shift" }],
  visuals: [
    { afterSection: 0, label: "The start-of-shift journey", src: "/artifacts/redesigned/isr-crew-journey.svg", alt: "Reconstructed previous journey: locate the link document, orient to the shift, reconcile requests, open tools, begin work. Proposed crew-page journey: review handoff, choose a request, open its tool, begin work.", caption: "A reconstruction of the start-of-shift workflow, contrasting the document-based entry point with the crew page.", width: 1440, height: 700, layout: "wide" },
    { afterSection: 3, label: "Ownership before action", src: "/artifacts/redesigned/black-pearl-rfi-current.png", alt: "An unassigned request with an Assign to me action and contextual supporting material.", caption: "The next action changes with ownership. Unassigned work is visible before the analyst opens a tool.", width: 1440, height: 1000, layout: "wide" }
  ]
};
