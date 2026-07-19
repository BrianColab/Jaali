import type { EditorialPageContent } from "@/types/pages";

const emergencyNotice =
  "This website is not an emergency or clinical service. If you or your baby may be in immediate danger, call 911 or seek emergency medical care now.";

export const storyPageContent = {
  eyebrow: "Justice for Jaali",
  title: "Her Name Was Jaali",
  intro:
    "Jaali Sutherland-Weenie was a daughter, sister, partner, mother and friend. She was a member of Beardy’s & Okemasis Cree Nation and had completed her bachelor’s degree in Indigenous social work at the First Nations University of Canada.",
  sections: [
    {
      id: "the-future-she-was-building",
      title:
        "She was preparing to graduate. She was preparing to become a mother.",
      paragraphs: [
        "Her partner, Blayne Morin, remembers her smile, her jokes and her big heart. She listened when people needed her. She and Blayne planned to raise their daughter with love, cultural teachings and ceremony.",
        "Instead of celebrating her graduation and the birth of her daughter, Jaali’s family is seeking answers about why she died.",
      ],
    },
    {
      id: "answers-accountability-change",
      title: "Jaali’s Family Wants Answers. Accountability. Change.",
      paragraphs: [
        "They have called for a full, independent and transparent investigation. They believe warning signs were missed, Jaali’s concerns were not taken seriously and the health-care system failed to protect her. The Saskatchewan Health Authority has said that the death is being investigated as a critical incident.",
        "We will not allow her name to become another statistic.",
      ],
    },
    {
      id: "for-jaali",
      title:
        "For Jaali.\nFor Her Daughter.\nFor Every Mother Still Fighting to Be Heard.",
      paragraphs: [
        "Jaali’s life was more than the circumstances of her death.",
        "We remember the young woman who loved her family, completed her education, prepared for motherhood and offered others a listening ear. We honour the future she was building and the daughter who will grow up knowing how deeply her mother was loved.",
        "Jaali’s family has carried unimaginable grief into a demand for change. We will carry that demand with them.",
        "Her name was Jaali Sutherland-Weenie. This work is for her.",
      ],
    },
  ],
} as const satisfies EditorialPageContent;

export const advocacyPageContent = {
  eyebrow: "Advocacy",
  title: "What We Are Fighting For",
  intro:
    "The burden of fixing systemic failure cannot be placed on grieving families. Governments, hospitals, professional regulators and health authorities must act.",
  sections: [
    {
      id: "not-an-isolated-tragedy",
      title: "This Is Not An Isolated Tragedy",
      paragraphs: [
        "Indigenous people across Canada continue to report racism, discrimination, neglect and unsafe treatment in health-care settings.",
        "Indigenous mothers describe having their pain dismissed. Their symptoms minimized. Their knowledge of their own bodies questioned. Their families ignored. Some say they were made to wait while their conditions became more serious. Some lost their babies. Some feared they would not leave the hospital alive.",
        "These experiences are not misunderstandings to be brushed aside. They are warnings.",
        "Racism in health care can delay treatment. Apathy can silence urgent concerns. Discrimination can shape whose pain is believed and whose life is treated as a priority. When standards of care are not followed, the consequences can be permanent.",
      ],
    },
    {
      id: "we-are-calling-for",
      title: "We Are Calling For",
      items: [
        "Safe and equitable care for every Indigenous mother and baby",
        "Immediate action when maternal warning signs are reported",
        "Indigenous patient advocates available when and where care is delivered",
        "Clear escalation procedures that patients and families can activate",
        "Independent review of serious incidents and maternal deaths",
        "Transparent reporting and measurable accountability",
        "Mandatory action on anti-Indigenous racism in health care",
        "Indigenous governance of Indigenous maternal-health programs and data",
        "Sustained funding for Indigenous-led maternal-health services",
      ],
    },
    {
      id: "every-mother",
      title: "Every Mother Deserves Safe Care.",
      paragraphs: [
        "Every family deserves to be heard.",
        "Every health-care system must be accountable",
      ],
    },
  ],
} as const satisfies EditorialPageContent;

