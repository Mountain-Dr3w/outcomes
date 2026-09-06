import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header page-shell">
      <Link href="/" className="wordmark" aria-label="Drew McFarland home">
        <svg className="brand-mark" aria-hidden="true" viewBox="0 0 32 32" fill="none">
          <rect x="7" y="2" width="5" height="13" fill="currentColor" />
          <rect x="20" y="2" width="5" height="13" fill="currentColor" />
          <rect x="3" y="13" width="26" height="17" fill="currentColor" />
          <rect x="9" y="19" width="4" height="4" fill="var(--bg)" />
          <rect x="19" y="19" width="4" height="4" fill="var(--bg)" />
        </svg>
        <span>Drew McFarland</span>
      </Link>
      <nav aria-label="Primary navigation" className="main-nav">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/resume">Resume <span aria-hidden="true">↗</span></Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="site-footer page-shell">
      <a className="contact-title" href="mailto:drewjmcfarland@live.com">Let’s talk.<span aria-hidden="true">↗</span></a>
      <div className="footer-bottom">
        <span>Drew McFarland <span className="muted">/ Product designer</span></span>
        <div><a href="https://linkedin.com/in/drewux/">LinkedIn ↗</a><a href="https://seams.velveteen.sh">Writing ↗</a><a href="mailto:drewjmcfarland@live.com">Email ↗</a></div>
      </div>
    </footer>
  );
}
