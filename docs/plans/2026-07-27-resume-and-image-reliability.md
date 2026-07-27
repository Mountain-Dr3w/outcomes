# Resume refresh and image reliability

## Intent

Update the portfolio from the newest resident resume source, improve the copy
without inventing claims, replace the older download with a polished version,
and make every case-study image render reliably at an appropriate size.

## Source of truth

- Use `/Users/drew/Downloads/McFarland_Resume.pdf` (July 14, 2026) as the
  supplied resume. It matches the later DOCX export and supersedes the May PDF
  currently in `public/resume/`.
- Preserve its facts and stronger evidence, but do not copy its layout defect:
  the Product Designer heading is stranded at the bottom of page 1.
- Keep unrelated README, deck, font, and `.claude/` worktree changes untouched.

## Implementation

1. Synchronize `src/lib/resume.ts` with the supplied resume and give the
   language a concise editorial pass. Update homepage impact context where the
   same evidence appears.
2. Align `/resume` metadata and supporting copy with the Senior Product Designer
   positioning.
3. Rebuild `public/resume/Drew_McFarland_Resume.pdf` as a clean, one-page,
   letter-size resume with useful title and author metadata, semantic document
   tags, and clickable website/email links.
4. Replace stale case-study image dimensions with the files' real intrinsic
   dimensions and give `next/image` responsive `sizes` hints. This prevents the
   production page from requesting unnecessary 3,840-pixel variants that were
   reproduced as broken images in the browser.
5. Preserve the five legacy `forge-*` asset names for one release and redirect
   `/work/forge` to the renamed case. This keeps cached old HTML and saved links
   working while the new route and filenames roll out.

## Done when

- `npm run lint` and `npm run build` pass.
- Every `WorkVisual.src` resolves to a real file and its declared dimensions
  match the image.
- The old case route redirects permanently and both old and new artifact names
  resolve during the cache transition.
- Local production pages render all case-study images with nonzero natural
  dimensions at desktop and mobile widths.
- The final PDF extracts the intended text, has correct metadata, remains one
  page, retains semantic tags and contact links, and its rendered PNG has no
  clipping, overlap, orphaned headings, or illegible text.
