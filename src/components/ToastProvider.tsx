import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { ToastContext, type ToastMessage, type ToastTone } from "../context/toast-context";

const TOAST_DURATION_MS = 3200;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const showToast = useCallback((message: string, tone: ToastTone = "success") => {
    window.clearTimeout(timer.current);
    setToast({ id: Date.now(), message, tone });
    timer.current = window.setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);
  const Icon = toast?.tone === "error" ? CircleAlert : CheckCircle2;

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+6.5rem)] z-[60] flex justify-center px-4 lg:bottom-8"
        role="status"
        aria-live="polite"
      >
        <AnimatePresence>
          {toast && (
            <m.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-forest-deep/95 px-4 py-3 text-sm font-medium text-ivory shadow-lift backdrop-blur-md"
            >
              <Icon className={toast.tone === "error" ? "size-5 shrink-0 text-red-300" : "size-5 shrink-0 text-gold"} aria-hidden />
              <span>{toast.message}</span>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
