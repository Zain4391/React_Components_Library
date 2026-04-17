export type AvatarVariant = 'image' | 'initials' | 'fallback';
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  variant?: AvatarVariant;
  size?: AvatarSize;
  src?: string;
  alt?: string;
  initials?: string;
}
