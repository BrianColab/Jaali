import { ImageResponse } from "next/og";

import { events } from "@/data/events";
import { siteConfig } from "@/lib/site-config";

export const alt =
  "Late Tony Cote Welcome Back Traditional Pow Wow, September 24, 2026, at First Nations University of Canada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function EventOpenGraphImage() {
  const event = events.find((item) => item.status !== "past") ?? events[0]!;
  const posterUrl = new URL(
    "/assets/images/events/late-tony-cote-welcome-back-powwow-social.png",
    siteConfig.url,
  ).toString();

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#f8f2e9",
        color: "#102f32",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "68%",
          padding: "54px 58px 48px",
          borderTop: "16px solid #0b6973",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#9d2822",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Upcoming community event
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 54,
            fontWeight: 800,
            letterSpacing: -1.5,
            lineHeight: 1.05,
          }}
        >
          {event.title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            color: "#9d2822",
            fontSize: 27,
            fontWeight: 750,
          }}
        >
          {event.dateDisplay}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 14,
            color: "#28565a",
            fontSize: 23,
            fontWeight: 650,
            lineHeight: 1.3,
          }}
        >
          {event.location} · {event.address}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            paddingTop: 22,
            borderTop: "2px solid rgba(11, 105, 115, 0.18)",
            color: "#102f32",
            fontSize: 21,
            fontWeight: 700,
          }}
        >
          Student Memorial Special honouring Jaali Sutherland
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 12,
            color: "#0b6973",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          Justice for Jaali · j4j.ca/events
        </div>
      </div>
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "32%",
          height: "100%",
          overflow: "hidden",
          background: "#07555d",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterUrl}
          alt=""
          width="384"
          height="630"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>,
    size,
  );
}
