import { useEffect } from 'react';
import { cva } from 'class-variance-authority';
import type { ToastProps } from '../../../types/Toast.types';

const toastVariants = cva(
  [
    'flex items-center justify-between gap-3 min-w-[300px] max-w-md p-4 rounded-md shadow-[var(--shadow-md)] border',
    'text-[var(--text-sm)] font-medium transition-all duration-[var(--duration-normal)]'
  ].join(' '),
  {
    variants: {
      variant: {
        success: 'bg-[var(--color-success-subtle)] text-[var(--color-success)] border-[var(--color-success)]',
        danger: 'bg-[var(--color-danger-subtle)] text-[var(--color-danger)] border-[var(--color-danger)]',
        warning: 'bg-[var(--color-warning-subtle)] text-[var(--color-warning)] border-[var(--color-warning)]',
        info: 'bg-[var(--color-info-subtle)] text-[var(--color-info)] border-[var(--color-info)]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

export function Toast({ variant = 'info', message, duration = 3000, onDismiss }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  return (
    <div className={toastVariants({ variant })} role="alert">
      <div className="flex-1 text-left">{message}</div>
      <button
        onClick={onDismiss}
        className="shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] rounded bg-transparent cursor-pointer border-none p-1"
        aria-label="Dismiss"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
