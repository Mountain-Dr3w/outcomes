import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import heroStyles from "@/components/home-hero.module.css";
import { ContourField } from "@/components/contour-field";
import { ProjectThumbnail } from "@/components/project-thumbnail";
import Link from "next/link";
import Image from "next/image";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { displayWorkItems } from "@/lib/work";

export default function Home() {
  return (
    <div className={heroStyles.homepage}>
      <SiteHeader />
      <main id="main">
        <section className={`${heroStyles.hero} home-hero`} aria-labelledby="intro-heading">
          <div className={heroStyles.landscape}><ContourField controlsTargetId="hero-actions" /></div>
          <div className="hero-composition page-shell">
            <div className="hero-title-wrap">
              <h1 id="intro-heading"><span>Product design for</span><span>the mission ahead.</span></h1>
            </div>
            <dl className={heroStyles.heroFacts}>
              <div><dt>Based in</dt><dd>Nashville, TN</dd></div>
              <div><dt>Focus</dt><dd>GovTech</dd></div>
              <div><dt>Experience</dt><dd>10+ years</dd></div>
            </dl>
            <div className="hero-aside">
              <div id="hero-actions" className={heroStyles.actions}><a className="text-link hero-link" href="#work"><ArrowDown size={16} aria-hidden="true" />View work</a></div>
            </div>
          </div>
        </section>
        <section id="work" aria-labelledby="work-heading" className="page-shell work-section">
          <div className="section-heading"><h2 id="work-heading">Work</h2></div>
          <div className="work-grid">
            {displayWorkItems.map(item => (
              <article key={item.slug} className={`work-card work-card-${item.slug}`}>
                <Link className="project-link" href={`/work/${item.slug}`}>
                  <div className={`project-image project-image-${item.slug}`}>
                    <ProjectThumbnail item={item} />
                    <div className="project-category"><h3>{item.title}</h3><ArrowUpRight className="project-arrow" size={26} aria-hidden="true" /></div>
                    <span className="project-view">View case study <ArrowUpRight size={18} aria-hidden="true" /></span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section id="about" aria-labelledby="about-heading" className={`page-shell ${heroStyles.about}`}>
          <div className={heroStyles.aboutPortrait}>
            <h2 id="about-heading">About</h2>
            <Image src="/drew-about.jpeg" alt="Drew presenting to a group in an office." width={685} height={1218} sizes="(max-width: 767px) calc(100vw - 40px), 36vw" />
          </div>
          <div className={heroStyles.aboutContent}>
            <p className={heroStyles.aboutIntro}>I’m Drew, a product designer focused on GovTech.</p>
            <p className={heroStyles.aboutBody}>I work closely with the people behind the mission to understand what gets in their way, then design software that helps them move forward.</p>

          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
