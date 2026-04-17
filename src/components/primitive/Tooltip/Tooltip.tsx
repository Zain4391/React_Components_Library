import { useState } from 'react';
import { cva } from 'class-variance-authority';
import type { TooltipProps } from '../../../types/Tooltip.types';

const tooltipVariants = cva(
  [
    'absolute z-50 px-2 py-1 text-[var(--text-xs)] font-medium text-[var(--color-text-inverse)] bg-[var(--color-overlay)] rounded shadow-[var(--shadow-sm)] whitespace-nowrap pointer-events-none',
    'transition-opacity duration-[var(--duration-fast)]'
  ].join(' '),
  {
    variants: {
      placement: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
    },
    defaultVariants: {
      placement: 'top',
    },
  }
);

export function Tooltip({ content, placement = 'top', children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={tooltipVariants({ placement })} role="tooltip">
          {content}
        </div>
      )}
    </div>
  );
}
