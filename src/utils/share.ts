export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

interface ShareData {
  title: string;
  text: string;
  url: string;
}

/** Copies text to the clipboard, with a fallback for older or non-secure browsers. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy method
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    return ok;
  } catch {
    return false;
  }
}

/**
 * Opens the native share sheet when available (most phones),
 * otherwise copies the link to the clipboard.
 */
export async function shareCard(data: ShareData): Promise<ShareResult> {
  if (typeof navigator.share === "function") {
    const canShare = typeof navigator.canShare !== "function" || navigator.canShare(data);
    if (canShare) {
      try {
        await navigator.share(data);
        return "shared";
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return "cancelled";
        // Some desktop browsers expose share() but fail; fall back to copying
      }
    }
  }
  return (await copyToClipboard(data.url)) ? "copied" : "failed";
}
