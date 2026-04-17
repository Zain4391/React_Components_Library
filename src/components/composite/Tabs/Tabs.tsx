import { useState } from 'react';
import type { TabsProps } from '../../../types/Tabs.types';

export function Tabs({ tabs, defaultTab = 0, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onChange?.(index);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex border-b border-[var(--color-border)] overflow-x-auto hide-scrollbar" role="tablist">
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          return (
            <button
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${index}`}
              id={`tab-${index}`}
              onClick={() => handleTabClick(index)}
              className={[
                'px-4 py-3 text-[var(--text-sm)] font-medium whitespace-nowrap transition-colors duration-[var(--duration-fast)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]',
                'border-b-2 bg-transparent cursor-pointer',
                isActive
                  ? 'text-[var(--color-accent)] border-[var(--color-accent)]'
                  : 'text-[var(--color-text-muted)] border-transparent hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)]'
              ].join(' ')}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="py-4 text-left text-[var(--color-text-primary)]">
        {tabs.map((tab, index) => (
          <div
            key={index}
            role="tabpanel"
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            hidden={index !== activeTab}
            className={index === activeTab ? 'block' : 'hidden'}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
