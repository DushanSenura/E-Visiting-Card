import { m } from "framer-motion";
import { useState } from "react";
import { profileConfig } from "../config/profile";
import { assetUrl } from "../utils/site";
import { initials } from "../utils/ui";

/** Round portrait with a gold gradient ring. Falls back to initials if the photo is missing. */
export function ProfilePhoto() {
  const { person } = profileConfig;
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(person.photo) && !failed;

  return (
    <m.div
      className="relative mx-auto size-32 sm:size-36"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <div aria-hidden className="absolute -inset-3 rounded-full bg-gold/20 blur-xl" />
      <div className="relative size-full rounded-full bg-gradient-to-br from-[#E9D7B0] via-gold to-[#9C7A45] p-[3px] shadow-gold">
        <div className="size-full rounded-full bg-ivory p-[3px]">
          {showImage ? (
            <img
              src={assetUrl(person.photo)}
              alt={`Portrait of ${person.name}`}
              width={288}
              height={288}
              fetchPriority="high"
              decoding="async"
              onError={() => setFailed(true)}
              className="size-full rounded-full object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={person.name}
              className="grid size-full place-items-center rounded-full bg-gradient-to-br from-forest to-forest-deep font-serif text-4xl font-semibold tracking-wider text-champagne"
            >
              {initials(person.firstName, person.lastName)}
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
}
