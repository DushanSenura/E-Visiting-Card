/** Icons available for service cards. Add a name here and in `src/components/icons.ts` to use a new one. */
export type ServiceIconName =
  | "Sparkles"
  | "Droplets"
  | "FlaskConical"
  | "Headset"
  | "Leaf"
  | "Flower2"
  | "Package"
  | "ShieldCheck"
  | "Truck";

export interface ServiceItem {
  title: string;
  description: string;
  icon: ServiceIconName;
}

export interface ProfileConfig {
  person: {
    honorific: string;
    firstName: string;
    lastName: string;
    /** Full display name, e.g. "Mr. Leslie Peiris" */
    name: string;
    position: string;
    /** Path inside /public, e.g. "/profile/leslie-peiris.webp". Leave empty to show initials. */
    photo: string;
  };
  company: {
    name: string;
    tagline: string;
    shortTagline: string;
    /** One-line summary shown on the profile card */
    summary: string;
    /** Short keywords shown under the summary */
    highlights: string[];
    /** Longer paragraph for the About section */
    description: string;
    values: string[];
    /** Path inside /public to an image logo. Leave empty to use the built-in text wordmark. */
    logo: string;
  };
  contact: {
    /** Shown on screen exactly as typed */
    phoneDisplay: string;
    /** Optional. Number used for calling, e.g. "+94777123456". Empty = derived from phoneDisplay. */
    phoneInternational: string;
    /** Optional. WhatsApp number. Empty = same as the phone number. */
    whatsapp: string;
    /** Optional greeting pre-filled in WhatsApp */
    whatsappMessage: string;
    email: string;
    address: string;
    country: string;
    /** Country calling code without "+", used to convert local numbers (0777… → 94777…) */
    countryCallingCode: string;
    /** Optional. Custom Google Maps search text (e.g. a plus code). Empty = address + country. */
    mapQuery: string;
  };
  links: {
    website: string;
    /** Public URL of this card after deployment. Empty = the current page URL is used. */
    digitalCardUrl: string;
  };
  services: ServiceItem[];
  share: {
    title: string;
    text: string;
  };
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    /** Path inside /public */
    ogImage: string;
    themeColor: string;
    backgroundColor: string;
    locale: string;
  };
  vcard: {
    fileName: string;
  };
  developer: {
    name: string;
    website: string;
    creditLabel: string;
  };
}
