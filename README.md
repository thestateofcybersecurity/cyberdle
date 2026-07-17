# Cyberdle

A Wordle-style daily game for cybersecurity acronyms. Guess the acronym in six tries; win or lose, every round ends with the full expansion, a plain-English explanation of what it means and why it matters, and links to authoritative sources.

## Features

- **Daily mode**: one shared puzzle per day with streaks, statistics, and a shareable emoji grid
- **Practice mode**: unlimited puzzles with difficulty and category filters, including a "my misses" review filter
- **Archive**: replay past daily puzzles (they count toward learning, not streaks)
- **Study mode**: flashcard drills (expansion shown, recall the acronym, self-grade); missed acronyms come up more often
- **Glossary**: searchable, filterable reference of every acronym with explanations and sources
- **429 curated acronyms** across ten categories (certifications, protocols, attacks, crypto, governance, cloud, operations, identity, appsec, network), each with a written explanation and sources
- **Digits in play**: a number row on the keyboard makes classics like MD5, WPA3, 3DES, and SHA256 guessable
- **Accessibility**: high-contrast colorblind palette (tiles, keys, and share grid), reduced-motion support
- **PWA**: installable, works offline after the first visit
- **Hard mode**, dark/light themes, mobile-friendly layout, local persistence

## Development

```bash
npm install
npm run dev        # local dev server
npm test           # unit tests (engine, stats, daily selection, learning, dataset)
npm run test:e2e   # Playwright end-to-end tests (run npm run build first)
npm run validate:data  # dataset schema/content validation
npm run check:links    # verify all source URLs still resolve
npm run build      # production build to dist/
```

## Data

Acronyms live in `src/data/acronyms.json`. Each entry:

```json
"SIEM": {
  "expansion": "Security Information and Event Management",
  "display": "SIEM",
  "category": "operations",
  "difficulty": "medium",
  "explanation": "Two to four sentences on what it is and why it matters.",
  "sources": [{ "name": "NIST CSRC Glossary", "url": "https://csrc.nist.gov/glossary" }]
}
```

Keys are the typeable answer (`A-Z0-9`, 3 to 8 characters); `display` is the human-readable form (for example `PCI DSS` for the key `PCIDSS`). Run `npm run validate:data` after editing.

## Deployment

Pushes to `main` run tests and data validation, build with Vite, and deploy to GitHub Pages via `.github/workflows/deploy.yml`. In the repository settings, set Pages > Source to "GitHub Actions" once.
