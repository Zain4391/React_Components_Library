import type { HTMLAttributes, ReactNode } from 'react';
import type { CardVariant } from './Card.types';

export interface ActionCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
}
