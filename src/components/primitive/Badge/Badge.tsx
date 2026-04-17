import { cva } from 'class-variance-authority';
import type { BadgeProps } from '../../../types/Badge.types';

const badgeVariants = cva(
  'inline-flex items-center gap-1 font-medium leading-tight rounded-full whitespace-nowrap border',
  {
    variants: {
      variant: {
        default: 'bg-[var(--gray-muted)] text-[var(--gray-dark)] border-[var(--gray-light)]',
        olive:   'bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border-[var(--olive-muted)]',
        burnt:   'bg-[var(--color-secondary-subtle)] text-[var(--color-secondary)] border-[var(--burnt-muted)]',
        success: 'bg-[var(--color-success-subtle)] text-[var(--color-success)] border-[var(--color-success-subtle)]',
        danger:  'bg-[var(--color-danger-subtle)] text-[var(--color-danger)] border-[var(--color-danger-subtle)]',
        warning: 'bg-[var(--color-warning-subtle)] text-[var(--color-warning)] border-[var(--color-warning-subtle)]',
        info:    'bg-[var(--color-info-subtle)] text-[var(--color-info)] border-[var(--color-info-subtle)]',
      },
      size: {
        sm: 'text-xs py-0.5 px-2',
        md: 'text-sm py-1 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const classes = [badgeVariants({ variant, size }), className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <span {...props} className={classes}>
      {dot && <span className="size-1.5 rounded-full bg-current shrink-0" aria-hidden="true" />}
      {children}
    </span>
  );
}
