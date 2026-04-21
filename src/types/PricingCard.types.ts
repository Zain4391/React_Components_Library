import type { HTMLAttributes, ReactNode } from "react";

export interface PricingFeature {
  name: ReactNode;
  highlighted?: boolean;
}

export interface PricingCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title: ReactNode;
  price: ReactNode;
  billingPeriod?: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  features?: (string | PricingFeature)[];
  buttonText?: ReactNode;
  onButtonClick?: () => void;
  isPopular?: boolean;
}
