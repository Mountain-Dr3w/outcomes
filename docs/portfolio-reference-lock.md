# Portfolio merge and reference lock

Build in the existing Outcomes Next.js site; use drew-ux as source material. Preserve existing deck edits and publishing configuration. User supplied SpaceX/Anduril as the direct-build target.

| Decision | Refero reference | Adaptation |
| --- | --- | --- |
| Graphite canvas, neutral type, expansive margins | SpaceX: 7f5db065-f181-4612-90e4-9b5dc1bd4e96 | Photographs and actual product work lead; no brand imitation. |
| Fine rules, technical annotations, spare linework | Cthdrl: 20aba0df-9f33-4217-a804-0548abb5ad6d | Geist Sans/Mono; no decorative orbit/target motif (explicitly rejected by user). |
| Large rectangular images with compact captions | Jakub Reis: 04e1bfcd-b346-4a45-8322-77abfe7cc063 | Staggered two-column index, single column on mobile. |
| Context followed by readable chapters | Existing case studies and user merge request | Role/status first, sticky chapter links, full-size image links. |

Tokens: background #0b0d0f; raised #131619; text #f1f3f2; secondary #afb6ba; muted #929ba1; border #30363b. No elevation. Square surfaces except device frames. Preserve source artifact colors. Body 18px/1.8; secondary metadata 12px. Respect reduced motion. Do not hide narrative behind animation.

Merge Jigsaw, Debrief and Veriflux with Space Force Cloud Platform, Velveteen and SBIR Radar. Consolidate Forge under the existing anonymized Space Force route. The hidden Forward Edge/DefTech route is not in drew-ux's index and lacks adequate distinct supporting artifacts; leave it in source. Keep both source repository and existing deck unchanged.

The user confirmed during this session that the newer deck is accurate. Use its Jigsaw and Space Force narratives and outcomes, superseding the older unbuilt-portal account. Keep onboarding-to-first-deploy separate from the overall 18–24-month delivery timeline. Do not import disputed metrics from other older studies or unattributed quotes. Source claims describe user-confirmed historical work, not independently verified research. Position the portfolio around product/service design craft, not a designer-builder identity (explicit user correction). The header and favicon reuse the user-requested Velveteen logo.

## Product screen refresh

The user explicitly requested major redesigns of the Space Force, Velveteen, and SBIR Radar screens and replacement screenshots. These are retained, editable React studies at `/studies/[product]/[screen]`; they do not change the deployed source products. Captions distinguish refreshed designs from historical artifacts. Representative content comes from the original screenshots; do not invent finding severity, service access permissions, readiness owners, or funding amounts.

| Surface | Refero reference | Adaptation |
| --- | --- | --- |
| Space Force readiness and service catalog | Linear style `11d3e58a-87d7-4a9a-bbf5-720f4fd3ffc6`; Doppler screen `affe4316-594c-4bcf-b85a-64248e34339e` | Restrained ink canvas; inspectable onboarding stages; one current-state explanation alongside the request record. Services use searchable rows and selected details. |
| Velveteen setup and deployment | Vercel screen `73675061-8485-4c1d-854d-d3061ce2e334`; Doppler screen above | Warm paper workspace, ink navigation, metadata separated from progress. Active build and security finding remain independently visible. Reuse the bunny. |
| SBIR opportunities, saved searches, and sources | Perplexity Discover screen `84d46c1e-7e9c-4f06-8099-0c425b75d20c` | Readable editorial feed with restrained forest color, clear deadlines, compact source attribution, one-tap saving. Connected and disconnected sources are distinct. No decorative radar illustration. |

The user rejected decorative portfolio scaffolding: remove process slogans, project/chapter counters, selected-work date ranges, redundant labels, and generic claims. Product controls and metadata must earn their place through actual utility. No replacement taglines or ornamental annotations.

### Velveteen mobile correction

