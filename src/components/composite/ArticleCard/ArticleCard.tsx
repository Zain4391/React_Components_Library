import { forwardRef } from "react";
import type { ArticleCardProps } from "../../../types/ArticleCard.types";

export const ArticleCard = forwardRef<HTMLDivElement, ArticleCardProps>(
  (
    {
      className = "",
      imageSrc,
      imageAlt = "",
      category,
      date,
      dateTime,
      readTime,
      title,
      excerpt,
      authorName,
      authorAvatar,
      onReadMore,
      readMoreText = "Read More →",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`max-w-sm overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] shadow-sm transition-all duration-[300ms] hover:-translate-y-1 hover:shadow-lg ${className}`}
        {...props}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-[500ms] hover:scale-110"
          />
          {category && (
            <span className="absolute left-4 top-4 rounded-full bg-[var(--color-bg-primary)]/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] backdrop-blur-sm">
              {category}
            </span>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-tertiary)]">
            <time dateTime={dateTime || date}>{date}</time>
            {readTime && (
              <>
                <span>•</span>
                <span>{readTime}</span>
              </>
            )}
          </div>
          <h3 className="mt-3 text-xl font-bold text-[var(--color-text-primary)] leading-tight">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
            {excerpt}
          </p>
          <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
            <div className="flex items-center gap-3">
              {authorAvatar || (
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-accent-hover)]" />
              )}
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                {authorName}
              </span>
            </div>
            {onReadMore && (
              <button
                onClick={onReadMore}
                className="text-sm font-bold text-[var(--color-accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 rounded-sm"
              >
                {readMoreText}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

ArticleCard.displayName = "ArticleCard";
