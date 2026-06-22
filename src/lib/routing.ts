export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

export function matchesKeyword(text: string, keyword: string): boolean {
  if (!keyword.trim()) return true;
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
  const search = keyword
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
  return normalized.includes(search);
}

export function generateCategoryUrl(category: { id: string; name?: string }): string {
  return category.name ? `/danh-muc/${toSlug(category.name)}` : `/danh-muc/${category.id}`;
}
