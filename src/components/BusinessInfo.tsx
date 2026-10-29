import { Globe, Mail, MapPin, MessageCircle, Navigation, Phone, type LucideIcon } from "lucide-react";
import { profileConfig } from "../config/profile";
import { contactLinks } from "../config/resolved";
import { displayUrl } from "../utils/validation";
import { ActionButton } from "./ui/ActionButton";
import { SectionCard } from "./ui/SectionCard";

interface InfoRow {
  key: string;
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string | null;
  external?: boolean;
}

function InfoItem({ row }: { row: InfoRow }) {
  const Icon = row.icon;
  const content = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/30 bg-champagne/30">
        <Icon className="size-[18px] text-forest" strokeWidth={1.8} aria-hidden />
      </span>
      <span className="min-w-0 pt-0.5">
        <span className="block text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted">{row.label}</span>
        <span className="block break-words text-[0.95rem] font-medium text-ink underline-offset-4 group-hover:text-forest group-hover:underline">
          {row.value}
        </span>
      </span>
    </>
  );
  const rowClass = "flex items-start gap-3.5";

  return (
    <li className="py-3.5 first:pt-0 last:pb-0">
      {row.href ? (
        // The whole row is the link, so the tap target is the full width and height
        <a
          href={row.href}
          className={`group ${rowClass} rounded-xl`}
          {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      ) : (
        <div className={rowClass}>{content}</div>
      )}
    </li>
  );
}

export function BusinessInfo() {
  const { person, company, contact } = profileConfig;

  const rows: InfoRow[] = [];
  if (contact.phoneDisplay.trim()) {
    rows.push({ key: "phone", label: "Phone", value: contact.phoneDisplay, icon: Phone, href: contactLinks.tel });
  }
  if (contactLinks.whatsappE164 && contactLinks.whatsappE164 !== contactLinks.phoneE164) {
    rows.push({ key: "whatsapp", label: "WhatsApp", value: contactLinks.whatsappE164, icon: MessageCircle, href: contactLinks.whatsapp, external: true });
  }
  if (contactLinks.email) {
    rows.push({ key: "email", label: "Email", value: contactLinks.email, icon: Mail, href: contactLinks.mailto });
  }
  if (contact.address.trim()) {
    rows.push({ key: "address", label: "Address", value: contact.address, icon: MapPin, href: contactLinks.maps, external: true });
  }
  if (contactLinks.website) {
    rows.push({ key: "website", label: "Website", value: displayUrl(contactLinks.website), icon: Globe, href: contactLinks.website, external: true });
  }

  return (
    <SectionCard id="contact" eyebrow="Business Contact" title={company.name} delay={0.05} className="flex flex-col">
      <div className="-mt-3 mb-5">
        <p className="font-semibold text-forest">{person.name}</p>
        <p className="text-sm text-muted">{person.position}</p>
      </div>

      <ul className="divide-y divide-line">
        {rows.map((row) => (
          <InfoItem key={row.key} row={row} />
        ))}
      </ul>

      <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
        <ActionButton
          icon={Navigation}
          href={contactLinks.maps}
          external
          ariaLabel="Get directions in Google Maps (opens in a new tab)"
          unavailableHint="Location coming soon"
          variant="outline"
        >
          Get Directions
        </ActionButton>
        {contactLinks.website && (
          <ActionButton icon={Globe} href={contactLinks.website} external ariaLabel="Visit website (opens in a new tab)" variant="outline">
            Visit Website
          </ActionButton>
        )}
      </div>
    </SectionCard>
  );
}