The user rejected the desktop workspace and explicitly requested mobile-first deployment, with outcomes clearly identified as the app name. Supersede the light sidebar design. Use a single phone-width flow: Velveteen bunny wordmark, explicit App / outcomes identity and destination, current state, security decision, then disclosures for finished steps, upcoming steps, and technical details. Keep the action at thumb level. Desktop preserves this focused single-column flow.

Primary mobile reference: District review screen `24858bf8-b38a-46d2-877e-110c881f6409` for dark surfaces, readable grouped content, and anchored confirmation action. Secondary: Shopify order timeline `629931cb-470a-4745-a458-dd4bc323ecb6` for expandable activity. Retain the restrained Linear typography reference; omit payment language, counters unrelated to actual progress, timer urgency, and invented logs. Validate first at 390 × 844 and replace both screenshots with mobile captures.

Further user correction: reduce visible content substantially. Remove the app avatar, status badge, framed build and warning cards, repeated status text, and three separate disclosures. Main deployment view contains the app name, current build status, one progress indicator, one details link, and the security review action. Setup contains the app name and public destination, with source and settings in a sheet. Keep full source metadata and all seven stages accessible inside the details sheet.

The user selected Launchpad as the example app name. All current Velveteen screen labels, the demo repository, public address, action text, captions, and screenshot references now use Launchpad. This is a presentation example, not a change to the underlying Outcomes repository.

Latest decision: user preferred the earlier mobile version. Restore the build card, security finding card, and separate finished/upcoming/details disclosures, plus the complete setup review. Keep Launchpad as the example app. This supersedes the stripped-down single-details-sheet direction above.


## Distinct product identities — September 5

User asked Space Force and SBIR Radar to stop sharing portfolio typography and treatments. Refero references reviewed: 19–86 (7a8c99db-5ce7-4fa4-b491-8f1fcac18991), for precise architectural rules and square geometry; Medium (4784cf2e-58ed-4b0c-8e6d-8758f595d997), for serif editorial hierarchy and warm reading surfaces. Space Force uses Overpass with Fragment Mono headings, navy navigation, cobalt state controls, cool white panels and square edges. SBIR uses Lora with Arial controls, vellum, ink, fine rules and burnt orange actions. Existing workflows and sample-data provenance remain. New screenshot filenames prevent stale image-cache previews.

Debrief replaced in the case-study collection with Emmy’s Milestones. Latest source inspected in /Users/drew/Documents/interview/src/emmy and docs/emmy-case-study-talk-track.md; this is newer than the original /Users/drew/Workspace/emmys-milestones app. Screens captured directly from the running prototype at port 4178 using deckFocus=portfolio to select seed demo state. Case study distinguishes original starting observations from illustrative follow-ups and states prototype limits. No clinical scores, adoption figures or measured outcomes added.


## Home motion — September 5

User requested the cool factor of Anduril's animated wavy lines. Live Anduril site inspected (current hero is cinematic media). Use the user's line-art direction as the concrete target, with Refero GT Planar (8ac461ad-1f30-4829-bb6e-dc68f1d2b6dd) for monochrome generated lines across a dark canvas, and Active Theory (9d795615-79d0-4544-ac5e-2858971c3b3b) only for sparse controls around an atmospheric graphic. Preserve portfolio type and plain product-design copy. Reject reticles, radar circles, particles, colored glows, decorative HUD labels and scroll hijacking.

Decision: a continuous, folded field of 58 fine silver lines across the hero, with a dark left edge for text. Slow phase change and a damped mouse response provide depth. Native Canvas with an SVG still fallback; 30fps cap, DPR cap of 2, offscreen/hidden pause, reduced-motion static frame and explicit pause button. Mobile puts the lines between title and introduction. Artwork has no information-bearing role and stays hidden from assistive technology.


Home refinement: user requested a slightly more tactical treatment. Retain GT Planar's precise generated linework and dark canvas; replace the fluid ribbon with fixed, angular terrain sections, subdued sage-gray mesh and one amber scan line. No targeting reticle, fake telemetry, coordinates or military labels. Preserve the headline and reading hierarchy, motion controls and reduced-motion behavior.


