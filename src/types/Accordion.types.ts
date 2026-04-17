import type { ReactNode } from 'react';

export interface AccordionItem {
  label: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}
