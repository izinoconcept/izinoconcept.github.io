# i.zino concept – update 4 (8 Nov 2026)

Upload the CONTENTS of the `izinoconcept/` folder to the root of your GitHub Pages repo. Do not upload this file.
Delete from the repo (if still there): sw.js, service-worker.js, app-ads.txt, assets/js/hallooou.js and the old unused template files.

## New in this version
- Client Ratings & Reviews moved OFF the Contact page to its own page: reviews.html (Contact now has a small link; footer has a Reviews link). Add real reviews in assets/js/reviews.js as before.
- Resources page now organised by topic (Medical Retainership, Workplace Health & Safety, Registration & Compliance, Customer Service) with topic links and a search box
- 7 articles (was 5): added "Pre-Employment and Periodic Medical Examinations" and "Medical Emergency Plan for Remote and Field Staff"
- FAQ page and Glossary page (reference content: NUPRC, NMDPRA, NSITF, NRS, capitation, HMO, etc.)
- Site search: search box in the menu on every page + search.html (searches all pages; index in assets/js/search-index.js)
- Client Ratings & Reviews section on the Contact page. Stars / average / approval % are CALCULATED from real reviews only.
  Empty until you add genuine reviews. Visitors can submit a review through the form (arrives by email; you moderate).
- Publication dates corrected to 8 November 2026 (earlier build wrongly said 28 October)
- Footer links to FAQ, Glossary, Search; sitemap updated (19 pages)

## HOW TO ADD A REVIEW (only real ones, with the client's permission)
Open assets/js/reviews.js, add an entry inside the REVIEWS list:
  { name: "A. Okoro", org: "Operations Manager, Example Ltd", rating: 5, date: "2026-11-20", text: "Their exact words." },
Never invent, alter or pay for reviews. That breaks AdSense "Misleading representation" and "Deceptive practices" policies.
Do NOT add star-rating structured data (schema.org) for your own business reviews; Google does not allow it for self-serving reviews.

## Still on you
1. RC number, phone, street address (comment in about.html)
2. Real author name + 1–2 real, non-confidential examples in the articles
3. Confirm FAQ answer "Are you a hospital, an HMO or a law firm? No..." is accurate for your business
4. Google Business Profile: ask real clients to review you there (that's where genuine, verifiable stars come from)
5. Custom domain, AdSense consent message (EEA/UK), then request review after content has been live for a few weeks

6. In AdSense: Privacy & messaging -> create the Google consent message (Funding Choices) for EEA/UK/Switzerland visitors
7. In Search Console: add the site, submit https://izinoconcept.github.io/sitemap.xml, and request indexing of the new pages
