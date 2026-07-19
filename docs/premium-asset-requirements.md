# Premium asset requirements

## Licensed display font

The design system is prepared to replace the documented Cormorant Garamond
fallback with Canela when licensed webfont files are supplied. Provide WOFF2
files and the licensed weight names before updating `lib/fonts.ts`. Do not
download, substitute, or rename an unlicensed Canela file.

## Family-approved photograph captions

The typed responsive-image manifest now accepts optional `caption` and `credit`
fields. Add these fields only after the wording and attribution have been
approved by the family. The shared image component will automatically render
them with the archival caption treatment; no section-level code change is
required.
