import { HEADER_CATEGORIES } from "@/features/categories/data/header-categories";
import { generateCategoryUrl, toSlug } from "@/lib/routing";

export interface HomeExploreMoreLink {
  id: string;
  label: string;
  href: string;
}

export const HOME_EXPLORE_MORE_LINKS: HomeExploreMoreLink[] = HEADER_CATEGORIES.flatMap(
  (category) =>
    category.subcategories.map((subcategory, subIndex) => {
      const subcategorySlug = toSlug(subcategory);

      return {
        id: `${category.id}-${subIndex}-${subcategorySlug}`,
        label: subcategory,
        href: `${generateCategoryUrl(category)}/${subcategorySlug}`,
      };
    }),
);
