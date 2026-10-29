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
    phoneDisplay: "+94 77 7341 0302",
    phoneInternational: "",
    whatsapp: "+94 77 7341 0302",
    whatsappMessage: `Hello ${person.name}, I found your ${company.name} digital card.`,
    email: "",
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
      title: "Fragrance Solutions",
      description: "Premium fragrance and aromatic solutions for personal care and related applications.",
      icon: "Sparkles",
    },
    {
      title: "Essential Oils",
      description: "Selected aromatic and essential oil solutions.",
      icon: "Droplets",
    },
    {
      title: "Cosmetic Ingredients",
      description: "Quality ingredients suitable for cosmetic and personal-care formulations.",
      icon: "FlaskConical",
    },
    {
      title: "Product Support",
      description: "Professional support for customers sourcing fragrance and related materials.",
      icon: "Headset",
    },
  ],

  share: {
    title: `${company.name} — ${person.name}`,
    text: `Connect with ${person.name} from ${company.name}.`,
  },

  seo: {
    title: `${person.name} | ${company.name}`,
    description: `Digital visiting card for ${person.name} of ${company.name}. Connect by phone, WhatsApp, email or save contact details directly.`,
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
