import type { CheckoutLastOrder } from "../types/checkout";

export const CHECKOUT_LAST_ORDER_KEY = "mecsu-last-order";

export function saveLastOrder(order: CheckoutLastOrder) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CHECKOUT_LAST_ORDER_KEY, JSON.stringify(order));
}

export function loadLastOrder(): CheckoutLastOrder | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawOrder = window.localStorage.getItem(CHECKOUT_LAST_ORDER_KEY);

  if (!rawOrder) {
    return null;
  }

  try {
    return JSON.parse(rawOrder) as CheckoutLastOrder;
  } catch {
    return null;
  }
}
