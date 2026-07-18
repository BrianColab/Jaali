# Phase 3 implementation

## Scope

Phase 3 prepares the homepage for approved production media and externally supplied content. It does not add artwork, logos, final copy, or additional pages.

## Asset manifest

`data/assets.ts` is the single source of truth for homepage media, Open Graph imagery, and favicon metadata. Entries use an explicit `pending` or `ready` state.

Ready homepage assets support:

- required mobile source;
- optional tablet and desktop art direction;
- exact intrinsic dimensions;
- responsive `sizes` configuration;
- approved alternative text or an explicit decorative state;
- configurable optimization quality; and
- priority loading for the homepage hero.

Pending entries render accessible neutral fallbacks and never emit broken image URLs. Missing tablet or desktop variants naturally fall back to the next available source.

## Content integration

`sections/homepage.tsx` accepts complete `content` and `assets` props. The default values come from `data/homepage.ts` and `data/assets.ts`. A future CMS or approved handoff adapter can pass replacement objects without changing the section composition.

## Metadata assets

The root metadata reads Open Graph and favicon configuration from the asset manifest. Pending entries emit no URL. Ready entries are validated before metadata is generated.

## Image performance

Ready responsive assets use `next/image`'s `getImageProps` to create optimized source sets inside an art-directed `<picture>`. The hero uses eager, high-priority loading; other homepage images use native lazy loading and asynchronous decoding.

## Accessibility and motion

- Informative ready assets require non-empty approved alternative text.
- Decorative assets require an empty alternative value.
- Pending fallbacks expose an accessible label from the manifest.
- Reduced-motion mode now bypasses the hidden initial reveal state as well as movement and transition duration.
- The no-script visibility safeguard remains in place.

## Production asset checklist

See `public/ASSETS.md` for the file and manifest handoff contract. Production files, final alternative text, Open Graph media, and favicon artwork remain pending approval.
