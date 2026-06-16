import type { WishlistItem } from "../types/wishlist";

export const WISHLIST_STORAGE_KEY = "mecsu-wishlist";

const demoWishlistItems: WishlistItem[] = [
  {
    id: "wish-demo-1",
    productId: "0043170",
    sku: "0043170",
    slug: "phe-gai-truc-thep-65mn-din471-d3x0-4",
    name: "Phe Gài Trục Thép 65Mn DIN471 D3x0.4 (50Cái/Bịch)",
    image: "",
    brand: "MS-PRO",
    price: 2592,
    originalPrice: 3200,
    discount: 19,
    stockStatus: "in_stock",
    stock: 863,
    savedDate: "2026-06-12",
  },
  {
    id: "wish-demo-2",
    productId: "bulong-inox-001293",
    sku: "001293",
    slug: "bulong-inox-304-din933-m3x20",
    name: "Bulong Inox 304 DIN933 M3x20",
    image: "",
    brand: "INOX 304",
    price: 3492,
    originalPrice: 4500,
    discount: 22,
    stockStatus: "in_stock",
    stock: 2469,
    savedDate: "2026-06-11",
  },
  {
    id: "wish-demo-3",
    productId: "ren-cay-009821",
    sku: "009821",
    slug: "ren-cay-inox-m6",
    name: "Ren Cay Inox M6",
    image: "",
    brand: "INOX 304",
    price: 1892,
    originalPrice: 2500,
    discount: 24,
    stockStatus: "out_of_stock",
    stock: 0,
    savedDate: "2026-06-10",
  },
  {
    id: "wish-demo-4",
    productId: "demo-skf-6205",
    sku: "SKF6205ZZ",
    slug: "vong-bi-skf-6205-2z",
    name: "Vòng bi SKF 6205-2Z",
    image: "",
    brand: "SKF",
    price: 185000,
    originalPrice: 220000,
    discount: 16,
    stockStatus: "limited",
    stock: 45,
    savedDate: "2026-06-09",
  },
  {
    id: "wish-demo-5",
    productId: "demo-ong-kep-inox",
    sku: "INOX-ODS-213",
    slug: "ong-kep-inox-304-21-3mm",
    name: "Ống Kẹp Inox 304 Ø21.3mm",
    image: "",
    brand: "INOX 304",
    price: 89000,
    stockStatus: "in_stock",
    stock: 320,
    savedDate: "2026-06-08",
  },
  {
    id: "wish-demo-6",
    productId: "demo-gioang-caosu",
    sku: "GIOANG-CS-10152",
    slug: "gioang-cao-su-chiu-nhiet-10x15x2mm",
    name: "Gioăng Cao Su Chịu Nhiệt 10x15x2mm",
    image: "",
    brand: "VITON",
    price: 12500,
    stockStatus: "out_of_stock",
    stock: 0,
    savedDate: "2026-06-07",
  },
];

function isBrowser() {
  return typeof window !== "undefined";
}

function readRawWishlist(): WishlistItem[] {
  if (!isBrowser()) return [];

  try {
    const rawValue = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!rawValue) return [];
    const parsed = JSON.parse(rawValue) as WishlistItem[];
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) => item && item.productId && item.name && item.sku,
    );
  } catch {
    return [];
  }
}

export function initializeWishlist() {
  if (!isBrowser()) return;
  const hasExistingValue = window.localStorage.getItem(WISHLIST_STORAGE_KEY) !== null;
  if (!hasExistingValue) {
    saveWishlist(demoWishlistItems);
  }
}

export function loadWishlist(): WishlistItem[] {
  return readRawWishlist();
}

export function saveWishlist(items: WishlistItem[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
}

export function addItem(item: WishlistItem) {
  const items = loadWishlist();
  const exists = items.some((wishlistItem) => wishlistItem.productId === item.productId);
  if (exists) return;

  saveWishlist([
    {
      ...item,
      id: item.id || `wish-${Date.now()}`,
      savedDate: item.savedDate || new Date().toISOString().slice(0, 10),
    },
    ...items,
  ]);
}

export function removeItem(productId: string) {
  saveWishlist(loadWishlist().filter((item) => item.productId !== productId));
}

export function removeMultipleItems(productIds: string[]) {
  saveWishlist(
    loadWishlist().filter((item) => !productIds.includes(item.productId)),
  );
}

export function clearWishlist() {
  saveWishlist([]);
}

export function getTotalItems(items = loadWishlist()) {
  return items.length;
}
