import Image from "next/image";
import styles from "./emmy-preview.module.css";

export function EmmyPreview({ compact = false }: { compact?: boolean }) {
  return <div className={`${styles.preview} ${compact ? styles.compact : ""}`}>
    <Image src="/artifacts/redesigned/emmy-progressions.png" alt="Emmy’s Milestones showing parent-named progressions." width={390} height={844} loading={compact ? "lazy" : "eager"} sizes={compact ? "(max-width: 767px) 32vw, 190px" : "(max-width: 767px) 38vw, 270px"} />
    <Image src="/artifacts/redesigned/emmy-walking.png" alt="Emmy’s Milestones comparing first and latest observations." width={390} height={844} loading={compact ? "lazy" : "eager"} sizes={compact ? "(max-width: 767px) 32vw, 190px" : "(max-width: 767px) 38vw, 270px"} />
  </div>;
}
