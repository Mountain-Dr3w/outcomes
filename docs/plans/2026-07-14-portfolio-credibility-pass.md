# Portfolio credibility pass

## Intent

Make the portfolio's outcomes-first positioning credible without changing its restrained visual identity. The finished site must distinguish measured impact, shipped capability, concept work, and validation still in progress.

## Plan

1. Add a quantified impact ledger to the homepage using only claims already present in the resume.
2. Reframe current work with honest status, scope, and evidence fields; shorten unsupported outcome language and demote SBIR Radar from implied validated outcome to experiment.
3. Restructure case pages so status and proof lead, project visuals sit beside the decisions they support, and the old dead-end artifact list becomes a concise evidence record.
4. Add next-case, resume, and contact paths at the end of every case study.
5. Raise small muted text contrast and bring the global error state into the portfolio's existing visual system.
6. Verify lint, production build, semantic structure, desktop and mobile renders, reduced-motion behavior, and the absence of broken routes or assets.
7. Stage only task-owned files, commit on a scoped branch, push, and publish the resulting GitHub branch/PR as permitted by the requested push workflow.

## Guardrails

- Do not invent metrics, research, adoption, or shipped outcomes.
- Keep defense work public-safe and preserve the existing App Router/server-component architecture.
- Add no dependencies and do not stage the unrelated README, deck, font, image, or `.claude` changes already in the worktree.

## Done when

- A reviewer can identify project status, Drew's contribution, and the strongest available proof from the first case-study viewport.
- The homepage shows quantified career impact before current projects.
- Every case ends with a clear next action.
- `npm run lint` and `npm run build` pass, desktop/mobile renders are inspected, and only scoped files are committed and pushed.
