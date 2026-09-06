import Image from "next/image";
import type { WorkItem } from "@/lib/work";
import styles from "./project-thumbnail.module.css";

export function ProjectThumbnail({ item }: { item: WorkItem }) {
  const image = (src: string, width: number, height: number, className: string) => <Image src={src} width={width} height={height} alt="" sizes="(max-width: 767px) 100vw, 700px" className={className} />;
  return <div className={`${styles.frame} ${styles[item.slug]}`} aria-hidden="true">
    {item.slug === "jigsaw" ? <>
      {image("/artifacts/imported/jigsaw-in-use.jpg", 2000, 1360, styles.photo)}
    </> : item.slug === "emmys-milestones" ? <>
      <span className={styles.wordmark}>Emmy’s<br />Milestones</span>
      {image("/artifacts/redesigned/emmy-walking.png", 390, 844, styles.screen)}
    </> : item.slug === "velveteen" ? <>
      <span className={styles.rabbit}>{image("/artifacts/redesigned/velveteen-mark.svg", 32, 32, styles.logo)}</span>
      {image("/artifacts/redesigned/velveteen-launchpad-build.png", 390, 844, styles.screen)}
    </> : item.slug === "sbir-radar" ? <>
      {image("/artifacts/redesigned/sbir-editorial-opportunities.png", 430, 932, styles.screen)}
      {image("/artifacts/redesigned/sbir-editorial-radars.png", 430, 932, styles.detail)}
    </> : item.cover && image(item.cover.src, item.cover.width, item.cover.height, styles.screen)}
  </div>;
}