Hero typography refinement: user loves the terrain but wants it to feel more design-led and asks for a better tagline. Preserve terrain geometry and scanning behavior. Replace the discipline label with “Making complex work feel clear.” Borrow oversized, restrained sans-serif hierarchy from Refero Elvina Prasad (44fde25c-8772-40f6-a828-f78046cf4f07), with an offset second line and smaller personal introduction. Shift terrain below the heading to establish an intentional typography-first composition. No new decorative labels or mixed-font headline fragments.


User-directed navigation refinement: tagline “Design for the mission ahead.” Terrain now fills the entire hero behind the type, with perspective projection and forward camera travel through a continuous procedural landscape. A muted amber course line replaces the crosswise scan. Existing terrain reference and poster typography retained; user supplied the navigation concept. Text protected with local dark scrims; motion can still be paused and reduced-motion remains static.


Horizon refinement: apply smoothstep atmospheric fading by projected depth to cross-sections, longitudinal mesh and the amber route, including the static SVG. New rows enter beyond the zero-opacity distance. User-requested mantra now reads “Design to navigate the mission ahead.” in the hero and page/social descriptions.


Hero layout correction: remove the disconnected offset heading and mobile auto-pushed biography. Align both headline lines, introduction and View work action to a shared left edge and sequence them in reading order. Remove the redundant veteran/previous-employer hero line (experience remains elsewhere). Reduce hero height to 660px desktop / 640px mobile so the work arrives sooner. Terrain and navigation mantra retained.


Space Force correction: user rejected the pale operational styling. Refero SpaceX (7f5db065-f181-4612-90e4-9b5dc1bd4e96) supplies near-black canvas, silver type, hairline rules and wide technical headings. Adapt to an application with a simple delta-style mark, Overpass display type, Fragment Mono metadata and pale blue current-stage cues. Preserve existing onboarding/service behaviors and historical outcomes. Screens remain labeled design refresh with sample team data.

Jigsaw news: verified three public articles directly: USAF, Cyber Airmen fuel innovation (2018-10-16); Air Force Operational Energy, Air Force seeks to accelerate efficiency (2021-03-13); FedScoop, Kessel Run adds NATO as a user for refueling software (2021-10-13). Add dated summaries and direct links; reported broader-program results are explicitly separate from personal project outcomes.

## Copy and gallery refinement — September 5

Primary reference: Katherine Pihl (Refero style 93d01b8b-25ad-4775-b0a3-c43f7213b5ce), using strong project-specific image crops within a precise gallery. Borrow only the edge-to-edge image emphasis from Julia Krantz (dfa3ad81-0d1e-447f-b171-2b871cbb27ab). Retain the accepted dark portfolio canvas and typography.

- Use existing product screenshots and the existing Jigsaw photograph; no invented product evidence. Gallery compositions are separate from case-study figures.
- Give Jigsaw a photo/interface composition, Space Force a readiness detail, Emmy a first/latest comparison, Velveteen its original rabbit and deployment screen, Veriflux its route/map, and SBIR its editorial interface.
- Preserve product color roles within each thumbnail. Remove repeated miniature phone pairs and generic framing.
- Replace advice-like chapter headings and repeated conclusions with specific work, decisions, and limitations. Preserve metrics and attribution.
- User-directed hero refinement: connect introduction to mission-focused design; increase terrain sampling across and along depth without increasing grid density. Reduce the small ripples, retaining route motion, distance fade, pause and reduced-motion handling.

Validation: desktop gallery and 390px hero/gallery inspected; no mobile horizontal overflow; pause state verified. Production build and ESLint passed.

## Space Force portal composition — September 5

