import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import heroStyles from "@/components/home-hero.module.css";
import { ContourField } from "@/components/contour-field";
import { ProjectThumbnail } from "@/components/project-thumbnail";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { displayWorkItems } from "@/lib/work";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className={`${heroStyles.hero} home-hero`} aria-labelledby="intro-heading">
          <ContourField />
          <div className="hero-composition page-shell">
            <div className="hero-title-wrap">
              <h1 id="intro-heading"><span>Product design for</span><span>the mission ahead.</span></h1>
            </div>
            <div className="hero-aside">
              <p>I’m Drew, a product designer based out of Nashville, TN, focused on GovTech. I work closely with the people behind the mission to understand what gets in their way, then design software that helps them move forward.</p>
              <a className="text-link hero-link" href="#work">View work <span aria-hidden="true">↓</span></a>
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
      </main>
      <SiteFooter />
    </>
  );
}
