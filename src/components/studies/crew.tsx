"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check, ArrowLeft, FileText, Crosshair, ChatCircle, BookOpen, X, MagnifyingGlass, Circle, ArrowsLeftRight } from "@phosphor-icons/react";
import styles from "./crew.module.css";
import { CrewClocks, CrewUtilities } from "./crew-utilities";

const requests = [
  {id:"RFI-024",title:"Coastal access assessment",type:"Imagery review",due:"09:30",owner:"You",status:"In progress",description:"Review the latest imagery package for changes to road access following the exercise weather event. Flag areas where coverage is incomplete.",next:"Review FMV imagery of the marked coastal area for debris, standing water, or damaged road sections that could limit access. Note where the route remains clear, flag any gaps in coverage, and attach a short summary with timestamps for the incoming crew.",tool:"Imagery workspace"},
  {id:"RFI-027",title:"Airfield condition update",type:"Change assessment",due:"11:00",owner:"Unassigned",status:"Needs owner",description:"Check the exercise airfield imagery against the previous shift’s baseline. Summarize visible changes and note any gaps in coverage.",next:"Review the baseline package and identify any changes to the airfield.",tool:"Imagery workspace"},
  {id:"RFI-021",title:"Morning situation summary",type:"Reporting",due:"12:00",owner:"You",status:"Waiting on input",description:"Consolidate the crew’s observations into the morning exercise summary. One supporting assessment is still outstanding.",next:"Review the current draft and confirm the outstanding input with the crew lead.",tool:"Report editor"},
];
const tools = [
  {name:"Coordinate converter",category:"UTILITY",description:"Convert MGRS and latitude / longitude",icon:ArrowsLeftRight},
  {name:"Imagery workspace",category:"EXPLOITATION",description:"Review, compare, annotate",icon:Crosshair},
  {name:"Report editor",category:"PRODUCTION",description:"Draft and publish assessments",icon:FileText},
  {name:"Reference library",category:"KNOWLEDGE",description:"Sources, guides, previous products",icon:BookOpen},
  {name:"Crew chat",category:"COORDINATION",description:"Connect with the watch floor",icon:ChatCircle},
];

