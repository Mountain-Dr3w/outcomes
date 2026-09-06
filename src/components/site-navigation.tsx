"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div className="site-navigation" ref={root} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button ref={toggle} className="mobile-menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d={open ? "M4 4l8 8M12 4l-8 8" : "M2 5h12M2 11h12"} stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <nav id="primary-navigation" aria-label="Primary navigation" className="main-nav" data-open={open} onClick={() => setOpen(false)}>
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/resume">Resume <span aria-hidden="true">↗</span></Link>
      </nav>
    </div>
  );
}
