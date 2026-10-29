import { profileConfig } from "../config/profile";
import { normalizeUrl } from "../utils/validation";
import { Wordmark } from "./ui/Wordmark";

export function Footer() {
  const { company, developer } = profileConfig;
  const developerUrl = normalizeUrl(developer.website);
  const year = new Date().getFullYear();

  const developerName = <span className="font-serif text-[1.05rem] font-semibold tracking-wide text-forest">{developer.name}</span>;

  return (
    <footer className="mx-auto max-w-[1200px] px-4 pb-32 pt-10 text-center sm:px-6 lg:px-8 lg:pb-12 lg:pt-14">
      <div aria-hidden className="mx-auto mb-8 h-px w-40 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <Wordmark size="sm" showTagline={false} />
      <p className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-gold-ink">Digital Visiting Card</p>
      <p className="mt-5 text-xs text-muted">
        &copy; {year} {company.name}. All rights reserved.
      </p>
      <p className="mt-2 text-xs text-muted">
        {developer.creditLabel}{" "}
        {developerUrl ? (
          <a href={developerUrl} target="_blank" rel="noopener noreferrer" className="rounded underline-offset-4 hover:underline">
            {developerName}
          </a>
        ) : (
          developerName
        )}
      </p>
    </footer>
  );
}
