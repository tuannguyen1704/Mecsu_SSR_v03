import type { Product } from "@/features/products/types/product";
import type { Category, CategorySubcategory } from "../../types/category";
import {
  getExploreMoreLinks,
  getSubcategoryFaqs,
  getSubcategoryIntroCopy,
  getTopSellerProducts,
} from "../../data/subcategory-content";
import { SubcategoryExploreMore } from "./SubcategoryExploreMore";
import { SubcategoryFaq } from "./SubcategoryFaq";
import { SubcategoryIntro } from "./SubcategoryIntro";
import { SubcategoryTopSellers } from "./SubcategoryTopSellers";

interface SubcategoryLowerSectionsProps {
  category: Category;
  subcategory: CategorySubcategory;
  products: Product[];
}

export function SubcategoryLowerSections({
  category,
  subcategory,
  products,
}: SubcategoryLowerSectionsProps) {
  const topSellers = getTopSellerProducts(products);
  const introParagraphs = getSubcategoryIntroCopy(category, subcategory);
  const faqItems = getSubcategoryFaqs(subcategory);
  const exploreLinks = getExploreMoreLinks(category, subcategory, products);

  return (
    <div className="mt-16 bg-white">
      <SubcategoryTopSellers
        subcategoryName={subcategory.name}
        products={topSellers}
      />
      <SubcategoryIntro
        title={`Giới thiệu về ${subcategory.name}`}
        paragraphs={introParagraphs}
      />
      <SubcategoryFaq items={faqItems} />
      <SubcategoryExploreMore links={exploreLinks} />
    </div>
  );
}
