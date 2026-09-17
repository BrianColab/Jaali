import type { MediaFilter, MediaItem, MediaSortOrder } from "@/types/media";

export const mediaLastResearched = "2026-09-16";

export const mediaDefaultSort: MediaSortOrder = "oldest";

export const mediaFilters: readonly MediaFilter[] = [
  "All",
  "News",
  "Video & Audio",
  "Official Actions",
  "Community",
];

/**
 * Every record researched for the archive, published or not.
 *
 * Records with `publish: false` are held back until their canonical publisher
 * URL is confirmed; they stay here so the research is not lost. Add coverage by
 * appending a record — the page renders from this array.
 */
export const mediaItems: readonly MediaItem[] = [
  {
    id: "resolution-13-2026",
    date: "2026-09-17",
    dateDisplay: "Official PDF",
    source: "Justice for Jaali",
    author: null,
    type: "Official Actions",
    headline:
      "Resolutions 13-2026 – Support for Jaali’s Call to Action and a National Review of Indigenous Patient Safety",
    summary:
      "Read the official resolution supporting Jaali’s Call to Action and a national review focused on Indigenous patient safety, accountability and lasting systemic change.",
    url: "/documents/resolutions-13-2026-jaali-call-to-action.pdf",
    actionLabel: "Read the resolution",
    featured: true,
    majorMilestone: true,
    pinned: true,
    publish: true,
    notes:
      "Pinned priority document. Matches the major resolution announcement on the homepage.",
  },
  {
    id: "cbc-2026-05-25",
    date: "2026-05-25",
    source: "CBC News",
    author: "Hannah Spray",
    type: "News",
    headline:
      "Family seeks answers after Indigenous mother dies in delivery room at Saskatoon hospital",
    summary:
      "CBC reports on Jaali Sutherland-Weenie's death, her family's account of her care, and their call for accountability from the health-care system.",
    url: "https://www.cbc.ca/news/canada/saskatoon/indigenous-woman-health-pregnancy-preeclampsia-death-9.7211641",
    featured: false,
    publish: true,
    notes: "Canonical CBC URL. Original major coverage.",
  },
  {
    id: "starphoenix-2026-05-25",
    date: "2026-05-25",
    source: "Saskatoon StarPhoenix",
    author: null,
    type: "News",
    headline:
      "Family says concerns were 'dismissed' before woman died giving birth in Saskatoon hospital",
    summary:
      "The StarPhoenix reports the family's concerns about Jaali's treatment and their call for answers following her death during childbirth.",
    url: "https://thestarphoenix.com/news/local-news/family-says-concerns-were-dismissed-before-woman-died-giving-birth-in-saskatoon-hospital",
    featured: false,
    publish: true,
    notes:
      "Original outlet. Do not list translated or syndicated copies as separate cards.",
  },
  {
    id: "mbc-2026-05-25",
    date: "2026-05-25",
    source: "MBC Radio",
    author: "Joel Willick",
    type: "News",
    headline:
      "Family calls for justice after death of 24-year-old Indigenous mother during childbirth",
    summary:
      "MBC Radio covers the family's press conference, their request for answers and accountability, and concerns about broader barriers in health care.",
    url: "https://www.mbcradio.com/2026/05/family-calls-for-justice-after-death-of-24-year-old-indigenous-mother-during-childbirth",
    featured: false,
    publish: true,
    notes: "Indigenous media coverage.",
  },
  {
    id: "ckrm-2026-05-25",
    date: "2026-05-25",
    source: "620 CKRM",
    author: "Jon Perez",
    type: "News",
    headline: "Weenie-Sutherland’s family seeks answers after her death",
    summary:
      "CKRM reports from the Wanuskewin press conference, including the family's calls for transparency, accountability, and health-system reform.",
    url: "https://www.620ckrm.com/2026/05/25/weenie-sutherlans-family-seeks-answers-after-her-death/",
    featured: false,
    publish: true,
    notes: "Unique original report.",
  },
  {
    id: "fsin-video-2026-05-25",
    date: "2026-05-25",
    source: "Federation of Sovereign Indigenous Nations",
    author: null,
    type: "Video & Audio",
    headline: "FSIN press conference on Jaali Weenie-Sutherland",
    summary:
      "Official video of the press conference where Jaali's family and Indigenous leaders spoke publicly about her life, her death, and their call for change.",
    url: "https://www.facebook.com/FSINations/videos/fsin-press-conferencethe-federation-of-sovereign-indigenous-nations-fsin-gather-/1507166040865624/",
    featured: false,
    publish: true,
    notes: "Primary-source video. External platform link.",
  },
  {
    id: "global-2026-05-26",
    date: "2026-05-26",
    source: "Global News",
    author: "Grace Miller",
    type: "News",
    headline:
      "Justice for Jaali: Calls for change after Indigenous mother dies in Saskatoon hospital",
    summary:
      "Global News reports the family's allegations about delays in Jaali's care and their effort to seek justice and changes for other mothers.",
    url: "https://globalnews.ca/news/11864255/jaali-weenie-sutherland-indigenous-woman-death-saskatoon/",
    secondaryUrl:
      "https://globalnews.ca/video/11864263/justice-for-jaali-calls-for-change-follow-maternal-mortality-in-saskatoon/",
    secondaryLabel: "Watch video",
    featured: true,
    publish: true,
    notes:
      "Keep article and related Global video in one card to avoid duplicate cards.",
  },
  {
    id: "ckom-2026-05-26",
    date: "2026-05-26",
    source: "650 CKOM",
    author: "Libby Gray",
    type: "News",
    headline:
      "Pregnant Indigenous woman died after extended wait for care at Saskatoon hospital, family says",
    summary:
      "CKOM provides detailed reporting from the family's press conference and records their account that Jaali waited 13 to 14 hours in observation after her diagnosis.",
    url: "https://www.ckom.com/2026/05/26/family-says-pregnant-indigenous-woman-died-after-extended-wait-for-care-at-saskatoon-hospital/",
    featured: false,
    publish: true,
    notes:
      "Use one Pattison/CKOM version only. Do not duplicate the same story from CJME.",
  },
  {
    id: "people-2026-05-26",
    date: "2026-05-26",
    source: "People",
    author: "Hannah Sacks",
    type: "News",
    headline:
      "Indigenous Woman Dies During Childbirth Following Severe Pregnancy Complication. Now Her Family Wants Answers",
    summary:
      "People brings Jaali's story to a broader international audience, reporting on her family's questions and calls for an investigation.",
    url: "https://people.com/indigenous-woman-dies-in-delivery-room-following-severe-pregnancy-complication-11983546",
    featured: false,
    publish: true,
    notes: "Broader international reach.",
  },
  {
    id: "cafemom-2026-05-27",
    date: "2026-05-27",
    source: "CafeMom",
    author: "Sa’iyda Shabazz",
    type: "News",
    headline:
      "Family Fights for Justice for Indigenous Mom Who Died While Giving Birth After Her Concerns Were 'Dismissed'",
    summary:
      "CafeMom reports on Jaali's death and her family's fight for answers, extending the story into parenting and family-focused media.",
    url: "https://cafemom.com/parenting/family-fighting-justice-indigenous-mom-dies-childbirth",
    featured: false,
    publish: true,
    notes: "Secondary media coverage, not a syndicated duplicate.",
  },
  {
    id: "national-native-news-2026-05-28",
    date: "2026-05-28",
    source: "National Native News",
    author: "Antonia Gonzales / Koahnic Broadcast Corporation",
    type: "Video & Audio",
    headline: "Thursday, May 28, 2026",
    summary:
      "National Native News includes Jaali's story in its daily Indigenous newscast, highlighting the family's demand for answers and concerns about maternal health care.",
    url: "https://www.listennotes.com/ms/podcasts/national-native-news/thursday-may-28-2026-CNn32UdSvT1/",
    featured: false,
    publish: true,
    notes:
      "Episode archive currently verified through Listen Notes. Replace with an original Koahnic/National Native News episode URL if a stable direct page is located.",
  },
  {
    id: "panow-2026-06-03",
    date: "2026-06-03",
    source: "paNOW",
    author: "Nigel Maxwell",
    type: "News",
    headline:
      "Awareness walk planned this weekend in honour of young pregnant mother who passed away in hospital",
    summary:
      "paNOW reports on plans for the Justice for Jaali Walk and a more detailed timeline released by Beardy's & Okemasis Cree Nation leadership.",
    url: "https://panow.com/2026/06/03/awareness-walk-planned-this-weekend-in-honour-of-young-pregnant-mother-who-passed-away-in-hospital/",
    featured: true,
    publish: true,
    notes:
      "Important later timeline. Attribute the 26h33m observation-space figure to BOCN leadership.",
  },
  {
    id: "otc-walk-2026-06-07",
    date: "2026-06-07",
    source: "Office of the Treaty Commissioner",
    author: null,
    type: "Community",
    headline: "Justice For Jaali - A Walk for Awareness of Preeclampsia",
    summary:
      "Official event listing for the Justice for Jaali walk from White Buffalo Youth Lodge to River Landing Amphitheatre in Saskatoon.",
    url: "https://otc.ca/events/list/?eventDisplay=past&tribe-bar-date=2026-07-15",
    featured: true,
    publish: true,
    notes: "Timeline milestone rather than media article.",
  },
  {
    id: "cbc-followup-2026-06-08",
    date: "2026-06-08",
    source: "CBC News",
    author: null,
    type: "News",
    headline:
      "Family pushes for accountability in young mother's death at 'Justice for Jaali' walk",
    summary:
      "CBC follows the story after the Justice for Jaali walk as the family continues to call for an investigation and accountability.",
    url: null,
    verificationUrl:
      "https://www.newslocker.com/en-ca/region/saskatoon/saskatoon-family-wants-justice-after-they-say-their-cat-was-trapped-and-left-in-a-rural-field/",
    featured: true,
    publish: false,
    notes:
      "Confirmed to exist, but direct canonical CBC URL still needs to be captured. Do not publish an aggregator link as the primary card.",
  },
  {
    id: "ctv-followup-2026-06-08",
    date: "2026-06-08",
    source: "CTV News",
    author: null,
    type: "News",
    headline:
      "Family of expectant mother who died at Saskatoon hospital calling for change",
    summary:
      "CTV reports from the Justice for Jaali walk and on the family's continuing call for change following Jaali's death.",
    url: null,
    verificationUrl:
      "https://979thecowboy.evoradio.ca/newstory.php?NRS_id=12870",
    featured: true,
    publish: false,
    notes:
      "Confirmed by CTV Regina social promotion and preserved copy. Capture the direct CTV canonical URL before publishing.",
  },
  {
    id: "afn-resolution-2026-07",
    date: "2026-07-16",
    dateDisplay: "July 14–16, 2026",
    source: "Assembly of First Nations",
    author: null,
    type: "Official Actions",
    headline:
      "Resolution 50/2026: Support for Jaali’s Call to Action and a National Review of Indigenous Patient Safety",
    summary:
      "Jaali's family addressed First Nations-in-Assembly, and Draft Resolution 50/2026 was unanimously passed in support of the family's pursuit of truth, healing, accountability, and lasting change.",
    url: "https://www.linkedin.com/posts/assembly-of-first-nations_she-is-more-than-a-name-she-was-a-mother-activity-7483299425415671808-JU9v",
    featured: true,
    majorMilestone: true,
    publish: true,
    notes:
      "Highest-priority milestone. Give this card a 'Major Milestone' badge while keeping it in chronological position. AFN's public document library may later provide a direct final resolution PDF.",
  },
  {
    id: "canadian-affairs-2026-08-20",
    date: "2026-08-20",
    source: "Canadian Affairs",
    author: null,
    type: "News",
    headline:
      "'Disturbing': Most women report disrespect during childbirth: study",
    summary:
      "Later national health reporting connects Jaali's case and the AFN resolution to broader concerns about disrespect and mistreatment during childbirth.",
    url: "https://www.canadianaffairs.news/2026/08/20/disrespect-mistreatment-childbirth-indigenous-midwives/",
    featured: true,
    publish: true,
    notes: "Impact/follow-through coverage.",
  },
];
