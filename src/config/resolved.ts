import { buildContactLinks } from "../utils/links";
import { profileConfig } from "./profile";

/** Ready-to-use contact links derived from the profile. Null means "not configured yet". */
export const contactLinks = buildContactLinks(profileConfig);
