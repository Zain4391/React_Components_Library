import { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import type { DropdownProps } from '../../../types/Dropdown.types';

const dropdownMenuVariants = cva(
  [
    'absolute z-50 min-w-[200px] bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-lg shadow-[var(--shadow-md)] py-1',
    'transition-opacity duration-[120ms]',
  ].join(' '),
  {
    variants: {
      placement: {
        top:    'bottom-full left-0 mb-1',
        bottom: 'top-full left-0 mt-1',
        left:   'right-full top-0 mr-1',
        right:  'left-full top-0 ml-1',
      },
    },
    defaultVariants: {
      placement: 'bottom',
    },
  },
);

export function Dropdown({ trigger, items, placement = 'bottom', onOpenChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = (next: boolean) => {
    setIsOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        toggle(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div onClick={() => toggle(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className={dropdownMenuVariants({ placement })}>
          {items.map((item, index) => {
            if (item.separator) {
              return <div key={index} className="my-1 border-t border-[var(--color-border)]" role="separator" />;
            }

            return (
              <button
                key={index}
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.();
                  toggle(false);
                }}
                className={[
                  'w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-primary)]',
                  'hover:bg-[var(--color-surface)] transition-colors duration-[120ms]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]',
                  'cursor-pointer border-none bg-transparent',
                  item.disabled ? 'opacity-[0.45] pointer-events-none' : '',
                ].filter(Boolean).join(' ')}
              >
                {item.icon && (
                  <span className="text-[var(--color-text-muted)] shrink-0">{item.icon}</span>
                )}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
