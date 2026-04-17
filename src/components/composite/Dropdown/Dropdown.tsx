import { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import type { DropdownProps } from '../../../types/Dropdown.types';

const dropdownMenuVariants = cva(
  [
    'absolute z-50 min-w-[200px] bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-md shadow-[var(--shadow-md)] py-1',
    'transition-opacity duration-[var(--duration-fast)]'
  ].join(' '),
  {
    variants: {
      placement: {
        top: 'bottom-full left-0 mb-1',
        bottom: 'top-full left-0 mt-1',
        left: 'right-full top-0 mr-1',
        right: 'left-full top-0 ml-1',
      },
    },
    defaultVariants: {
      placement: 'bottom',
    },
  }
);

export function Dropdown({ trigger, items, placement = 'bottom' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className={dropdownMenuVariants({ placement })}>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className={[
                'w-full text-left flex items-center gap-2 px-4 py-2 text-[var(--text-sm)] text-[var(--color-text-primary)]',
                'hover:bg-[var(--color-surface)] focus:bg-[var(--color-surface)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]',
                'transition-colors duration-[var(--duration-fast)] cursor-pointer border-none bg-transparent'
              ].join(' ')}
            >
              {item.icon && <span className="text-[var(--color-text-muted)] shrink-0">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
