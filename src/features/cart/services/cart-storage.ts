import type { Product } from "@/features/products/types/product";
import type { CartItem, CartSnapshot } from "../types/cart";

export const CART_STORAGE_KEY = "mecsu-cart";
const CART_CHANGED_EVENT = "mecsu-cart-changed";

const emptySnapshot: CartSnapshot = { items: [] };
let cachedRawValue: string | null = null;
let cachedSnapshot: CartSnapshot = emptySnapshot;

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeQuantity(quantity: number, stock: number) {
  const maxQuantity = Math.max(1, stock);
  return Math.min(maxQuantity, Math.max(1, Math.floor(quantity || 1)));
}

function productToCartItem(product: Product, quantity = 1): CartItem {
  return {
    productId: product.id,
    sku: product.sku,
    name: product.name,
    image: product.image,
    price: product.price,
    quantity: normalizeQuantity(quantity, product.stock),
    stock: product.stock,
    slug: product.slug,
  };
}

function notifyCartChanged() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(CART_CHANGED_EVENT));
}

export function subscribeCart(callback: () => void) {
  if (!isBrowser()) {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) callback();
  };

  window.addEventListener(CART_CHANGED_EVENT, callback);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(CART_CHANGED_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

export function loadCart(): CartSnapshot {
  if (!isBrowser()) {
    return emptySnapshot;
  }

  try {
    const rawValue = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!rawValue) return emptySnapshot;
    if (rawValue === cachedRawValue) return cachedSnapshot;

    const parsed = JSON.parse(rawValue) as CartSnapshot;
    if (!Array.isArray(parsed.items)) return emptySnapshot;

    cachedRawValue = rawValue;
    cachedSnapshot = {
      items: parsed.items
        .filter((item) => item && item.productId && item.quantity > 0)
        .map((item) => ({
          ...item,
          quantity: normalizeQuantity(item.quantity, item.stock),
        })),
    };

    return cachedSnapshot;
  } catch {
    return emptySnapshot;
  }
}

export function saveCart(snapshot: CartSnapshot) {
  if (!isBrowser()) return;
  const rawValue = JSON.stringify(snapshot);
  cachedRawValue = rawValue;
  cachedSnapshot = snapshot;
  window.localStorage.setItem(CART_STORAGE_KEY, rawValue);
  notifyCartChanged();
}

export function addItem(product: Product, quantity = 1) {
  const cart = loadCart();
  const existingItem = cart.items.find((item) => item.productId === product.id);

  if (existingItem) {
    saveCart({
      items: cart.items.map((item) =>
        item.productId === product.id
          ? {
              ...item,
              quantity: normalizeQuantity(item.quantity + quantity, product.stock),
              stock: product.stock,
              price: product.price,
              image: product.image,
              slug: product.slug,
            }
          : item,
      ),
    });
    return;
  }

  saveCart({
    items: [...cart.items, productToCartItem(product, quantity)],
  });
}

export function removeItem(productId: string) {
  saveCart({
    items: loadCart().items.filter((item) => item.productId !== productId),
  });
}

export function updateQuantity(productId: string, quantity: number) {
  const cart = loadCart();
  saveCart({
    items: cart.items.map((item) =>
      item.productId === productId
        ? { ...item, quantity: normalizeQuantity(quantity, item.stock) }
        : item,
    ),
  });
}

export function increaseQuantity(productId: string) {
  const item = loadCart().items.find((cartItem) => cartItem.productId === productId);
  if (!item) return;
  updateQuantity(productId, item.quantity + 1);
}

export function decreaseQuantity(productId: string) {
  const item = loadCart().items.find((cartItem) => cartItem.productId === productId);
  if (!item) return;
  updateQuantity(productId, item.quantity - 1);
}

export function clearCart() {
  saveCart(emptySnapshot);
}

export function getTotalItems(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getTotalProducts(items: CartItem[]) {
  return items.length;
}

export function getSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
