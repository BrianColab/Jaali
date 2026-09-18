import type { SiteEvent } from "@/types/events";

/**
 * Upcoming community gatherings. The page renders from this array — add an
 * event by appending a record.
 */
export const events: readonly SiteEvent[] = [
  {
    id: "late-tony-cote-welcome-back-powwow-2026",
    title: "Late Tony Cote Welcome Back Traditional Pow Wow",
    date: "2026-09-24",
    dateDisplay: "Thursday, September 24, 2026",
    location: "First Nations University of Canada",
    address: "1 First Nations Way, Regina, SK",
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
];
