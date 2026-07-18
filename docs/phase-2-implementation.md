# Phase 2 implementation

## Scope

Phase 2 implements the approved visual system and a responsive homepage framework. All editorial, biographical, clinical, legal, fundraising, and advocacy copy remains explicitly marked as pending. No production imagery or logo has been introduced.

## Component library

- Site header with desktop and native mobile navigation
- Editorial hero and responsive image placeholder
- Section and container primitives
- Story block, timeline, quote block, feature cards, accordion, warning-sign list, CTA banner, resource cards, and donation banner
- Site footer and disabled-until-integrated newsletter form
- Native-dialog modal
- Typed button, card, typography, and form systems
- Optimized image abstraction based on `next/image`

## Motion system

The shared Framer Motion layer provides:

- Fade Up
- Fade In
- Section Reveal
- Hero Reveal
- Timeline Reveal
- Hover Lift

Every motion primitive checks the user's reduced-motion preference. Global CSS also removes nonessential transitions and smooth scrolling when reduced motion is enabled.

## Responsive system

- Mobile: four-column grid
- Tablet: eight-column grid at 48rem
- Desktop: twelve-column grid at 75rem
- Maximum site width: 1440px
- Fluid page gutters, section spacing, display typography, and component grids

## Content replacement

Homepage placeholder data is centralized in `data/homepage.ts`. Approved content can replace these records without changing component structure. Image placeholders can be replaced through the existing typed `next/image` path once approved assets and alt text are supplied.

## Pending for Phase 3

- Approved desktop, tablet, and mobile comps for pixel-level comparison
- Approved production copy and citations
- Family-approved photography and alt text
- Licensed Canela webfonts or fallback confirmation
- Approved logo and favicon
- Legal and clinical review outcomes
- Form, newsletter, resource, donation, and story-sharing integrations
- Production domain and deployment requirements
