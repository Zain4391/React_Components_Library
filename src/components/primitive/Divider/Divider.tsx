import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import type { DividerProps } from '../../../types/Divider.types';

const dividerVariants = cva('flex items-center', {
  variants: {
    variant: {
      horizontal: 'w-full',
      vertical:   'h-full flex-col',
    },
  },
  defaultVariants: {
    variant: 'horizontal',
  },
});

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ variant = 'horizontal', label, className, ...props }, ref) => {
    const isVertical = variant === 'vertical';
    const lineClass = isVertical
      ? 'flex-grow border-l border-[var(--color-border)]'
      : 'flex-grow border-t border-[var(--color-border)]';

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={variant}
        className={[dividerVariants({ variant }), className ?? ''].filter(Boolean).join(' ')}
        {...props}
      >
        <div className={lineClass} />
        {label && (
          <>
            <span className={`text-xs text-[var(--color-text-muted)] ${isVertical ? 'my-2' : 'mx-2'}`}>
              {label}
            </span>
            <div className={lineClass} />
          </>
        )}
      </div>
    );
  },
);
Divider.displayName = 'Divider';
