import type { HTMLAttributes, ReactNode } from "react";

export type FooterVariant = "simple" | "columns" | "centered";

export interface FooterLink {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface FooterColumnType {
  title: ReactNode;
  links: FooterLink[];
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  variant?: FooterVariant;
  logo?: ReactNode;
  description?: ReactNode;
  copyright?: ReactNode;
  columns?: FooterColumnType[];
  bottomLinks?: FooterLink[];
  socialLinks?: ReactNode;
  newsletterSlot?: ReactNode;
}
