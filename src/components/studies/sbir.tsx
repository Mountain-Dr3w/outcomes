"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowLeft, ArrowUpRight, Bell, BookmarkSimple, CaretRight, Check, CheckCircle, FunnelSimple, ListBullets, MagnifyingGlass, Plus, SlidersHorizontal, StackSimple, WarningCircle, X } from "@phosphor-icons/react";
import styles from "./sbir.module.css";

type Topic = { id: string; agency: string; division?: string; phase: string; title: string; summary: string; deadline: string; source: string; sourceUrl: string; radar: string };
const topics: Topic[] = [
  { id: "AFWERX-25.4-D-R12", agency: "DoD", division: "USSF", phase: "II", title: "DAF specific topics", summary: "AFWERX and SpaceWERX research opportunities for the Department of the Air Force.", deadline: "6 days left", source: "Agency site", sourceUrl: "https://afwerx.com/", radar: "SpaceWERX / USSF" },
  { id: "COSMO.3.S26B", agency: "NASA", phase: "I", title: "AI for space precision components", summary: "Text-to-Spaceship: using design automation to accelerate space hardware development.", deadline: "Closes May 21", source: "SBIR.gov", sourceUrl: "https://www.sbir.gov/", radar: "NASA space hardware" },
];
const startingRadars = [
  { name: "SpaceWERX / USSF", agency: "DoD · USSF", phase: "II", keywords: "", count: 2 },
  { name: "NASA space hardware", agency: "NASA", phase: "I", keywords: "space, hardware", count: 8 },
  { name: "DAF pre-release topics", agency: "DoD · DAF", phase: "I", keywords: "", count: 2 },
];

// Keep preview choices when moving between the study's screens, without a backend.
const initialPreview = { saved: ["COSMO.3.S26B"], radars: startingRadars, agency: "All agencies", radar: "" };
const previewKey = "sbir-design-preview-v1";
let preview = initialPreview;
let storedPreview: string | null = null;
const listeners = new Set<() => void>();
function subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; }
function updatePreview(change: Partial<typeof initialPreview>) {
  preview = { ...getPreview(), ...change };
  try { storedPreview = JSON.stringify(preview); sessionStorage.setItem(previewKey, storedPreview); } catch { /* Preview still works if storage is unavailable. */ }
  listeners.forEach((listener) => listener());
}
function getPreview() {
  try {
    const stored = sessionStorage.getItem(previewKey);
    if (stored && stored !== storedPreview) {
      const data = JSON.parse(stored);
      if (Array.isArray(data.saved) && Array.isArray(data.radars) && typeof data.agency === "string" && typeof data.radar === "string") preview = data;
      storedPreview = stored;
    }
  } catch { /* Use the representative initial state when storage cannot be read. */ }
  return preview;
}
function getServerPreview() { return initialPreview; }

