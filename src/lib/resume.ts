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
            "Drove discovery to map the constraint blocking new tenant deployments on a government DevSecOps platform replacing a 12 to 18 month accreditation process, redirecting the roadmap to capabilities new programs need first",
            "Led the redesign of tenant onboarding from provisioning through first deployment, replacing a high-touch engineering process with reusable artifacts new teams run themselves",
            "Shaped the productization plan around four measurable outcomes (environment standup, time to first deploy, developer-led delivery, reusable compliance), giving leadership a single way to prioritize and report progress across delivery, compliance, and GTM",
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
            "Grew daily active users 300% for a flight scheduling application by mapping the full service experience and working with military leadership to clear the operational roadblocks holding it back",
            "Used service blueprints to align 8 delivery teams around operator needs, keeping engineering effort on high-impact work instead of features nobody asked for",
            "Built accessibility standards (Section 508), research templates, and design playbooks adopted across 5 programs that kept running after I moved on",
          ],
        },
        {
          title: "Product Designer",
          period: "May 2017 to Apr 2022",
          bullets: [
            "Cut maintenance initiation time 20% for a pilot debriefing app used across multiple airframes and branches by leading UX from research through delivery",
            "Mapped developer journeys on a Platform-as-a-Service, surfaced 5 key friction points, and drove changes that increased platform adoption roughly 40%",
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
            "Took a defense tech startup from concept to launch: ran user research, built service blueprints, and shaped the pitch that landed them a NYC local government contract and an SBIR grant",
            "Led discovery for a DoD data analysis startup and turned research into a value story that contributed to a $150K Stage 1 SBIR award",
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
