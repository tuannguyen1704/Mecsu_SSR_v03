export type AccountIconKey =
  | "overview"
  | "orders"
  | "quotes"
  | "returns"
  | "addresses"
  | "payment"
  | "wishlist"
  | "feedback"
  | "support"
  | "user";

export interface AccountUser {
  name: string;
  email: string;
  phone: string;
  role: string;
}

// User profile info types
export interface UserPersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other" | "";
  birthDate: string;
}

export interface UserBusinessInfo {
  company: string;
  taxCode: string;
  companyAddress: string;
  companyRepresentative: string;
  customerGroup: string;
  currentDiscount: string;
}

export interface UserSecurityStatus {
  emailConfirmed: boolean;
  customerGroup: string;
  createdAt: string;
  lastSignInAt: string;
}

export interface UserProfile {
  id: string;
  personal: UserPersonalInfo;
  business: UserBusinessInfo;
  security: UserSecurityStatus;
}

export interface AccountNavigationItem {
  id: string;
  label: string;
  href: string;
  icon: AccountIconKey;
}

export interface AccountNavigationSection {
  id: string;
  label: string;
  items: AccountNavigationItem[];
}

export interface AccountMetric {
  id: string;
  label: string;
  value: string;
  icon: AccountIconKey;
  tone: "navy" | "yellow" | "green" | "blue" | "red";
}

export interface AccountActivity {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  amount?: string;
  href: string;
}

export type AccountOrderStatus =
  | "pending"
  | "processing"
  | "shipping"
  | "completed"
  | "cancelled";

export interface AccountOrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  image?: string;
  unitPrice?: number;
}

export interface AccountOrder {
  id: string;
  orderCode: string;
  orderDate: string;
  status: AccountOrderStatus;
  totalAmount: number;
  items: AccountOrderItem[];
}

export interface AccountOrderTimelineStep {
  id: string;
  label: string;
  date: string;
  timestamp?: string;
  description: string;
  completed: boolean;
  active: boolean;
}

export interface AccountOrderDetail extends AccountOrder {
  estimatedDeliveryDate: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingMethod: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  subtotal: number;
  shippingFee: number;
  vat: number;
  grandTotal: number;
  timeline: AccountOrderTimelineStep[];
  transactionCode?: string;
}
