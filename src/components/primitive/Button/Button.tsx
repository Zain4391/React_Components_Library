import { cva } from 'class-variance-authority';
import type { ButtonProps } from '../../../types/Button.types';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 font-medium leading-tight rounded-lg border cursor-pointer select-none whitespace-nowrap',
    'transition-[background-color,border-color,color,box-shadow] duration-[120ms]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
    'disabled:opacity-[0.45] disabled:pointer-events-none',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--color-accent)] text-[var(--color-text-on-accent)] border-[var(--color-accent)]',
          'hover:bg-[var(--color-accent-hover)] hover:border-[var(--color-accent-hover)]',
          'active:bg-[var(--color-accent-active)] active:border-[var(--color-accent-active)]',
        ].join(' '),
        secondary: [
          'bg-[var(--color-secondary)] text-[var(--color-text-on-accent)] border-[var(--color-secondary)]',
          'hover:bg-[var(--color-secondary-hover)] hover:border-[var(--color-secondary-hover)]',
          'active:bg-[var(--color-secondary-active)] active:border-[var(--color-secondary-active)]',
        ].join(' '),
        ghost: [
          'bg-transparent text-[var(--color-accent)] border-[var(--color-border)]',
          'hover:bg-[var(--color-accent-subtle)] hover:border-[var(--color-border-strong)]',
          'active:border-[var(--color-border-focus)]',
        ].join(' '),
        danger: [
          'bg-[var(--color-danger)] text-[var(--color-text-on-accent)] border-[var(--color-danger)]',
          'hover:brightness-110 active:brightness-90',
        ].join(' '),
      },
      size: {
        sm: 'text-xs px-3 h-7',
        md: 'text-sm px-4 h-9',
        lg: 'text-base px-6 h-11',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [
    buttonVariants({ variant, size, fullWidth }),
    isLoading ? 'opacity-[0.45] pointer-events-none' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...props}
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
    >
      {isLoading && (
        <span
          className="size-[1em] border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
          aria-hidden="true"
        />
      )}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
