import { m } from "framer-motion";
import { Fragment, type Ref } from "react";
import { profileConfig } from "../config/profile";
import { fadeUp } from "../utils/ui";
import { ContactActions } from "./ContactActions";
import { ProfilePhoto } from "./ProfilePhoto";
import { SaveContactButton } from "./SaveContactButton";

interface ProfileCardProps {
  /** Attached to the action area so the floating bar knows when it has scrolled away */
  actionsRef?: Ref<HTMLDivElement>;
}

export function ProfileCard({ actionsRef }: ProfileCardProps) {
  const { person, company } = profileConfig;

  return (
    <m.article
      aria-labelledby="profile-name"
      className="glass-card relative overflow-hidden px-5 pb-6 pt-8 text-center xs:px-6 sm:px-8 sm:pb-8"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {/* Soft champagne wash behind the portrait */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-champagne/55 via-champagne/20 to-transparent" />
      <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      <div className="relative">
        <p className="eyebrow mb-6 flex items-center justify-center gap-3">
          <span aria-hidden className="h-px w-6 bg-gold/60" />
          {company.tagline}
          <span aria-hidden className="h-px w-6 bg-gold/60" />
        </p>

        <ProfilePhoto />

        <h1 id="profile-name" className="mt-6 font-serif text-[2.1rem] font-semibold leading-[1.1] text-forest-deep sm:text-[2.4rem]">
          {person.name}
        </h1>
        <p className="mt-2 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold-ink">{person.position}</p>
        <p className="mt-1.5 font-serif text-xl font-semibold text-forest">{company.name}</p>

        <p className="mx-auto mt-4 max-w-xs text-[0.95rem] leading-relaxed text-muted">{company.summary}</p>

        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-[0.14em] text-forest/80">
          {company.highlights.map((item, index) => (
            <Fragment key={item}>
              {index > 0 && (
                <li aria-hidden className="text-gold">
                  •
                </li>
              )}
              <li>{item}</li>
            </Fragment>
          ))}
        </ul>

        <div ref={actionsRef} className="mt-7 space-y-3">
          <ContactActions />
          <SaveContactButton />
        </div>
      </div>
    </m.article>
  );
}
