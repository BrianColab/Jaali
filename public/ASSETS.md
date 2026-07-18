# Production asset handoff

Approved homepage media is stored under `public/assets/images/`:

- `originals/` preserves the supplied PNG files and filenames.
- `hero/`, `story/`, `backgrounds/`, and `banners/` contain optimized,
  art-directed WebP variants.

The official transparent navigation logo remains at the project root as
`TopJustice Logo.png`. It is exported by `lib/assets.ts` and must not be moved,
cropped, filtered, or recreated.

`data/assets.ts` is the single source of truth for rendered paths, dimensions,
responsive sizes, and alternative text. Components must consume that manifest
through `lib/assets.ts`; do not hardcode paths in homepage sections.

Run `npm run assets:build` to reproducibly rebuild the approved derivatives.
The process uses deterministic focal-point crops only and does not generate or
retouch image content.

The original Phase 3 archive remains preserved under
`public/assets/justice-for-jaali-phase-3-assets/`.

## Pending assets

- Optional dedicated Vision image; the approved Jaali portrait is currently in use
- Favicon
- Optional milestone-specific Timeline images
- Optional footer-specific image, if later approved

Pending manifest entries intentionally render accessible fallbacks and emit no
broken image or favicon URLs.
