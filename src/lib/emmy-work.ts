import type { WorkItem } from "./work";

export const emmyWork: WorkItem = {
  slug: "emmys-milestones",
  title: "Emmy’s Milestones",
  eyebrow: "Personal project / Family observations",
  year: "2026",
  outcome: "Following Emmy’s milestones in our own words.",
  status: "Native iOS app · TestFlight",
  audience: "Parents keeping a record of their child’s everyday changes",
  result: "An iOS app my wife and I use to follow our daughter’s milestones.",
  role: "Product design",
  summary: "Emmy’s Milestones is a native iOS app I designed for my family. My wife and I use it through TestFlight to keep track of our daughter’s milestones. We could record a moment, but following a skill over several months meant digging through separate entries and making the comparison ourselves. I designed it to connect those observations, from Emmy’s first steps to walking across the kitchen, while keeping our words and the original dates intact.",
  provenance: "Personal project in active use by my wife and me, currently distributed through TestFlight. The case-study visuals use illustrative follow-up observations.",
  cover: { src: "/artifacts/redesigned/emmy-walking.png", alt: "Emmy’s Milestones comparing the first and latest recorded observations about walking.", width: 390, height: 844 },
  sections: [
    { title: "Finding the earlier note", body: [
      "A dated entry preserved a moment, but the list did little to explain its relationship to another entry months later. To see what had changed, we had to find both records and hold the earlier one in mind.",
      "I grouped related observations into progressions, such as walking or building with blocks. Each shows the latest note in the list."
    ] },
    { title: "Grouping observations", body: [
      "A progression has a parent-written name. It doesn't require the observation to fit a predefined developmental category. An observation can also stand on its own and be connected later, so capturing a moment doesn't depend on organizing it first.",
      "Parents can browse by progression or see all observations in date order. Both use the same entries."
    ] },
    { title: "Adding without overwriting", body: [
      "When a parent adds to a progression, the last recorded observation stays above the entry field. It supplies the context that would otherwise require closing the form and finding the previous note.",
      "Adding creates a new dated entry and preserves the earlier note. Editing an existing entry is a separate action."
    ] },
    { title: "Comparing the first and latest entries", body: [
      "The detail view puts the first and latest observations side by side in the reading order, with the intervening entries available below. Parents make the comparison in their own words; there’s no developmental score.",
      "My wife and I use the native iOS app through TestFlight. Using it to keep our own family records gives me a direct way to see where the experience needs more work."
    ] },
  ],
  highlights: [],
  links: [],
  visuals: [
    { afterSection: 1, label: "Progressions", src: "/artifacts/redesigned/emmy-progressions.png", alt: "Three parent-named progressions, each showing its latest observation and date.", caption: "Parent-named progressions show the most recent observation. Follow-up entries shown here are illustrative.", width: 390, height: 844, layout: "phone" },
    { afterSection: 1, label: "First and latest", src: "/artifacts/redesigned/emmy-walking.png", alt: "Walking progression comparing a few unsupported steps with walking across the kitchen.", caption: "The first and latest records can be read together. Full record opens the intervening observations without replacing this comparison.", width: 390, height: 844, layout: "phone" },
    { afterSection: 2, label: "Add an observation", src: "/artifacts/redesigned/emmy-capture.png", alt: "Observation form keeping the last recorded walking observation above the new entry field.", caption: "The previous observation stays in view while writing the next one. Adding preserves the earlier record; editing is a separate action.", width: 390, height: 844, layout: "phone" },
  ],
};
