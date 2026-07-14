# Plain-language portfolio copy pass

1. Inventory all public-facing copy in `src/app`, `src/components`, and `src/lib`.
2. Mark lines that lead with implementation, portfolio methodology, vague abstraction, or a caveat instead of reader value.
3. Rewrite the homepage and all work-item data using the selected concrete-stakes direction.
4. Simplify UI labels where they expose the internal evidence model instead of helping the reader scan.
5. Review the resume and shared states for the same patterns, changing only lines that fail the plain-language test.
6. Run lint and production build, inspect every route at desktop and mobile widths, and search the rendered/source copy for banned phrasing.
7. Commit only this pass's files and push the follow-up to `codex/portfolio-credibility`.
