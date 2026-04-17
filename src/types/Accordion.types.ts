import type { ReactNode } from 'react';

export interface AccordionItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string[];
  allowMultiple?: boolean;
}
