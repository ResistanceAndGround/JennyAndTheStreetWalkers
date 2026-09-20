# Jenny & The StreetWalkers

Independent static website. Source of truth: this repository and origin/main.

## Development and validation

There is no framework, package manager, dependency installation, compiler, or production build. The root HTML/CSS/JS and referenced assets are the deployable site. Do not run npm install or generate a dist folder.

With Python 3 installed, from this folder:

```powershell
py tools/check_site.py
py -m http.server 8877 --bind 127.0.0.1
```

Open http://127.0.0.1:8877/ (use a different port if already occupied). Stop the server with Ctrl+C. The static check verifies local references, filename case, anchors, IDs, HTML nesting and image alt attributes. JavaScript syntax can be checked with `node --check` for each JS file. No pre-existing test/lint suite was present.

## Pages and features

- index.html: home, performance art, merch teaser, booking CTA.
- shows.html: upcoming/past Bandsintown widget and fallback links.
- media.html: YouTube embed, direct video fallback, social links and booking CTA below Request Removal.
- merch.html: Square product links, bundle selector, Ultimate Fan Bundle.
- contact.html: theatrical showcase, biography, booking form, independent Press Kit.
- Every page includes a Jenny mailing-list form and relative navigation.

Original PNGs and PDFs are retained. WebP files are optimized delivery assets; social-preview.jpg is the band-branded 1200×630 sharing image. Download links retain original PNG/PDF formats.

## Hosting

Existing GitHub Pages preview: https://resistanceandground.github.io/JennyAndTheStreetWalkers/

GitHub reports Pages enabled; all five existing page URLs respond. No local Actions workflow, CNAME or package build exists. The account's exact Pages source setting was not inspected. Keep its existing configuration. Relative links work under the repository subpath and a future root domain.

Netlify later: blank build command, publish directory `.`, branch `main`, no environment variables. netlify.toml is unchanged. No SPA redirect is needed. Do not enable production deployment during cleanup.

## Forms: required launch configuration

site-config.js deliberately sets netlifyFormsEnabled to false. The independent Netlify project has not been verified or configured. Do not assume settings from another website apply here.

1. With owner approval, connect this independent repository to its own Netlify site.
2. Enable form detection; deploy with submissions still disabled.
3. Confirm `booking-inquiry` and `jenny-mailing-list` appear in that site's Forms dashboard.
4. Set netlifyFormsEnabled to true; deploy and perform an owner-approved real submission. Verify it reaches the dashboard and the intended notification recipient.
5. Configure email notifications in Netlify separately. Front-end success is not evidence of email delivery.

GitHub Pages, localhost and file previews never submit. JavaScript-disabled forms remain disabled rather than posting to an unsupported host. Preview forms still allow validation testing without sending data. Real submission paths use Netlify's current page POST, URL-encoded fields, honeypots, required email/name/message fields, disabled submit buttons while sending, accessible status text, and retained values after failure.

Mailing-list capture does not send newsletters. Request Removal opens the supplied band's email address for manual removal. Confirm this process and recipient before launch. Existing honeypots remain; monitor spam before adding any other service.

## Launch checklist

- Obtain the final domain and authorized DNS access; preserve any email MX/TXT records.
- Confirm the independent hosting project, form notification recipient, newsletter/removal process, band bio/lineup, prices, stock and shipping in Square.
- After approval, configure forms as above and test actual receipt. No real submissions were made during the audit.
- Replace the verified GitHub Pages base URL in all five pages' og:url, og:image and twitter:image metadata with the final HTTPS domain. Keep the intentional band artwork.
- Canonical URLs, structured data and sitemap.xml currently use the GitHub Pages URL. Before domain launch, update all absolute URLs to the final HTTPS domain and regenerate the sitemap. Add robots.txt at the domain root with its sitemap location; a robots.txt inside the GitHub project subpath has no crawler authority.
- Confirm the sharing image loads publicly after push; it exists locally but is not yet uploaded.
- Confirm TLS, apex/www preference and redirects. No DNS or domain changes were made.
- Test YouTube playback in a normal browser, current/past Bandsintown dates, all Square options and inventory, PDF downloads, booking and signup confirmation.
- Before pushing, check whether any Netlify auto-deploy integration is attached. Keep builds stopped/disconnected while conserving credits. A push can update GitHub Pages and any connected host.

See AUDIT.md for findings and verification limits.

## Booking-focused SEO update

See SEO-CLIENT-QUESTIONS.md for client confirmations and launch work. Titles, descriptions, canonical URLs, sharing metadata, MusicGroup/WebPage structured data and sitemap.xml use the current public preview URL. No rankings, rich results or indexing are guaranteed. Booking links lead to the contact form. The owner will configure the mail service when deploying to the final domain; form delivery remains disabled for the preview. No domain, Search Console account or analytics service was configured.
