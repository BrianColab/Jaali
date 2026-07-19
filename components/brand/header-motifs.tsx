import type { CSSProperties } from "react";

const motifs = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a"];

// Explicit page order so every banner gets a distinct motif — hashing alone
// collides across our handful of pages, repeating motifs. Any seed not listed
// falls back to the hash.
const seedOrder = [
  "Her Name Was Jaali",
  "What We Are Fighting For",
  "If This Is Happening to You",
  "Trust What Your Body Is Telling You",
  "Maternal Warning Signs",
  "A Place to Record Your Experiences",
  "Find Resources",
];

// Stable hash so each page picks the same motif every render (SSR-safe),
// while different pages get different ones.
function hash(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

type HeaderMotifsProps = Readonly<{ seed: string }>;

export function HeaderMotifs({ seed }: HeaderMotifsProps) {
  const h = hash(seed);
  const order = seedOrder.indexOf(seed);
  const src = motifs[(order >= 0 ? order : h) % motifs.length];
  const angle = ((h >> 3) % 2 === 0 ? 1 : -1) * (7 + ((h >> 5) % 9));

  return (
    <span className="header-motifs" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="header-motifs__item"
        src={`/assets/images/header-motifs/${src}.png`}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ "--motif-rotate": `${angle}deg` } as CSSProperties}
      />
    </span>
  );
}
