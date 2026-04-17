import type { ReactNode } from 'react';

export type ToastVariant = 'success' | 'danger' | 'warning' | 'info';

export interface ToastProps {
  variant?: ToastVariant;
  message: ReactNode;
  duration?: number;
  onDismiss: () => void;
}
