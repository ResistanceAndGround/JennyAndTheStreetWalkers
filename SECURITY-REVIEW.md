# J&S final local security review - 2026-10-06

## Scope and paths

Project and Git working-tree root: C:\Users\resis\OneDrive\Desktop\J&S\Jenny-The-StreetWalkers
Git history: .git (untouched).
Active pages: public/index.html, public/contact.html, public/shows.html, public/media.html, public/merch.html.
Active styling: public/release.css and public/mailing-list.css; JavaScript is referenced from those public HTML files.
Original source artwork: art/ plus root band.png and stage.png; retained unchanged. New client delivery artwork also exists only under public/art, so it is retained.
Cloudflare: wrangler.jsonc, Worker jennyandthestreetwalkers, assets.directory ./public. This directory is the public URL root, not a /public/ prefix.
Production origin: https://www.jennyandthestreetwalkers.com

## Findings and changes

- No private-key, common credential-token, or assigned-secret pattern matches were found in reviewed working-tree text files. This is not a forensic scan of Git history or binary metadata. Public checkout URLs and Bandsintown identifiers are functional public identifiers, not secrets.
- No eval, Function-constructor, document.write, innerHTML, outerHTML or insertAdjacentHTML sinks found in reviewed HTML/JS. Dynamic text uses textContent.
- The bundle selector previously copied a static option value straight to href while product checkout URLs used validation. Bundle URLs now use the same HTTPS approved-host check and reject credentials and invalid schemes. This closes a defensive-validation gap; no attacker-controlled source was identified.
- Form activation now additionally requires the exact HTTPS production origin, preventing accidental activation on workers.dev/custom previews. No submissions were sent. Current site-config still disables forms, there are no Formspree endpoints, and the existing handler is Netlify-specific. Do not enable its flag on Cloudflare; implement the approved client form service first.
- Added public/_headers: nosniff, strict-origin-when-cross-origin, SAMEORIGIN framing, CSP base-uri self / object-src none / frame-ancestors self, camera and microphone disabled. These deliberately do not impose unverified script/connect/frame allowlists on Bandsintown, YouTube or future Formspree. This is baseline CSP, not a comprehensive XSS script policy. HSTS preload/includeSubDomains was not added before DNS/TLS verification.
- Existing YouTube referrerpolicy and fallback preserved. Existing authored new-tab links have noopener/noreferrer. Bandsintown generates its own external links; no modification of third-party widget internals. Modern browsers apply implicit noopener to target=_blank; legacy-browser widget behavior is not guaranteed.
- No dependency manifests, lockfiles, framework or local third-party package tree found. Remote Bandsintown code and Google Fonts remain external dependencies. Do not add an integrity hash to a changing widget bundle without a supported versioning plan.
- No incidental ChatGPT, OpenAI or Codex references found in reviewed project text/comments/metadata; zero such references removed. License notices, photo credits, integration identifiers and Resistance & Ground footer attribution retained.
- Updated README and REVIEW-COMMANDS.ps1.txt to use public for preview/validation and avoid legacy staging/publishing instructions.

## Recycled files (exact relative paths)

1. public/style.css - obsolete design iteration; active pages load release.css and mailing-list.css. No loader/build path dynamically selects it.
2. public/showcase-entrance.js - retired perimeter entrance; not loaded by public pages, and its champagne-perimeter-fill animation was removed previously. Current lights are CSS animations.
3. ite for launch with resilient forms and accessible showcase - accidental pager log containing git diff statistics and terminal escape sequences.

All three were sent through Windows Recycle Bin after absolute-path containment checks. They are also tracked in Git and remain recoverable from existing history; no history rewritten.

## Retained deliberately

Root HTML/CSS/JS and sitemap: legacy GitHub Pages site still potentially publishes repository root; root contact.html uses root showcase-entrance.js. Do not remove until Pages retirement is confirmed.
netlify.toml: legacy configuration retained until host integration state is resolved.
art/, public/art/, band/stage originals, both download directories: original, unique or downloadable client materials. Lack of a text reference alone was not considered sufficient evidence for deletion.
Current documentation and pending PRODUCTION-URL-LAUNCH.md retained. No new backup folder created; unrelated Desktop projects were not scanned.

## Validation

- tools/check_site.py passed for all five public pages; every active public JavaScript file passed node --check; git diff --check passed.
- Browser review at 1440px desktop and 390px mobile, with proposed security headers simulated on local responses: all pages loaded, no horizontal overflow, no page-script errors. Full-page screenshots reviewed. Lazy merchandise images separately scrolled into view and decoded successfully.
- Eight-image slideshow initializes; automatic advance, previous/next, pause and reduced-motion behavior checked. Photo sweep and booking glow animation rules remain; reduced motion disables them.
- Static navigation/assets/anchors validated; press-kit PDF, rider PDF and logo download returned HTTP 200.
- Bandsintown loaded actual upcoming dates at both widths. YouTube iframe and thumbnail/player loaded; automated play click timed out, so full playback remains a manual release check. Watch on YouTube fallback preserved.
- All 12 distinct Square checkout links returned HTTP 200 on checkout.square.site. No checkout or payment submitted. Invalid bundle URL test was rejected.
- Forms inspected without submitting. Third-party video/widget telemetry requests occurred; these are not booking or mailing-list submissions.
- Canonicals, Open Graph URLs, social-image local targets, JSON-LD, sitemap and robots checked against the production origin. No GitHub origin left in public HTML metadata. Routes use /, /contact, /shows, /media, /merch matching Cloudflare default HTML handling.

## Remaining release requirements

1. Client booking and mailing-list service/endpoints are missing. Current forms cannot deliver inquiries or signups.
2. Deploy only with approval, then verify actual Cloudflare headers. Python http.server does not apply _headers; browser tests simulated them.
3. Verify nameserver activation, www custom-domain binding, TLS, apex-to-www redirect, and preview retirement per PRODUCTION-URL-LAUNCH.md. These settings were not changed or verified live in this review.
4. Manually confirm YouTube playback from the production origin and complete an authorized form delivery test after configuring the service.

## Preview

From the project root:

    py -m http.server 8878 --bind 127.0.0.1 --directory public

URL: http://127.0.0.1:8878/

No commit, push or deployment performed.
