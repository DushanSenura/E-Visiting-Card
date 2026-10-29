import { useCallback } from "react";
import { contactLinks } from "../config/resolved";
import { copyToClipboard } from "../utils/share";
import { useToast } from "./useToast";

/**
 * WeChat has no dependable web link for adding a contact by ID,
 * so tapping WeChat copies the ID and tells the visitor where to paste it.
 * Returns null when no WeChat ID is configured.
 */
export function useCopyWeChat(): (() => void) | null {
  const { showToast } = useToast();
  const id = contactLinks.wechat;

  const copy = useCallback(async () => {
    if (!id) return;
    const ok = await copyToClipboard(id);
    showToast(ok ? "WeChat ID copied — paste it in WeChat › Add Contacts" : `WeChat ID: ${id}`, ok ? "success" : "error");
  }, [id, showToast]);

  return id ? copy : null;
}
