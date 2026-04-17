import { forwardRef, useId } from 'react';
import { cva } from 'class-variance-authority';
import type { TextareaProps } from '../../../types/Textarea.types';

const textareaVariants = cva(
  [
    'flex w-full rounded-lg border text-[var(--color-text-primary)] bg-[var(--color-surface)]',
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
      textareaSize: {
        sm: 'p-3 text-sm',
        md: 'p-4 text-base',
        lg: 'p-4 text-lg',
      },
      resize: {
        none:     'resize-none',
        vertical: 'resize-y',
        both:     'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      textareaSize: 'md',
      resize: 'vertical',
    },
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'default',
      textareaSize = 'md',
      resize = 'vertical',
      label,
      helperText,
      errorMessage,
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
        <textarea
          id={id}
          ref={ref}
          disabled={disabled}
          aria-invalid={!!errorMessage}
          aria-describedby={hasDesc ? descId : undefined}
          className={[
            textareaVariants({ variant: computedVariant, textareaSize, resize }),
            className ?? '',
          ].filter(Boolean).join(' ')}
          {...props}
        />
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
Textarea.displayName = 'Textarea';
