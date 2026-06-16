export const STORAGE_KEYS = {
  authAccounts: "mecsu-auth-accounts",
  authUser: "mecsu-auth-user",
  cart: "mecsu-cart",
  checkoutLastOrder: "mecsu-last-order",
  paymentMethods: "mecsu-payment-methods",
  shippingAddresses: "mecsu-addresses",
  wishlist: "mecsu-wishlist",
  viewedProducts: "mecsu-recently-viewed-products",
} as const;

export type StorageKeyName = keyof typeof STORAGE_KEYS;
