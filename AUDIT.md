# Launch audit — September 20, 2026

## Source control

Audited only C:\Users\resis\OneDrive\Desktop\J&S\Jenny-The-StreetWalkers. Began with a clean working tree on main. Fetched origin; HEAD and origin/main both 15bc50c6b98ade15a37d6df3b80eeec3a63113ea, ahead/behind 0/0. No local AGENTS.md found in the repository or immediate project parent. No commits, pushes, deployments, DNS changes or asset deletions performed.

## Findings and repairs

- Press Kit sizing: current source already has `.booking-grid{align-items:start}` and `.press-card{align-self:start}`. Booking and Press Kit are separate sibling cards, use unique IDs, have no shared toggle/event handler, and contain no details/summary controls. The form is already open, not collapsible. Earlier grid stretching is consistent with the reported historical symptom, but not reproducible in this commit. Preserved the existing structural fix. Resizing the textarea at every requested width left Press Kit width/height unchanged; following its anchor retained form values. On mobile the card's vertical position naturally moves with preceding content, but its own size/state does not change.
- Mailing signup could POST on GitHub Pages; replaced duplicated form submission code with one guarded lifecycle and explicit independent-site configuration. Removed stale Mike's Wilson branch. Added preview notices, no-JS protection, duplicate-request guard, busy status, and error-value preservation.
- Preserved Media's booking CTA below Request Removal. Added the same direct form CTA to other mailing sections and standardized Book the Band capitalization. Form submission now says Send booking inquiry.
- Curtains formerly hid the photo if JS failed; made them progressive enhancement. Preserved lights/haze/style and changed perpetual animations to one short run. Reduced motion disables all decorative animation.
- Added per-page descriptions and Open Graph/Twitter metadata with band artwork and the verified existing GitHub Pages URL. Final-domain canonicals/sitemap remain a launch task.
- Added WebP delivery copies, corrected intrinsic image dimensions, retained original PNG/PDF downloads. PNG source set 36,944,835 bytes; WebP set 2,432,402 bytes (about 93% less). No designer originals were overwritten.
- Individual Square links now work without JS. Added a no-JS bundle link list. Existing price/stock data and checkout destinations preserved.
- Retained past-date widget setting and added an explicit fallback instruction. Improved focus styles, 44px controls, readable 16px form inputs, and grid child sizing. Removed obsolete R&G logo CSS hooks from the active stylesheet.

## Verified

- All five pages at 320, 375, 768, 1024 and 1440px: no horizontal overflow, duplicate IDs, missing eager images, first-party JS errors or local HTTP 404s in automated browser checks with third-party traffic deliberately blocked.
- Every local href/anchor and download target; page heading count; filename case and markup nesting via tools/check_site.py.
- Six product checkout destinations, six selectable bundles, Ultimate Fan Bundle, navigation/home/booking anchors, Media booking placement and Request Removal mailto target.
- Both forms' success, failure, duplicate-submit and retained-value behavior against intercepted fake responses only; no real person subscribed, contacted or charged.
- Native invalid/empty field rejection, preview submission guard, no-JS behavior, reduced motion and Press Kit independence.
- Booking page screenshot reviewed: stage/mirror lights, photo, biography and separate form/Press Kit preserved.
- GitHub public API reports Pages enabled; existing public homepage returned HTTP 200. Local preview uses a repository subpath to exercise relative paths.

## Limits and launch blockers

- No package.json, dependency install, build command, lint configuration or pre-existing test suite exists. A compiled production build is not applicable. Static validation and JS syntax checks replace invented build commands.
- No live form delivery test: independent Netlify Forms must be enabled/registered after launch approval; site-config.js stays false. Email notifications and unsubscribe handling require owner confirmation.
- Social sharing asset/metadata changes are local and cannot be validated by public social crawlers until pushed.
- Third-party services can block automation. Local blocked-script behavior is verified; remote payment completion, email clients and account-side inventory are not. No purchases or communications sent.
- DNS, final production domain and analytics are not configured or invented. Existing public preview stays unchanged until owner reviews and pushes.

Recommended commit: `Prepare Jenny site for launch with resilient forms and accessible showcase`

## Final verification notes

- The live Bandsintown widget loaded upcoming dates. Clicking Past loaded previous shows including September 13 and September 4, 2026. The booking href remained contact.html#booking-form after interaction.
- YouTube remained blank in the in-app browser; playback is UNVERIFIED. Keep the direct Watch on YouTube fallback and perform a normal-browser launch check.
- Scrolled through and decoded every home, booking and merchandise image, including lazy-loaded images: passed.
- Keyboard Tab reached Skip to content; Enter navigated to #main. Focus CSS and native form/select behavior inspected. This is not a complete assistive-technology certification.
- All root JavaScript files passed node --check. tools/check_site.py passed all five pages. git diff --check passed.
- Mobile screenshots reviewed for all five pages; desktop booking screenshot reviewed. Third-party-blocked screenshots intentionally show fallbacks, not proof of remote player availability.

## Exact changed files

- AUDIT.md
- README.md
- art/booking-live-crowd.webp
- art/calendar-stage.webp
- art/earrings-slide5.webp
- art/earrings.webp
- art/koozie.webp
- art/logo.webp
- art/meet-the-band-live.webp
- art/poster.webp
- art/social-preview.jpg
- art/t-shirt.webp
- art/wear-the-night-slide6.webp
- band.webp
- booking-form.js
- booking-showcase.js
- contact.html
- index.html
- mailing-list.js
- media.html
- merch.html
- release.css
- shows.html
- site-config.js
- site-forms.js
- stage.webp
- tools/check_site.py
- REVIEW-COMMANDS.ps1.txt
