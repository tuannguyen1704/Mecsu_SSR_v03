"use client";

import { useSyncExternalStore } from "react";
import type { Product } from "@/features/products/types/product";
import {
  addItem,
  clearCart,
  decreaseQuantity,
  getSubtotal,
  getTotalItems,
  increaseQuantity,
  loadCart,
  removeItem,
  subscribeCart,
  updateQuantity,
} from "../services/cart-storage";

const emptySnapshot = { items: [] };
const serverSnapshot = () => emptySnapshot;

export function useCart() {
  const snapshot = useSyncExternalStore(subscribeCart, loadCart, serverSnapshot);
  const items = snapshot.items;

  return {
    items,
    totalItems: getTotalItems(items),
    subtotal: getSubtotal(items),
    addItem: (product: Product, quantity = 1) => addItem(product, quantity),
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    clearCart,
  };
}