export function CrewStudy() {
  const [selected,setSelected]=useState<number|null>(null);
  const [filter,setFilter]=useState("All requests");
  const [query,setQuery]=useState("");
  const [ack,setAck]=useState(false);
  const [claimed,setClaimed]=useState(false);
  const [complete,setComplete]=useState<string[]>([]);
  const [tool,setTool]=useState<string|null>(null);
  const [tab,setTab]=useState("Overview");
  const changeover=useRef<HTMLDialogElement>(null);
  const details=useRef<HTMLDialogElement>(null);
  const toolDialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{if(selected!==null)details.current?.showModal();else details.current?.close();},[selected]);
  useEffect(()=>{if(tool)toolDialog.current?.showModal();else toolDialog.current?.close();},[tool]);
  const request=selected===null?null:requests[selected];
  const owner=(r:typeof requests[number])=>r.id==="RFI-027"&&claimed?"You":r.owner;
  const status=(r:typeof requests[number])=>complete.includes(r.id)?"Complete":r.id==="RFI-027"&&claimed?"In progress":r.status;
  const visible=requests.filter(r=>(filter!=="Assigned to me"||owner(r)==="You")&&(filter!=="Needs owner"||owner(r)==="Unassigned")&&`${r.id} ${r.title}`.toLowerCase().includes(query.toLowerCase()));
  const nextRequest=requests.find(r=>owner(r)==="You"&&!complete.includes(r.id)&&status(r)!=="Waiting on input");
  return <div className={styles.app}>
    <header className={styles.header}>
      <Link href="/work/isr-crew" className={styles.brand}><svg className={styles.brandMark} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M5 35V5M6 7c10-4 19 4 29 0v22c-10 4-19-4-29 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><g transform="matrix(1 .16 0 1 0 -3.3)"><path d="M16 16a5 5 0 1 1 10 0c0 1.8-1 2.8-2.5 3.5V22h-5v-2.5C17 18.8 16 17.8 16 16Z" fill="currentColor"/><circle cx="19" cy="16" r="1.1" fill="#141516"/><circle cx="23" cy="16" r="1.1" fill="#141516"/><path d="m16 22.5 10 3m0-3-10 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></g></svg><span>The Black Pearl</span></Link>
      <nav aria-label="Workspace">{["Overview","Requests","Tools"].map(t=><button key={t} aria-current={tab===t?"page":undefined} onClick={()=>t==="Tools"?setTool("Tools"):setTab(t)}>{t}</button>)}</nav>
      <div className={styles.profile}><span>JW</span><div>Jordan Wells</div></div>
    </header>
    <main id="main" className={styles.main}>
      <div className={styles.heading}><div><h1>{tab==="Overview"?"12 May | Day Shift":tab==="Requests"?"Requests & tasks":"Tools"}</h1><button className={styles.secondary} onClick={()=>changeover.current?.showModal()}>Changeover</button></div><CrewClocks /></div>
      <div className={tab==="Tools"?styles.toolsOnly:styles.layout}>
        {tab!=="Tools"&&<div className={styles.primaryColumn}>
          {tab==="Overview"&&<>
            <section className={styles.nextTask} aria-labelledby="next-task-title">
              <div className={styles.sectionHead}><h2 id="next-task-title">Up next</h2></div>
              {nextRequest?<><div className={styles.nextTaskTitle}><h3>{nextRequest.title}</h3><span>Due {nextRequest.due} Z</span></div><p>{nextRequest.next}</p><div className={styles.requestActions}><button className={styles.secondary} onClick={()=>setTab("Requests")}>All requests</button><button className={styles.primary} onClick={()=>setSelected(requests.indexOf(nextRequest))}>Open request<ArrowRight size={16} aria-hidden="true"/></button></div></>:<><h3>You’re caught up.</h3><p>Review the request list for work waiting on input or an owner.</p></>}
              {nextRequest&&<figure className={styles.taskMap} aria-label="Coastal task area" tabIndex={0}><svg viewBox="0 0 480 220" preserveAspectRatio="xMidYMid slice" fill="none" role="img" aria-label="General coastal task area"><defs><pattern id="crew-map-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" stroke="#31383a" strokeWidth=".6"/></pattern></defs><rect width="480" height="220" fill="#111719"/><path d="M0 0H301C299 14 278 21 284 33S301 46 287 59S262 67 269 83S282 96 263 109S239 119 247 136S235 160 226 173S219 197 217 220H0Z" fill="#242b2c"/><rect width="480" height="220" fill="url(#crew-map-grid)"/><path d="M301 0C299 14 278 21 284 33S301 46 287 59S262 67 269 83S282 96 263 109S239 119 247 136S235 160 226 173S219 197 217 220" stroke="#738184" strokeWidth="1.3"/><g stroke="#475253" strokeWidth="1"><path d="M38 0C52 27 61 52 91 65S128 85 145 112S181 140 186 164S190 197 196 220M0 118C40 114 60 126 87 107S133 72 163 69S225 91 269 76M82 220C87 192 96 170 119 150S149 120 183 119S227 114 258 103M175 0C164 34 166 60 185 88S217 119 221 152S212 191 217 220"/><path d="M20 32C44 21 56 12 73 21S107 38 98 58M19 175C37 157 54 144 83 159M135 18Q132 33 141 44M119 192Q157 165 175 195" stroke="#354042"/></g><path d="M216 75L269 78 289 111 264 148 212 140 197 107Z" fill="#d4dedd" fillOpacity=".06" stroke="#b3c5c5" strokeDasharray="4 5"/><circle cx="242" cy="112" r="5" fill="#dce7e6"/><circle cx="242" cy="112" r="11" stroke="#dce7e6" strokeOpacity=".45"/><path d="M242 112L313 83H402" stroke="#a5b8b8" strokeWidth=".8"/><text x="317" y="74" fill="#c6d0d0" fontSize="11" fontFamily="sans-serif">Task area</text><path d="M445 43V21M440 27L445 21 450 27" stroke="#a5b1b2"/><text x="441" y="14" fill="#a5b1b2" fontSize="9" fontFamily="sans-serif">N</text></svg><span className={styles.mapHover}>Open map<ArrowUpRight size={17} aria-hidden="true"/></span></figure>}
            </section>
          </>}
          {tab==="Requests"&&<section className={styles.tasking} aria-labelledby="tasking-title"><div className={styles.sectionHead}><h2 id="tasking-title">Tasking</h2><label className={styles.search}><MagnifyingGlass size={16} aria-hidden="true"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a request" aria-label="Find a request"/></label></div><div className={styles.filters}>{["All requests","Assigned to me","Needs owner"].map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}</div>
            <div className={styles.tableWrap}><table><thead><tr><th scope="col">Request</th><th scope="col">Status</th><th scope="col">Owner</th><th scope="col">Due / Z</th><th scope="col"><span className={styles.srOnly}>Open</span></th></tr></thead><tbody>{visible.map(r=><tr key={r.id}><td><button className={styles.requestLink} onClick={()=>setSelected(requests.indexOf(r))}><span>{r.id}</span><strong>{r.title}</strong></button></td><td><span className={styles.status} data-status={status(r)}><Circle weight={status(r)==="Complete"?"fill":"regular"} size={9} aria-hidden="true"/>{status(r)}</span></td><td className={styles.owner}>{owner(r)}</td><td className={styles.due}>{r.due}</td><td><button className={styles.rowArrow} aria-label={`Open ${r.id}`} onClick={()=>setSelected(requests.indexOf(r))}><ArrowRight size={17}/></button></td></tr>)}</tbody></table>{!visible.length&&<div className={styles.empty}><h3>No matching requests</h3><button onClick={()=>{setQuery("");setFilter("All requests");}}>Clear filters</button></div>}</div><div className={styles.tableFooter}>{visible.length} requests<span>All times Zulu</span></div>
          </section>}
        </div>}

      </div>
      <section className={styles.toolsTable} aria-labelledby="tools-title"><h2 id="tools-title">Tools</h2><table><thead><tr><th>Tool</th><th>Use it for</th><th><span className={styles.srOnly}>Open tool</span></th></tr></thead><tbody>{tools.map(t=><tr key={t.name}><td colSpan={3}><button aria-label={t.name} onClick={()=>setTool(t.name)}><span><t.icon size={19} aria-hidden="true"/>{t.name}</span><span>{t.description}</span><ArrowUpRight size={17} aria-hidden="true"/></button></td></tr>)}</tbody></table></section>
      <footer className={styles.footer}><Link href="/work/isr-crew"><ArrowLeft size={14} aria-hidden="true"/>Back to case study</Link><span>Exercise workspace</span></footer>
    </main>
    <dialog ref={changeover} className={styles.toolDialog} aria-label="Changeover"><div className={styles.dialogTop}><span>Changeover · 06:42 Z</span><button aria-label="Close changeover" onClick={()=>changeover.current?.close()}><X size={22}/></button></div><h2>From the night crew</h2><p>Coastal imagery is ready. The airfield review still needs an owner, and the morning summary is waiting on one assessment.</p><button className={styles.primary} onClick={()=>{setAck(true);changeover.current?.close();}}><Check size={16}/>{ack?"Reviewed":"Mark as reviewed"}</button></dialog>
    <dialog ref={details} className={styles.detailDialog} onClose={()=>setSelected(null)} aria-labelledby="request-title">{request&&<><div className={styles.dialogTop}><span>{request.id} / {request.type}</span><button aria-label="Close request" onClick={()=>setSelected(null)}><X size={22}/></button></div><h2 id="request-title">{request.title}</h2><p className={styles.description}>{request.description}</p><dl className={styles.properties}><div><dt>Owner</dt><dd>{owner(request)}</dd></div><div><dt>Due today</dt><dd>{request.due} Z</dd></div><div><dt>Status</dt><dd>{status(request)}</dd></div></dl><div className={styles.next}><span>NEXT ACTION</span><p>{complete.includes(request.id)?"Assessment complete. Your update is ready for the next crew.":request.next}</p></div><div className={styles.detailActions}><button className={styles.secondary} onClick={()=>setComplete(complete.includes(request.id)?complete.filter(id=>id!==request.id):[...complete,request.id])}>{complete.includes(request.id)?"Reopen request":"Mark complete"}</button>{owner(request)==="Unassigned"?<button className={styles.primary} onClick={()=>setClaimed(true)}>Assign to me</button>:<button className={styles.primary} onClick={()=>setTool(request.tool)}>Open {request.tool.toLowerCase()}<ArrowUpRight size={16} aria-hidden="true"/></button>}</div><div className={styles.references}><h3>Related material</h3>{["Previous shift’s assessment","Collection notes & coverage"].map(t=><button key={t} onClick={()=>setTool(t)}><FileText size={16} aria-hidden="true"/>{t}<ArrowUpRight size={15} aria-hidden="true"/></button>)}</div></>}</dialog>
    <dialog ref={toolDialog} className={`${styles.toolDialog} ${styles.launchDialog}`} onClose={()=>setTool(null)} aria-label={tool||"Tool preview"}><div className={styles.dialogTop}><h2>{tool}</h2><button aria-label="Close tool preview" onClick={()=>setTool(null)}><X size={22}/></button></div>{tool==="Coordinate converter"?<CrewUtilities embedded />:tool==="Tools"?<><p>Only available in the working app.</p><button className={styles.primary} onClick={()=>setTool(null)}>Got it</button></>:<>{request&&<p>{request.id} · {request.title}</p>}<p>This preview keeps you in The Black Pearl. The connected workspace would open the selected tool{request?" with this request’s context":""}.</p><button className={styles.primary} onClick={()=>setTool(null)}>Back to crew page</button></>}</dialog>
  </div>;
}
