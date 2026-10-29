import { m } from "framer-motion";
import type { ReactNode } from "react";
import { cn, fadeUp } from "../../utils/ui";

interface SectionCardProps {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  /** Extra decoration rendered behind the content */
  decoration?: ReactNode;
  delay?: number;
}

/** Glass card used for every content section, with a consistent heading and entrance animation. */
export function SectionCard({ id, title, eyebrow, children, className, decoration, delay = 0 }: SectionCardProps) {
  const headingId = `${id}-heading`;
  return (
    <m.section
      id={id}
      aria-labelledby={headingId}
      className={cn("glass-card relative overflow-hidden p-5 xs:p-6 sm:p-7", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      custom={delay}
    >
      {decoration}
      <div className="relative">
        <header className="mb-5">
          {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
          <h2 id={headingId} className="font-serif text-[1.7rem] font-semibold leading-tight text-forest-deep sm:text-[1.9rem]">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </m.section>
  );
}
