"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Check, CheckCircle, Cube, CaretUpDown, ArrowUpRight, Plus,
  GitBranch, ListChecks, MagnifyingGlass, Package, ShieldCheck,
  Stack, Buildings, Globe, RocketLaunch, Users, Key, Lifebuoy, BookOpen, X, SidebarSimple,
} from "@phosphor-icons/react";
import styles from "./space-force.module.css";

const stages = [
  { name: "Request submitted", state: "Complete", title: "Your request is on record.", description: "The Phoenix team’s platform request has been submitted with its product and organization details.", detail: "Submitted April 30, 2026 at 08:11", next: "Review the request record below." },
  { name: "Under review", state: "Complete", title: "Review complete.", description: "The team’s request has passed review and moved to approval.", detail: "The approved request is the basis for provisioning.", next: "Continue to the current stage to see what happens next." },
  { name: "Approved", state: "Current stage", title: "Preparing platform access", description: "Phoenix’s request is approved. Your tool accounts will be provisioned next.", detail: "Environment not active", next: "Explore the tools your team will use for development, delivery, and security review." },
  { name: "Provisioning tools", state: "Not started", title: "Tool provisioning is next.", description: "Platform tool accounts will be set up for your team before the environment becomes active.", detail: "This stage has not started.", next: "No action is available at this stage yet." },
  { name: "Active", state: "Not started", title: "Your destination: an active environment.", description: "The final stage marks the completion of the team’s platform onboarding.", detail: "Phoenix has not reached this stage.", next: "Return to Approved to see the current status." },
];

const services = [
  { name: "GitLab", documentation: "https://docs.gitlab.com/", category: "Build & deliver", description: "Source control and continuous integration", detail: "Keep source code, merge requests, and CI pipelines together throughout delivery.", icon: GitBranch, capabilities: ["Source repositories", "Code review", "CI pipelines"] },
  { name: "Argo CD", documentation: "https://argo-cd.readthedocs.io/en/stable/", category: "Build & deliver", description: "Continuous delivery for Kubernetes", detail: "Manage Kubernetes delivery from version-controlled application definitions.", icon: Stack, capabilities: ["Kubernetes delivery", "Git-based configuration", "Deployment visibility"] },
  { name: "JFrog Artifactory", documentation: "https://docs.jfrog.com/artifactory/docs/getting-started", category: "Build & deliver", description: "Package and artifact management", detail: "Organize the packages and build artifacts your applications depend on.", icon: Package, capabilities: ["Artifact repositories", "Package storage", "Build artifacts"] },
  { name: "Nucleus", documentation: "https://help.nucleussec.com/", category: "Security & compliance", description: "Vulnerability management", detail: "Bring vulnerability information together to support security review and remediation.", icon: ShieldCheck, capabilities: ["Vulnerability records", "Security review", "Remediation tracking"] },
  { name: "Tracer", documentation: null, category: "Security & compliance", description: "Compliance traceability", detail: "Connect compliance information to the work and decisions behind a product.", icon: ListChecks, capabilities: ["Compliance records", "Traceability", "Review context"] },
  { name: "SD Elements", documentation: "https://docs.sdelements.com/release/latest/guide/", category: "Security & compliance", description: "Security requirements", detail: "Identify and manage security requirements as part of the software delivery process.", icon: Cube, capabilities: ["Security requirements", "Development guidance", "Requirement tracking"] },
];

