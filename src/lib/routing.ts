export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

export function generateCategoryUrl(category: { id: string; name?: string }): string {
  return category.name ? `/danh-muc/${toSlug(category.name)}` : `/danh-muc/${category.id}`;
}
