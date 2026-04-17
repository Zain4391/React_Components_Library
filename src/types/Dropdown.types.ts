import type { ReactNode } from 'react';

export type DropdownPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  separator?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  placement?: DropdownPlacement;
  onOpenChange?: (open: boolean) => void;
}
