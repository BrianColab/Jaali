import Image, { type ImageProps } from "next/image";

type OptimizedImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
};

export function OptimizedImage({ alt, ...props }: OptimizedImageProps) {
  return <Image alt={alt} {...props} />;
}
