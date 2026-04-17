import { useState, useId, cloneElement } from 'react';
import { cva } from 'class-variance-authority';
import type { TooltipProps } from '../../../types/Tooltip.types';

const tooltipVariants = cva(
  [
    'absolute z-50 px-2 py-1 text-xs font-medium text-[var(--color-text-inverse)] bg-[var(--near-black)] rounded shadow-[var(--shadow-sm)] whitespace-nowrap pointer-events-none',
    'transition-opacity duration-[120ms]',
  ].join(' '),
  {
    variants: {
      placement: {
        top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left:   'right-full top-1/2 -translate-y-1/2 mr-2',
        right:  'left-full top-1/2 -translate-y-1/2 ml-2',
      },
    },
    defaultVariants: {
      placement: 'top',
    },
  },
);

export function Tooltip({ content, placement = 'top', children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  const trigger = cloneElement(children, {
    'aria-describedby': tooltipId,
  });

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {trigger}
      <div
        id={tooltipId}
        role="tooltip"
        className={[
          tooltipVariants({ placement }),
          isVisible ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        {content}
      </div>
    </div>
  );
}
