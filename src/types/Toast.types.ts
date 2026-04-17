import type { ReactNode } from "react";

export type ToastVariant = "success" | "danger" | "warning" | "info";

export interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  message: ReactNode;
  duration?: number;
  onDismiss: () => void;
}
