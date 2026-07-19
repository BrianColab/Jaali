import Image from "next/image";

import { brandAssets } from "@/lib/assets";

export function FeatherWatermark() {
  return (
    <span className="feather-watermark" aria-hidden="true">
      <Image
        className="feather-watermark__image"
        src={brandAssets.officialLogo}
        alt=""
        quality={85}
        sizes="(min-width: 75rem) 48rem, (min-width: 48rem) 38rem, 28rem"
      />
    </span>
  );
}
