# Justice for Jaali

Production foundation for the Justice for Jaali editorial advocacy website.

## Requirements

- Node.js 24 or newer
- npm 11 or newer

## Local development

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run check
```

## Project structure

- `app/` — routes, layouts, and framework metadata
- `components/` — reusable UI, navigation, and media primitives
- `sections/` — page-level content sections
- `layouts/` — shared structural layouts
- `hooks/` — client hooks when approved interactions require them
- `lib/` — fonts, configuration, and SEO helpers
- `styles/` — design tokens and global CSS foundations
- `types/` — shared TypeScript definitions
- `data/` — structured site data
- `utils/` — framework-independent utilities
- `public/` — approved local media assets, organized by type
- `docs/` — source documentation and implementation notes

The homepage now contains the Phase 3 production-asset integration framework.
See `docs/phase-3-implementation.md` and `public/ASSETS.md` for the typed content,
responsive media, metadata, and asset handoff contracts.
