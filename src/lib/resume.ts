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
      "Flight scheduling at Kessel Run. I mapped how scheduling worked and partnered with military leaders to remove the roadblocks keeping crews from using the product.",
  },
  {
    metric: "20%",
    outcome: "faster maintenance initiation",
    context:
      "A pilot debriefing tool used across several airframes and military branches. I led the work from research through delivery.",
  },
  {
    metric: "~40%",
    outcome: "growth in platform adoption",
    context:
      "A government developer platform. Research found five problems that were keeping teams from adopting it, and I worked with the product team to address them.",
  },
];

export const resume = {
  name: "Drew McFarland",
  headline: "Product Designer and Strategist | USAF Veteran | Active Secret Clearance",
  website: "work.velveteen.sh",
  websiteHref: "https://work.velveteen.sh",
  email: "drewjmcfarland@live.com",
  pdfHref: "/resume/Drew_McFarland_Resume.pdf",
  experience: [
    {
      organization: "Rise8, Inc.",
      roles: [
        {
          title: "Sr Product Designer / Product Lead",
          period: "May 2025 to Present",
          bullets: [
            "Found the main reason new teams could not deploy on a government DevSecOps platform and redirected the roadmap toward the work they needed first",
            "Redesigned onboarding from account setup through first deployment so new teams could complete more of the process without an engineer walking them through it",
            "Gave leadership four measures for the platform: setup time, time to first deployment, delivery without outside help, and reusable compliance work",
          ],
        },
      ],
    },
    {
      organization: "USAF - Kessel Run",
      roles: [
        {
          title: "Design Operations Lead",
          period: "Apr 2022 to May 2025",
          bullets: [
            "Grew daily active users 300% for a flight-scheduling application by mapping how scheduling worked and helping military leaders remove the operational roadblocks",
            "Used a shared service map to keep 8 delivery teams focused on operator problems instead of disconnected feature requests",
            "Created Section 508 standards, research templates, and design playbooks that 5 programs continued using after I left",
          ],
        },
        {
          title: "Product Designer",
          period: "May 2017 to Apr 2022",
          bullets: [
            "Cut maintenance initiation time 20% for a pilot debriefing app used across several airframes and military branches. I led the work from research through delivery",
            "Found 5 problems that were keeping teams from adopting a government developer platform and worked with the product team on changes that increased adoption roughly 40%",
            "Grew the application's footprint from 2 commands to 6 by building relationships with key advocates and running hands-on workshops with each new unit to show fit before pushing for rollout",
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
            "Helped a defense technology startup move from concept to launch through user research, service design, and a pitch that led to a New York City contract and an SBIR grant",
            "Researched how customers used a DoD data analysis product and helped the startup explain its value, contributing to a $150K Stage 1 SBIR award",
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