export const helpPageContent = {
  emergencyNotice,
  eyebrow: "I Need Help Now",
  title: "If This Is Happening to You",
  intro:
    "If you believe something is wrong, say so clearly. Do not minimize your symptoms to make others comfortable.",
  sections: [
    {
      id: "trust-your-body",
      title: "Trust What Your Body Is Telling You",
      paragraphs: [
        "Tell staff that your condition has changed or worsened. Ask for your vital signs to be checked and request an assessment by the appropriate clinician.",
      ],
    },
    {
      id: "use-direct-language",
      title: "Use Direct Language",
      items: [
        "“I am in severe pain and my condition is getting worse.”",
        "“I do not feel safe waiting.”",
        "“Please document my symptoms and the time I reported them.”",
        "“I am requesting an immediate reassessment.”",
        "“I want the most responsible nurse or physician notified now.”",
        "“Please explain the plan of care, what you are monitoring and when I will be reassessed.”",
        "“If this request is refused, please record that refusal in my chart.”",
      ],
    },
    {
      id: "bring-someone",
      title: "Bring Someone Who Can Advocate with You",
      paragraphs: [
        "When possible, ask a trusted family member, friend, Elder, patient navigator or Indigenous health representative to stay with you, take notes and repeat your concerns.",
      ],
    },
    {
      id: "escalate",
      title: "Escalate Your Concern",
      paragraphs: [
        "Ask to speak with the charge nurse, attending physician, patient advocate, Indigenous patient navigator or hospital administrator. If you believe you are in immediate danger, call 911 or seek emergency help.",
        "This information supports self-advocacy. It does not replace assessment or advice from a qualified health-care professional.",
      ],
    },
  ],
} as const satisfies EditorialPageContent;

export const rightsPageContent = {
  emergencyNotice,
  eyebrow: "Know Your Rights",
  title: "Trust What Your Body Is Telling You",
  intro:
    "If you believe something is wrong, say so clearly. Do not minimize your symptoms to make others comfortable.",
  sections: [
    {
      id: "reassessment",
      title: "Ask for Immediate Reassessment",
      paragraphs: [
        "Tell staff that your condition has changed or worsened. Ask for your vital signs to be checked and request an assessment by the appropriate clinician.",
      ],
    },
    {
      id: "keep-a-record",
      title: "Keep a Record",
      paragraphs: [
        "Write down symptoms, times, names, responses, delays and changes in your condition. Keep copies of documents and discharge instructions. Your safety comes first; documentation should never delay emergency care.",
      ],
    },
    {
      id: "direct-language",
      title: "Use Direct Language",
      items: [
        "“Please document my symptoms and the time I reported them.”",
        "“I am requesting an immediate reassessment.”",
        "“I want the most responsible nurse or physician notified now.”",
        "“If this request is refused, please record that refusal in my chart.”",
      ],
    },
    {
      id: "self-advocacy",
      title: "This Information Supports Self-Advocacy.",
      paragraphs: [
        "It does not replace assessment or advice from a qualified health-care professional.",
      ],
    },
  ],
} as const satisfies EditorialPageContent;

export const maternalHealthPageContent = {
  emergencyNotice,
  eyebrow: "Maternal Health",
  title: "Maternal Warning Signs",
  intro:
    "Pregnancy and the period after birth can involve medical emergencies. Seek immediate medical help for severe or worsening symptoms, including:",
  sections: [
    {
      id: "warning-signs",
      title: "Seek Immediate Medical Help",
      items: [
        "Difficulty breathing or shortness of breath",
        "Chest pain",
        "Coughing or vomiting blood",
        "Severe headache or changes in vision",
        "Seizures, fainting or confusion",
        "Severe abdominal, back or chest pain",
        "Heavy bleeding or fluid loss",
        "Sudden or severe swelling",
        "High blood pressure, when known",
        "Fever or signs of infection",
        "Reduced or absent fetal movement",
        "A strong feeling that something is seriously wrong",
      ],
    },
    {
      id: "do-not-wait",
      title: "You Do Not Need to Wait",
      paragraphs: [
        "This list is not complete. You do not need to wait for symptoms to become unbearable before asking for help.",
      ],
    },
  ],
} as const satisfies EditorialPageContent;

export const shareExperiencePageContent = {
  emergencyNotice:
    "Do not use this form for an active medical emergency. Call 911 or seek emergency care.",
  eyebrow: "Share Your Experience",
  title: "A Place to Record Your Experiences",
  intro:
    "If you or someone you love experienced racism, discrimination, neglect or unsafe care during pregnancy, childbirth or the period after birth, your experience matters.",
  sections: [
    {
      id: "why-sharing-matters",
      title: "Your Experience Matters",
      paragraphs: [
        "Sharing can help identify recurring failures, strengthen advocacy and show decision-makers what isolated complaint processes often fail to reveal.",
      ],
    },
    {
      id: "your-choice",
      title: "You Decide What to Share.",
      paragraphs: [
        "You decide whether you want follow-up. Your experience will not be published or used publicly without clear permission.",
      ],
    },
    {
      id: "call-for-change",
      title: "Join the Call for Change",
      paragraphs: [
        "We will listen when Indigenous patients say something is wrong.",
        "We will work so that no mother is left waiting, unheard and unprotected.",
      ],
    },
  ],
} as const satisfies EditorialPageContent;