User rejected the repeated dashboard treatment. Reference lock: SpaceX (7f5db065-f181-4612-90e4-9b5dc1bd4e96) for strong type scale and minimal framing; borrow compact utility controls and subtle tonal separation from Linear Changelog (11d3e58a-87d7-4a9a-bbf5-720f4fd3ffc6). Retain the established Overpass/Fragment Mono typography and silver/blue Space Force identity.

Readiness now pairs a vertical five-stage sequence with one dominant current-status panel. Request metadata is disclosed on demand. The service catalog uses a stronger selected-service panel. No decorative telemetry, invented progress, or space photography was introduced. The actual current stage remains Approved when inspecting other steps.

Updated both 1440×1000 case-study screenshots and the gallery crop. Checked desktop and 390px layouts, mobile overflow, request disclosure, service selection, and future-stage details. Jigsaw narrative now reflects the user's mission-type, spatial-awareness, and training scope; news references are two 2023 articles and one 2021 NATO exercise report.

## September 6 follow-up: hero options and image-led gallery

The user's current direction is the locked foundation: moving terrain, mission-focused product design, no ornamental labels. Gallery cards now keep title and category inside a faded, blurred dark overlay; outcome taglines are removed. Two aligned columns become one below 768px. Jigsaw retains the original photograph without a UI collage.

Hero exploration lives at /explore/hero, separate from the homepage until a direction is selected. Each option is a real responsive preview shown at 1440px and 390px:
- Bearing: existing left-aligned terrain composition, Rive's technical display typography role using Tomorrow. Quiet neutral body text; amber remains a small navigation accent.
- Horizon: Heart Aerospace's panoramic centered composition and scale contrast; Chakra Petch supplies the user's requested technical sans character. Existing terrain replaces aircraft imagery by explicit user direction.
- Traverse: GT Planar's monumental typographic hierarchy and kinetic code-native backdrop; Rajdhani is a deliberately condensed sans alternative. No borrowed neon colors, badges, or terminal chrome.

All fonts are self-hosted with OFL licenses. Fonts apply only to preview headlines, preserving the distinct product screen styles. Layout changes at 768px; no automatic homepage hero replacement. Browser review covered all three desktop/mobile previews and the gallery.

## Veriflux and Space Force follow-through

Veriflux: Aurora (67210028-1ad5-4e37-ad7f-237319a8c07d) supplies the light industrial foundation; Flecto (a4da778b-6520-4fbc-9211-fcff23ba3b65) contributes restrained green interaction treatment; Mapbox screen 1056446d-fa91-4c1a-a927-ec646a0e3489 informs list/map composition. Current redesigns are explicitly distinguished from historical work and use illustrative operational data. The map reuses original artwork and is labeled illustrative. Route filters, search, selection, and report series selection work locally.

Space Force: user preferred the left readiness picker but rejected the enclosed approval card. The current body presents approval and next steps directly on the canvas. The official USSF logo is sourced unchanged from https://www.spaceforce.mil/Portals/2/ussf_vert_logo_20.png and replaces the invented mark. Current case study assets use the open readiness body and official logo.

SBIR Radar and Emmy's Milestones now explicitly introduce themselves as personal projects before explaining the motivating context and problem.

### Selected hero direction
User selected Traverse (option 3) while rejecting its font. Promoted its large headline and lower-right desktop introduction to the homepage; mobile stacks both. Replaced Rajdhani with existing self-hosted Overpass, preserving technical sans direction with less stylized geometry. Updated all hero introductions to focus on GovTech, people, and obstacles in their work. Rise8 remains in factual employment history, outside this introduction. Desktop and mobile reviewed.

Latest typography revision: user still rejected Overpass. Replaced hero display type with self-hosted Space Grotesk 400, preserving the selected Traverse composition and the approved headline. Larger-width letterforms and quieter geometry follow the existing technical sans direction; adjusted display sizing and balanced mobile lines. Desktop and 390px mobile visually checked. License included with the font.

