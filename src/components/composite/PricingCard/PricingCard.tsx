import { forwardRef } from "react";
import type {
  PricingCardProps,
  PricingFeature,
} from "../../../types/PricingCard.types";

export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      className = "",
      title,
      price,
      billingPeriod = "/month",
      description,
      badge,
      features = [],
      buttonText = "Get Started Now",
      onButtonClick,
      isPopular = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`relative w-full max-w-sm rounded-2xl p-8 shadow-xl transition-all duration-[300ms] hover:-translate-y-1 hover:shadow-2xl ${
          isPopular
            ? "border-2 border-[var(--color-accent)] bg-[var(--color-bg-primary)]"
            : "border border-[var(--color-border)] bg-[var(--color-bg-primary)]"
        } ${className}`}
        {...props}
      >
        {badge && (
          <div
            className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest text-[var(--color-bg-primary)] ${
              isPopular
                ? "bg-[var(--color-accent)]"
                : "bg-[var(--color-text-primary)]"
            }`}
          >
            {badge}
          </div>
        )}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
            {title}
          </h3>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              {price}
            </span>
            {billingPeriod && (
              <span className="text-[var(--color-text-secondary)]">
                {billingPeriod}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {description}
            </p>
          )}
        </div>

        {features && features.length > 0 && (
          <ul className="mb-8 space-y-4 text-sm text-[var(--color-text-secondary)]">
            {features.map((feature, index) => {
              const isObj =
                typeof feature === "object" &&
                feature !== null &&
                "name" in feature;
              const name = isObj ? (feature as PricingFeature).name : feature;
              const highlighted = isObj
                ? (feature as PricingFeature).highlighted
                : false;

              return (
                <li
                  key={index}
                  className={`flex items-center gap-3 ${
                    highlighted
                      ? "text-[var(--color-text-primary)] font-medium"
                      : ""
                  }`}
                >
                  <svg
                    className={`h-5 w-5 shrink-0 ${isPopular ? "text-[var(--color-accent)]" : "text-[var(--color-text-tertiary)]"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{name}</span>
                </li>
              );
            })}
          </ul>
        )}

        <button
          onClick={onButtonClick}
          className={`w-full rounded-xl py-4 text-sm font-bold shadow-lg transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 ${
            isPopular
              ? "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-bg-primary)] shadow-blue-500/20"
              : "bg-[var(--color-bg-inverse)] hover:opacity-90 text-[var(--color-text-inverse)] shadow-black/5 dark:shadow-white/5"
          }`}
        >
          {buttonText}
        </button>
      </div>
    );
  },
);

PricingCard.displayName = "PricingCard";
