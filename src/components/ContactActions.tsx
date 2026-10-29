import { m } from "framer-motion";
import { Mail, MessageCircle, MessageSquareText, Phone, type LucideIcon } from "lucide-react";
import { profileConfig } from "../config/profile";
import { contactLinks } from "../config/resolved";
import { useCopyWeChat } from "../hooks/useCopyWeChat";
import { buttonHover, buttonTap, cn } from "../utils/ui";

interface ContactAction {
  key: string;
  label: string;
  icon: LucideIcon;
  href?: string | null;
  onClick?: () => void;
  ariaLabel: string;
  external?: boolean;
}

const tileClasses =
  "flex min-h-[4.75rem] flex-col items-center justify-center gap-1.5 rounded-2xl px-2 py-3 text-[13px] font-semibold tracking-wide";
const activeClasses = "bg-gradient-to-b from-forest to-forest-deep text-ivory shadow-button transition-shadow hover:shadow-lift";

/** Column layout per number of tiles. Four tiles sit in a 2×2 grid wherever the card is narrow. */
const gridColumns: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-2",
};

function ContactTile({ action }: { action: ContactAction }) {
  const Icon = action.icon;
  const content = (
    <>
      <span className="grid size-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
        <Icon className="size-[18px] text-gold" strokeWidth={1.9} aria-hidden />
      </span>
      <span>{action.label}</span>
    </>
  );

  if (action.href) {
    return (
      <m.a
        href={action.href}
        aria-label={action.ariaLabel}
        className={cn(tileClasses, activeClasses)}
        whileHover={buttonHover}
        whileTap={buttonTap}
        {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </m.a>
    );
  }

  if (action.onClick) {
    return (
      <m.button
        type="button"
        onClick={action.onClick}
        aria-label={action.ariaLabel}
        className={cn(tileClasses, activeClasses)}
        whileHover={buttonHover}
        whileTap={buttonTap}
      >
        {content}
      </m.button>
    );
  }

  return (
    <button
      type="button"
      aria-disabled="true"
      title="Phone number coming soon"
      className={cn(tileClasses, "cursor-not-allowed bg-forest/40 text-ivory/80 saturate-50")}
    >
      {content}
      <span className="sr-only">(not available yet)</span>
    </button>
  );
}

/** Call / WhatsApp / WeChat / Email tiles. WeChat and Email are hidden until configured. */
export function ContactActions() {
  const name = profileConfig.person.name;
  const copyWeChat = useCopyWeChat();

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
  if (copyWeChat && contactLinks.wechat) {
    actions.push({
      key: "wechat",
      label: "WeChat",
      icon: MessageSquareText,
      onClick: copyWeChat,
      ariaLabel: `Copy ${name}'s WeChat ID: ${contactLinks.wechat}`,
    });
  }
  if (contactLinks.mailto) {
    actions.push({ key: "email", label: "Email", icon: Mail, href: contactLinks.mailto, ariaLabel: `Email ${name}` });
  }

  return (
    <div className={cn("grid gap-2.5", gridColumns[actions.length] ?? "grid-cols-2")}>
      {actions.map((action) => (
        <ContactTile key={action.key} action={action} />
      ))}
    </div>
  );
}
