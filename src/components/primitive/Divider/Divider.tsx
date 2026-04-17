import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import type { DividerProps } from '../../../types/Divider.types';

const dividerVariants = cva(
  'flex items-center',
  {
    variants: {
      variant: {
        horizontal: 'w-full',
        vertical: 'h-full flex-col',
      },
    },
    defaultVariants: {
      variant: 'horizontal',
    },
  }
);

export const Divider = forwardRef<HTMLDivElement, DividerProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ variant = 'horizontal', label, className, ...props }, ref) => {

    const lineClass = 'flex-grow border-t border-[var(--color-border)]' + (variant === 'vertical' ? ' border-t-0 border-l' : '');

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={variant}
        className={[dividerVariants({ variant }), className || ''].join(' ')}
        {...props}
      >
        <div className={lineClass} />
        {label && (
          <span className={`text-[var(--text-xs)] text-[var(--color-text-muted)] ${variant === 'horizontal' ? 'mx-2' : 'my-2'}`}>
            {label}
          </span>
        )}
        {label && <div className={lineClass} />}
      </div>
    );
  }
);
Divider.displayName = 'Divider';
