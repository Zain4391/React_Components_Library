import type { TextareaHTMLAttributes } from 'react';

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
