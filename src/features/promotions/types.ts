export type PromotionType = "code" | "automatic" | "gift";

export type Promotion = {
  id: string;
  type: PromotionType;
  title: string;
  description: string;
  condition: string;
  category: string;
  code?: string;
  expiresAt?: string;
  imageUrl?: string;
  href?: string;
};
