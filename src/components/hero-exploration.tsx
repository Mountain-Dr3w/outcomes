import Link from 'next/link';
import { ContourField } from './contour-field';
import { SiteHeader } from './site-header';
import styles from './hero-exploration.module.css';

export const heroOptions = [
  { id: 'bearing', name: 'Bearing', font: 'Tomorrow', description: 'Left-aligned, compact introduction. The open right side gives the terrain room to move. On mobile, the introduction follows the headline above the landscape.' },
  { id: 'horizon', name: 'Horizon', font: 'Chakra Petch', description: 'Centered and panoramic. A quieter introduction sits below the headline; the landscape takes the lower half. Mobile keeps that sequence with shorter lines.' },
  { id: 'traverse', name: 'Traverse', font: 'Space Grotesk', description: 'A large headline spans the page, with the introduction anchored at the lower right. On mobile, the headline and introduction stack over the terrain.' },
];
export function HeroExploration({ variant }: { variant: string }) {
  return <div className={`${styles.preview} ${styles[variant]}`}>
    <SiteHeader />
    <main id="main">
      <section className={styles.hero} aria-labelledby="intro-heading">
        <ContourField />
        <div className={styles.composition}>
          <h1 id="intro-heading"><span>Product design for</span><span>the mission ahead.</span></h1>
          <div className={styles.intro}>
            <p>I’m Drew, a senior product designer focused on GovTech. I work closely with the people behind the mission to understand what gets in their way, then design software that helps them move forward.</p>
            <Link href="/#work" target="_top" className={styles.workLink}>View work <span aria-hidden="true">↘</span></Link>
          </div>
        </div>
      </section>
    </main>
  </div>;
}
