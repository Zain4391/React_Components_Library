import { forwardRef, useId } from 'react';
import { cva } from 'class-variance-authority';
import type { InputProps } from '../../../types/Input.types';

const inputVariants = cva(
  [
    'flex w-full items-center rounded-lg border text-[var(--color-text-primary)] bg-[var(--color-surface)]',
    'transition-[border-color,box-shadow] duration-[120ms]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
    'disabled:opacity-[0.45] disabled:cursor-not-allowed',
    'placeholder:text-[var(--color-text-muted)]',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]',
        error:   'border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)] hover:border-[var(--color-danger)]',
      },
      inputSize: {
        sm: 'h-8  px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  },
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      inputSize = 'md',
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      disabled,
      className,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const descId = `${id}-desc`;
    const hasDesc = !!(errorMessage || helperText);
    const computedVariant = errorMessage ? 'error' : variant;

    return (
      <div className="flex flex-col gap-1 w-full text-left">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[var(--color-text-primary)] select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center justify-center text-[var(--color-text-muted)] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!errorMessage}
            aria-describedby={hasDesc ? descId : undefined}
            className={[
              inputVariants({ variant: computedVariant, inputSize }),
              leftIcon  ? 'pl-9' : '',
              rightIcon ? 'pr-9' : '',
              className ?? '',
            ].filter(Boolean).join(' ')}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center justify-center text-[var(--color-text-muted)] pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {hasDesc && (
          <span
            id={descId}
            className={`text-xs ${errorMessage ? 'text-[var(--color-danger)]' : 'text-[var(--color-text-muted)]'}`}
          >
            {errorMessage ?? helperText}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
