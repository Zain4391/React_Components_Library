import { useState } from 'react';
import type { AccordionProps } from '../../../types/Accordion.types';

export function Accordion({ items, defaultOpen = [], allowMultiple = false }: AccordionProps) {
  const [openValues, setOpenValues] = useState<string[]>(defaultOpen);

  const toggle = (value: string, disabled?: boolean) => {
    if (disabled) return;
    setOpenValues(prev => {
      const isOpen = prev.includes(value);
      if (allowMultiple) {
        return isOpen ? prev.filter(v => v !== value) : [...prev, value];
      }
      return isOpen ? [] : [value];
    });
  };

  return (
    <div className="w-full border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-surface-raised)]">
      {items.map((item) => {
        const isOpen = openValues.includes(item.value);

        return (
          <div key={item.value} className="border-b border-[var(--color-border)] last:border-b-0">
            <button
              aria-expanded={isOpen}
              aria-disabled={item.disabled}
              onClick={() => toggle(item.value, item.disabled)}
              className={[
                'flex w-full items-center justify-between px-4 py-3 bg-transparent text-left cursor-pointer',
                'text-base font-medium text-[var(--color-text-primary)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]',
                'hover:bg-[var(--color-surface)] transition-colors duration-[120ms]',
                item.disabled ? 'opacity-[0.45] pointer-events-none' : '',
              ].filter(Boolean).join(' ')}
            >
              <span>{item.label}</span>
              <svg
                className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform duration-[200ms] ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-[200ms] ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
              aria-hidden={!isOpen}
            >
              <div className="px-4 py-3 text-sm text-[var(--color-text-secondary)] border-t border-[var(--color-border)] bg-[var(--color-bg)]">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
