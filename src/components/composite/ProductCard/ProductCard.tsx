import { forwardRef } from "react";
import type { ProductCardProps } from "../../../types/ProductCard.types";

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className = "",
      imageSrc,
      imageAlt = "Product",
      title,
      price,
      description,
      onAddToCart,
      onToggleFavorite,
      isFavorite = false,
      addToCartText = "Add to Cart",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`group relative w-full max-w-[280px] ${className}`}
        {...props}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[var(--color-bg-secondary)]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-[500ms] group-hover:scale-105"
          />

          <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-[300ms] group-hover:translate-y-0">
            <button
              onClick={onAddToCart}
              className="w-full rounded-lg bg-[var(--color-bg-inverse)] py-3 text-sm font-bold text-[var(--color-text-inverse)] shadow-xl active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2"
            >
              {addToCartText}
            </button>
          </div>

          <button
            onClick={onToggleFavorite}
            className={`absolute right-3 top-3 rounded-full bg-[var(--color-bg-primary)] p-2 shadow-sm transition-colors hover:text-[var(--color-danger)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 ${
              isFavorite
                ? "text-[var(--color-danger)]"
                : "text-[var(--color-text-primary)]"
            }`}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              className="h-5 w-5"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
              {title}
            </h4>
            <span className="text-sm font-bold text-[var(--color-text-primary)]">
              {price}
            </span>
          </div>
          {description && (
            <p className="text-xs text-[var(--color-text-secondary)]">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";
