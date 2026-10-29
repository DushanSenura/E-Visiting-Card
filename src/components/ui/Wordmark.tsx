import { profileConfig } from "../../config/profile";
import { assetUrl } from "../../utils/site";
import { cn } from "../../utils/ui";

interface WordmarkProps {
  size?: "sm" | "md";
  showTagline?: boolean;
  className?: string;
}

/**
 * Temporary typographic logo. Set `company.logo` in the profile config
 * to an image path to replace it with the official logo everywhere.
 */
export function Wordmark({ size = "md", showTagline = true, className }: WordmarkProps) {
  const { company } = profileConfig;

  if (company.logo) {
    return (
      <img
        src={assetUrl(company.logo)}
        alt={company.name}
        className={cn(size === "sm" ? "h-8" : "h-10", "w-auto", className)}
        decoding="async"
      />
    );
  }

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-serif font-semibold uppercase text-forest-deep",
          size === "sm" ? "text-[1.05rem] tracking-[0.28em]" : "text-[1.3rem] tracking-[0.32em]",
        )}
      >
        {company.name}
      </span>
      {showTagline && (
        <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-gold-ink">{company.shortTagline}</span>
      )}
    </span>
  );
}
