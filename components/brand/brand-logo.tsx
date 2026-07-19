import Image from "next/image";

import { brandAssets } from "@/lib/assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/utils/cn";

type BrandLogoProps = Readonly<{
  className?: string;
  priority?: boolean;
  sizes: string;
}>;

export function BrandLogo({
  className,
  priority = false,
  sizes,
}: BrandLogoProps) {
  return (
    <span className={cn("brand-logo", className)}>
      <Image
        className="brand-logo__image"
        src={brandAssets.officialLogo}
        alt={siteConfig.name}
        priority={priority}
        quality={92}
        sizes={sizes}
      />
      <Image
        className="brand-logo__image brand-logo__image--white-wordmark"
        src={brandAssets.officialLogo}
        alt=""
        aria-hidden="true"
        priority={priority}
        quality={92}
        sizes={sizes}
      />
    </span>
  );
}