### Veriflux identity recovery
User found the neutral redesign devoid of character. Original routes artwork is now the dominant brand source: deep teal navigation, vivid green symbol, strong selected-route contrast. Flecto supplies only bounded guidance for mint active states and rounded grouping. Restored the original symbol's segmented-ring geometry as a vector interpretation, added prominent route numbers, enlarged and restored map color, and introduced a teal reporting summary band. No new functionality or outcomes are claimed. Replaced portfolio screenshots and cover with the branded versions. Reviewed 1440px desktop and 390px mobile.

User clarified that the supplied Veriflux screens were delivered client work, not concepts. Removed the two older-design links and "original" labels, corrected provenance to delivered work updated for 2026, and retained only the illustrative-data qualifier for the example. Flattened surfaces, reduced corners to 3px, replaced pill filters with underlined tabs, and removed the reporting table's enclosing card. Recaptured both case-study screens.

User correction: preserve all delivered navigation options. Restored Dashboard/Home, Offloads, Routes, Compliance, and Support. Dashboard/Home opens the material reporting screen; the three sections not implemented in this portfolio example open a native dialog clarifying that scope instead of pretending to be working product screens. Mobile navigation wraps so all five options remain visible. Route rows now retain driver, time window, load, and pickups, closer to the delivered hierarchy, beside a taller map. Veriflux case study no longer constrains screenshots behind the chapter sidebar; screens use the full content width and the cover height cap is removed. Updated both images; desktop/mobile reviewed, lint and build passed.

Latest Veriflux refinements: removed Operations/Routes utility header, sample-workspace text, and team picker as requested. Official logo downloaded from the public portal asset /img/logo/horizontal/logo_full_colour_transparent@2x.png; a white wordmark treatment retains its real artwork. Replaced baked-in truck artwork with independently drawn outline truck markers and a live OSM basemap (visible attribution). Illustrative road-following route geometry comes from routing.openstreetmap.de's OSRM endpoint and is stored locally; no claim of actual vehicle tracking. Selecting a list row highlights its route and vehicles. Native date input changes visible fixture records; other dates show a recoverable empty state. Verified keyboard date selection and route highlighting.

Screenshot export defect found: screenshot({fullPage:true}) padded/scaled captures, and screenshot({fullPage:false}) returned a 1px image in this environment. Replaced case images with getScreenshot() bytes, which are JPEG, at 1440x1234. Correct file extensions and dimensions used. Case screen imagery now fills the frame.

Final dispatch and Home controls: desktop route workspace fits the viewport, with internal list scrolling on shorter windows. Home keeps its compact green metric band, date selection, and Review daily routes action that carries the selected date in the URL. The sidebar label is Home. Removed the route status toolbar and search; the Filters button beside the date opens a native popover with working radio filters and an active-count badge. Route stop names now form a connected path with completed checks and upcoming circles. Native date and filter interactions verified.

Export correction: getScreenshot() returned blank image bytes intermittently despite a valid displayed preview. Reliable PNG artifacts are now captured with the bundled Playwright headless browser and visually inspected from disk: veriflux-home-reviewed.png and veriflux-routes-reviewed.png, both 1440x900. These replace the defective exports in the case study.

SBIR feed refinement: retain the existing Medium/Lora editorial direction and ink/vellum palette. User requested Open Opportunities as the single heading, removal of subtitle/count row, search beside filters, and full-card opening. Use a stretched native button with a separate elevated save control, compact dialog search, and visible active-search clearing. User rejected the custom signal mark; use a text-only SBIR Radar wordmark.

Space Force sidebar refinement follows the user's marked screenshot: preserve the black aerospace shell and cool blue active states. Show only the delta portion of the official asset, at 25 by 36 pixels, beside a single-line Cloud Platform label. The workspace control gains a contained surface, clear hierarchy, chevrons, and a keyboard-accessible native popover. Keep Phoenix as the sole available preview workspace rather than inventing teams. Verified desktop and 390px mobile views.
