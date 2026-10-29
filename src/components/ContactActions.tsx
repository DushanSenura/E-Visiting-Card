import { m } from "framer-motion";
import { Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { profileConfig } from "../config/profile";
import { contactLinks } from "../config/resolved";
import { buttonHover, buttonTap, cn } from "../utils/ui";

interface ContactAction {
  key: string;
  label: string;
  icon: LucideIcon;
  href: string | null;
  ariaLabel: string;
  external?: boolean;
}

const tileClasses =
  "flex min-h-[4.75rem] flex-col items-center justify-center gap-1.5 rounded-2xl px-2 py-3 text-[13px] font-semibold tracking-wide";

function ContactTile({ action }: { action: ContactAction }) {
  const Icon = action.icon;
  const icon = (
    <span className="grid size-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
      <Icon className="size-[18px] text-gold" strokeWidth={1.9} aria-hidden />
    </span>
  );

  if (!action.href) {
    return (
      <button
        type="button"
        aria-disabled="true"
        title="Phone number coming soon"
        className={cn(tileClasses, "cursor-not-allowed bg-forest/40 text-ivory/80 saturate-50")}
      >
        {icon}
        <span>{action.label}</span>
        <span className="sr-only">(not available yet)</span>
      </button>
    );
  }

  return (
    <m.a
      href={action.href}
      aria-label={action.ariaLabel}
      className={cn(tileClasses, "bg-gradient-to-b from-forest to-forest-deep text-ivory shadow-button transition-shadow hover:shadow-lift")}
      whileHover={buttonHover}
      whileTap={buttonTap}
      {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon}
      <span>{action.label}</span>
    </m.a>
  );
}

/** Call / WhatsApp / Email tiles. Email is hidden until an address is configured. */
export function ContactActions() {
  const name = profileConfig.person.name;
  const actions: ContactAction[] = [
    { key: "call", label: "Call", icon: Phone, href: contactLinks.tel, ariaLabel: `Call ${name}` },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      href: contactLinks.whatsapp,
      ariaLabel: `Message ${name} on WhatsApp (opens in a new tab)`,
      external: true,
    },
  ];
  if (contactLinks.mailto) {
    actions.push({ key: "email", label: "Email", icon: Mail, href: contactLinks.mailto, ariaLabel: `Email ${name}` });
  }

  return (
    <div className={cn("grid gap-2.5", actions.length === 3 ? "grid-cols-3" : "grid-cols-2")}>
      {actions.map((action) => (
        <ContactTile key={action.key} action={action} />
      ))}
    </div>
  );
}
