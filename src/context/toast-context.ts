import { createContext } from "react";

export type ToastTone = "success" | "error";

export interface ToastMessage {
  id: number;
  message: string;
  tone: ToastTone;
}

export interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