export function SbirStudy({ screen }: { screen: string }) {
  const [query, setQuery] = useState("");
  const { saved, radars, agency, radar: activeRadar } = useSyncExternalStore(subscribe, getPreview, getServerPreview);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [radarName, setRadarName] = useState("");
  const [radarAgency, setRadarAgency] = useState("NASA");
  const [radarKeywords, setRadarKeywords] = useState("");
  const [radarPhase, setRadarPhase] = useState("I");
  const [radarUpdates, setRadarUpdates] = useState(true);
  const [deadlineUpdates, setDeadlineUpdates] = useState(true);
  const [status, setStatus] = useState("");
  const details = useRef<HTMLDialogElement>(null);
  const newRadar = useRef<HTMLDialogElement>(null);
  const filters = useRef<HTMLDialogElement>(null);
  const searchDialog = useRef<HTMLDialogElement>(null);
  const isFeed = screen === "opportunities" || screen === "saved";
  const selectedRadar = radars.find((radar) => radar.name === activeRadar);
  const shownTopics = topics.filter((topic) => {
    const searchable = `${topic.title} ${topic.summary} ${topic.id} ${topic.agency} ${topic.division ?? ""}`.toLowerCase();
    const matchesRadar = !selectedRadar || (topic.phase === selectedRadar.phase && selectedRadar.keywords.split(",").filter(Boolean).every((word) => searchable.includes(word.trim().toLowerCase())));
    return matchesRadar && (screen !== "saved" || saved.includes(topic.id)) && (agency === "All agencies" || topic.agency === agency) && searchable.includes(query.toLowerCase());
  });

  function toggleSaved(topic: Topic) {
    const alreadySaved = saved.includes(topic.id);
    updatePreview({ saved: alreadySaved ? saved.filter((id) => id !== topic.id) : [...saved, topic.id] });
    setStatus(`${topic.title} ${alreadySaved ? "removed from" : "added to"} saved topics.`);
  }

  function addRadar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updatePreview({ radars: [...radars, { name: radarName.trim(), agency: radarAgency, phase: radarPhase, keywords: radarKeywords.trim(), count: 0 }] });
    setRadarName("");
    setRadarKeywords("");
    newRadar.current?.close();
    setStatus("Radar added to this design preview.");
  }

  function openTopic(topic: Topic) {
    setSelectedTopic(topic);
    details.current?.showModal();
  }

  const titles: Record<string, string> = { opportunities: "Open Opportunities", radars: "Your radars", saved: "Saved topics", sources: "Sources" };

  return (
    <div className={styles.canvas}>
      <div className={styles.app}>
        <header className={styles.brandbar}>
          <Link href="/work/sbir-radar" aria-label="Back to SBIR Radar case study"className={styles.logo}>
            <span>SBIR <strong>Radar</strong></span></Link>
          <span>Sample data</span>
        </header>
        <main id="main" className={styles.main}>
          <div className={styles.heading}>
            <h1>{titles[screen]}</h1>
            {isFeed && <div className={styles.feedActions}>
              <button className={styles.filterButton} onClick={() => searchDialog.current?.showModal()} aria-label="Search opportunities" aria-haspopup="dialog" data-active={!!query}><MagnifyingGlass size={20} /><span>Search</span></button>
              <button className={styles.filterButton} onClick={() => filters.current?.showModal()} aria-label="Filter opportunities" aria-haspopup="dialog" data-active={agency !== "All agencies" || !!activeRadar}><SlidersHorizontal size={20} /><span>Filters</span></button>
            </div>}
            {screen === "radars" && <button className={styles.squareButton} onClick={() => newRadar.current?.showModal()} aria-label="Create radar"><Plus size={23} /></button>}
          </div>

          {isFeed && <>
            {activeRadar && <p className={styles.intro}>Matches for {activeRadar}</p>}
            {query && <button className={styles.queryChip} onClick={() => setQuery("")} aria-label={`Clear search: ${query}`}>{query}<X size={15} /></button>}
            <div className={styles.feed}>
              {shownTopics.map((topic, index) => <article className={styles.topic} key={topic.id}>
                <div className={styles.topicMeta}>
                  <span className={styles.agency}>{topic.agency}{topic.division && <span> / {topic.division}</span>}</span>
                  <span className={index === 0 ? styles.deadlineSoon : styles.deadline}>{topic.deadline}</span>
                </div>
                <button className={styles.topicTitle} onClick={() => openTopic(topic)}><h2>{topic.title}</h2></button>
                <p className={styles.topicDescription}>{topic.summary}</p>
                <div className={styles.topicDetails}><span>Phase {topic.phase}</span><span>SBIR</span><span>{topic.source}</span></div>
                <div className={styles.topicFooter}>
                  <span className={styles.match}><StackSimple size={16} />{topic.radar}</span>
                  <button className={styles.bookmark} onClick={() => toggleSaved(topic)} aria-label={`${saved.includes(topic.id) ? "Unsave" : "Save"} ${topic.title}`} aria-pressed={saved.includes(topic.id)}><BookmarkSimple size={23} weight={saved.includes(topic.id) ? "fill" : "regular"} /></button>
                </div>
              </article>)}
              {shownTopics.length === 0 && <div className={styles.empty}><MagnifyingGlass size={28} /><h2>No topics here yet</h2><p>{screen === "saved" ? "Save a topic from Opportunities to return to it here." : "Try a different keyword or agency."}</p><button onClick={() => { setQuery(""); updatePreview({ agency: "All agencies", radar: "" }); }}>Clear filters</button></div>}
            </div>
            <Link href="/studies/sbir-radar/sources" className={styles.coverageLink}><WarningCircle size={20} /><span>Some sources are disconnected<small>Check coverage before ruling a topic out.</small></span><CaretRight size={17} /></Link>
          </>}

          {screen === "radars" && <>
            <p className={styles.intro}>Saved searches across agencies and topics.</p>
            <div className={styles.radarList}>
              {radars.map((radar, index) => <Link key={`${radar.name}-${index}`} className={styles.radar} href="/studies/sbir-radar/opportunities" onClick={() => updatePreview({ agency: radar.agency.startsWith("DoD") ? "DoD" : radar.agency, radar: radar.name })}>
                <div className={styles.radarTop}><StackSimple size={22} /><span>{radar.count} <small>matches</small></span></div>
                <h2>{radar.name}</h2>
                <p>{radar.agency}<span>Phase {radar.phase}</span><span>SBIR</span></p>
                {radar.keywords && <div className={styles.keywords}>{radar.keywords.split(",").map((word) => <span key={word}>{word.trim()}</span>)}</div>}
                <div className={styles.radarBottom}><span>View search</span><ArrowUpRight size={17} /></div>
              </Link>)}
            </div>
            <p className={styles.radarHint}>Radars follow a search. Save individual topics when you find something worth pursuing.</p>
          </>}

          {screen === "sources" && <>
            <p className={styles.intro}>Connected feeds and notifications.</p>
            <div className={styles.coverageNotice}><WarningCircle size={23} /><div><h2>Coverage is incomplete</h2><p>Results include connected sources only. A missing topic may still be open elsewhere.</p></div></div>
            <div className={styles.sourceHeading}><h2>Source connections</h2><span>Last sync 4:24 PM</span></div>
            <div className={styles.sources}>
              {[{ name: "Agency sites", description: "Direct agency listings", connected: true }, { name: "SBIR.gov open topics", description: "Public topic listings", connected: true }, { name: "DSIP", description: "Defense submission portal", connected: false }, { name: "SBIR.gov API", description: "Structured topic data", connected: false }].map((source) => <div className={styles.source} key={source.name}>
                <div><h3>{source.name}</h3><p>{source.description}</p></div>
                <span className={source.connected ? styles.connected : styles.disconnected}>{source.connected ? <CheckCircle size={15} weight="fill" /> : <span className={styles.offDot} />}{source.connected ? "Connected" : "Off"}</span>
              </div>)}
            </div>
            <div className={styles.notificationHeading}><Bell size={20} /><h2>Notifications</h2></div>
            <div className={styles.setting}><div><h3>Radar matches</h3><p>When a saved search finds a topic</p></div><button className={styles.switch} role="switch" aria-checked={radarUpdates} aria-label="Radar match notifications" onClick={() => setRadarUpdates(!radarUpdates)}><span /></button></div>
            <div className={styles.setting}><div><h3>Upcoming deadlines</h3><p>For topics you’ve saved</p></div><button className={styles.switch} role="switch" aria-checked={deadlineUpdates} aria-label="Upcoming deadline notifications" onClick={() => setDeadlineUpdates(!deadlineUpdates)}><span /></button></div>
            <p className={styles.sourceFootnote}>Source states and timestamps are from the prototype. This preview does not fetch live opportunities.</p>
          </>}
          {status && <p role="status" className={styles.status}>{status}<button aria-label="Dismiss message" onClick={() => setStatus("")}><X size={16} /></button></p>}
        </main>
        <nav className={styles.tabbar} aria-label="SBIR Radar">
          {([{ id: "opportunities", label: "Explore", icon: ListBullets }, { id: "radars", label: "Radars", icon: StackSimple }, { id: "saved", label: "Saved", icon: BookmarkSimple }, { id: "sources", label: "Sources", icon: FunnelSimple }]).map(({ id, label, icon: Icon }) => <Link key={id} href={`/studies/sbir-radar/${id}`} aria-current={screen === id ? "page" : undefined} onClick={() => updatePreview({ agency: "All agencies", radar: "" })}><Icon size={23} weight={screen === id ? "fill" : "regular"} /><span>{label}</span></Link>)}
        </nav>

        <dialog ref={details} className={styles.dialog} aria-labelledby="topic-detail-title">
          {selectedTopic && <><div className={styles.dialogHeader}><span>Topic details</span><button onClick={() => details.current?.close()} aria-label="Close topic"><X size={23} /></button></div><div className={styles.detailBody}><div className={styles.topicMeta}><span>{selectedTopic.agency} · Phase {selectedTopic.phase}</span><span>{selectedTopic.deadline}</span></div><h2 id="topic-detail-title">{selectedTopic.title}</h2><p>{selectedTopic.summary}</p><dl><div><dt>Topic reference</dt><dd>{selectedTopic.id}</dd></div><div><dt>Funding amount</dt><dd>Not provided in this sample</dd></div><div><dt>Source</dt><dd>{selectedTopic.source}</dd></div></dl><a className={styles.primaryButton} href={selectedTopic.sourceUrl} target="_blank" rel="noreferrer">Visit source website<ArrowUpRight size={18} /></a><p className={styles.sourceFootnote}>This is a representative topic. Confirm the full brief and current deadline with the source.</p></div></>}
        </dialog>
        <dialog ref={searchDialog} className={styles.dialog} aria-labelledby="search-title"><div className={styles.dialogHeader}><h2 id="search-title">Search opportunities</h2><button onClick={() => searchDialog.current?.close()} aria-label="Close search"><X size={23} /></button></div><form className={styles.detailBody} onSubmit={(event) => { event.preventDefault(); searchDialog.current?.close(); }}><label className={styles.search}><MagnifyingGlass size={20} /><input autoFocus type="search" aria-label="Search topics or keywords" placeholder="Search topics or keywords" value={query} onChange={(event) => setQuery(event.target.value)} /></label><button className={styles.primaryButton} type="submit">Show opportunities</button></form></dialog>
        <dialog ref={filters} className={styles.dialog} aria-labelledby="filters-title"><div className={styles.dialogHeader}><h2 id="filters-title">Filter opportunities</h2><button onClick={() => filters.current?.close()} aria-label="Close filters"><X size={23} /></button></div><div className={styles.detailBody}><fieldset><legend>Agency</legend>{["All agencies", "DoD", "NASA"].map((value) => <label className={styles.radio} key={value}><input type="radio" name="agency" checked={agency === value} onChange={() => updatePreview({ agency: value, radar: "" })} />{value}{agency === value && <Check size={18} />}</label>)}</fieldset><button className={styles.primaryButton} onClick={() => filters.current?.close()}>Show opportunities</button></div></dialog>
        <dialog ref={newRadar} className={styles.dialog} aria-labelledby="radar-title"><div className={styles.dialogHeader}><button onClick={() => newRadar.current?.close()} aria-label="Close radar form"><ArrowLeft size={23} /></button><h2 id="radar-title">Create a radar</h2></div><form className={styles.detailBody} onSubmit={addRadar}><label className={styles.field}>Name<input required value={radarName} onChange={(event) => setRadarName(event.target.value)} placeholder="e.g. Space hardware" /></label><label className={styles.field}>Keywords<input value={radarKeywords} onChange={(event) => setRadarKeywords(event.target.value)} placeholder="Separate with commas" /></label><div className={styles.formGrid}><label className={styles.field}>Agency<select value={radarAgency} onChange={(event) => setRadarAgency(event.target.value)}><option>NASA</option><option>DoD</option></select></label><label className={styles.field}>Phase<select value={radarPhase} onChange={(event) => setRadarPhase(event.target.value)}><option>I</option><option>II</option></select></label></div><button className={styles.primaryButton} type="submit"><Plus size={18} />Save radar</button><p className={styles.sourceFootnote}>Saved in this preview only. No live monitoring is started.</p></form></dialog>
      </div>
    </div>
  );
}
