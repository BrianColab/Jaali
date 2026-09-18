import type { SiteEvent } from "@/types/events";

/**
 * Community gatherings, upcoming and past. The page renders from this array,
 * newest date first — add an event by appending a record.
 */
export const events: readonly SiteEvent[] = [
  {
    id: "late-tony-cote-welcome-back-powwow-2026",
    title: "Late Tony Cote Welcome Back Traditional Pow Wow",
    date: "2026-09-24",
    dateDisplay: "Thursday, September 24, 2026",
    location: "First Nations University of Canada",
    address: "1 First Nations Way, Regina, SK",
    calendarFile:
      "/assets/calendar/late-tony-cote-welcome-back-powwow-2026.ics",
    image: "/assets/images/events/late-tony-cote-welcome-back-powwow-2026.webp",
    imageAlt:
      "Poster for the Late Tony Cote Welcome Back Traditional Pow Wow, Thursday September 24, 2026, at First Nations University of Canada, including the Student Memorial Special honouring Jaali Sutherland.",
    summary:
      "Hosted by the FNUniv Students’ Association, Regina Campus, this welcome-back pow wow includes a Student Memorial Special honouring Jaali Sutherland alongside fellow students Jeremy Joel Brass and Trevor Dubois.",
    details: [
      { label: "Registration", value: "10:00 a.m." },
      { label: "Grand entry", value: "1:30 p.m." },
      { label: "Host drum", value: "Red Dog Singers" },
      { label: "Masters of ceremonies", value: "Jeff Cappo" },
      { label: "Arena director", value: "Alwyn Foureyes" },
    ],
    highlight:
      "Student Memorial Special — Teen Girls, honouring the late Jaali Sutherland",
    url: "mailto:reginastudentassoc@firstnationsuniversity.ca",
    actionLabel: "Contact the organizers",
  },
  {
    id: "steak-night-fundraiser-2026",
    title: "Steak Night — Support Justice for Jaali",
    date: "2026-07-21",
    dateDisplay: "Tuesday, July 21, 2026",
    location: "Sports on Tap",
    image: "/assets/images/banners/steak-night-desktop.webp",
    imageAlt:
      "Steak Night fundraiser poster supporting Justice for Jaali, July 21, 2026, at Sports on Tap.",
    summary:
      "A steak supper fundraiser at Sports on Tap in support of Justice for Jaali, with cocktails followed by supper.",
    details: [
      { label: "Cocktails", value: "5:00 p.m." },
      { label: "Supper", value: "6:00 p.m." },
      { label: "Tickets", value: "$30" },
    ],
  },
];
