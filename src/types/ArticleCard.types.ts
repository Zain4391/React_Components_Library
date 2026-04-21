import type { HTMLAttributes, ReactNode } from "react";

export interface ArticleCardProps extends HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  imageAlt?: string;
  category?: string;
  date: string;
  dateTime?: string;
  readTime?: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorAvatar?: ReactNode;
  onReadMore?: () => void;
  readMoreText?: string;
}
