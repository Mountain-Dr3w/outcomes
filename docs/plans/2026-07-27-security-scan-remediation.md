# Velveteen security-scan remediation

## Problem

The latest `outcomes` deployment stopped at Velveteen's pre-build security gate with seven blocking HIGH findings:

- `next@16.2.6`
- Next.js's nested `postcss@8.4.31`
- Next.js's optional `sharp@0.34.5`

Velveteen deploys this project from `main`, while the portfolio changes currently live on `codex/portfolio-credibility`.

## Plan

1. Upgrade `next` and `eslint-config-next` to `16.2.12`.
2. Override the vulnerable transitive packages with `postcss@8.5.18` and `sharp@0.35.0`.
3. Regenerate the npm lockfile and verify the installed and standalone runtime trees.
4. Run the production audit, lint, typecheck, and build.
5. Commit and push the scoped dependency changes.
6. Fast-forward `main`, monitor Velveteen through both security gates, and smoke-test `work.velveteen.sh`.

## Acceptance

- `npm audit --omit=dev` reports no HIGH or CRITICAL production findings.
- The installed and standalone runtime dependency trees contain the fixed versions.
- Lint, typecheck, and production build pass.
- Velveteen reports the new `main` deployment as live.
- Production resume and case-study images load successfully.
