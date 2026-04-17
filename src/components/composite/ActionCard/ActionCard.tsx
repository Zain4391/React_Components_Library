import { cva } from "class-variance-authority";
import type { ActionCardProps } from "../../../types/ActionCard.types";

const actionCardVariants = cva(
  "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 flex flex-col items-center gap-6",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-[var(--shadow-md)]",
        outlined: "bg-transparent border-[var(--color-border-strong)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function ActionCard({
  variant = "default",
  icon,
  title,
  description,
  actions,
  className,
  ...props
}: ActionCardProps) {
  const classes = [actionCardVariants({ variant }), className]
    .filter(Boolean)
    .join(" ");

  return (
    <div {...props} className={classes}>
      {icon && (
        <div className="w-12 h-12 rounded-full bg-[var(--color-accent-subtle)] text-[var(--color-accent)] flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6">
          {icon}
        </div>
      )}

      <div className="text-center flex flex-col gap-2">
        <h2 className="text-lg font-medium text-[var(--color-text-primary)]">{title}</h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[260px]">
          {description}
        </p>
      </div>

      {actions && (
        <div className="border-t border-(--color-border) w-full pt-5 flex gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
