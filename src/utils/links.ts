import type { ProfileConfig } from "../config/types";
import { toE164, toInternationalDigits } from "./phone";
import { isValidEmail, normalizeUrl, usable } from "./validation";

export interface ContactLinks {
  /** tel: link, null when the phone number is not configured */
  tel: string | null;
  phoneE164: string | null;
  /** wa.me link, null when no valid WhatsApp number */
  whatsapp: string | null;
  whatsappE164: string | null;
  /** WeChat ID, null when not configured (WeChat has no reliable web link, so the UI copies it) */
  wechat: string | null;
  /** mailto: link, null when no valid email */
  mailto: string | null;
  email: string | null;
  /** Google Maps search link, null when the address is incomplete */
  maps: string | null;
  address: string | null;
  website: string | null;
}

/**
 * Builds every outgoing contact link from the configuration.
 * Anything that is empty or still a placeholder becomes null,
 * so the UI can hide or disable it instead of producing a broken link.
 */
export function buildContactLinks(config: ProfileConfig): ContactLinks {
  const { contact, links } = config;
  const code = contact.countryCallingCode;

  const phoneSource = usable(contact.phoneInternational) ?? contact.phoneDisplay;
  const phoneE164 = toE164(phoneSource, code);

  const whatsappSource = usable(contact.whatsapp) ?? phoneSource;
  const whatsappDigits = toInternationalDigits(whatsappSource, code);
  const whatsappMessage = usable(contact.whatsappMessage);

  const email = isValidEmail(contact.email) ? contact.email.trim() : null;
  const address = usable(contact.address);
  const mapsQuery = usable(contact.mapQuery) ?? (address ? [address, contact.country].filter(Boolean).join(", ") : null);

  return {
    tel: phoneE164 ? `tel:${phoneE164}` : null,
    phoneE164,
    whatsapp: whatsappDigits
      ? `https://wa.me/${whatsappDigits}${whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : ""}`
      : null,
    whatsappE164: whatsappDigits ? `+${whatsappDigits}` : null,
    wechat: usable(contact.wechat),
    mailto: email ? `mailto:${email}` : null,
    email,
    maps: mapsQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}` : null,
    address,
    website: normalizeUrl(links.website),
  };
}
