import { HeroExploration, heroOptions } from '@/components/hero-exploration';
import { notFound } from 'next/navigation';
export const metadata = { title: 'Hero preview', robots: { index: false, follow: false } };
export function generateStaticParams() { return heroOptions.map(({ id }) => ({ variant:id })); }
export default async function Page({ params }: { params:Promise<{ variant:string }> }) {
  const { variant } = await params;
  if (!heroOptions.some(option => option.id === variant)) notFound();
  return <HeroExploration variant={variant} />;
}
