import Link from "next/link";
import Image from "next/image";
import styles from "./site-header.module.css";
import { SiteNavigation } from "./site-navigation";

export function SiteHeader() {
  return (
    <header className="site-header page-shell">
      <Link href="/" className={`wordmark ${styles.wordmark}`} aria-label="Drew McFarland home">
        <Image className={styles.logo} src="/drewux-logo.svg" alt="" width={38} height={34} priority />
        <span>Drew McFarland</span>
      </Link>
      <SiteNavigation />
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
