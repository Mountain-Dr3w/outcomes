"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { VerifluxMap } from "./veriflux-map";
import { ArrowRight, Check, MapTrifold, Minus, Plus, Truck, Cube, ArrowsOutSimple, SquaresFour, SlidersHorizontal, ClipboardText, Headset } from "@phosphor-icons/react";
import styles from "./veriflux.module.css";

const routes = [
  { id: 1, area: "Northeast", driver: "Bob Robins", status: "In progress", stops: 3, done: 1, load: 2161, window: "08:00–12:00", locations: ["Silver Spring", "College Park", "Riverdale Park"] },
  { id: 2, area: "Northwest", driver: "Susan Scott", status: "In progress", stops: 4, done: 2, load: 1840, window: "08:30–13:00", locations: ["Bethesda", "McLean", "Arlington", "Falls Church"] },
  { id: 3, area: "Southwest", driver: "Jill Walker", status: "Complete", stops: 5, done: 5, load: 1520, window: "07:00–11:00", locations: ["Seven Corners", "Bailey’s Crossroads", "Alexandria", "Annandale", "Springfield"] },
  { id: 4, area: "Southeast", driver: "Paul Thompson", status: "Scheduled", stops: 4, done: 0, load: 1290, window: "13:00–16:30", locations: ["Capitol Hill", "Anacostia", "Suitland", "Forestville"] },
];
const materials = [
  { name: "Collected", color: "#138368", values: [160,200,275,315,265,170,245], description: "Recorded at pickup" },
  { name: "In facility", color: "#37495f", values: [230,320,345,280,200,165,255], description: "Received for processing" },
  { name: "In reconciliation", color: "#ba772f", values: [335,265,165,145,230,265,240], description: "Awaiting a matched record" },
];
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export function VerifluxStudy({ screen, initialDate = "2025-05-12" }: { screen: string; initialDate?: string }) {
  const reporting = screen === "materials";
  const [selectedId,setSelectedId] = useState(1);
  const [routeDate,setRouteDate] = useState(initialDate);
  const dateHasRoutes = routeDate === "2025-05-12";
  const [previewSection,setPreviewSection] = useState<string | null>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (previewSection) previewDialog.current?.showModal(); else previewDialog.current?.close(); }, [previewSection]);
  const [filter,setFilter] = useState("All routes");
  const [zoom,setZoom] = useState(1);
  const [metric,setMetric] = useState("All stages");
  const visible = (dateHasRoutes ? routes : []).filter(r=>(filter === "All routes" || r.status === filter));
  const selected = visible.find(r=>r.id===selectedId) ?? visible[0];
  return <div className={styles.app}>
    <dialog ref={previewDialog} className={styles.previewNotice} onClose={()=>setPreviewSection(null)}><div><h2>{previewSection}</h2><p>This section belongs to the delivered product. This portfolio preview includes the route and material-reporting screens.</p><button onClick={()=>setPreviewSection(null)}>Back to the preview</button></div></dialog>
    <aside className={styles.sidebar}>
      <Link href="/studies/veriflux/routes" className={styles.brand} aria-label="Veriflux"><span className={styles.realLogo}><Image src="/artifacts/redesigned/veriflux-official-logo.png" alt="Veriflux" width={1726} height={536}/><Image src="/artifacts/redesigned/veriflux-official-logo.png" alt="" aria-hidden="true" width={1726} height={536}/></span></Link>
      <nav aria-label="Veriflux workspace">
        <Link href="/studies/veriflux/materials" aria-current={reporting ? "page" : undefined}><SquaresFour size={20}/>Home</Link>
        <button onClick={()=>setPreviewSection('Offloads')}><ClipboardText size={20}/>Offloads</button>
        <Link href="/studies/veriflux/routes" aria-current={!reporting ? "page" : undefined}><MapTrifold size={20}/>Routes<span>{dateHasRoutes ? 4 : 0}</span></Link>
        <button onClick={()=>setPreviewSection('Compliance')}><ClipboardText size={20}/>Compliance</button>
        <button onClick={()=>setPreviewSection('Support')}><Headset size={20}/>Support</button>
      </nav>

    </aside>
    <main id="main" className={styles.main}>

      <div className={`${styles.content} ${!reporting ? styles.routeContent : styles.reportContent}`}>
        <div className={styles.heading}><div><h1>{reporting ? "Material reporting" : "Collection routes"}</h1><p>{reporting ? "Follow material from pickup through reconciliation." : "Manage the day’s pickups across the Washington area."}</p></div><div className={styles.dateActions}><label className={styles.datePicker}><span>{reporting ? "Report date" : "Route date"}</span><input type="date" aria-label={reporting ? "Report date" : "Route date"} value={routeDate} onInput={e=>setRouteDate(e.currentTarget.value)} onChange={e=>setRouteDate(e.target.value)} /></label>{!reporting && <><button className={styles.filterTrigger} popoverTarget="route-filters"><SlidersHorizontal size={17}/>Filters{filter!=="All routes" && <span>1</span>}</button><div id="route-filters" popover="auto" className={styles.filterPopover}><fieldset><legend>Route status</legend>{['All routes','In progress','Complete','Scheduled'].map(status=><label key={status}><input type="radio" name="route-status" value={status} checked={filter===status} onChange={()=>setFilter(status)}/>{status}</label>)}</fieldset><button className={styles.clearFilter} onClick={()=>setFilter('All routes')}>Clear filters</button><button className={styles.closeFilter} popoverTarget="route-filters" popoverTargetAction="hide">Done</button></div></>}{reporting && <Link className={styles.reviewRoutes} href={`/studies/veriflux/routes?date=${routeDate}`}>Review daily routes<ArrowRight size={16}/></Link>}</div></div>
        {reporting ? dateHasRoutes ? <>
          <div className={styles.reportStats}>
            {[['463','lb offloaded'],['7','active drivers'],['16','scheduled pickups'],['9','completed pickups']].map(([n,label])=><div key={label}><strong>{n}</strong><span>{label}</span></div>)}
          </div>
          <section className={styles.reportChart} aria-labelledby="material-chart-title">
            <div className={styles.sectionHead}><div><h2 id="material-chart-title">Material by stage</h2><p>May 12–18, 2025 · Recorded weight in lb</p></div><label>Show <select value={metric} onChange={e=>setMetric(e.target.value)}>{['All stages',...materials.map(m=>m.name)].map(m=><option key={m}>{m}</option>)}</select></label></div>
            <div className={styles.legend}>{materials.filter(m=>metric==='All stages'||metric===m.name).map(m=><span key={m.name}><i style={{background:m.color}}/>{m.name}</span>)}</div>
            <svg className={styles.chart} viewBox="0 0 950 280" role="img" aria-label={`Daily material weight for ${metric.toLowerCase()}; exact values are in the table below.`}>
              {[0,100,200,300,400].map(v=><g key={v}><line x1="50" x2="920" y1={235-v*.5} y2={235-v*.5} stroke="#e5eae7"/><text x="35" y={239-v*.5} textAnchor="end" fill="#6b7772" fontSize="11">{v}</text></g>)}
              {days.map((day,i)=><text key={day} x={65+i*139} y="264" textAnchor="middle" fill="#6b7772" fontSize="12">{day}</text>)}
              {materials.filter(m=>metric==='All stages'||metric===m.name).map(m=><g key={m.name}><polyline points={m.values.map((v,i)=>`${65+i*139},${235-v*.5}`).join(' ')} fill="none" stroke={m.color} strokeWidth="2.5" strokeLinejoin="round"/>{m.values.map((v,i)=><circle key={i} cx={65+i*139} cy={235-v*.5} r="4" fill="white" stroke={m.color} strokeWidth="2"/>)}</g>)}
            </svg>
          </section>
          <div className={styles.reportingLower}><section><h2>Weekly record</h2><div className={styles.tableScroll}><table><caption className={styles.srOnly}>Daily recorded material weight in pounds</caption><thead><tr><th scope="col">Stage</th>{days.map(d=><th key={d} scope="col">{d}</th>)}</tr></thead><tbody>{materials.filter(m=>metric==='All stages'||metric===m.name).map(m=><tr key={m.name}><th scope="row"><i style={{background:m.color}}/>{m.name}</th>{m.values.map((v,i)=><td key={i}>{v}</td>)}</tr>)}</tbody></table></div></section>
          <aside className={styles.explanation}><Cube size={24}/><h2>Three stages, one record</h2>{materials.map(m=><div key={m.name}><strong>{m.name}</strong><p>{m.description}</p></div>)}</aside></div>
        </> : <section className={styles.emptyReport}><h2>No report for this date</h2><p>This example has material records for the week beginning May 12, 2025.</p><button onClick={()=>setRouteDate("2025-05-12")}>View May 12</button></section> : <>

          <div className={styles.routeWorkspace}>
            <section className={styles.routeList} aria-label="Collection routes"><div className={styles.listHeading}>{visible.length} routes <span>Pickup progress</span></div>{visible.map(r=><button key={r.id} className={`${styles.route} ${selected?.id===r.id?styles.selected:''}`} aria-pressed={selected?.id===r.id} onClick={()=>setSelectedId(r.id)}><div className={styles.routeTop}><strong><span className={styles.routeNumber}>{String(r.id).padStart(2, "0")}</span>{r.area}</strong><span className={r.status==='In progress'?styles.inProgress:styles.status}>{r.status}</span></div><dl className={styles.cardFacts}><div><dt>Driver</dt><dd>{r.driver}</dd></div><div><dt>Collection window</dt><dd>{r.window}</dd></div><div><dt>Estimated load</dt><dd>{r.load.toLocaleString()} lb</dd></div><div><dt>Pickups</dt><dd>{r.done} of {r.stops} complete</dd></div></dl><div className={styles.progress} aria-label={`${r.done} of ${r.stops} pickups complete`}><span style={{width:`${r.done/r.stops*100}%`}}/></div></button>)}{visible.length===0&&<div className={styles.empty}><h2>{dateHasRoutes ? "No routes found" : "No routes for this date"}</h2><p>{dateHasRoutes ? "Try another route status." : "This example has route records for May 12, 2025."}</p><button onClick={()=>{setFilter('All routes');setRouteDate("2025-05-12");}}>{dateHasRoutes ? "Clear filters" : "View May 12"}</button></div>}</section>
            <section className={styles.mapPanel} aria-label="Route map and selected route">
              <div className={styles.map}>
                <VerifluxMap zoom={zoom} selectedId={selected?.id ?? 1} showVehicles={dateHasRoutes} />
                <span className={styles.mapLabel}>Washington area <span>{selected ? `Route ${selected.id} highlighted` : "All routes"}</span></span>
                <div className={styles.mapControls}><button aria-label="Zoom in" disabled={zoom>=1.8} onClick={()=>setZoom(z=>Math.min(1.8,z+.2))}><Plus size={17}/></button><button aria-label="Zoom out" disabled={zoom<=1} onClick={()=>setZoom(z=>Math.max(1,z-.2))}><Minus size={17}/></button><button aria-label="Reset map" onClick={()=>setZoom(1)}><ArrowsOutSimple size={17}/></button></div>
                <span className={styles.mapCredit}>Illustrative routes and vehicles · © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a></span>
              </div>
              {selected && <div className={styles.routeDetail} aria-live="polite"><div className={styles.detailTitle}><div><small>SELECTED ROUTE</small><h2>Route {selected.id} <span>{selected.area}</span></h2></div><Truck size={25}/></div><dl><div><dt>Driver</dt><dd>{selected.driver}</dd></div><div><dt>Collection window</dt><dd>{selected.window}</dd></div><div><dt>Estimated load</dt><dd>{selected.load.toLocaleString()} lb</dd></div></dl><ol className={styles.stops} aria-label="Route stops">{selected.locations.map((l,i)=><li key={l}><span className={`${styles.stopNode} ${i<selected.done ? styles.stopComplete : ""}`} aria-label={i<selected.done ? "Completed" : "Upcoming"}>{i<selected.done && <Check size={11} weight="bold"/>}</span><span>{l}</span></li>)}</ol></div>}
            </section>
          </div>
        </>}

      </div>
    </main>
  </div>;
}