export const resourcesPageContent = {
  eyebrow: "Resources and Advocacy",
  title: "Find Resources",
  intro: "This portal will connect Indigenous patients and families with:",
  sections: [
    {
      id: "resource-areas",
      title: "Resources and Advocacy",
      resources: [
        {
          category: "Emergency and maternal-health information",
          links: [
            {
              label: "Hope for Wellness Helpline",
              href: "https://hopeforwellness.ca",
              note: "24/7 crisis and wellness support for Indigenous peoples",
            },
            {
              label:
                "Public Health Agency of Canada – Pregnancy, Birth & Parenting Resources",
              href: "https://www.canada.ca/en/public-health/services/child-infant-health/supports-programs-pregnancy.html",
            },
          ],
        },
        {
          category: "Indigenous patient navigators and advocacy organizations",
          links: [
            {
              label:
                "National Association of Friendship Centres – Health Navigation Program",
              href: "https://nafc.ca/departments/programs/health-navigation",
            },
            {
              label: "Native Women’s Association of Canada (NWAC)",
              href: "https://nwac.ca",
            },
          ],
        },
        {
          category: "Pregnancy, birth and postpartum supports",
          links: [
            {
              label: "National Aboriginal Council of Midwives",
              href: "https://indigenousmidwifery.ca",
            },
            {
              label: "NWAC – Indigenous Maternity Experiences Project",
              href: "https://nwac.ca/academics-policy/policy-development/health/",
            },
          ],
        },
        {
          category: "Mental-health, grief and family supports",
          links: [
            {
              label: "Hope for Wellness Helpline",
              href: "https://hopeforwellness.ca",
            },
            {
              label:
                "National Association of Friendship Centres – Mental Health Resources",
              href: "https://nafc.ca/resources/mental-health",
            },
          ],
        },
        {
          category: "Complaint and professional-regulatory processes",
          links: [
            {
              label:
                "Provincial College of Physicians and Surgeons (province-specific)",
            },
            { label: "Provincial College of Nurses" },
            { label: "Provincial Patient Ombudsman/Patient Relations Office" },
          ],
        },
        {
          category: "Legal information and referrals",
          links: [
            {
              label: "Aboriginal Legal Services",
              href: "https://aboriginallegal.ca",
              note: "Ontario",
            },
            { label: "Provincial Legal Aid organizations" },
            {
              label: "Indigenous Bar Association",
              href: "https://www.indigenousbar.ca",
            },
          ],
        },
        {
          category: "Local, provincial, territorial and national resources",
          links: [
            {
              label: "NCCIH Indigenous Health Links Interactive Map",
              href: "https://www.nccih.ca/1678/Interactive_Map.nccih",
            },
            {
              label: "National Association of Friendship Centres",
              href: "https://nafc.ca",
            },
            { label: "Inuit Tapiriit Kanatami", href: "https://itk.ca" },
            { label: "Métis National Council", href: "https://metisnation.ca" },
          ],
        },
        {
          category: "Tools for documenting and escalating unsafe care",
          links: [
            { label: "Provincial Patient Relations Offices" },
            { label: "Provincial Health Ombudsman" },
            {
              label: "College complaint portals (Physicians, Nurses, Midwives)",
            },
            {
              label: "NWAC – Know Your Rights & Culturally Safe Resources",
              href: "https://nwac.ca/wg2stgd/culturally-safe-and-trauma-informed-knowledge-hub/",
            },
          ],
        },
      ],
    },
    {
      id: "patient-safety-network",
      title: "A Place to Be Heard—In Real Time",
      paragraphs: [
        "The vision is an Indigenous-led patient-safety network that people can reach while they are receiving care—not days or months later.",
        "No family should have to face a health-care system alone at its most vulnerable moment.",
      ],
    },
  ],
} as const satisfies EditorialPageContent;

export const donatePageContent = {
  eyebrow: "Support the Work",
  title: "Help Build What Should Have Been There for Jaali",
  intro:
    "Your support will help build an Indigenous-led maternal-health and patient-safety network shaped by families with lived experience.",
  paragraphs: [
    "Funding will support resource development, patient navigation, advocacy, technology, community outreach, education and the responsible collection of evidence needed to drive change.",
    "We will report clearly on how funds are used and what the work achieves.",
  ],
  fundingAreas: [
    "Resource development",
    "Patient navigation",
    "Advocacy",
    "Technology",
    "Community outreach",
    "Education",
    "The responsible collection of evidence needed to drive change",
  ],
} as const;
