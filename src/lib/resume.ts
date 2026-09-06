export interface ResumeRole {
  title: string;
  period: string;
  bullets: string[];
}

export interface ResumeExperience {
  organization: string;
  roles: ResumeRole[];
}

export interface ResumeEducation {
  degree: string;
  school: string;
}

export interface ImpactItem {
  metric: string;
  outcome: string;
  context: string;
}

export const impactItems: ImpactItem[] = [
  {
    metric: "300%",
    outcome: "growth in daily active users",
    context:
      "Flight scheduling at Kessel Run. I mapped the full service experience and worked with military leadership to clear the operational roadblocks holding it back.",
  },
  {
    metric: "20%",
    outcome: "faster maintenance initiation",
    context:
      "A pilot debriefing app used across multiple airframes and branches. I led UX from field research with aircrews through usability testing and delivery.",
  },
  {
    metric: "~40%",
    outcome: "growth in platform adoption",
    context:
      "A government Platform-as-a-Service. I mapped developer journeys, surfaced five friction points, and drove the resulting product changes.",
  },
];

export const resume = {
  name: "Drew McFarland",
  headline: "Senior Product Designer | USAF Veteran | Active Secret Clearance",
  website: "work.velveteen.sh",
  websiteHref: "https://work.velveteen.sh",
  email: "drewjmcfarland@live.com",
  pdfHref: "/resume/Drew_McFarland_Resume.pdf",
  experience: [
    {
      organization: "Rise8, Inc.",
      roles: [
        {
          title: "Senior Product Designer / Product Lead",
          period: "May 2025 to Present",
          bullets: [
            "Ran discovery to identify the constraint blocking new tenant deployments on a government DevSecOps platform that replaces a 12- to 18-month accreditation process, then redirected the roadmap toward the capabilities new programs need first",
            "Led the redesign of tenant onboarding from provisioning through first deployment, facilitating service-blueprinting sessions with engineers and compliance leads and proposing reusable artifacts to reduce the high-touch engineering support new teams needed",
            "Shaped the productization plan around four measurable outcomes: environment standup, time to first deploy, developer-led delivery, and reusable compliance, giving leadership one framework for prioritizing and reporting progress",
          ],
        },
      ],
    },
    {
      organization: "USAF | Kessel Run",
      roles: [
        {
          title: "Senior Product Designer",
          period: "Apr 2022 to May 2025",
          bullets: [
            "Grew daily active users 300% for a flight-scheduling application by mapping the full service experience and working with military leadership to clear the operational roadblocks holding it back",
            "Used service blueprints to align 8 delivery teams around operator needs, keeping engineering focused on work operators needed instead of features nobody asked for",
            "Built Section 508 accessibility standards, research templates, and design playbooks adopted across 5 programs and still in use after I moved on",
          ],
        },
        {
          title: "Product Designer",
          period: "May 2017 to Apr 2022",
          bullets: [
            "Led UX for a pilot debriefing app used across multiple airframes and branches, from field research with aircrews through usability testing and delivery, cutting maintenance initiation time 20%",
            "Mapped developer journeys on a Platform-as-a-Service, surfaced 5 friction points, and drove changes that increased platform adoption roughly 40%",
            "Grew the app's footprint from 2 commands to 6 by finding advocates in each unit and running hands-on workshops to demonstrate fit before rollout",
          ],
        },
      ],
    },
    {
      organization: "DrewUX",
      roles: [
        {
          title: "Service Design Consultant",
          period: "Jun 2016 to Present",
          bullets: [
            "Took a defense technology startup from concept to launch by running user research, building service blueprints, and shaping the pitch that secured a New York City government contract and an SBIR grant",
            "Led discovery for a DoD data-analysis startup and turned the research into a value story that contributed to a $150K Phase I SBIR award",
          ],
        },
      ],
    },
  ] satisfies ResumeExperience[],
  education: [
    {
      degree: "M.S. Human-Computer Interaction",
      school: "Iowa State University",
    },
    {
      degree: "B.S. IT Project Management",
      school: "Western Governors University",
    },
  ] satisfies ResumeEducation[],
};
