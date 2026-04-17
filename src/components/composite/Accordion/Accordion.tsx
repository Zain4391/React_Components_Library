import { useState } from 'react';
import type { AccordionProps } from '../../../types/Accordion.types';

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndices(prev =>
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices(prev =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className="w-full border border-[var(--color-border)] rounded-md overflow-hidden bg-[var(--color-surface-raised)]">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);

        return (
          <div
            key={index}
            className={`border-b border-[var(--color-border)] last:border-b-0`}
          >
            <button
              aria-expanded={isOpen}
              onClick={() => handleToggle(index)}
              className={[
                'flex w-full items-center justify-between px-4 py-3 bg-transparent text-left cursor-pointer',
                'text-[var(--text-base)] font-medium text-[var(--color-text-primary)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]',
                'hover:bg-[var(--color-surface)] transition-colors duration-[var(--duration-fast)]'
              ].join(' ')}
            >
              <span>{item.label}</span>
              <svg
                className={`w-5 h-5 text-[var(--color-text-muted)] transform transition-transform duration-[var(--duration-normal)] ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-[var(--duration-normal)] ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
              aria-hidden={!isOpen}
            >
              <div className="px-4 py-3 text-[var(--text-sm)] text-[var(--color-text-secondary)] border-t border-[var(--color-border)] bg-[var(--color-bg)]">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
