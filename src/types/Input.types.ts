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
