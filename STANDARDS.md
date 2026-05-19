# Standards

## Product

- Lead every case study with the outcome.
- Explain the product as the vehicle that made the outcome possible.
- Keep MissionOS Core public-safe: no named internal stakeholders, no sensitive program detail, no overstated authorization claims.
- Keep copy concrete and short. Remove filler, throat-clearing, and vague claims.

## Design

- Use the dark tactile artifact system from `src/app/globals.css`.
- Use Geist for interface text, Geist Mono for labels, and Lora for editorial display moments.
- Keep layouts asymmetric on desktop and single-column on mobile.
- Prefer dividers, artifact strips, and full-width sections over card grids.
- Respect `prefers-reduced-motion`.

## Code

- Use App Router server components by default.
- Put client behavior behind `"use client"` files.
- Keep shared work content in `src/lib/work.ts`.
- Avoid `any` and keep props typed.
- Add new dependencies only when the interface needs them.
