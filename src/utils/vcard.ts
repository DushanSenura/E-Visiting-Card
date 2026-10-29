import type { ProfileConfig } from "../config/types";
import { buildContactLinks } from "./links";
import { normalizeUrl } from "./validation";

/** Escapes text values per RFC 6350 (commas, semicolons, backslashes, newlines). */
function escapeValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

/** Folds lines longer than 75 characters, as required by the vCard spec. */
function foldLine(line: string): string {
  const chars = Array.from(line);
  if (chars.length <= 75) return line;
  const parts: string[] = [];
  for (let i = 0; i < chars.length; i += i === 0 ? 75 : 74) {
    parts.push(chars.slice(i, i + (i === 0 ? 75 : 74)).join(""));
  }
  return parts.join("\r\n ");
}

/**
 * Builds a vCard 3.0 (the version with the widest support on iPhone,
 * Android and desktop address books) from the profile configuration.
 * Placeholder or empty values are left out so no fake data is saved.
 */
export function buildVCard(config: ProfileConfig): string {
  const { person, company, contact, links } = config;
  const resolved = buildContactLinks(config);
  const cardUrl = normalizeUrl(links.digitalCardUrl);

  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeValue(person.lastName)};${escapeValue(person.firstName)};;${escapeValue(person.honorific)};`,
    `FN:${escapeValue(person.name)}`,
    `ORG:${escapeValue(company.name)}`,
    `TITLE:${escapeValue(person.position)}`,
  ];

  if (resolved.phoneE164) {
    lines.push(`TEL;TYPE=CELL,VOICE,PREF:${resolved.phoneE164}`);
  }
  if (resolved.whatsappE164 && resolved.whatsappE164 !== resolved.phoneE164) {
    // item grouping gives the number a "WhatsApp" label on iPhone; other apps show it as a mobile number
    lines.push(`item1.TEL;TYPE=CELL:${resolved.whatsappE164}`, "item1.X-ABLabel:WhatsApp");
  }
  if (resolved.email) {
    lines.push(`EMAIL;TYPE=INTERNET,WORK:${resolved.email}`);
  }
  if (resolved.website) {
    lines.push(`URL;TYPE=WORK:${resolved.website}`);
  }
  if (cardUrl && cardUrl !== resolved.website) {
    lines.push(`item2.URL:${cardUrl}`, "item2.X-ABLabel:Digital Card");
  }
  if (resolved.address) {
    lines.push(`ADR;TYPE=WORK:;;${escapeValue(resolved.address)};;;;${escapeValue(contact.country)}`);
  }
  lines.push(`NOTE:${escapeValue(company.summary)}`, "END:VCARD");

  return lines.map(foldLine).join("\r\n") + "\r\n";
}
