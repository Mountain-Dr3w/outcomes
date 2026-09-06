import coverageStyles from "@/components/press-coverage.module.css";
import { EmmyPreview } from "@/components/emmy-preview";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SbirPreview } from "@/components/sbir-preview";
import { VelveteenPreview } from "@/components/velveteen-preview";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getNextWorkBySlug, getWorkBySlug, type WorkVisual, workItems } from "@/lib/work";

interface WorkPageProps { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.outcome,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: { title: `${item.title} | Drew McFarland`, description: item.outcome, url: `/work/${item.slug}` },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) notFound();
  const nextItem = getNextWorkBySlug(item.slug);

  return (
    <>
      <SiteHeader />
      <main id="main" className={`page-shell case-page-${item.slug}`}>
        <header className="case-top">
          <Link className="back-link" href="/#work"><span aria-hidden="true">←</span> All work</Link>
          <div className="case-heading">
            <div><h1>{item.title}</h1></div>
            <p className="case-deck">{item.outcome}</p>
          </div>
          <dl className="case-facts">
            <div><dt className="eyebrow">Problem</dt><dd>{item.overview.problem}</dd></div>
            <div><dt className="eyebrow">Solution</dt><dd>{item.overview.solution}</dd></div>
            <div><dt className="eyebrow">Impact</dt><dd>{item.overview.impact}</dd></div>
          </dl>
        </header>
        {item.metrics && <dl className="case-metrics" aria-label="Project results">{item.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd>{metric.context && <p>{metric.context}</p>}</div>)}</dl>}
        {item.slug === "emmys-milestones" ? <EmmyPreview /> : item.slug === "sbir-radar" ? <SbirPreview /> : item.slug === "velveteen" ? <VelveteenPreview /> : item.cover && <figure className={`case-cover case-cover-${item.slug}`}>
          <Image src={item.cover.src} alt={item.cover.alt} width={item.cover.width} height={item.cover.height} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1440px) calc(100vw - 96px), 1320px" preload />
        </figure>}
        <div className="case-body">
          <nav className="case-toc" aria-label="Case study chapters">
            <ol>{item.sections.map((section, index) => <li key={section.title}><a href={`#chapter-${index + 1}`}>{section.title}</a></li>)}{item.coverage?.length ? <li><a href="#in-the-news">In the news</a></li> : null}</ol>
            {item.links.length > 0 && <div className="case-external">{item.links.map(link => <a className={`text-link${link.href.startsWith("/studies/") ? " design-preview-link" : ""}`} key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}<span aria-hidden="true">↗</span></a>)}</div>}
          </nav>
          <article className="case-prose" aria-label={`${item.title} case study`}>
            <p className="case-summary">{item.summary}</p>
            {item.sections.map((section, index) => (
              <section className="story-section" id={`chapter-${index + 1}`} key={section.title} aria-labelledby={`heading-${index + 1}`}>
                <h2 id={`heading-${index + 1}`}>{section.title}</h2>
                {section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                <SectionVisuals visuals={item.visuals?.filter(visual => visual.afterSection === index) || []} />
              </section>
            ))}
            {item.coverage?.length ? <section className={`story-section ${coverageStyles.coverage}`} id="in-the-news" aria-labelledby="coverage-heading">
              <h2 id="coverage-heading">In the news</h2>
              <p className={coverageStyles.context}>Public reporting on Jigsaw’s development and adoption. These articles cover the broader program at different stages; their reported results are separate from the project outcomes above.</p>
              <ul className={coverageStyles.list}>
                {item.coverage.map(article => <li key={article.href}>
                  <a href={article.href} target="_blank" rel="noreferrer">
                    <div className={coverageStyles.meta}><span>{article.publisher}</span><time dateTime={article.date}>{article.dateLabel}</time></div>
                    <h3>{article.title}<span aria-hidden="true">↗</span></h3>
                    <p>{article.summary}</p>
                  </a>
                </li>)}
              </ul>
            </section> : null}
            {item.provenance && <p className="case-note">{item.provenance}</p>}
          </article>
        </div>
        <section className="next-case" aria-labelledby="next-heading">
          <h2 id="next-heading" className="eyebrow">Next case study</h2>
          <Link href={`/work/${nextItem.slug}`}><span>{nextItem.title}</span><span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function SectionVisuals({ visuals }: { visuals: WorkVisual[] }) {
  if (!visuals.length) return null;
  const phones = visuals.filter(visual => visual.layout === "phone");
  const standard = visuals.filter(visual => visual.layout !== "phone");
  return <div className="story-visuals">
    {standard.map(visual => <Artifact key={visual.src} visual={visual} />)}
    {phones.length > 0 && <div className="story-phones">{phones.map(visual => <Artifact key={visual.src} visual={visual} />)}</div>}
  </div>;
}

function Artifact({ visual }: { visual: WorkVisual }) {
  return <figure className="story-visual">
    <a href={visual.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${visual.label}`}>
      <Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} sizes={visual.layout === "phone" ? "(max-width: 767px) 44vw, 280px" : "(max-width: 767px) calc(100vw - 40px), (max-width: 1440px) calc(100vw - 96px), 1320px"} />
    </a>
    <figcaption><span>{visual.label}</span><span>{visual.caption}</span></figcaption>
  </figure>;
}
