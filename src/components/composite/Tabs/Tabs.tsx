import { useState } from 'react';
import type { TabsProps } from '../../../types/Tabs.types';

export function Tabs({ tabs, defaultValue, onChange }: TabsProps) {
  const [activeValue, setActiveValue] = useState(defaultValue ?? tabs[0]?.value ?? '');

  const handleTabClick = (value: string, disabled?: boolean) => {
    if (disabled) return;
    setActiveValue(value);
    onChange?.(value);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex border-b border-[var(--color-border)] overflow-x-auto" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.value === activeValue;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.value}`}
              aria-disabled={tab.disabled}
              id={`tab-${tab.value}`}
              onClick={() => handleTabClick(tab.value, tab.disabled)}
              className={[
                'px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-[120ms]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]',
                'border-b-2 bg-transparent cursor-pointer',
                isActive
                  ? 'text-[var(--color-accent)] border-[var(--color-accent)]'
                  : 'text-[var(--color-text-muted)] border-transparent hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)]',
                tab.disabled ? 'opacity-[0.45] pointer-events-none' : '',
              ].filter(Boolean).join(' ')}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="py-4 text-left text-[var(--color-text-primary)]">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            role="tabpanel"
            id={`tabpanel-${tab.value}`}
            aria-labelledby={`tab-${tab.value}`}
            hidden={tab.value !== activeValue}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
