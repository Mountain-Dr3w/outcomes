"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { useActionState } from "react";
import Link from "next/link";
import { unlockCaseStudy } from "@/app/case-access-actions";
import styles from "./case-password-gate.module.css";

export function CasePasswordGate({ title }: { title: string }) {
  const [state, action, pending] = useActionState(unlockCaseStudy, { error: "" });
  return <main id="main" className={styles.page}>
    <Link className={styles.back} href="/#work">← All work</Link>
    <div className={styles.content}>
      <h1>{title}</h1>
      <p>Enter the password to view my case studies.</p>
      <form action={action}>
        <label htmlFor="case-password">Password</label>
        <input id="case-password" name="password" type="password" autoComplete="current-password" required aria-invalid={!!state.error} aria-describedby={state.error ? "password-error" : undefined} />
        {state.error && <p id="password-error" className={styles.error} role="alert">{state.error}</p>}
        <button type="submit" disabled={pending}>{pending ? "Unlocking…" : "View case study"}<ArrowUpRight size={18} aria-hidden="true" /></button>
      </form>
    </div>
  </main>;
}
