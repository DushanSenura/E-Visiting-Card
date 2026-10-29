import { useCallback } from "react";
import { profileConfig } from "../config/profile";
import { downloadTextFile, isAppleMobile } from "../utils/download";
import { assetUrl, GENERATED_FILES } from "../utils/site";
import { buildVCard } from "../utils/vcard";
import { useToast } from "./useToast";

/**
 * Saves the contact as a .vcf file.
 * - iPhone/iPad: opens the build-time contact.vcf so iOS shows its native "Add to Contacts" sheet.
 * - Everything else: downloads a vCard generated on the fly from the profile config.
 */
export function useSaveContact() {
  const { showToast } = useToast();

  return useCallback(() => {
    try {
      if (isAppleMobile()) {
        window.location.href = assetUrl(GENERATED_FILES.vcard);
        return;
      }
      downloadTextFile(buildVCard(profileConfig), profileConfig.vcard.fileName, "text/vcard;charset=utf-8");
      showToast("Contact card downloaded — open it to save");
    } catch {
      showToast("Couldn't create the contact file", "error");
    }
  }, [showToast]);
}
