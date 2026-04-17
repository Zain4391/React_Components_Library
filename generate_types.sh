#!/bin/bash

# Input.types.ts
cat << 'INNER_EOF' > src/types/Input.types.ts
import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputVariant = 'default' | 'error';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  inputSize?: InputSize; // renamed to avoid conflict with standard HTML size attribute
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
INNER_EOF

# Textarea.types.ts
cat << 'INNER_EOF' > src/types/Textarea.types.ts
import type { TextareaHTMLAttributes, ReactNode } from 'react';

export type TextareaVariant = 'default' | 'error';
export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'both';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  textareaSize?: TextareaSize;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  resize?: TextareaResize;
}
INNER_EOF

# Avatar.types.ts
cat << 'INNER_EOF' > src/types/Avatar.types.ts
export type AvatarVariant = 'image' | 'initials' | 'fallback';
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  variant?: AvatarVariant;
  size?: AvatarSize;
  src?: string;
  alt?: string;
  initials?: string;
}
INNER_EOF

# Tooltip.types.ts
cat << 'INNER_EOF' > src/types/Tooltip.types.ts
import type { ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  children: ReactElement;
}
INNER_EOF

# Divider.types.ts
cat << 'INNER_EOF' > src/types/Divider.types.ts
export type DividerVariant = 'horizontal' | 'vertical';

export interface DividerProps {
  variant?: DividerVariant;
  label?: string;
}
INNER_EOF

# Modal.types.ts
cat << 'INNER_EOF' > src/types/Modal.types.ts
import type { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  children: ReactNode;
}
INNER_EOF

# Dropdown.types.ts
cat << 'INNER_EOF' > src/types/Dropdown.types.ts
import type { ReactNode } from 'react';

export type DropdownPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  placement?: DropdownPlacement;
}
INNER_EOF

# Tabs.types.ts
cat << 'INNER_EOF' > src/types/Tabs.types.ts
import type { ReactNode } from 'react';

export interface TabItem {
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: number;
  onChange?: (index: number) => void;
}
INNER_EOF

# Accordion.types.ts
cat << 'INNER_EOF' > src/types/Accordion.types.ts
import type { ReactNode } from 'react';

export interface AccordionItem {
  label: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}
INNER_EOF

# Toast.types.ts
cat << 'INNER_EOF' > src/types/Toast.types.ts
import type { ReactNode } from 'react';

export type ToastVariant = 'success' | 'danger' | 'warning' | 'info';

export interface ToastProps {
  variant?: ToastVariant;
  message: ReactNode;
  duration?: number;
  onDismiss: () => void;
}
INNER_EOF

chmod +x generate_types.sh
./generate_types.sh
