import type { HTMLAttributes, ReactNode } from "react";

export type NavbarVariant = "default" | "centered" | "search";

export interface NavbarLink {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  variant?: NavbarVariant;
  logo: ReactNode;
  links?: NavbarLink[];
  actions?: ReactNode;
  searchSlot?: ReactNode;
}
