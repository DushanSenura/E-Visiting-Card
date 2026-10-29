import { m } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { buttonHover, buttonTap, cn } from "../../utils/ui";

type Variant = "primary" | "gold" | "outline";
type Size = "md" | "lg";

interface ActionButtonProps {
  icon: LucideIcon;
  children: ReactNode;
  /** Link target. When neither href nor onClick is given, the button renders as unavailable. */
  href?: string | null;
  onClick?: () => void;
  external?: boolean;
  ariaLabel?: string;
  /** Explains why the action is unavailable (shown as tooltip and read by screen readers). */
  unavailableHint?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-forest to-forest-deep text-ivory shadow-button hover:shadow-lift [&_svg]:text-gold",
  gold: "bg-gradient-to-br from-[#D6BA88] via-gold to-[#B38F55] text-forest-deep shadow-gold",
  outline: "border border-line bg-white/80 text-forest shadow-sm hover:border-gold/60 hover:bg-white [&_svg]:text-gold-ink",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-6 text-[15px]",
};

const base =
  "inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-2xl font-semibold tracking-wide transition-[box-shadow,background-color,border-color] duration-300";

export function ActionButton({
  icon: Icon,
  children,
  href,
  onClick,
  external,
  ariaLabel,
  unavailableHint = "Not available yet",
  variant = "outline",
  size = "md",
  className,
}: ActionButtonProps) {
  const content = (
    <>
      <Icon className="size-[18px] shrink-0" strokeWidth={1.9} aria-hidden />
      <span>{children}</span>
    </>
  );
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <m.a
        href={href}
        aria-label={ariaLabel}
        className={classes}
        whileHover={buttonHover}
        whileTap={buttonTap}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </m.a>
    );
  }

  if (onClick) {
    return (
      <m.button type="button" onClick={onClick} aria-label={ariaLabel} className={classes} whileHover={buttonHover} whileTap={buttonTap}>
        {content}
      </m.button>
    );
  }

  return (
    <button
      type="button"
      aria-disabled="true"
      title={unavailableHint}
      className={cn(classes, "cursor-not-allowed opacity-45 shadow-none saturate-50")}
    >
      {content}
      <span className="sr-only">({unavailableHint})</span>
    </button>
  );
}
