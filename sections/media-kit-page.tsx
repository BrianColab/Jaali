"use client";

import { useState } from "react";
import Image from "next/image";

import { FeatherWatermark } from "@/components/brand/feather-watermark";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

type FormatOption = {
  label: string;
  href: string;
};

type MediaAsset = {
  id: string;
  title: string;
  description: string;
  preview: string;
  formats: readonly FormatOption[];
};

const mediaAssets: readonly MediaAsset[] = [
  {
    id: "logo",
    title: "Logo",
    description: "The official Justice for JAALI logo for press and partner use.",
    preview: "/media-kit/logo/justice-4-jaali-logo.png",
    formats: [
      { label: "PNG", href: "/media-kit/logo/justice-4-jaali-logo.png" },
      { label: "JPG", href: "/media-kit/logo/justice-4-jaali-logo.jpg" },
    ],
  },
  {
    id: "main-image",
    title: "Main Image",
    description: "The primary campaign image for articles, features, and social posts.",
    preview: "/media-kit/images/justice-4-jaali-main-image-full.jpg",
    formats: [
      { label: "PNG", href: "/media-kit/images/justice-4-jaali-main-image-full.png" },
      { label: "JPG", href: "/media-kit/images/justice-4-jaali-main-image-full.jpg" },
    ],
  },
];

const qrFormats: readonly FormatOption[] = [
  { label: "PNG", href: "/media-kit/qr/justice-4-jaali-qr-code.png" },
  { label: "JPG", href: "/media-kit/qr/justice-4-jaali-qr-code.jpg" },
  { label: "SVG", href: "/media-kit/qr/justice-4-jaali-qr-code.svg" },
  { label: "PDF", href: "/media-kit/qr/justice-4-jaali-qr-code.pdf" },
  { label: "EPS", href: "/media-kit/qr/justice-4-jaali-qr-code.eps" },
];

function AssetCard({ asset }: { asset: MediaAsset }) {
  const [format, setFormat] = useState<FormatOption>(asset.formats[0]!);

  return (
    <div className="media-kit-card">
      <div className="media-kit-card__preview">
        <Image
          src={asset.preview}
          alt={`${asset.title} preview`}
          fill
          sizes="(min-width: 48rem) 20rem, 90vw"
          className="media-kit-card__image"
        />
      </div>
      <div className="media-kit-card__body">
        <Heading level={3} variant="card">
          {asset.title}
        </Heading>
        <Text size="small" className="text--muted">
          {asset.description}
        </Text>

        <div className="media-kit-card__controls">
          <label className="form-label" htmlFor={`${asset.id}-format`}>
            File format
          </label>
          <select
            id={`${asset.id}-format`}
            className="form-control"
            value={format.label}
            onChange={(event) => {
              const next = asset.formats.find(
                (option) => option.label === event.target.value,
              );
              if (next) setFormat(next);
            }}
          >
            {asset.formats.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>

          <a
            className="button button--primary button--medium media-kit-card__download"
            href={format.href}
            download
          >
            Download {format.label}
          </a>
        </div>
      </div>
    </div>
  );
}

function QrCard() {
  const [format, setFormat] = useState<FormatOption>(qrFormats[0]!);

  return (
    <div className="media-kit-card">
      <div className="media-kit-card__preview">
        <Image
          src="/media-kit/qr/justice-4-jaali-qr-code.png"
          alt="QR code linking to the Justice for JAALI website"
          fill
          sizes="(min-width: 48rem) 20rem, 90vw"
          className="media-kit-card__image media-kit-card__image--contain"
        />
      </div>
      <div className="media-kit-card__body">
        <Heading level={3} variant="card">
          QR Code
        </Heading>
        <Text size="small" className="text--muted">
          Scans directly to the Justice for JAALI website. Available in
          multiple formats for print and digital use.
        </Text>

        <div className="media-kit-card__controls">
          <label className="form-label" htmlFor="qr-format">
            File format
          </label>
          <select
            id="qr-format"
            className="form-control"
            value={format.label}
            onChange={(event) => {
              const next = qrFormats.find(
                (option) => option.label === event.target.value,
              );
              if (next) setFormat(next);
            }}
          >
            {qrFormats.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>

          <a
            className="button button--primary button--medium media-kit-card__download"
            href={format.href}
            download
          >
            Download {format.label}
          </a>
        </div>
      </div>
    </div>
  );
}

export function MediaKitPage() {
  return (
    <article className="content-page donation-page">
      <header className="content-page__hero">
        <FeatherWatermark />
        <Container>
          <Eyebrow>Press &amp; Media</Eyebrow>
          <Heading id="page-title" level={1} variant="display">
            Media Kit
          </Heading>
          <Text className="content-page__intro" size="lead">
            Official Justice for JAALI logo, campaign image, and QR code for
            press coverage, partner materials, and print.
          </Text>
        </Container>
      </header>

      <section className="donation-page__body" aria-labelledby="media-kit-assets">
        <Container>
          <Heading id="media-kit-assets" level={2} variant="section" className="visually-hidden">
            Downloadable Assets
          </Heading>
          <div className="media-kit-grid">
            {mediaAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
            <QrCard />
          </div>
        </Container>
      </section>
    </article>
  );
}
