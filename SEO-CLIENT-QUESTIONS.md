# Client questions: bookings and search visibility

Please answer these in priority order. Short answers are fine.

1. What is the exact domain you will use? Is there an existing website whose links and search traffic we need to preserve?
2. Which bookings are the priority: festivals, ticketed venues, private parties, weddings, corporate events, or something else? Which should we not advertise?
3. Which cities, states or regions will you travel to? What is your normal travel radius, and do you accept fly dates?
4. Who handles booking inquiries? Is jennywalker4rio@gmail.com the correct public address and form-notification recipient? What response time can you reliably promise?
5. What performance formats and set lengths do you offer? Is the five-person lineup standard? What sound equipment/engineer is included, and what must the venue provide?
6. Can you provide two or three short testimonials from venue or festival organizers, with names, roles, event names and permission to publish? Any press coverage with links?
7. Which live video best represents the show a buyer will book? Can you provide its song titles, event/venue, recording date, credits and an approved transcript or summary?
8. Is the current biography, lineup, genre description and list of past stages accurate? Are there preferred terms (bluegrass, progressive newgrass, roots, dark cabaret)?
9. Do you want rates kept private or a starting price published? If public, what exactly is included and what changes the price?
10. Please provide permanent official social-profile URLs, especially Facebook, and confirm who maintains Bandsintown dates. Who will update the website when events or personnel change?

## Launch work for the site manager

- At final-domain deployment, the owner will configure the mail service for booking inquiries. Connect the contact form to the selected service and verify actual receipt before launch. The current GitHub Pages preview cannot process forms; booking CTAs continue to lead to the form.
- Once the final domain is approved, replace the preview base in canonical/OG/Twitter/JSON-LD URLs and sitemap.xml. Update the GitHub preview’s canonical URLs too if it stays public. Redirect old production URLs where supported.
- Add robots.txt at the final domain root and reference the final sitemap. A robots file under /JennyAndTheStreetWalkers/ on GitHub Pages does not control crawling.
- Verify ownership in Google Search Console, submit the sitemap, inspect the main pages and monitor booking-relevant searches. Ask for delegated access, not passwords.
- Add confirmed travel areas, event types, booking FAQs and authorized testimonials in visible copy. Do not invent availability, rates, service areas, reviews or awards.
- Ask organizers and verified social profiles to link to the final website. Keep band name and contact information consistent.
- Consider privacy-conscious measurement of booking-button clicks and completed inquiries after hosting and consent requirements are settled. Clicks alone are not bookings.
- Validate live structured data and check mobile loading performance after deployment. MusicGroup markup describes the band; it is not a promise of a special Google result.

## References

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/crawling/docs/robots-txt/create-robots-txt
- https://schema.org/MusicGroup
