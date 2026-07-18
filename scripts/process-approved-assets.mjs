import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const imageRoot = path.join(projectRoot, "public", "assets", "images");
const originalsRoot = path.join(imageRoot, "originals");

const assets = [
  {
    input: "JAALI Banner Pic.png",
    outputDirectory: "hero",
    outputName: "jaali-banner",
    focalPoint: { x: 0.68, y: 0.49 },
    variants: [
      { name: "desktop", width: 816, height: 1020 },
      { name: "tablet", width: 720, height: 900 },
      { name: "mobile", width: 560, height: 700 },
      { name: "open-graph", width: 1200, height: 630 },
    ],
  },
  {
    input: "Laaaliandboyfriend.png",
    outputDirectory: "story",
    outputName: "jaali-and-boyfriend",
    focalPoint: { x: 0.54, y: 0.43 },
    variants: [
      { name: "desktop", width: 888, height: 1110 },
      { name: "tablet", width: 720, height: 900 },
      { name: "mobile", width: 560, height: 700 },
    ],
  },
  {
    input: "remeberringJaali.png",
    outputDirectory: "backgrounds",
    outputName: "remembering-jaali",
    focalPoint: { x: 0.37, y: 0.5 },
    variants: [
      { name: "desktop", width: 1408, height: 1056 },
      { name: "tablet", width: 1024, height: 768 },
      { name: "mobile", width: 720, height: 900 },
    ],
  },
  {
    input: "Black hoodie. .png",
    outputDirectory: "banners",
    outputName: "justice-for-jaali-hoodie",
    focalPoint: { x: 0.5, y: 0.5 },
    variants: [
      { name: "desktop", width: 1200, height: 900 },
      { name: "tablet", width: 960, height: 720 },
      { name: "mobile", width: 720, height: 720 },
    ],
  },
  {
    input: "SteakNight.png",
    outputDirectory: "banners",
    outputName: "steak-night",
    focalPoint: { x: 0.5, y: 0.5 },
    quality: 92,
    variants: [
      { name: "desktop", width: 600, height: 750 },
      { name: "tablet", width: 560, height: 700 },
      { name: "mobile", width: 480, height: 600 },
    ],
  },
];

function getCrop(metadata, output, focalPoint) {
  if (!metadata.width || !metadata.height) {
    throw new Error("Unable to read source image dimensions.");
  }

  const sourceRatio = metadata.width / metadata.height;
  const outputRatio = output.width / output.height;
  const cropWidth =
    sourceRatio > outputRatio
      ? Math.round(metadata.height * outputRatio)
      : metadata.width;
  const cropHeight =
    sourceRatio > outputRatio
      ? metadata.height
      : Math.round(metadata.width / outputRatio);
  const focalX = metadata.width * focalPoint.x;
  const focalY = metadata.height * focalPoint.y;

  return {
    height: cropHeight,
    left: Math.round(
      Math.min(Math.max(focalX - cropWidth / 2, 0), metadata.width - cropWidth),
    ),
    top: Math.round(
      Math.min(
        Math.max(focalY - cropHeight / 2, 0),
        metadata.height - cropHeight,
      ),
    ),
    width: cropWidth,
  };
}

for (const asset of assets) {
  const inputPath = path.join(originalsRoot, asset.input);
  const metadata = await sharp(inputPath).metadata();

  for (const variant of asset.variants) {
    const outputPath = path.join(
      imageRoot,
      asset.outputDirectory,
      `${asset.outputName}-${variant.name}.webp`,
    );

    await sharp(inputPath)
      .rotate()
      .extract(getCrop(metadata, variant, asset.focalPoint))
      .resize(variant.width, variant.height, {
        fit: "fill",
        withoutEnlargement: true,
      })
      .webp({ effort: 6, quality: asset.quality ?? 88, smartSubsample: true })
      .toFile(outputPath);
  }
}

console.log(`Processed ${assets.length} approved images into ${imageRoot}.`);
