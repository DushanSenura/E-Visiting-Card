import { profileConfig } from "../config/profile";
import { normalizeUrl } from "./validation";

/** Paths of files generated at build time by vite-plugins/digital-card.ts */
export const GENERATED_FILES = {
  vcard: "contact.vcf",
  manifest: "site.webmanifest",
} as const;

/** Resolves a /public path against the deploy base (supports sub-folder hosting like /card/). */
export function assetUrl(path: string): string {
  if (!path || /^(https?:|data:|blob:)/i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

/** The public URL of this card: the configured one, or the current page while in development. */
export function getCardUrl(): string {
  const configured = normalizeUrl(profileConfig.links.digitalCardUrl);
  if (configured) return configured;
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${window.location.pathname}`;
}
