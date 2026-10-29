import { useCallback } from "react";
import { profileConfig } from "../config/profile";
import { shareCard } from "../utils/share";
import { getCardUrl } from "../utils/site";
import { useToast } from "./useToast";

/** Share action for the card (native share sheet, or copies the link), with toast feedback. */
export function useShareCard() {
  const { showToast } = useToast();

  const share = useCallback(async () => {
    const result = await shareCard({ ...profileConfig.share, url: getCardUrl() });
    if (result === "copied") showToast("Link copied to clipboard");
    else if (result === "shared") showToast("Thanks for sharing");
    else if (result === "failed") showToast("Couldn't share the link. Please copy it from the address bar.", "error");
  }, [showToast]);

  return { share };
}
