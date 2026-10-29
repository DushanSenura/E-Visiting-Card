import { m } from "framer-motion";
import { profileConfig } from "../config/profile";
import { hoverLift } from "../utils/ui";
import { serviceIcons } from "./icons";
import { SectionCard } from "./ui/SectionCard";

export function ServicesSection() {
  const { services } = profileConfig;
  if (services.length === 0) return null;

  return (
    <SectionCard id="services" eyebrow="What We Offer" title="Products & Services" delay={0.1}>
      <ul className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-4">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];
          return (
            <m.li
              key={service.title}
              whileHover={hoverLift}
              className="group rounded-[18px] border border-line bg-white/75 p-4 shadow-sm transition-shadow duration-300 hover:shadow-card sm:p-5"
            >
              <span className="mb-3 grid size-10 place-items-center rounded-xl bg-gradient-to-br from-champagne/80 to-champagne/30 ring-1 ring-gold/25 transition-colors group-hover:from-gold/40">
                <Icon className="size-5 text-forest" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="font-serif text-[1.15rem] font-semibold leading-snug text-forest-deep">{service.title}</h3>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted sm:text-sm">{service.description}</p>
            </m.li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
