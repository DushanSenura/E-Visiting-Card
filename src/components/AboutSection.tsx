import { profileConfig } from "../config/profile";
import { SectionCard } from "./ui/SectionCard";

/** Fine line-art perfume bottle with rising aroma, used as a quiet decoration. */
function PerfumeBottleArt() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -right-4 -top-2 h-44 w-36 text-gold opacity-35 sm:right-2 sm:h-52 sm:w-40"
      viewBox="0 0 120 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M62 30 C 56 22, 70 16, 64 6" />
      <path d="M72 34 C 68 26, 80 20, 76 10" opacity="0.6" />
      <rect x="50" y="40" width="20" height="14" rx="3" />
      <path d="M54 54 v8 h12 v-8" />
      <path d="M40 66 C 40 62, 44 62, 48 62 H 72 C 76 62, 80 62, 80 66 L 92 92 C 96 102, 96 138, 88 146 C 84 150, 78 152, 72 152 H 48 C 42 152, 36 150, 32 146 C 24 138, 24 102, 28 92 Z" />
      <path d="M36 104 H 84" opacity="0.5" />
      <path d="M44 116 H 76" opacity="0.35" />
    </svg>
  );
}

export function AboutSection() {
  const { company } = profileConfig;
  return (
    <SectionCard id="about" eyebrow="Our Story" title={`About ${company.name}`} decoration={<PerfumeBottleArt />} delay={0.05}>
      <p className="max-w-xl pr-16 text-[0.98rem] leading-relaxed text-muted sm:pr-28">{company.description}</p>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Our values">
        {company.values.map((value) => (
          <li
            key={value}
            className="rounded-full border border-gold/35 bg-champagne/30 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-forest"
          >
            {value}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
