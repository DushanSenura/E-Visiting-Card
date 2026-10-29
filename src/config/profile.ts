/**
 * ─────────────────────────────────────────────────────────────
 *  LEE SCENTS — DIGITAL VISITING CARD CONFIGURATION
 * ─────────────────────────────────────────────────────────────
 *  Every name, number, address, link and piece of copy on the
 *  site comes from this file. Edit it and the whole card —
 *  including the vCard, QR code, page title and social previews —
 *  updates automatically.
 *
 *  Placeholder values (anything containing "xxx" or left empty)
 *  are detected automatically: the matching buttons are hidden
 *  or disabled so visitors never get a broken link.
 * ─────────────────────────────────────────────────────────────
 */
import type { ProfileConfig } from "./types";

const person: ProfileConfig["person"] = {
  honorific: "Mr.",
  firstName: "Leslie",
  lastName: "Peiris",
  name: "Mr. Leslie Peiris",
  position: "Founder / Director",
  photo: "/profile/leslie-peiris.webp",
};

const company: ProfileConfig["company"] = {
  name: "Lee Scents",
  tagline: "Premium Fragrance & Aromatic Solutions",
  shortTagline: "Premium Aromatics",
  summary: "Premium fragrance, aromatic and cosmetic ingredient solutions.",
  highlights: ["Fragrance", "Aromatics", "Essential Ingredients"],
  description:
    "Lee Scents provides premium fragrance, aromatic and related ingredient solutions with a focus on quality, reliability and professional customer service.",
  values: ["Quality", "Reliability", "Professional Service"],
  logo: "",
};

export const profileConfig: ProfileConfig = {
  person,
  company,

  contact: {
    phoneDisplay: "+94 77 734 1302",
    phoneInternational: "",
    whatsapp: "+94 77 734 1302",
    whatsappMessage: `Hello ${person.name}, I found your ${company.name} digital card.`,
    wechat: "lesly_19710802",
    email: "leslie@leescents.com",
    address: "X, XXXXXX, XXXXXXX",
    country: "Sri Lanka",
    countryCallingCode: "94",
    mapQuery: "",
  },

  links: {
    website: "",
    // Set after deployment, e.g. "https://card.leescents.lk"
    digitalCardUrl: "",
  },

  services: [
    {
      title: "Fine Perfumes",
      description: "Premium fine fragrances and perfume compositions.",
      icon: "Sparkles",
    },
    {
      title: "Essential Oils",
      description: "Selected aromatic and essential oils.",
      icon: "Droplets",
    },
    {
      title: "Glycerin Bathing Bar Bases",
      description: "Glycerin soap bases for bathing bar production.",
      icon: "Bubbles",
    },
    {
      title: "Cosmetic Raw Materials & High-End Actives",
      description: "Cosmetic raw materials and high-end active ingredients for personal-care formulations.",
      icon: "FlaskConical",
    },
    {
      title: "New Product Development & Contract Manufacturing",
      description: "New product development and contract manufacturing for skin care and hair care.",
      icon: "Factory",
    },
  ],

  share: {
    title: `${company.name} — ${person.name}`,
    text: `Connect with ${person.name} from ${company.name}.`,
  },

  seo: {
    title: `${person.name} | ${company.name}`,
    description: `Digital visiting card for ${person.name} of ${company.name}. Connect by phone, WhatsApp, WeChat, email or save contact details directly.`,
    ogTitle: `${person.name} — ${company.name}`,
    ogDescription: `Connect with ${person.name} from ${company.name}.`,
    ogImage: "/og/lee-scents-card.jpg",
    themeColor: "#173D32",
    backgroundColor: "#F8F6F1",
    locale: "en_LK",
  },

  vcard: {
    fileName: `${person.firstName}-${person.lastName}-${company.name.replace(/\s+/g, "-")}.vcf`,
  },

  developer: {
    name: "NovaCore Techs",
    website: "",
    creditLabel: "Designed & Developed by",
  },
};
