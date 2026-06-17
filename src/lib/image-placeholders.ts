const CATEGORY_ASSET_IMAGES = [
  "/assets/categories/hinh-anh-156909.png",
  "/assets/categories/hinh-anh-16971.jpeg",
  "/assets/categories/hinh-anh-17072.jpeg",
  "/assets/categories/hinh-anh-17076.jpeg",
  "/assets/categories/hinh-anh-17453.jpeg",
  "/assets/categories/hinh-anh-284727.jpeg",
  "/assets/categories/hinh-anh-41993.png",
  "/assets/categories/hinh-anh-42050.png",
  "/assets/categories/hinh-anh-42701.png",
];

function getSeededIndex(seed: string, length: number): number {
  const normalizedSeed = seed.trim() || "category";
  let hash = 0;

  for (let index = 0; index < normalizedSeed.length; index += 1) {
    hash = (hash * 31 + normalizedSeed.charCodeAt(index)) >>> 0;
  }

  return hash % length;
}

export function getSeededPlaceholder(seed: string): string {
  const encoded = encodeURIComponent(seed.charAt(0).toUpperCase());
  return `https://placehold.co/100x100/ffffff/003B73?text=${encoded}`;
}

export function getSeededCategoryImage(seed: string): string {
  if (CATEGORY_ASSET_IMAGES.length === 0) {
    return getSeededPlaceholder(seed);
  }

  return CATEGORY_ASSET_IMAGES[
    getSeededIndex(seed, CATEGORY_ASSET_IMAGES.length)
  ];
}
