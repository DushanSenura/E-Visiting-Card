/**
 * Converts a phone number to international digits without "+".
 *
 *   "0777123456"      → "94777123456"
 *   "077 712 3456"    → "94777123456"
 *   "777123456"       → "94777123456"
 *   "+94 77 712 3456" → "94777123456"
 *   "0777 xxxxxxxxxx" → null (placeholder)
 *
 * Defaults to Sri Lankan rules (country code 94, 9-digit national number).
 */
export function toInternationalDigits(raw: string | null | undefined, countryCallingCode = "94"): string | null {
  const text = (raw ?? "").trim();
  if (!text || /[a-z]/i.test(text)) return null;

  const explicitInternational = text.startsWith("+") || text.startsWith("00");
  let digits = text.replace(/\D/g, "");
  if (text.startsWith("00")) digits = digits.slice(2);

  if (explicitInternational) {
    return digits.length >= 8 && digits.length <= 15 ? digits : null;
  }

  const nationalLength = 9;
  if (digits.startsWith(countryCallingCode) && digits.length === countryCallingCode.length + nationalLength) {
    return digits;
  }
  if (digits.startsWith("0") && digits.length === nationalLength + 1) {
    return countryCallingCode + digits.slice(1);
  }
  if (digits.length === nationalLength) {
    return countryCallingCode + digits;
  }
  return null;
}

/** E.164 format, e.g. "+94777123456", or null when not a valid number. */
export function toE164(raw: string | null | undefined, countryCallingCode = "94"): string | null {
  const digits = toInternationalDigits(raw, countryCallingCode);
  return digits ? `+${digits}` : null;
}
