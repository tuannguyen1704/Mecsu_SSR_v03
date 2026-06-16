export const CART_ITEM_ADDED_EVENT = "mecsu-cart-item-added";

export interface CartItemAddedDetail {
  productName: string;
  quantity: number;
  productImage?: string;
}

export function notifyCartItemAdded(detail: CartItemAddedDetail) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<CartItemAddedDetail>(CART_ITEM_ADDED_EVENT, {
      detail,
    }),
  );
}
