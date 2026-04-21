import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import type { FooterProps } from "../../../types/Footer.types";

const footerVariants = cva(
  "w-full border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)]",
  {
    variants: {
      variant: {
        simple: "py-8",
        columns: "pt-16 pb-8",
        centered: "py-12",
      },
    },
    defaultVariants: {
      variant: "simple",
    },
  },
);

export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      variant = "simple",
      logo,
      description,
      copyright,
      columns = [],
      bottomLinks = [],
      socialLinks,
      newsletterSlot,
      ...props
    },
    ref,
  ) => {
    const renderLinks = (
      items: { label: React.ReactNode; href?: string; onClick?: () => void }[],
      className = "",
    ) => (
      <ul className={`flex flex-wrap gap-4 text-sm ${className}`}>
        {items.map((link, i) => (
          <li key={i}>
            <a
              href={link.href}
              onClick={link.onClick}
              className="hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 rounded-sm"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    );

    return (
      <footer
        ref={ref}
        className={footerVariants({ variant, className })}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {variant === "simple" && (
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              {logo && <div className="shrink-0">{logo}</div>}
              <div className="text-sm shrink-0">{copyright}</div>
              {bottomLinks.length > 0 &&
                renderLinks(bottomLinks, "justify-center")}
            </div>
          )}

          {variant === "centered" && (
            <div className="flex flex-col items-center gap-6 text-center">
              {logo && <div className="shrink-0">{logo}</div>}
              {description && <p className="max-w-md text-sm">{description}</p>}
              {bottomLinks.length > 0 &&
                renderLinks(bottomLinks, "justify-center gap-6 font-medium")}
              {socialLinks && (
                <div className="flex items-center gap-4 mt-2">
                  {socialLinks}
                </div>
              )}
              <div className="mt-4 text-sm opacity-80">{copyright}</div>
            </div>
          )}

          {variant === "columns" && (
            <div className="flex flex-col gap-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 xl:grid-cols-5">
                <div className="xl:col-span-2 space-y-4">
                  {logo && <div>{logo}</div>}
                  {description && (
                    <p className="text-sm leading-relaxed max-w-sm">
                      {description}
                    </p>
                  )}
                  {socialLinks && (
                    <div className="flex items-center gap-4">{socialLinks}</div>
                  )}
                </div>
                {columns.map((col, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-primary)]">
                      {col.title}
                    </h3>
                    <ul className="space-y-3 text-sm">
                      {col.links.map((link, j) => (
                        <li key={j}>
                          <a
                            href={link.href}
                            onClick={link.onClick}
                            className="hover:text-[var(--color-accent)] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 rounded-sm"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {newsletterSlot && (
                  <div className="lg:col-span-4 xl:col-span-5 border-t border-[var(--color-border)] pt-8 mt-4 lg:hidden">
                    {newsletterSlot}
                  </div>
                )}
              </div>

              {newsletterSlot && (
                <div className="hidden lg:block border-t border-[var(--color-border)] pt-8">
                  <div className="max-w-md">{newsletterSlot}</div>
                </div>
              )}

              <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row text-sm pb-8">
                <div className="shrink-0">{copyright}</div>
                {bottomLinks.length > 0 &&
                  renderLinks(bottomLinks, "justify-center")}
              </div>
            </div>
          )}
        </div>
      </footer>
    );
  },
);

Footer.displayName = "Footer";
