import type { WorkItem } from "./work";

// Imported from drew-ux; Jigsaw also follows the current public/deck portfolio review.
export const legacyWorkItems: WorkItem[] = [
  {
    slug: "jigsaw",
    overview: {"problem": "New mission types and growing training demand pushed tanker planners beyond workflows built for one air operations center.", "solution": "I redesigned mission planning around geographic context, unfamiliar missions, and the needs of new planners.", "impact": "Adoption grew from one air operations center to four, and daily planning fell from over eight hours to 1.5 hours."},
    title: "Jigsaw",
    eyebrow: "USAF Kessel Run / Aerial refueling",
    year: "",
    outcome: "Designing tanker planning for new missions, new theaters, and the crews learning to plan them.",
    status: "Deployed across four air operations centers",
    audience: "Air refueling planners across air operations centers",
    result: "Adoption expanded from one AOC to four, daily planning fell from 8+ hours to 1.5 hours, and new planners worked unsupervised after three days.",
    role: "Product design",
    summary:
      "Jigsaw was expanding beyond its first air operations center. The new centers brought different mission types, a greater need for spatial awareness, and more planners to train. I designed for that expansion: helping crews build and understand a refueling plan across time and geography, while making the product easier to learn.",
    chapter: "A plan that works across theaters",
    takeaway:
      "I redesigned the planning experience for different mission types and a growing number of planners across four air operations centers.",
    provenance:
      "Interface designs shown with sanitized planning data.",
    metrics: [
      {
        value: "1 → 4",
        label: "Air operations centers",
        context: "Adopting Jigsaw",
      },
      {
        value: "1.5 hrs",
        label: "Daily planning",
        context: "Down from 8+ hours",
      },
      {
        value: "3 days",
        label: "Planner onboarding",
        context: "Down from 4 weeks",
      },
    ],
    cover: {
      src: "/artifacts/imported/jigsaw-in-use.jpg",
      alt: "An Air Force planner working with Jigsaw on a large planning display.",
      width: 2000,
      height: 1360,
      position: "center",
    },
    sections: [
  {
    "title": "New centers brought new missions",
    "body": [
      "An earlier team had moved tanker planning out of spreadsheets. By the time I joined, the challenge was expanding a product shaped around one air operations center to support the work of others. The new AOCs brought mission types and planning requirements that the original workflow had not been designed around.",
      "I spent time with planners at the 613th and 609th air operations centers, following how they built a plan in the Pacific and Central theaters. I used that research to distinguish differences in the missions from differences in local procedure. That shaped the redesign of the pairing view, where planners bring tanker and receiver aircraft together."
    ]
  },
  {
    "title": "Seeing where the plan comes together",
    "body": [
      "A refueling event has to work in both time and space. Aircraft can line up on a schedule, but planners still need to understand where they will meet, how they will get there, and what a change affects. The increased need for spatial awareness made the relationship between the timeline and map central to my design.",
      "I connected the timeline, map, and route details so planners could examine a sortie without losing the surrounding plan. The timeline shows refueling windows and dependencies; the map supplies the geographic context. Selecting a route brings its sequence of events into view. Conflicts are flagged as the plan changes, while planners can still act on them."
    ]
  },
  {
    "title": "More AOCs meant more planners to train",
    "body": [
      "Expansion also increased the volume of training. Each new center needed planners who could use Jigsaw independently, and onboarding had taken four weeks. Learning the interface was part of the operational workload.",
      "I designed the linked views to make the plan easier to follow: an event on the timeline connects to a location and a route, and dependencies are visible between events. These were the same relationships experienced planners needed to inspect and new planners needed to learn. After the redesign, new planners could work unsupervised in three days."
    ]
  },
  {
    "title": "Making room for the new requirements",
    "body": [
      "The existing pairing view and underlying model were still tied to the first center’s process. I proposed rebuilding them around the mission requirements found in the research. Adding each new center’s needs to the existing structure would have kept us working around the same limitations.",
      "Engineering pushed back on the size of the rebuild. I used the research to show which planning requirements the current design could not support and laid out what needed to change. The team shipped the rebuild, and I designed the connected planning views it made possible."
    ]
  },
  {
    "title": "Four centers. A plan before the morning brief.",
    "body": [
      "Jigsaw expanded from one air operations center to four. Daily planning fell from more than eight hours to 1.5 hours, putting the plan ahead of the morning brief. New planners reached unsupervised work in three days instead of four weeks.",
      "No conflicts were missed during the 90-day measurement period. The expanded product supported the new centers’ planning work, with less time spent building the daily plan and bringing new planners up to speed."
    ]
  }
],
    highlights: [
      {
        label: "Research across centers",
        body: "Compared planning at the 613th and 609th AOCs to separate shared needs from local procedure.",
      },
      {
        label: "Connected planning",
        body: "Linked the timeline, map, and route details so a selection could explain its place in the plan.",
      },
    ],
    links: [],
    coverage: [
  {
    "title": "Air Force’s Kessel Run looks to scale multi-domain ops software suite to Pacific",
    "publisher": "DefenseScoop",
    "date": "2023-08-03",
    "dateLabel": "August 3, 2023",
    "href": "https://defensescoop.com/2023/08/03/kessel-run-krados-pacific/",
    "summary": "Reporting on plans to expand KRADOS, including Jigsaw, into the Pacific and support more AOCs and higher mission volumes. This covers the broader suite’s expansion."
  },
  {
    "title": "Demonstrating the full capability of ACCS at the 2023 Paris Air Show",
    "publisher": "ThalesRaytheonSystems",
    "date": "2023-06-28",
    "dateLabel": "June 28, 2023",
    "href": "https://www.thalesraytheon.com/accs-at-paris-air-show-2023/",
    "summary": "The company’s account of its NATO command-and-control demonstration describes a newly developed link for future Jigsaw integration."
  },
  {
    "title": "JIGSAW Air-to-Air Refuelling Tool Proves Worth During Ramstein Ambition 21",
    "publisher": "NATO Allied Command Transformation",
    "date": "2021-05-13",
    "dateLabel": "May 13, 2021",
    "href": "https://www.act.nato.int/article/jigsaw-air-to-air-refuelling-tool-proves-worth-during-ramstein-ambition-21/",
    "summary": "NATO describes training allied planners during an exercise involving more than 600 daily sorties. One planner reported revising six hours of tanker activity in ten minutes."
  }
],
    visuals: [
      {
        afterSection: 0,
        label: "The planning surface",
        src: "/deck/assets/jigsaw-gantt.png",
        alt: "Sanitized Jigsaw Gantt design showing refueling windows and connections between scheduled events.",
        caption:
          "Refueling windows and dependencies are visible together, so planners can trace how the events in a mission fit together.",
        width: 1920,
        height: 1080,
        layout: "wide",
      },
      {
        afterSection: 1,
        label: "Time, place, and detail",
        src: "/deck/assets/jigsaw-map-split.png",
        alt: "Sanitized Jigsaw design combining the planning timeline, airspace map, and route detail panel.",
        caption:
          "The linked map, timeline, and route detail give planners the spatial context to inspect a mission while keeping the rest of the schedule in view.",
        width: 1920,
        height: 1088,
        layout: "wide",
      },
    ],
  },
  {
    slug: "veriflux",
    overview: {"problem": "Dispatchers and compliance teams needed to follow the same material from scheduled pickup through processing.", "solution": "I designed connected route, collection, and reporting workflows with a shared component library.", "impact": "The delivered designs gave dispatch and compliance teams a shared view of collection activity and material records."},
    title: "Veriflux",
    eyebrow: "Resource recovery / B2B software",
    year: "",
    outcome: "Routes, pickups, and records for recovered materials.",
    status: "Client product design",
    audience: "Dispatchers, collection drivers, and compliance teams",
    result: "A clearer route view and reporting structure for material moving through the system.",
    role: "Product design",
    summary:
      "Veriflux tracks recovered materials from collection through processing. I redesigned workflows for people running pickups and people accounting for the material afterward, with a shared view of routes, activity, and records.",
    chapter: "From pickup to material record",
    takeaway:
      "Make the route useful to dispatch and the resulting record useful to the next person.",
    provenance:
      "I delivered the route and material-reporting designs for Veriflux. The screens shown here update that work for 2026, keeping the same workflows and product identity. The interactive example uses illustrative data.",
    cover: {
      src: "/artifacts/redesigned/veriflux-routes-aligned.png",
      alt: "Current Veriflux redesign with route filters, collection progress, a Washington-area map, and selected-route details.",
      width: 1440,
      height: 900,
      position: "top",
    },
    sections: [
      {
        title: "Dispatch, collection, and compliance",
        body: [
          "Veriflux serves dispatchers arranging pickups, drivers recording collections, and compliance teams tracing the material afterward.",
          "I started with customer research and a usability review, then redesigned the route and reporting workflows and created a component library for development.",
        ],
      },
      {
        title: "Redesigning the route view",
        body: [
          "A marker alone does not tell a dispatcher enough. The route view pairs the map with a list showing the driver, time range, estimated load, and pickup count. Selecting a route gives those details a geographic context.",
          "Dispatchers can scan the route list or start with a location on the map. Both remain visible when a route is selected.",
        ],
      },
      {
        title: "Reporting collected and offloaded material",
        body: [
          "I separated collected material, material in a facility, and material still being reconciled in the reporting view. A combined total concealed where it was in the process.",
          "Pickup counts, offloaded weight, and driver activity sit alongside that view. I used repeatable navigation, cards, and chart patterns so the team could extend the product without inventing a new interface for every operational question.",
        ],
      },
      {
        title: "What I would research next",
        body: [
          "I would involve drivers earlier in the next iteration. Research with dispatchers and managers can explain what the organization needs, but the quality of its records still depends on what a driver can capture at the point of collection.",
        ],
      },
    ],
    highlights: [
      {
        label: "Routes with context",
        body: "Driver, time, estimated load, and pickup count stay next to the collection map.",
      },
      {
        label: "Material status",
        body: "Reporting distinguishes collected, stored, and unreconciled material instead of collapsing everything into a total.",
      },
    ],
    links: [
      { label: "Explore the design", href: "/studies/veriflux/routes" },
    ],
    visuals: [
      {
        afterSection: 1,
        label: "Collection routes",
        src: "/artifacts/redesigned/veriflux-routes-aligned.png",
        alt: "Veriflux web redesign showing searchable route rows, pickup progress, and a selected route beside the collection map.",
        caption:
          "The route list keeps driver, pickup progress, and estimated load visible beside the map. Selecting a route reveals its collection window and stops.",
        width: 1440,
        height: 900,
        layout: "wide",
      },
      {
        afterSection: 2,
        label: "Material reporting",
        src: "/artifacts/redesigned/veriflux-home-nav-final.png",
        alt: "Veriflux reporting design showing material stages, offloaded weight, pickup counts, and driver activity.",
        caption:
          "Material stages, offloaded weight, and driver activity share one view. A stage filter isolates each series, with daily weights in the table below.",
        width: 1440,
        height: 900,
        layout: "landscape",
      },
    ],
  },
];
