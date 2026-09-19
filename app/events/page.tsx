import type { Metadata } from "next";

import { EventsPage } from "@/sections/events-page";

const title = "Late Tony Cote Welcome Back Traditional Pow Wow";
const description =
  "Join us Thursday, September 24, 2026, at First Nations University of Canada in Regina for a Student Memorial Special honouring Jaali Sutherland.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/events" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/events",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function Events() {
  return <EventsPage />;
}
