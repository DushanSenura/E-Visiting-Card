import { m } from "framer-motion";
import { profileConfig } from "../config/profile";
import { ShareButton } from "./ShareButton";
import { Wordmark } from "./ui/Wordmark";

export function Header() {
  return (
    <m.header
      className="sticky top-0 z-40 border-b border-transparent bg-ivory/70 pt-[env(safe-area-inset-top)] backdrop-blur-xl supports-[backdrop-filter]:bg-ivory/55"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#top" aria-label={`${profileConfig.company.name} — back to top`} className="flex min-h-11 items-center rounded-lg py-1">
          <Wordmark size="sm" />
        </a>
        <ShareButton />
      </div>
    </m.header>
  );
}
