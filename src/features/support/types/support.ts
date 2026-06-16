export type FaqCategory =
  | "all"
  | "quotation"
  | "orders"
  | "payment"
  | "shipping"
  | "warranty";

export type RequestType =
  | "quotation"
  | "orders"
  | "payment"
  | "shipping"
  | "warranty"
  | "other";

export interface QuickSupportChannel {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  iconKey: string;
  href?: string;
}

export interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, "all">;
  question: string;
  answer: string;
}

export interface PolicyItem {
  id: string;
  title: string;
  description: string;
  href: string;
  iconKey: string;
}

export interface SupportRequestFormData {
  fullName: string;
  phone: string;
  email: string;
  requestType: RequestType | "";
  referenceCode: string;
  message: string;
}

export interface SupportFormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  requestType?: string;
  message?: string;
}

export const faqCategoryConfig: Record<
  Exclude<FaqCategory, "all">,
  { label: string; color: string }
> = {
  quotation: { label: "Báo giá", color: "#173E75" },
  orders: { label: "Đơn hàng", color: "#173E75" },
  payment: { label: "Thanh toán", color: "#173E75" },
  shipping: { label: "Vận chuyển", color: "#173E75" },
  warranty: { label: "Bảo hành", color: "#173E75" },
};

export const requestTypeOptions: { value: RequestType; label: string }[] = [
  { value: "quotation", label: "Báo giá" },
  { value: "orders", label: "Đơn hàng" },
  { value: "payment", label: "Thanh toán" },
  { value: "shipping", label: "Vận chuyển" },
  { value: "warranty", label: "Bảo hành" },
  { value: "other", label: "Khác" },
];

export const initialSupportFormData: SupportRequestFormData = {
  fullName: "",
  phone: "",
  email: "",
  requestType: "",
  referenceCode: "",
  message: "",
};
