'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './hero-comparison.module.css';
const options = [
 {id:'bearing',name:'Bearing',font:'Tomorrow',description:'Compact and left-aligned, with room for the terrain to move.'},
 {id:'horizon',name:'Horizon',font:'Chakra Petch',description:'Centered and panoramic, with more open landscape below the introduction.'},
 {id:'traverse',name:'Traverse',font:'Space Grotesk',description:'An oversized headline with the introduction anchored at the lower right on desktop.'},
];
export function HeroComparison() {
 const [selected,setSelected] = useState('bearing');
 const option = options.find(o=>o.id===selected)!;
 return <main id="main" className={styles.page}>
  <header><Link href="/">← Portfolio</Link><h1>Three ways through the terrain.</h1><p>Compare the same hero at desktop and mobile sizes. Traverse is now the homepage layout; the other directions remain here for comparison.</p></header>
  <nav aria-label="Hero layout options" className={styles.tabs}>{options.map(o=><button aria-pressed={selected===o.id} key={o.id} onClick={()=>setSelected(o.id)}>{o.name}<span>{o.font}</span></button>)}</nav>
  <div className={styles.description}><p>{option.description}</p><a href={`/explore/hero/${selected}`} target="_blank" rel="noreferrer">Open responsive preview ↗</a></div>
  <div className={styles.frames}>
   <section><h2>Desktop · 1440px</h2><div className={styles.desktop}><iframe key={selected+'web'} src={`/explore/hero/${selected}`} title={`${option.name} desktop preview`} /></div></section>
   <section><h2>Mobile · 390px</h2><div className={styles.mobile}><iframe key={selected+'mobile'} src={`/explore/hero/${selected}`} title={`${option.name} mobile preview`} /></div></section>
  </div>
  <p className={styles.note}>All three keep the moving terrain and its pause control. Each has its own layout below 768px. Font choices are limited to the headline so the introduction stays easy to read.</p>
 </main>;
}
