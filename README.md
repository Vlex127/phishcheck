# PhishCheck

A small phishing-awareness web app built for a CSC 333 Research Methodology course project by Section B, Group 31, Lagos State University (LASU). It has two browser-only tools:

- **Phishing quiz** — 10 realistic messages, one question at a time, with instant feedback and an answer review.
- **Link checker** — paste a link or message to get a low, medium, or high risk rating based on simple rules.

No login, database, analytics, API calls, or data collection. Nothing typed into the app leaves the browser.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 3
- pnpm

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and verification

```bash
pnpm lint
pnpm test:checker
pnpm build
pnpm start
```

The checker smoke suite covers 40 safe and suspicious inputs. The rule engine checks URL structure, private/numeric hosts, dangerous schemes, brand lookalikes, shorteners, risky downloads, redirects, encoding, multiple domains, and manipulation wording. It remains heuristic and does not visit the destination or query a threat-intelligence service.

## Project structure

```text
app/
  page.tsx                     Home
  about/page.tsx               About page (project credits and student numbers)
  quiz/page.tsx, layout.tsx    Quiz route and metadata
  checker/page.tsx, layout.tsx Link checker route and metadata
  layout.tsx                   Root layout, site metadata, JSON-LD
  not-found.tsx, error.tsx, global-error.tsx
  robots.ts, sitemap.ts, opengraph-image.tsx
  globals.css                  Global styles
components/
  JsonLd.tsx                   JSON-LD helper
  QuizExperience.tsx           Quiz state and review flow
  LinkChecker.tsx              Link checker form and results
  SiteHeader.tsx, SiteFooter.tsx
  RiskBadge.tsx                Accessible risk badge
  icons.tsx
lib/
  quiz.ts                      Quiz data and scoring
  checklink.ts                 Rule-based link analysis
  site.ts                      Site URL, metadata, and survey URL
public/
  favicon.svg, manifest.json, fonts/
scripts/
  checklink-smoke.ts            Checker smoke tests
```

## Notes

- The link checker is a simple rule-based awareness aid, not a security scanner. **Low risk does not mean safe**, and the app cannot guarantee that a link is legitimate.
- Dark mode follows the operating system setting via `prefers-color-scheme`.
- The production URL and Google Forms survey URL are centralised in `lib/site.ts`.
