import Image from "next/image";
import styles from "./velveteen-preview.module.css";

export function VelveteenPreview({ compact = false }: { compact?: boolean }) {
  return <div className={`${styles.preview} ${compact ? styles.compact : ""}`}>
    <Image src="/artifacts/redesigned/velveteen-launchpad-setup.png" alt="Velveteen mobile review clearly identifying Launchpad as the app to deploy." width={390} height={844} loading={compact ? "lazy" : "eager"} sizes={compact ? "(max-width: 767px) 32vw, 190px" : "(max-width: 767px) 38vw, 270px"} />
    <Image src="/artifacts/redesigned/velveteen-launchpad-build.png" alt="Velveteen mobile deployment for the Launchpad app, with build status and security review visible together." width={390} height={844} loading={compact ? "lazy" : "eager"} sizes={compact ? "(max-width: 767px) 32vw, 190px" : "(max-width: 767px) 38vw, 270px"} />
  </div>;
}
