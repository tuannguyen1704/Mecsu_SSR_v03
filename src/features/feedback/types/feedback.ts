export type FeedbackType =
  | "shopping_experience"
  | "product_quality"
  | "delivery"
  | "payment"
  | "account"
  | "other";

export type FeedbackStatus = "recorded" | "reviewing" | "responded";

export interface FeedbackTypeOption {
  value: FeedbackType;
  label: string;
}

export interface FeedbackFormData {
  subject: string;
  type: FeedbackType | "";
  rating: number;
  content: string;
}

export interface RecentFeedbackItem {
  id: string;
  subject: string;
  type: string;
  date: string;
  status: FeedbackStatus;
}
