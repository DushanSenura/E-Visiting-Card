import type { Variants } from "framer-motion";

/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** "Mr. Leslie Peiris" → "LP" (skips honorifics). */
export function initials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Gentle fade-and-rise used by every card. Pass a delay through `custom`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT, delay },
  }),
};

export const hoverLift = { y: -3, transition: { duration: 0.25 } };
export const buttonHover = { scale: 1.02 };
export const buttonTap = { scale: 0.98 };
