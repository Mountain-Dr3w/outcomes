"use client";

import {
  GitBranch,
  NotePencil,
  RocketLaunch,
  ShieldCheck,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

const stageItems = ["clone", "detect", "scaffold", "scan", "explain", "deploy"];

const proofItems = [
  ["Velveteen", "live app"],
  ["SBIR Radar", "mobile triage"],
  ["Seams", "public memory"],
];

export function AnimatedBench() {
  const shouldReduceMotion = useReducedMotion();
  const entrance = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28, rotate: -0.4 },
        animate: { opacity: 1, y: 0, rotate: 0 },
      };

  return (
    <motion.div
      {...entrance}
      transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.12 }}
      className="artifact-shadow relative min-h-[31rem] w-full min-w-0 max-w-full overflow-hidden border border-[var(--border)] bg-[rgba(24,23,22,0.82)] p-4 sm:min-h-[36rem] sm:p-5"
      aria-label="Artifact bench previewing selected work"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]" />
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.24, 0.42, 0.24],
                x: ["-2%", "2%", "-2%"],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[18%] top-12 h-48 w-48 rounded-full bg-[rgba(196,138,123,0.13)] blur-3xl"
      />

      <div className="relative grid h-full min-w-0 gap-4 md:grid-cols-[1fr_0.82fr]">
        <section className="paper-shadow flex min-h-[18rem] w-full min-w-0 max-w-full flex-col justify-between bg-[var(--paper)] p-5 text-[#211f1d] sm:p-6">
          <div>
            <p className="font-mono text-xs text-[#7a7066]">artifact bench</p>
            <h2 className="mt-4 max-w-[13rem] font-serif text-4xl leading-[1.02] text-[#181716] sm:text-5xl">
              The work has receipts.
            </h2>
          </div>
          <div className="mt-10 divide-y divide-[#ded6cb] border-y border-[#ded6cb]">
            {proofItems.map(([name, result], index) => (
              <motion.div
                key={name}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -14 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 130,
                  damping: 18,
                  delay: 0.18 + index * 0.08,
                }}
                className="grid grid-cols-1 gap-1 py-3 font-mono text-xs sm:grid-cols-[1fr_auto] sm:gap-4"
              >
                <span className="text-[#5d554d]">{name}</span>
                <span className="text-[#a95725]">{result}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="grid gap-4">
          <section className="border border-[var(--border)] bg-[rgba(17,17,16,0.76)] p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs text-[var(--text-muted)]">
                launch system
              </p>
              <RocketLaunch
                aria-hidden="true"
                size={19}
                weight="regular"
                className="text-[var(--accent)]"
              />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {stageItems.map((stage, index) => (
                <motion.div
                  key={stage}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: index === 3 ? [0.72, 1, 0.72] : 1,
                          y: index === 3 ? [0, -2, 0] : 0,
                        }
                  }
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: index * 0.14,
                    ease: "easeInOut",
                  }}
                  className="border border-[var(--border)] px-3 py-3 font-mono text-xs text-[var(--text-secondary)]"
                >
                  {stage}
                </motion.div>
              ))}
            </div>
          </section>

          <section className="border border-[var(--border)] bg-[rgba(17,17,16,0.7)] p-4">
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <ShieldCheck
                aria-hidden="true"
                size={18}
                weight="regular"
                className="text-[var(--green)]"
              />
              <p className="font-mono text-xs">claim contract</p>
            </div>
            <div className="mt-5 space-y-3">
              <div className="h-2 w-3/4 bg-[var(--border-strong)]" />
              <div className="h-2 w-11/12 bg-[var(--border)]" />
              <div className="h-2 w-7/12 bg-[var(--border)]" />
              <div className="mt-5 border-l-2 border-[var(--accent)] py-1 pl-3 font-mono text-xs text-[var(--text-muted)]">
                prove the path, bound the claim
              </div>
            </div>
          </section>

          <section className="grid grid-cols-[2.5rem_1fr] gap-3 border border-[var(--border)] bg-[rgba(17,17,16,0.7)] p-4">
            <div className="flex h-10 w-10 items-center justify-center border border-[var(--border-strong)] text-[var(--accent)]">
              <NotePencil aria-hidden="true" size={18} weight="regular" />
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--text-muted)]">
                public memory
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Decisions, proofs, and constraints stay visible after the meeting
                ends.
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[0.7rem] text-[var(--text-faint)]">
        <GitBranch aria-hidden="true" size={14} weight="regular" />
        <span>drew / work</span>
      </div>
    </motion.div>
  );
}
