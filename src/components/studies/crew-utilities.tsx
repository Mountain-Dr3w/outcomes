"use client";

import { useEffect, useState } from "react";
import { Copy, Check, ArrowsLeftRight } from "@phosphor-icons/react";
import { forward, toPoint } from "mgrs";
import { formatCoordinate, parseDecimalCoordinate } from "@/lib/crew-utilities";
import styles from "./crew-utilities.module.css";

const zones = [{label:"Zulu",zone:"UTC"},{label:"Washington",zone:"America/New_York"},{label:"Honolulu",zone:"Pacific/Honolulu"},{label:"London",zone:"Europe/London"}];
export function CrewClocks() {
  const [now,setNow]=useState<Date|null>(null);
  useEffect(()=>{const tick=()=>setNow(new Date());tick();const timer=setInterval(tick,1000);return()=>clearInterval(timer);},[]);
  return <section className={styles.clocks} aria-label="Current times">{zones.map(z=><div key={z.zone}><span>{z.label}</span><time>{now?new Intl.DateTimeFormat("en-GB",{timeZone:z.zone,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(now):"--:--"}</time><small>{now?new Intl.DateTimeFormat("en-US",{timeZone:z.zone,month:"short",day:"numeric"}).format(now):""}</small></div>)}</section>;
}

export function CrewUtilities({embedded=false}:{embedded?:boolean}) {
  const [lat,setLat]=useState("38.8977");
  const [lon,setLon]=useState("-77.0365");
  const [grid,setGrid]=useState("18SUJ2339407395");
  const [source,setSource]=useState("dd");
  const [format,setFormat]=useState("mgrs");
  const [copyState,setCopyState]=useState("");
  let latitude=parseDecimalCoordinate(lat,true),longitude=parseDecimalCoordinate(lon,false);
  let error="";
  if(source==="mgrs") {
    const normalized=grid.replace(/\s/g,"").toUpperCase();
    if(!/^(?:[1-9]|[1-5]\d|60)[C-HJ-NP-X][A-HJ-NP-Z][A-HJ-NP-V](?:\d{2}){0,5}$/.test(normalized)) error="Enter a valid MGRS grid reference with equal easting and northing digits.";
    else try { [longitude,latitude]=toPoint(normalized); if(!Number.isFinite(latitude)||!Number.isFinite(longitude)) throw Error(); } catch {error="That MGRS reference could not be converted. Check its zone and grid letters.";}
  } else if(latitude===null||longitude===null) error="Enter latitude from −90 to 90 and longitude from −180 to 180.";
  let result="";
  if(!error&&latitude!==null&&longitude!==null) {
    try {
      if(format==="mgrs") {if(latitude< -80||latitude>84) throw Error("MGRS conversion supports latitudes from 80°S to 84°N.");result=forward([longitude,latitude],5);}
      else if(format==="dd") result=`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
      else result=`${formatCoordinate(latitude,true,format as "dms"|"ddm")}, ${formatCoordinate(longitude,false,format as "dms"|"ddm")}`;
    } catch(e) {error=e instanceof Error?e.message:"Unable to convert these coordinates.";}
  }
  function resetCopy(){setCopyState("");}
  async function copy(){try{await navigator.clipboard.writeText(result);setCopyState("Copied");}catch{setCopyState("Select the result to copy it.");}}
  return <section className={`${styles.widget} ${embedded?styles.embedded:""}`} aria-label="Coordinate converter">
    {!embedded&&<div className={styles.heading}><h2 id="coordinate-heading"><ArrowsLeftRight size={17} aria-hidden="true"/>Coordinate converter</h2><span>WGS84</span></div>}
    <div className={styles.formats}><label>From<select aria-label="From" value={source} onChange={e=>{setSource(e.target.value);setFormat(e.target.value==="mgrs"?"dd":"mgrs");resetCopy();}}><option value="dd">Latitude / longitude</option><option value="mgrs">MGRS</option></select></label><label>To<select aria-label="To" value={format} onChange={e=>{setFormat(e.target.value);resetCopy();}}>{source!=="mgrs"&&<option value="mgrs">MGRS</option>}{source!=="dd"&&<option value="dd">Latitude / longitude</option>}<option value="dms">Degrees, minutes, seconds</option><option value="ddm">Degrees, decimal minutes</option></select></label></div>
    {source==="mgrs"?<label className={styles.gridInput}>Grid reference<input value={grid} spellCheck={false} onChange={e=>{setGrid(e.target.value);resetCopy();}} aria-invalid={!!error} aria-describedby={error?"coordinate-error":undefined}/></label>:<div className={styles.coordinateFields}><label>Latitude<input inputMode="decimal" value={lat} onChange={e=>{setLat(e.target.value);resetCopy();}} aria-invalid={latitude===null}/></label><label>Longitude<input inputMode="decimal" value={lon} onChange={e=>{setLon(e.target.value);resetCopy();}} aria-invalid={longitude===null}/></label></div>}
    {error&&<p className={styles.errors} id="coordinate-error" role="status">{error}</p>}
    <div className={styles.result}><output aria-live="polite">{error?"Check the coordinates above":result}</output><button disabled={!!error||!result} onClick={copy} aria-label="Copy converted coordinates">{copyState==="Copied"?<Check size={18}/>:<Copy size={18}/>}</button></div>
    <p className={styles.copyStatus} role="status">{copyState||(source==="mgrs"?"Returns the center of the MGRS grid square.":format==="mgrs"?"MGRS · 1 m grid precision":"Latitude first · Negative values indicate south or west")}</p>
  </section>;
}
