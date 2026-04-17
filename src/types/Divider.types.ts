import type { HTMLAttributes } from 'react';

export type DividerVariant = 'horizontal' | 'vertical';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: DividerVariant;
  label?: string;
}
