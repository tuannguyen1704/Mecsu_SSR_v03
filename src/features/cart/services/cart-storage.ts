import type { Product } from "@/features/products/types/product";
import {
  getMinOrderQuantity,
  getOrderStep,
  normalizeOrderQuantity,
} from "@/features/products/utils/orderQuantity";
import type { CartItem, CartSnapshot } from "../types/cart";

export const CART_STORAGE_KEY = "mecsu-cart";
const CART_CHANGED_EVENT = "mecsu-cart-changed";

const emptySnapshot: CartSnapshot = { items: [] };
let cachedRawValue: string | null = null;
let cachedSnapshot: CartSnapshot = emptySnapshot;

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeQuantity(
  quantity: number,
  minOrderQuantity = 1,
  orderStep = minOrderQuantity,
) {
  return normalizeOrderQuantity(
    Math.floor(quantity || minOrderQuantity),
    Math.max(1, minOrderQuantity),
    Math.max(1, orderStep || minOrderQuantity),
  );
}

function productToCartItem(product: Product, quantity = 1): CartItem {
  const minOrderQuantity = getMinOrderQuantity(product);
  const orderStep = getOrderStep(product);

  return {
    productId: product.id,
    sku: product.sku,
    name: product.name,
    image: product.image,
    price: product.price,
    quantity: normalizeQuantity(quantity, minOrderQuantity, orderStep),
    stock: product.stock,
    minOrderQuantity,
    orderStep,
    unit: product.unit,
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
          quantity: normalizeQuantity(
            item.quantity,
            item.minOrderQuantity,
            item.orderStep,
          ),
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
    const minOrderQuantity = getMinOrderQuantity(product);
    const orderStep = getOrderStep(product);

    saveCart({
      items: cart.items.map((item) =>
        item.productId === product.id
          ? {
              ...item,
              quantity: normalizeQuantity(
                item.quantity + quantity,
                minOrderQuantity,
                orderStep,
              ),
              stock: product.stock,
              minOrderQuantity,
              orderStep,
              unit: product.unit,
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
        ? {
            ...item,
            quantity: normalizeQuantity(
              quantity,
              item.minOrderQuantity,
              item.orderStep,
            ),
          }
        : item,
    ),
  });
}

export function increaseQuantity(productId: string) {
  const item = loadCart().items.find((cartItem) => cartItem.productId === productId);
  if (!item) return;
  updateQuantity(productId, item.quantity + (item.orderStep ?? item.minOrderQuantity ?? 1));
}

export function decreaseQuantity(productId: string) {
  const item = loadCart().items.find((cartItem) => cartItem.productId === productId);
  if (!item) return;
  updateQuantity(productId, item.quantity - (item.orderStep ?? item.minOrderQuantity ?? 1));
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
