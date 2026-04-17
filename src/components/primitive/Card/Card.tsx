import { cva } from "class-variance-authority";
import type { CardProps } from "../../../types/Card.types";

const cardVariants = cva(
  "bg-[var(--color-surface)] rounded-xl overflow-hidden flex flex-col",
  {
    variants: {
      variant: {
        default: "border border-[var(--color-border)]",
        elevated:
          "border border-[var(--color-border)] shadow-[var(--shadow-md)]",
        outlined: "bg-transparent border border-[var(--color-border-strong)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Card({
  variant = "default",
  header,
  footer,
  noPadding = false,
  className,
  children,
  ...props
}: CardProps) {
  const classes = [cardVariants({ variant }), className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div {...props} className={classes}>
      {header && (
        <div className="px-6 py-4 border-b border-(--color-border) font-medium text-(--color-text-primary)">
          {header}
        </div>
      )}
      <div
        className={
          noPadding
            ? "flex-1 text-(--color-text-primary)"
            : "p-6 flex-1 text-(--color-text-primary)"
        }
      >
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-(--color-border) text-(--color-text-muted)">
          {footer}
        </div>
      )}
    </div>
  );
}