export function SpaceForceStudy({ screen }: { screen: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const navDialog = useRef<HTMLDialogElement>(null);
  const [navDestination, setNavDestination] = useState("");
  const openDestination = (name: string) => { setNavDestination(name); navDialog.current?.showModal(); };
  const isServices = screen === "services";
  const [selectedStage, setSelectedStage] = useState(2);
  const [selectedService, setSelectedService] = useState("GitLab");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All services");
  const [addedServices, setAddedServices] = useState<string[]>([]);
  const isAdded = addedServices.includes(selectedService);
  const currentStage = stages[selectedStage];
  const selected = services.find((service) => service.name === selectedService) ?? services[0];
  const SelectedIcon = selected.icon;
  const visibleServices = services.filter((service) =>
    (category === "All services" || category === service.category) &&
    `${service.name} ${service.description}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={styles.workspace}>
      <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ""}`}>
        <button className={styles.collapseToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-expanded={!collapsed} onClick={()=>setCollapsed(!collapsed)} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}><SidebarSimple size={19}/></button>
        <Link href="/studies/space-force/readiness" className={styles.brand} aria-label="Space Force Cloud Platform onboarding">
          <span className={styles.deltaMark}><Image src="/artifacts/redesigned/ussf-official-logo.png" alt="United States Space Force" width={200} height={272} className={styles.officialLogo} priority /></span>
          <span>SFCP</span>
        </Link>
        <div className={styles.teamPicker}>
          <button className={styles.team} popoverTarget="team-picker" aria-label="Choose team, Phoenix" aria-haspopup="dialog">
            <span className={styles.teamAvatar}>P</span>
            <span className={styles.teamIdentity}><span>Workspace</span><strong>Phoenix</strong></span>
            <CaretUpDown size={16} className={styles.teamCaret} />
          </button>
          <div id="team-picker" popover="auto" className={styles.teamMenu} role="dialog" aria-label="Choose team">
            <p>Your workspaces</p>
            <button popoverTarget="team-picker" popoverTargetAction="hide" aria-label="Phoenix, current workspace"><span className={styles.teamAvatar}>P</span><strong>Phoenix</strong><Check size={17} /></button>
            <small>Phoenix is the workspace available in this preview.</small>
          </div>
        </div>
        <nav className={styles.navigation} aria-label="Platform workspace">
          <p className={styles.navLabel}>Workspace</p>
          <Link title="Onboarding" aria-label="Onboarding" href="/studies/space-force/readiness" className={!isServices ? styles.navActive : ""} aria-current={!isServices ? "page" : undefined}><CheckCircle size={19} /><span className={styles.navText}>Onboarding</span><span className={styles.navCount}>2 / 5</span></Link>
          <button title="Systems" aria-label="Systems" onClick={()=>openDestination("Systems")}><Buildings size={19}/><span className={styles.navText}>Systems</span></button>
          <button title="Environments" aria-label="Environments" onClick={()=>openDestination("Environments")}><Globe size={19}/><span className={styles.navText}>Environments</span></button>
          <p className={styles.navLabel}>Delivery</p>
          <Link title="Platform services" aria-label="Platform services" href="/studies/space-force/services" className={isServices ? styles.navActive : ""} aria-current={isServices ? "page" : undefined}><Stack size={19} /><span className={styles.navText}>Platform services</span><span className={styles.navCount}>6</span></Link>
          <button title="Deployments" aria-label="Deployments" onClick={()=>openDestination("Deployments")}><RocketLaunch size={19}/><span className={styles.navText}>Deployments</span></button>
          <button title="Security & compliance" aria-label="Security & compliance" onClick={()=>openDestination("Security & compliance")}><ShieldCheck size={19}/><span className={styles.navText}>Security &amp; compliance</span></button>
          <p className={styles.navLabel}>Team</p>
          <button title="Members" aria-label="Members" onClick={()=>openDestination("Members")}><Users size={19}/><span className={styles.navText}>Members</span></button>
          <button title="Access requests" aria-label="Access requests" onClick={()=>openDestination("Access requests")}><Key size={19}/><span className={styles.navText}>Access requests</span></button>
        </nav>
        <div className={styles.supportNav}><button title="Documentation" aria-label="Documentation" onClick={()=>openDestination("Documentation")}><BookOpen size={18}/><span className={styles.navText}>Documentation</span></button><button title="Platform support" aria-label="Platform support" onClick={()=>openDestination("Platform support")}><Lifebuoy size={18}/><span className={styles.navText}>Platform support</span></button></div>

      </aside>

      <dialog ref={navDialog} className={styles.navDialog}><div><h2>{navDestination}</h2><button aria-label="Close" onClick={()=>navDialog.current?.close()}><X size={20}/></button></div><p>This section is available in the working app. You can explore Onboarding and Platform services in this prototype.</p><button className={styles.navDismiss} onClick={()=>navDialog.current?.close()}>Got it</button></dialog>
      <div className={styles.main}>
        <div className={styles.contextBar}><span>Phoenix <span>/</span> Phoenix Service</span><span className={styles.environmentStatus}><span />Environment pending</span></div>

        <main id="main" className={`${styles.content} ${!isServices ? styles.onboardingContent : ""}`}>
          <div className={styles.pageTitle}>
            <div><h1>{isServices ? "Platform services" : "Team onboarding"}</h1>{isServices && <p>Connect your system to platform-managed delivery and security tools.</p>}</div>
          </div>

          {isServices ? (
            <>
              <div className={styles.catalogToolbar}>
                <div className={styles.filters} aria-label="Filter services">
                  {["All services", "Build & deliver", "Security & compliance"].map((item) => <button key={item} className={category === item ? styles.filterSelected : ""} aria-pressed={category === item} onClick={() => { setCategory(item); const firstMatch = services.find((service) => (item === "All services" || service.category === item) && `${service.name} ${service.description}`.toLowerCase().includes(search.toLowerCase())); if (firstMatch) setSelectedService(firstMatch.name); }}>{item}{item === "All services" && <span>6</span>}</button>)}
                </div>
                <label className={styles.search}><MagnifyingGlass size={17} /><input aria-label="Find a service" placeholder="Find a service" value={search} onChange={(event) => { const query = event.target.value; setSearch(query); const firstMatch = services.find((service) => (category === "All services" || service.category === category) && `${service.name} ${service.description}`.toLowerCase().includes(query.toLowerCase())); if (firstMatch) setSelectedService(firstMatch.name); }} /></label>
              </div>
              <div className={styles.catalogLayout}>
                <section aria-label="Platform services" className={styles.serviceList}>
                  <div className={styles.listHeading}><span>Service</span><span>{visibleServices.length} available</span></div>
                  {visibleServices.map((service) => {
                    const ServiceIcon = service.icon;
                    return <button className={`${styles.serviceRow} ${selectedService === service.name ? styles.serviceSelected : ""}`} key={service.name} aria-pressed={selectedService === service.name} onClick={() => setSelectedService(service.name)}><span className={styles.serviceIcon}><ServiceIcon size={25} weight="light" /></span><span className={styles.serviceName}><strong>{service.name}</strong><span>{service.description}</span></span><span className={styles.connectionState}>{addedServices.includes(service.name) ? "Requested" : "Available"}</span><ArrowRight className={styles.serviceArrow} size={16} /></button>;
                  })}
                  {visibleServices.length === 0 && <div className={styles.empty}>No services match “{search}”.<button onClick={() => { setSearch(""); setCategory("All services"); }}>Clear filters</button></div>}
                </section>
                <aside className={styles.serviceDetail} aria-live="polite">
                  <div className={styles.detailIcon}><SelectedIcon size={34} weight="light" /></div>
                  <p className={styles.kicker}>{selected.category}</p>
                  <h2>{selected.name}</h2>
                  <p>{selected.detail}</p>
                  <dl className={styles.integrationFacts}><div><dt>System</dt><dd>Phoenix Service</dd></div><div><dt>Access</dt><dd>{isAdded ? "Requested" : "Not configured"}</dd></div><div><dt>Provisioned by</dt><dd>Platform team</dd></div></dl>
                  <div className={styles.capabilities}><span>USE IT FOR</span>{selected.capabilities.map((item) => <div key={item}><Check size={15} />{item}</div>)}</div>
                  <div className={styles.serviceActions}>
                    {selected.documentation ? <a className={styles.learnMore} href={selected.documentation} target="_blank" rel="noreferrer">Learn more<ArrowUpRight size={16} /></a> : <button className={styles.learnMore} disabled title="Public documentation is not available for this preview">Learn more<ArrowUpRight size={16} /></button>}
                    <button className={styles.addService} disabled={isAdded} onClick={() => setAddedServices((items) => [...items, selected.name])}>{isAdded ? <Check size={17} /> : <Plus size={17} />}{isAdded ? "Added to my system" : "Add to my system"}</button>
                  </div>
                </aside>
              </div>
              <div className={styles.servicesBottom}><Link href="/studies/space-force/readiness">View team onboarding <ArrowRight size={16} /></Link></div>
            </>
          ) : (
            <>
              <div className={styles.onboardingLayout}>
              <section className={styles.journey} aria-label="Onboarding stages">
                <div className={styles.journeyHeader}><span>2 of 5 steps complete</span></div>
                <div className={styles.stageTrack}>
                  {stages.map((stage, index) => <button key={stage.name} onClick={() => setSelectedStage(index)} aria-label={`${stage.name}: ${stage.state}`} aria-current={index === 2 ? "step" : undefined} aria-pressed={selectedStage === index} className={`${styles.stage} ${index < 2 ? styles.stageComplete : ""} ${index === 2 ? styles.stageCurrent : ""} ${selectedStage === index ? styles.stageSelected : ""}`}><span className={styles.stageRail} /><span className={styles.stageNumber}>{index < 2 ? <Check size={14} weight="bold" /> : index + 1}</span><strong>{stage.name}</strong><span className={styles.stageState}>{stage.state}</span></button>)}
                </div>
              </section>

              <div className={styles.readinessLayout}>
                <section className={styles.openDetail} aria-live="polite">
                  <div className={styles.stageDetailTop}><span>STEP {selectedStage + 1} OF 5</span><span className={styles.statusLabel}>{selectedStage === 2 ? "Approved" : currentStage.state}</span></div>
                  <div className={styles.detailHeading}>
                    <h2>{selectedStage === 2 ? "You’re approved." : currentStage.title}</h2>

                  </div>
                  <p className={styles.detailIntro}>{selectedStage === 2 ? "Phoenix Service is cleared to join the platform. Next, the platform team will provision your environment and tool access." : currentStage.description}</p>
                  {selectedStage === 2 ? <>
                    <dl className={styles.accessFacts}>
                      <div><dt>System</dt><dd>Phoenix Service</dd></div>
                      <div><dt>Environment</dt><dd><span className={styles.pendingDot}/>Awaiting provisioning</dd></div>
                      <div><dt>Next step</dt><dd>Provision tools &amp; access</dd></div>
                      <div><dt>Responsible team</dt><dd>Platform team</dd></div>
                    </dl>
                    <div className={styles.onboardingAction}><div><strong>Explore your platform toolkit</strong><p>Review the services available for your system.</p></div><Link href="/studies/space-force/services">Browse services<ArrowRight size={16}/></Link></div>
                  </> : <div className={styles.otherStage}><p>{currentStage.detail}</p><p>{currentStage.next}</p></div>}
                </section>

                <details className={styles.requestRecord}>
                  <summary>Request record <span>Phoenix · Submitted April 30, 2026</span></summary>
                  <dl><div><dt>Organization</dt><dd>Platform</dd></div><div><dt>Product</dt><dd>Phoenix Service</dd></div><div><dt>Project type</dt><dd>New project</dd></div><div><dt>Target go-live</dt><dd>Jun 1, 2026</dd></div><div><dt>Submitted</dt><dd>Apr 30, 2026 <span>08:11</span></dd></div></dl>
                  <div className={styles.repository}><GitBranch size={18} /><div><span>TEAM REPOSITORY</span><strong>tenants / phoenix</strong></div></div>
                </details>
              </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
