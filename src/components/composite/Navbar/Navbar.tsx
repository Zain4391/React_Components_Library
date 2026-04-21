import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import type { NavbarProps } from "../../../types/Navbar.types";

const navbarVariants = cva(
  "sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 backdrop-blur-md transition-all",
  {
    variants: {
      variant: {
        default: "",
        centered: "",
        search: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      variant = "default",
      logo,
      links = [],
      actions,
      searchSlot,
      ...props
    },
    ref,
  ) => {
    const renderLinks = () => (
      <ul className="flex items-center gap-6 text-sm font-medium text-[var(--color-text-secondary)]">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.href}
              onClick={link.onClick}
              className={`transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 rounded-sm ${
                link.isActive ? "text-[var(--color-text-primary)]" : ""
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    );

    return (
      <nav
        ref={ref}
        className={navbarVariants({ variant, className })}
        {...props}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          {variant === "default" && (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="shrink-0">{logo}</div>
                <div className="hidden md:block">{renderLinks()}</div>
              </div>
              <div className="flex items-center gap-4">{actions}</div>
            </div>
          )}

          {variant === "centered" && (
            <div className="flex w-full items-center justify-between">
              <div className="flex w-1/3 justify-start shrink-0">{logo}</div>
              <div className="hidden w-1/3 justify-center md:flex shrink-0">
                {renderLinks()}
              </div>
              <div className="flex w-1/3 justify-end items-center gap-4 shrink-0">
                {actions}
              </div>
            </div>
          )}

          {variant === "search" && (
            <div className="flex w-full items-center justify-between gap-4">
              <div className="shrink-0">{logo}</div>
              <div className="hidden md:block flex-1 max-w-md mx-4">
                {searchSlot}
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="hidden lg:block">{renderLinks()}</div>
                {actions}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  },
);

Navbar.displayName = "Navbar";
