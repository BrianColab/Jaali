# Phase 1 implementation

## Scope

This phase establishes the application foundation only. It deliberately does not publish editorial, biographical, medical, legal, donation, or advocacy copy from the supplied draft.

## Architecture

- Next.js App Router with React Server Components by default
- Strict TypeScript with additional indexed-access and optional-property checks
- Tailwind CSS v4 configured through PostCSS and CSS-first theme tokens
- Centralized site routes, SEO helpers, design tokens, and site configuration
- Accessible page shell with semantic landmarks, a skip link, visible focus treatment, and reduced-motion safeguards
- Local asset directories and a typed `next/image` wrapper
- Metadata, canonical URL, manifest, robots, and sitemap foundations

## Source-of-truth decisions

- The documented seven-color palette is represented exactly in `styles/tokens.css`.
- The documented 1440px maximum width and mobile/tablet/desktop breakpoints form the layout foundation.
- Inter is used for body text.
- Cormorant Garamond is the documented temporary fallback for Canela.
- The route inventory follows the suggested main navigation in the supplied copy document. Navigation UI awaits approved comps.

## Phase 2 blockers / TODOs

- Approved desktop, tablet, and mobile comps
- Licensed Canela webfont files, or confirmation to retain Cormorant Garamond
- Approved logo, favicon, imagery, icons, patterns, and textures
- Production domain for `NEXT_PUBLIC_SITE_URL`
- Family approval for biographical details, quotations, photography, and use of Jaali's name
- Canadian legal review of allegations, privacy language, donation terms, and patient-reporting flows
- Review of all clinical content by qualified Indigenous maternal-health professionals
- Approved accessibility behavior for any future interactive components
- Approved analytics, consent, form, donation, CMS, hosting, and security requirements
