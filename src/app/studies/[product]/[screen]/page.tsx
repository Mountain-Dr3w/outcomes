import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VerifluxStudy } from "@/components/studies/veriflux";
import { SbirStudy } from "@/components/studies/sbir";
import { SpaceForceStudy } from "@/components/studies/space-force";
import { VelveteenStudy } from "@/components/studies/velveteen";

const screens: Record<string, string[]> = {
  "sbir-radar": ["opportunities", "radars", "saved", "sources"],
  "space-force": ["readiness", "services"],
  velveteen: ["review", "deployment"],
  veriflux: ["routes", "materials"],
};

export const metadata: Metadata = {
  title: "Product design studies",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return Object.entries(screens).flatMap(([product, items]) => items.map((screen) => ({ product, screen })));
}

export default async function StudyPage({ params, searchParams }: { params: Promise<{ product: string; screen: string }>; searchParams: Promise<{ date?: string }> }) {
  const { product, screen } = await params;
  if (!screens[product]?.includes(screen)) notFound();
  if (product === "veriflux") {
    const { date } = await searchParams;
    const initialDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) ? date : "2025-05-12";
    return <VerifluxStudy key={`${screen}-${initialDate}`} screen={screen} initialDate={initialDate} />;
  }
  if (product === "space-force") return <SpaceForceStudy screen={screen} />;
  if (product === "velveteen") return <VelveteenStudy screen={screen} />;
  return <SbirStudy screen={screen} />;
}
