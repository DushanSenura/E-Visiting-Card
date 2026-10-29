import { m } from "framer-motion";
import { Share2 } from "lucide-react";
import { useShareCard } from "../hooks/useShareCard";
import { buttonHover, buttonTap } from "../utils/ui";

/** Round share icon used in the header. */
export function ShareButton() {
  const { share } = useShareCard();

  return (
    <m.button
      type="button"
      onClick={share}
      aria-label="Share this card"
      title="Share card"
      className="grid size-11 place-items-center rounded-full border border-line bg-white/70 text-forest shadow-sm backdrop-blur-md transition-colors hover:border-gold/60 hover:bg-white"
      whileHover={buttonHover}
      whileTap={buttonTap}
    >
      <Share2 className="size-[18px]" strokeWidth={1.9} aria-hidden />
    </m.button>
  );
}
