import Image from "next/image";

export function SbirPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`sbir-preview ${compact ? "sbir-preview-compact" : ""}`}>
      <div className="sbir-devices">
        <Image src="/artifacts/redesigned/sbir-editorial-opportunities.png" alt="Redesigned SBIR Radar opportunity feed with sample topics." width={430} height={932} loading={compact ? "lazy" : "eager"} sizes={compact ? "(max-width: 767px) 32vw, 190px" : "(max-width: 767px) 38vw, 260px"} />
        <Image src="/artifacts/redesigned/sbir-editorial-radars.png" alt="Redesigned SBIR Radar saved searches with sample matches." width={430} height={932} loading={compact ? "lazy" : "eager"} sizes={compact ? "(max-width: 767px) 32vw, 190px" : "(max-width: 767px) 38vw, 260px"} />
      </div>
    </div>
  );
}
