export type PaymentMethodType = "bank_transfer" | "cod";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  displayName: string;
  accountName: string;
  maskedValue: string;
  isDefault: boolean;
}

export interface PaymentMethodFormData {
  type: PaymentMethodType;
  displayName: string;
  accountName: string;
  maskedValue: string;
  isDefault: boolean;
}
