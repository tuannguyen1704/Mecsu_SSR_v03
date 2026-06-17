import { HEADER_CATEGORIES } from "@/features/categories/data/header-categories";
import { generateCategoryUrl, toSlug } from "@/lib/routing";

const REQUESTED_MORE_CATEGORY_NAMES = [
  "Phe Gài",
  "Ren Cấy",
  "Bulong",
  "Bulong Cổ Vuông",
  "Bulong Đầu Bông",
  "Bulong Cánh Chuồn",
  "Bulong Mắt",
  "Bulong Hàn",
  "Bulong Chữ T",
];

const MORE_CATEGORY_LIMIT = 32;

export type MoreCategoryItem = {
  id: string;
  name: string;
  href: string;
};

function createMoreCategoryItem(name: string): MoreCategoryItem {
  const parentCategory = HEADER_CATEGORIES.find((category) =>
    category.subcategories.includes(name),
  );

  return {
    id: toSlug(name),
    name,
    href: parentCategory
      ? `${generateCategoryUrl(parentCategory)}/${toSlug(name)}`
      : `/danh-muc/${toSlug(name)}`,
  };
}

const additionalCategoryNames = HEADER_CATEGORIES.flatMap(
  (category) => category.subcategories,
).filter(
  (name, index, names) =>
    !REQUESTED_MORE_CATEGORY_NAMES.includes(name) &&
    names.indexOf(name) === index,
);

export const HOME_MORE_CATEGORIES: MoreCategoryItem[] = [
  ...REQUESTED_MORE_CATEGORY_NAMES,
  ...additionalCategoryNames,
]
  .slice(0, MORE_CATEGORY_LIMIT)
  .map(createMoreCategoryItem);
