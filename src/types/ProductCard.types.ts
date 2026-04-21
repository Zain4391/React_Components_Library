import type { HTMLAttributes, ReactNode } from "react";

export interface ProductCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title" | "content"
> {
  imageSrc: string;
  imageAlt?: string;
  title: ReactNode;
  price: ReactNode;
  description?: ReactNode;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  addToCartText?: ReactNode;
}
