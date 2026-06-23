import type { CartItem } from "@/features/cart/types/cart";

export type ShippingMethod = "standard" | "express";
export type PaymentMethod = "bank-transfer" | "cod";
export type CheckoutShippingMethod = "standard" | "fast" | "pickup";
export type CheckoutPaymentMethod = "bank" | "cod" | "quote";

export interface CheckoutFormState {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
}

export type CheckoutFormErrors = Partial<
  Record<keyof Pick<CheckoutFormState, "fullName" | "phone" | "email" | "address">, string>
>;

export interface CheckoutAddress {
  fullName: string;
  phone: string;
  provinceCode: string;
  provinceName: string;
  wardCode: string;
  wardName: string;
  streetAddress: string;
  note: string;
  districtCode?: string;
  districtName?: string;
  province?: string;
  district?: string;
  ward?: string;
  address?: string;
}

export interface CheckoutLastOrder {
  orderCode: string;
  items: CartItem[];
  subtotal: number;
  vat: number;
  shippingFee: number;
  total: number;
  address: CheckoutAddress;
  shippingMethod: CheckoutShippingMethod;
  paymentMethod: CheckoutPaymentMethod;
  vatInvoice: boolean;
  createdAt: string;
}
