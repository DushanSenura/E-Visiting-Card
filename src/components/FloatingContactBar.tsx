import { AnimatePresence, m } from "framer-motion";
import { MessageCircle, Phone, Share2, UserPlus, type LucideIcon } from "lucide-react";
import type { RefObject } from "react";
import { profileConfig } from "../config/profile";
import { contactLinks } from "../config/resolved";
import { useSaveContact } from "../hooks/useSaveContact";
import { useScrolledPast } from "../hooks/useScrolledPast";
import { useShareCard } from "../hooks/useShareCard";
import { buttonTap, cn } from "../utils/ui";

interface BarAction {
  key: string;
  label: string;
  icon: LucideIcon;
  ariaLabel: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  primary?: boolean;
}

const itemClasses =
  "flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold tracking-wide transition-colors";

/**
 * Mobile-only quick actions that slide in once the main contact buttons scroll out of view.
 * Shows Call and WhatsApp; while the number isn't configured it falls back to Save Contact / Share,
 * so it never contains a broken link.
 */
export function FloatingContactBar({ watchRef }: { watchRef: RefObject<HTMLElement | null> }) {
  const visible = useScrolledPast(watchRef);
  const saveContact = useSaveContact();
  const { share } = useShareCard();
  const name = profileConfig.person.name;

  const actions: BarAction[] = [];
  if (contactLinks.tel) {
    actions.push({ key: "call", label: "Call", icon: Phone, href: contactLinks.tel, ariaLabel: `Call ${name}`, primary: true });
  }
  if (contactLinks.whatsapp) {
    actions.push({
      key: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      href: contactLinks.whatsapp,
      external: true,
      ariaLabel: `Message ${name} on WhatsApp (opens in a new tab)`,
      primary: true,
    });
  }
  if (actions.length < 2) {
    actions.push({ key: "save", label: "Save Contact", icon: UserPlus, onClick: saveContact, ariaLabel: `Save ${name} to your contacts`, primary: actions.length === 0 });
  }
  if (actions.length < 2) {
    actions.push({ key: "share", label: "Share", icon: Share2, onClick: share, ariaLabel: "Share this digital card" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <m.nav
          aria-label="Quick contact"
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] lg:hidden"
          initial={{ y: "120%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "120%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
        >
          <div className="mx-auto flex max-w-md gap-2 rounded-2xl border border-white/60 bg-white/70 p-2 shadow-lift backdrop-blur-xl">
            {actions.map((action) => {
              const Icon = action.icon;
              const classes = cn(
                itemClasses,
                action.primary
                  ? "bg-gradient-to-br from-forest to-forest-deep text-ivory [&_svg]:text-gold"
                  : "border border-line bg-white/80 text-forest [&_svg]:text-gold-ink",
              );
              const content = (
                <>
                  <Icon className="size-[18px]" strokeWidth={1.9} aria-hidden />
                  {action.label}
                </>
              );
              return action.href ? (
                <m.a
                  key={action.key}
                  href={action.href}
                  aria-label={action.ariaLabel}
                  className={classes}
                  whileTap={buttonTap}
                  {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {content}
                </m.a>
              ) : (
                <m.button key={action.key} type="button" onClick={action.onClick} aria-label={action.ariaLabel} className={classes} whileTap={buttonTap}>
                  {content}
                </m.button>
              );
            })}
          </div>
        </m.nav>
      )}
    </AnimatePresence>
  );
}
