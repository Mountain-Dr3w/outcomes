# UI State Coverage

- **Designed:** 17
- **Needs design:** 0
- **Not applicable:** 8

## Designed states

### first-use

- **When:** First portfolio visit
- **User goal:** Understand level and evidence quickly
- **What is known:** Identity, quantified impact, project status, and selected work
- **Primary action:** Open a relevant case
- **System response:** Server-rendered homepage presents evidence before current work
- **Next or recovery:** Resume and email remain directly available
- **Access behavior:** Semantic hierarchy, skip link, responsive reflow
- **Stress content:** Real quantified resume impact and three current projects

### returning-use

- **When:** Return visit or back navigation
- **User goal:** Resume evaluation or open another case
- **What is known:** Stable anchors, work ordering, and case navigation
- **Primary action:** Open another case or contact
- **System response:** No onboarding overlay or transient state; browser history and anchors remain predictable
- **Next or recovery:** Back links and next-case links
- **Access behavior:** Focus and link labels remain consistent
- **Stress content:** Same published content

### loading

- **When:** Initial document or artifact image is loading
- **User goal:** Begin reading without layout shift
- **What is known:** Server-rendered text arrives independently; image dimensions reserve space
- **Primary action:** Read the opening evidence
- **System response:** Static pages render on the server; Next Image reserves artifact aspect ratios and lazy-loads below-fold media
- **Next or recovery:** Alt text and captions preserve meaning if imagery is delayed
- **Access behavior:** No spinner-only or motion-dependent state
- **Stress content:** Artifact imagery with explicit dimensions

### recoverable-error

- **When:** A route-level runtime error occurs
- **User goal:** Recover without a dead end
- **What is known:** A plain-language failure message and retry action
- **Primary action:** Try again
- **System response:** Global error boundary renders a branded retry screen
- **Next or recovery:** Retry button invokes reset; home link provides escape
- **Access behavior:** Semantic heading, native button, visible focus, no error-code burden
- **Stress content:** Something went wrong; try again; return home

### offline-slow-timeout

- **When:** Slow connection delays images or navigation
- **User goal:** Keep orientation and read available content
- **What is known:** Server-rendered text, reserved media space, explicit link destinations
- **Primary action:** Continue reading or navigate back
- **System response:** No data-dependent client flow; page content remains meaningful without completed image loads
- **Next or recovery:** Browser retry/back and direct route links
- **Access behavior:** Text alternatives preserve artifact meaning
- **Stress content:** Static narrative and captions

### interrupted-resumed

- **When:** Reviewer leaves a case and returns with browser navigation
- **User goal:** Continue evaluation
- **What is known:** Stable URL, section order, sticky identity block, and case footer
- **Primary action:** Continue reading or select next case
- **System response:** No volatile local state; browser scroll restoration is left to platform behavior
- **Next or recovery:** Back and next-case links
- **Access behavior:** Document order stays logical without sticky positioning
- **Stress content:** All case routes

### success-partial-success

- **When:** Reviewer reaches the end of a case
- **User goal:** Choose a meaningful next step
- **What is known:** Next case, resume, and email contact
- **Primary action:** Continue to the next case
- **System response:** A case footer replaces the previous dead end
- **Next or recovery:** Back to selected work remains available
- **Access behavior:** Descriptive link text and touch targets
- **Stress content:** Next case title plus contact actions

### long-localized-content

- **When:** Long project titles, proof statements, or translated browser text sizing
- **User goal:** Read without clipping or horizontal overflow
- **What is known:** All fields wrap in a single-column priority order at narrow widths
- **Primary action:** Continue reading
- **System response:** Readable max-widths, wrapping grid tracks, and no fixed-height text containers
- **Next or recovery:** Not applicable
- **Access behavior:** Supports browser zoom and text wrapping; no uppercase-only long labels
- **Stress content:** FORGE outcome and long role names

### large-text-reduced-motion

- **When:** Browser zoom, large text, or prefers-reduced-motion
- **User goal:** Access the complete portfolio without clipping or unwanted movement
- **What is known:** Same content and actions
- **Primary action:** Navigate and read normally
- **System response:** Responsive grids stack; Reveal disables entrance animation; global transitions collapse
- **Next or recovery:** Not applicable
- **Access behavior:** Visible focus, semantic reading order, color-independent statuses
- **Stress content:** All routes and states

### homepage-first-scan

