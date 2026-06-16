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

export type MoreCategoryItem = {
  id: string;
  name: string;
  href: string;
};

export const HOME_MORE_CATEGORIES: MoreCategoryItem[] =
  REQUESTED_MORE_CATEGORY_NAMES.map((name) => {
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
  });
