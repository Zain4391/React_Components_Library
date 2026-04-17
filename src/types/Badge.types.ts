import type { HTMLAttributes } from 'react';

export type BadgeVariant = 'default' | 'olive' | 'burnt' | 'success' | 'danger' | 'warning' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}
