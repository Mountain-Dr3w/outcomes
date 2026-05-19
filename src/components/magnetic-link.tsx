"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function MagneticLink({
  href,
  children,
  className = "",
  external = false,
}: MagneticLinkProps) {
  const shouldReduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 24 });
  const y = useSpring(rawY, { stiffness: 180, damping: 24 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left - rect.width / 2) / 7);
    rawY.set((event.clientY - rect.top - rect.height / 2) / 7);
  }

  function resetPosition() {
    rawX.set(0);
    rawY.set(0);
  }

  const sharedClassName = `group inline-flex min-h-11 items-center gap-2 border border-[var(--border-strong)] bg-[rgba(246,242,234,0.04)] px-4 py-2 text-sm text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--accent)] active:translate-y-px ${className}`;

  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      onBlur={resetPosition}
      className="inline-flex"
    >
      {external ? (
        <a
          href={href}
          className={sharedClassName}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{children}</span>
          <ArrowUpRight
            aria-hidden="true"
            size={16}
            weight="regular"
            className="text-[var(--accent)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      ) : (
        <Link href={href} className={sharedClassName}>
          <span>{children}</span>
          <ArrowUpRight
            aria-hidden="true"
            size={16}
            weight="regular"
            className="text-[var(--accent)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </motion.div>
  );
}
