import type { ReactNode } from 'react';

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}
