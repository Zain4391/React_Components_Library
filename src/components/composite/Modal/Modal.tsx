import { useEffect, useRef } from "react";
import { cva } from "class-variance-authority";
import type { ModalProps } from "../../../types/Modal.types";

const modalVariants = cva(
  [
    "relative bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] rounded-lg shadow-[var(--shadow-lg)] border border-[var(--color-border)] flex flex-col max-h-[90vh]",
    "transition-all duration-[var(--duration-normal)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "w-[400px] max-w-[95vw]",
        md: "w-[600px] max-w-[95vw]",
        lg: "w-[800px] max-w-[95vw]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export function Modal({
  isOpen,
  onClose,
  title,
  footer,
  size = "md",
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = "hidden";
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="p-0 backdrop:bg-[var(--color-overlay)] backdrop:backdrop-blur-sm bg-transparent m-auto text-[var(--color-text-primary)]"
    >
      <div
        className={modalVariants({ size })}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-6 py-4 border-b border-[var(--color-border)] flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] m-0">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] rounded"
              aria-label="Close modal"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}
        <div className="p-6 overflow-y-auto text-left text-[var(--color-text-primary)]">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 border-t border-[var(--color-border)] flex justify-end gap-3 bg-[var(--color-surface)]">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}
