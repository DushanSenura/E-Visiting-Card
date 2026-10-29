/**
 * True when a config value is empty or still a placeholder such as
 * "0777 xxxxxxxxxx" or "X, XXXXXX, XXXXXXX".
 */
export function isPlaceholder(value: string | null | undefined): boolean {
  const text = (value ?? "").trim();
  if (!text) return true;
  if (/x{3,}/i.test(text)) return true;
  // Only X's, digits-free punctuation and spaces, e.g. "X, X"
  return /^[x\s,.\-/#]+$/i.test(text);
}

/** Returns the value when it is usable, otherwise null. */
export function usable(value: string | null | undefined): string | null {
  return isPlaceholder(value) ? null : (value ?? "").trim();
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string | null | undefined): boolean {
  const text = usable(value);
  return text !== null && EMAIL_PATTERN.test(text);
}

/**
 * Normalises a web address. "leescents.lk" → "https://leescents.lk".
 * Returns null for empty, placeholder or invalid values.
 */
export function normalizeUrl(value: string | null | undefined): string | null {
  const text = usable(value);
  if (!text) return null;
  const withProtocol = /^https?:\/\//i.test(text) ? text : `https://${text}`;
  try {
    const url = new URL(withProtocol);
    if (!url.hostname.includes(".") && url.hostname !== "localhost") return null;
    return url.href;
  } catch {
    return null;
  }
}

/** Human-friendly version of a URL for display: no protocol, no trailing slash. */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}
