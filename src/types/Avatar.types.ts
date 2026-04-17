import type { HTMLAttributes } from 'react';

export type AvatarVariant = 'image' | 'initials' | 'fallback';
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: AvatarVariant;
  size?: AvatarSize;
  src?: string;
  alt?: string;
  initials?: string;
}
