# Phase 3 asset inventory

## Official logo

`TopJustice Logo.png` is the official Justice for Jaali navigation logo. The
711x358 transparent PNG remains unchanged in the project root and is exported
through `lib/assets.ts` for static Next/Image optimization. SHA-256:
`7F051CEB9EEFD0559886AD5E13C0F40A50F87794C28FBA3A79063965F5EEA568`.

## Approved source images

The five supplied PNG files were moved from the project root into
`public/assets/images/originals/`. Their uploaded filenames and bytes are
preserved exactly.

| Uploaded filename        | Dimensions | SHA-256                                                            |
| ------------------------ | ---------: | ------------------------------------------------------------------ |
| `Black hoodie. .png`     |  1327x1185 | `C05244278E1A2242DDF9342EBE5A96B70082ED426FF1A06F033EA61F47204B28` |
| `JAALI Banner Pic.png`   |  1537x1023 | `981AE11E329D175E89AED0CAFCAA3A000408ECDCEEA209E8B8C727ACF726116B` |
| `Laaaliandboyfriend.png` |  1415x1111 | `F8936EF427AC60364866D1E46F8C191558816BC95279D73949B74E115ABEEE2F` |
| `remeberringJaali.png`   |  1490x1056 | `9B213C2850E00AA4BC4CA686E7555B2DA4ED099DE1E9D3714149C6E2EE34F715` |
| `SteakNight.png`         |    624x752 | `E9C599AAE8D7D6681E2085C2079A4EE6A7F077DD711E71296F251222415C7BA9` |

The first and fourth uploaded filenames differ from the requested names
`Jaali hoodie.png` and `remainingjaali.png`. The actual uploaded filenames are
retained to satisfy the original-preservation requirement.

## WebP derivatives

All derivatives are deterministic focal-point crops generated from the
approved originals. No image content was generated or retouched.

| Homepage use               | Desktop                                                    | Tablet                                                   | Mobile                                                   |
| -------------------------- | ---------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| Hero                       | `hero/jaali-banner-desktop.webp` (816x1020)                | `hero/jaali-banner-tablet.webp` (720x900)                | `hero/jaali-banner-mobile.webp` (560x700)                |
| Story                      | `story/jaali-and-boyfriend-desktop.webp` (888x1110)        | `story/jaali-and-boyfriend-tablet.webp` (720x900)        | `story/jaali-and-boyfriend-mobile.webp` (560x700)        |
| Timeline and quote context | `backgrounds/remembering-jaali-desktop.webp` (1408x1056)   | `backgrounds/remembering-jaali-tablet.webp` (1024x768)   | `backgrounds/remembering-jaali-mobile.webp` (720x900)    |
| Vision                     | `hero/jaali-banner-desktop.webp` (816x1020)                | `hero/jaali-banner-tablet.webp` (720x900)                | `hero/jaali-banner-mobile.webp` (560x700)                |
| Supporting resource        | `banners/justice-for-jaali-hoodie-desktop.webp` (1200x900) | `banners/justice-for-jaali-hoodie-tablet.webp` (960x720) | `banners/justice-for-jaali-hoodie-mobile.webp` (720x720) |
| Donate support             | `banners/steak-night-desktop.webp` (600x750)               | `banners/steak-night-tablet.webp` (560x700)              | `banners/steak-night-mobile.webp` (480x600)              |

Paths in the table are relative to `public/assets/images/`. The hero source
also provides `hero/jaali-banner-open-graph.webp` at 1200x630.

## Integration

`data/assets.ts` is the typed asset manifest. `lib/assets.ts` exposes the
homepage and metadata manifests, and `scripts/process-approved-assets.mjs`
rebuilds the deterministic derivatives. Homepage composition consumes these
assets without changing the existing content-component APIs.

## Remaining image TODOs

- The approved Jaali portrait currently supports the Vision section; obtain a
  dedicated image only if later editorial direction requires one.
- Obtain milestone-specific Timeline images if the editorial direction calls
  for individual milestone media; the approved remembrance image currently
  provides section context.
- Obtain and approve a favicon.
- Obtain a footer-specific visual only if the approved design later requires
  one; the footer remains intentionally media-free.
- Complete family/editorial review of the provisional meaningful alt text in
  `data/assets.ts`.
