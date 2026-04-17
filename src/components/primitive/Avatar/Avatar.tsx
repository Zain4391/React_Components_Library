import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import type { AvatarProps } from "../../../types/Avatar.types";

const avatarVariants = cva(
  [
    "relative inline-flex items-center justify-center rounded-[var(--radius-full)] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)]",
    "select-none shrink-0",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "w-8 h-8 text-[var(--text-xs)]",
        md: "w-10 h-10 text-[var(--text-sm)]",
        lg: "w-12 h-12 text-[var(--text-base)]",
        xl: "w-16 h-16 text-[var(--text-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const Avatar = forwardRef<
  HTMLSpanElement,
  AvatarProps & React.HTMLAttributes<HTMLSpanElement>
>(
  (
    { variant = "image", size = "md", src, alt, initials, className, ...props },
    ref,
  ) => {
    // Determine the actual variant based on props provided if variant is not explicitly fallback
    let currentVariant = variant;
    if (currentVariant === "image" && !src) {
      currentVariant = initials ? "initials" : "fallback";
    }

    return (
      <span
        ref={ref}
        className={[avatarVariants({ size }), className || ""].join(" ")}
        {...props}
      >
        {currentVariant === "image" && src ? (
          <img
            src={src}
            alt={alt || ""}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Simple fallback if image fails to load
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : currentVariant === "initials" && initials ? (
          <span className="font-medium uppercase leading-none">
            {initials.slice(0, 2)}
          </span>
        ) : (
          <svg
            className="w-full h-full text-(--color-text-muted)"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </span>
    );
  },
);
Avatar.displayName = "Avatar";
