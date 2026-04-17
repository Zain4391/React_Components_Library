import type { ReactNode, ReactElement, HTMLAttributes } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  children: ReactElement<HTMLAttributes<HTMLElement>>;
}