- **When:** A reviewer opens the portfolio root
- **User goal:** Understand Drew's level and decide whether the work merits a deeper read
- **What is known:** Role, background, three quantified user/conversion outcomes, selected projects, project evidence level
- **Primary action:** Open a relevant case study
- **System response:** Quantified user and adoption impact precedes the project list; current projects use honest outcome or capability language
- **Next or recovery:** Resume and email remain available without opening a case
- **Access behavior:** Semantic headings, definition lists, links, visible focus, and single-column mobile reflow
- **Stress content:** 300% DAU growth, 20% faster maintenance initiation, roughly 40% platform adoption growth

### measured-case-entry

- **When:** A reviewer opens a case with observed organizational or user evidence
- **User goal:** Verify what Drew changed and how
- **What is known:** Status, role, scope, evidence statement, narrative decisions, artifacts
- **Primary action:** Read the first pivotal decision
- **System response:** Short defensible outcome leads; proof strip separates known change from unmeasured aspiration
- **Next or recovery:** Back to work and next-case links
- **Access behavior:** H1, labelled metadata, figures with alt text and captions, readable measure
- **Stress content:** FORGE: five teams, seventeen stages, shared operating picture; no unsupported onboarding-time reduction

### live-capability-case

- **When:** A reviewer opens Velveteen
- **User goal:** Assess Drew's builder range without mistaking a live capability for validated adoption
- **What is known:** Live status, public links, seven-stage pipeline, current validation gap
- **Primary action:** Inspect the security-review decision and live product
- **System response:** Capability language replaces outcome language; live and under-validation states are both explicit
- **Next or recovery:** Return, visit product, continue to next case, or contact
- **Access behavior:** External links are named, focusable, and accompanied by visible labels
- **Stress content:** Live product; four security tools; explanation quality remains under evaluation

### experiment-case

- **When:** A reviewer opens SBIR Radar
- **User goal:** Understand the product bet and what is not yet validated
- **What is known:** Prototype status, target triage job, pipeline risk, screenshots, no public link
- **Primary action:** Evaluate the decision and validation plan
- **System response:** The page says validation in progress and avoids measured speed claims
- **Next or recovery:** Next-case and contact links remain available despite no product URL
- **Access behavior:** No empty link group is rendered; status is textual, not color-only
- **Stress content:** Prototype; six decision signals; no portfolio evidence of task-time improvement

### small-viewport

- **When:** Viewport below the desktop grid breakpoint
- **User goal:** Scan and read without horizontal overflow or lost hierarchy
- **What is known:** Same status, proof, content, and actions in linear priority order
- **Primary action:** Open or continue reading a case
- **System response:** Asymmetric desktop grids collapse to one column; proof rows and impact entries stack
- **Next or recovery:** Browser back and explicit case navigation remain visible
- **Access behavior:** Touch targets remain at least 44px where interactive; text does not rely on hover
- **Stress content:** Longest FORGE copy and multi-line impact labels

### reduced-motion

- **When:** prefers-reduced-motion is enabled
- **User goal:** Read without unnecessary movement
- **What is known:** All content and hierarchy without animation
- **Primary action:** Navigate normally
- **System response:** Existing global media query reduces transitions and Reveal respects the preference
- **Next or recovery:** Not applicable; no motion-gated content
- **Access behavior:** No information depends on animation
- **Stress content:** All routes

### missing-or-failed-image

- **When:** An artifact image loads slowly or fails
- **User goal:** Understand what the artifact represents
- **What is known:** Figure label, descriptive alt text, and explanatory caption
- **Primary action:** Continue the narrative
- **System response:** Reserved image dimensions limit layout shift and text remains meaningful
- **Next or recovery:** No blocked flow; raw image link is optional
- **Access behavior:** Descriptive alternative text; captions do not duplicate only decorative detail
- **Stress content:** Service blueprint, event storm, product screens

### not-found

- **When:** Unknown route or work slug
- **User goal:** Recover to valid work
- **What is known:** Clear 404 message and home link
- **Primary action:** Return home
- **System response:** Existing styled not-found route remains
- **Next or recovery:** Home link
- **Access behavior:** Single H1 and keyboard-focusable link
- **Stress content:** Page moved or never existed

## Not applicable

- **empty-unconfigured:** No user-configured data or collection exists
- **no-results:** The portfolio has no search or filter flow
- **partial-stale-conflicting:** Published case-study content is static; uncertainty is expressed as project status and evidence labels rather than data freshness
- **permission-restriction:** All portfolio routes are public and require no permissions
- **invalid-input:** The portfolio contains no input forms
- **destructive-undo:** No destructive or mutating actions exist
- **authentication-and-permissions:** The portfolio is public and contains no authenticated actions
- **destructive-or-data-submission:** The portfolio has no destructive actions or forms; email uses a mailto link
