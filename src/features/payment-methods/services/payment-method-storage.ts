import type { PaymentMethod } from "../types/payment-method";

export const PAYMENT_METHODS_STORAGE_KEY = "mecsu-payment-methods";

const demoPaymentMethods: PaymentMethod[] = [
  {
    id: "pm-bank-001",
    type: "bank_transfer",
    displayName: "Chuyển khoản doanh nghiệp",
    accountName: "CONG TY TNHH MECSU DEMO",
    maskedValue: "VCB **** 2468",
    isDefault: true,
  },
  {
    id: "pm-cod-001",
    type: "cod",
    displayName: "Thanh toán khi nhận hàng",
    accountName: "Nguyễn Văn A",
    maskedValue: "COD - xác nhận khi giao",
    isDefault: false,
  },
];

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeDefaultMethod(methods: PaymentMethod[]): PaymentMethod[] {
  if (methods.length === 0) return [];

  const defaultIndex = methods.findIndex((method) => method.isDefault);
  if (defaultIndex === -1) {
    return methods.map((method, index) => ({
      ...method,
      isDefault: index === 0,
    }));
  }

  return methods.map((method, index) => ({
    ...method,
    isDefault: index === defaultIndex,
  }));
}

export function initializePaymentMethods() {
  if (!isBrowser()) return;

  const hasExistingValue = window.localStorage.getItem(PAYMENT_METHODS_STORAGE_KEY) !== null;
  if (!hasExistingValue) {
    savePaymentMethods(demoPaymentMethods);
  }
}

export function loadPaymentMethods(): PaymentMethod[] {
  if (!isBrowser()) return [];

  try {
    const rawValue = window.localStorage.getItem(PAYMENT_METHODS_STORAGE_KEY);
    if (!rawValue) return [];

    const parsed = JSON.parse(rawValue) as PaymentMethod[];
    if (!Array.isArray(parsed)) return [];

    return normalizeDefaultMethod(
      parsed.filter(
        (method) =>
          method &&
          method.id &&
          (method.type === "bank_transfer" || method.type === "cod") &&
          method.displayName &&
          method.accountName &&
          method.maskedValue,
      ),
    );
  } catch {
    return [];
  }
}

export function savePaymentMethods(methods: PaymentMethod[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(
    PAYMENT_METHODS_STORAGE_KEY,
    JSON.stringify(normalizeDefaultMethod(methods)),
  );
}

export function addPaymentMethod(method: PaymentMethod) {
  const currentMethods = loadPaymentMethods();
  const nextMethods = method.isDefault
    ? [
        ...currentMethods.map((currentMethod) => ({
          ...currentMethod,
          isDefault: false,
        })),
        method,
      ]
    : [...currentMethods, method];

  savePaymentMethods(nextMethods);
}

export function updatePaymentMethod(method: PaymentMethod) {
  const nextMethods = loadPaymentMethods().map((currentMethod) =>
    currentMethod.id === method.id ? method : currentMethod,
  );

  savePaymentMethods(
    method.isDefault
      ? nextMethods.map((currentMethod) => ({
          ...currentMethod,
          isDefault: currentMethod.id === method.id,
        }))
      : nextMethods,
  );
}

export function removePaymentMethod(methodId: string) {
  savePaymentMethods(loadPaymentMethods().filter((method) => method.id !== methodId));
}

export function setDefaultPaymentMethod(methodId: string) {
  savePaymentMethods(
    loadPaymentMethods().map((method) => ({
      ...method,
      isDefault: method.id === methodId,
    })),
  );
}

export function getTotalPaymentMethods(methods = loadPaymentMethods()) {
  return methods.length;
}
