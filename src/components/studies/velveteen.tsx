"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CaretDown, Check, GitBranch, GithubLogo, Globe, ShieldWarning, X } from "@phosphor-icons/react";
import styles from "./velveteen.module.css";

function Bunny() {
  return <svg width="25" height="25" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M7 2h5v11h8V2h5v11h4v17H3V13h4V2Z" fill="currentColor" /><path d="M9 19h4v4H9zm10 0h4v4h-4z" fill="#111314" /></svg>;
}

export function VelveteenStudy({ screen }: { screen: string }) {
  const running = screen === "deployment";
  const finding = useRef<HTMLDialogElement>(null);
  return <div className={styles.canvas}><div className={styles.app}>
    <header className={styles.header}>
      <Link href="/work/velveteen" className={styles.brand}><Bunny />velveteen</Link>
      <Link className={styles.back} href={running ? "/studies/velveteen/review" : "/work/velveteen"}><ArrowLeft size={16} />{running ? "Setup" : "Case study"}</Link>
    </header>
    <main id="main" className={styles.main}>
      <section className={styles.identity} aria-label="App being deployed"><div className={styles.appIcon} aria-hidden="true">L</div><div><span className={styles.appLabel}>App</span><h1>Launchpad</h1></div><span className={styles.notLive}>Not live</span></section>
      <div className={styles.address}><Globe size={15} /><span>launchpad.velveteen.sh</span></div>
      {running ? <>
        <section className={styles.current} aria-labelledby="build-heading">
          <div className={styles.currentTop}><span className={styles.spinner} aria-hidden="true" /><span>Deployment in progress</span></div>
          <h2 id="build-heading">Building app</h2><p>Packaging Launchpad for deployment.</p>
          <div className={styles.progress} role="progressbar" aria-label="Building app; duration unknown"><span /></div>
          <div className={styles.progressMeta}><span>Step 4 of 7</span><span>3 steps finished</span></div>
        </section>
        <button className={styles.warning} onClick={() => finding.current?.showModal()} aria-haspopup="dialog"><ShieldWarning size={23} /><span><strong>1 security finding</strong><span>Review before your app goes live.</span></span><ArrowUpRight size={18} /></button>
        <section className={styles.activity} aria-label="Deployment steps">
          <details className={styles.disclosure}><summary><span className={styles.finishedIcon}><Check size={16} /></span><span>Finished steps</span><span className={styles.count}>3</span><CaretDown size={16} /></summary><ul><li><Check size={14} />Code downloaded</li><li><Check size={14} />Production setup complete</li><li className={styles.findingStep}><ShieldWarning size={15} />Pre-build check<span>1 finding</span></li></ul></details>
          <details className={styles.disclosure}><summary><span className={styles.pendingIcon} /><span>Up next</span><span className={styles.count}>3</span><CaretDown size={16} /></summary><ul><li>Post-build security check<span>Pending</span></li><li>Go live<span>Pending</span></li><li>Live<span>Pending</span></li></ul></details>
          <details className={`${styles.disclosure} ${styles.technical}`}><summary><GitBranch size={17} /><span>Deployment details</span><CaretDown size={16} /></summary><dl><div><dt>Repository</dt><dd>demo/launchpad</dd></div><div><dt>Branch</dt><dd>main</dd></div><div><dt>Commit</dt><dd><code>8c32292</code></dd></div><div><dt>Deployment</dt><dd><code>6f4c16fb</code></dd></div></dl></details>
        </section>
      </> : <>
        <section className={styles.reviewIntro}><h2>Review deployment</h2><p>Check the source and public address<br className={styles.optionalBreak} /> before deploying your app.</p></section>
        <section className={styles.configuration} aria-label="Deployment configuration">
          <div className={styles.repo}><div className={styles.rowHeading}><GithubLogo size={19} /><span>Source repository</span><Check size={16} className={styles.check} /></div><p>demo / <strong>launchpad</strong></p></div>
          <div className={styles.configRow}><span>Framework</span><strong>Next.js</strong></div>
          <div className={styles.configRow}><span>GitHub connection</span><strong className={styles.connected}><Check size={14} />Connected</strong></div>
        </section>
        <section className={styles.publicNote}><Globe size={21} /><div><h3>This app will be public</h3><p>Anyone with the address can visit once deployment is complete.</p></div></section>
        <p className={styles.securityNote}>Security checks run during deployment. Any findings stay visible for review before going live.</p>
      </>}
    </main>
    <footer className={styles.actionBar}>
      {running ? <button className={styles.primary} onClick={() => finding.current?.showModal()}>Review security finding<ArrowRight size={19} /></button> : <Link className={styles.primary} href="/studies/velveteen/deployment">Deploy Launchpad<ArrowRight size={19} /></Link>}

    </footer>
    <dialog ref={finding} className={styles.sheet} aria-labelledby="finding-title">
      <div className={styles.sheetHeader}><ShieldWarning size={24} /><button onClick={() => finding.current?.close()} aria-label="Close finding"><X size={22} /></button></div>
      <span className={styles.sheetApp}>Launchpad / Pre-build security check</span><h2 id="finding-title">1 finding needs review</h2><p>The build can continue. This finding still needs a review before the app goes live.</p>
      <div className={styles.unavailable}><strong>Details aren’t available in this example.</strong><p>The original screen reports one finding but does not include its severity, affected file, or scanner output.</p></div>
      <button className={styles.primary} onClick={() => finding.current?.close()}>Back to deployment<ArrowRight size={19} /></button>
    </dialog>
  </div></div>;
}
