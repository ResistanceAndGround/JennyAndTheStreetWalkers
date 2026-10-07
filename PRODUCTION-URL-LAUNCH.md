# Production URL launch

Canonical origin: https://www.jennyandthestreetwalkers.com

## Confirmed repository configuration

wrangler.jsonc names the Worker jennyandthestreetwalkers and sets assets.directory to ./public. The contents of public are served at the site root, without /public/. No Worker script or hostname redirect is configured locally. Dashboard custom domains, account subdomain, DNS, and bot settings were not inspected.

Cloudflare's default auto-trailing-slash HTML handling serves individual HTML files on extensionless paths. Production canonicals and sitemap therefore use /, /contact, /shows, /media, /merch. Existing relative .html navigation is preserved for local previews; Cloudflare normalizes those requests. Do not change HTML handling without also reviewing canonical routes.

## Required Cloudflare actions after nameservers become active

1. In Workers & Pages > jennyandthestreetwalkers > Settings > Domains & Routes, add/verify Custom Domain www.jennyandthestreetwalkers.com. Confirm the zone is active, DNS is correct, and the certificate is active. Keep existing mail MX/TXT records intact.
2. In the domain's Rules > Redirect Rules, create a Single Redirect named Apex to www. Match expression:

   (http.host eq "jennyandthestreetwalkers.com")

   Dynamic target expression:

   concat("https://www.jennyandthestreetwalkers.com", http.request.uri.path)

   Status: 301. Preserve query string: enabled.

   The apex must have a proxied DNS record and valid HTTPS coverage for Cloudflare to process the rule. Verify existing records before changing them. This exact hostname match cannot redirect localhost, workers.dev previews, or GitHub Pages. Enable HTTPS for the www hostname as well.
3. Deploy the reviewed metadata changes only after separate approval. Verify all five canonical paths return the correct HTML, all social images return 200, and robots.txt and sitemap.xml serve successfully.
4. Test both http:// and https:// apex URLs, including /contact?source=test: path and query must survive on www without loops. Verify www HTTP upgrades to HTTPS.
5. Inspect production response headers for unintended X-Robots-Tag: noindex and confirm Cloudflare bot protections permit intended crawlers. Submit the production sitemap in Search Console after domain verification.

No _redirects domain rule was added: Workers static-assets _redirects does not support domain-level matching. No redirect is active from this local preparation.

## Duplicate previews

GitHub Pages currently publishes https://resistanceandground.github.io/JennyAndTheStreetWalkers/ (older root copy) and https://resistanceandground.github.io/JennyAndTheStreetWalkers/public/ (updated public copy). Each exposes child pages too.

After production is verified, in GitHub repository Settings > Pages > Build and deployment, set branch publishing Source/Branch to None to prevent future publishes, then use Unpublish site if it remains published. If switched to Actions, disable the Pages deployment workflow as well. Do not disable the Cloudflare Git integration or delete the repository. If Pages must remain, use a separate preview-only build with noindex metadata; never add that to production files.

Cloudflare deployment URL pattern: jennyandthestreetwalkers.<account-subdomain>.workers.dev. Version/alias URLs use version-or-alias prefixes. Exact enabled hostnames must be read from the Worker's Settings > Domains & Routes and Deployments; they are not recorded in this repository.

After the production domain works, disable workers.dev and Version URLs in Settings > Domains & Routes, and persist workers_dev: false and preview_urls: false in wrangler.jsonc at that time so later deployments do not re-enable previews. These flags are intentionally not changed while the production domain is pending. If previews are needed, protect only the preview hostnames with Cloudflare Access instead. An alternative public-preview setup must send X-Robots-Tag: noindex only on those preview hosts; robots Disallow alone does not ensure removal from search. Production remains index,follow.

## Local versus live validation

Local checks validate URL consistency, JSON-LD, XML, image paths, and HTML. They cannot confirm nameserver propagation, dashboard custom-domain bindings, certificates, Cloudflare redirect execution, or actual crawler access. No deployment or DNS/settings changes were made during this preparation.

References:
- https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/
- https://developers.cloudflare.com/workers/static-assets/redirects/
- https://developers.cloudflare.com/workers/configuration/routing/workers-dev/
- https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/
- https://docs.github.com/en/pages/getting-started-with-github-pages/unpublishing-a-github-pages-site
