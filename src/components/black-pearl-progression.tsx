"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import styles from "./black-pearl-progression.module.css";
const steps = [
  {title:"Bring the pieces together",src:"black-pearl-wireframe-1.svg",text:"Shift notes, the request queue, and tool links share one page. Everything is available, but nothing clearly comes first."},
  {title:"Prioritize one task",src:"black-pearl-wireframe-focus.svg",text:"One assigned task replaces the full queue on the home screen. Changeover notes remain beside it, and the rest of the requests move into their own view."},
  {title:"Give the task a location",src:"black-pearl-wireframe-2.svg",text:"Changeover moves behind a button. A small location preview accompanies the task, while tool shortcuts remain separate tiles below."},
  {title:"Refine the visual hierarchy",src:"black-pearl-wireframe-contrast.svg",text:"The map expands to match the task, tool tiles become a compact table, and a dark surface establishes the visual direction."},
  {title:"Resolve the working screen",src:"black-pearl-shift-current.png",text:"The final prototype adds the detailed map, live clocks, RFI workflows, and an on-demand coordinate converter. Tools remain a simple table."},
];
export function BlackPearlProgression(){
 const [index,setIndex]=useState(0);const start=useRef<number|null>(null);const step=steps[index];
 const move=(n:number)=>setIndex(i=>Math.max(0,Math.min(steps.length-1,i+n)));
 return <section className={styles.carousel} aria-label="Black Pearl design progression" aria-roledescription="carousel" onKeyDown={e=>{if(e.key==="ArrowRight"){e.preventDefault();move(1);}if(e.key==="ArrowLeft"){e.preventDefault();move(-1);}}}>
  <div className={styles.stage} onTouchStart={e=>{start.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(start.current!==null){const delta=e.changedTouches[0].clientX-start.current;if(Math.abs(delta)>60)move(delta<0?1:-1);}start.current=null;}}>
   <a href={`/artifacts/redesigned/${step.src}`} target="_blank" rel="noreferrer" aria-label={`Open full-size: ${step.title}`}><Image key={step.src} src={`/artifacts/redesigned/${step.src}`} alt={step.title} width={1440} height={index===4?1000:820} sizes="(max-width:767px) calc(100vw - 40px), 900px" /></a>
  </div>
  <div className={styles.controls}><div className={styles.steps} aria-label="Choose iteration">{steps.map((s,i)=><button key={s.src} aria-label={`Iteration ${i+1}: ${s.title}`} aria-current={index===i?"step":undefined} onClick={()=>setIndex(i)}>{i+1}</button>)}</div><div className={styles.arrows}><button aria-label="Previous iteration" disabled={index===0} onClick={()=>move(-1)}><ArrowLeft size={19}/></button><button aria-label="Next iteration" disabled={index===steps.length-1} onClick={()=>move(1)}><ArrowRight size={19}/></button></div></div>
  <div className={styles.caption} aria-live="polite" aria-atomic="true"><h3>{step.title}</h3><p>{step.text}</p></div>
 </section>;
}
