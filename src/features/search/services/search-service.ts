import { PRODUCTS } from "@/features/products/data/products";
import {
  searchProducts,
  sortBySearchRelevance,
} from "@/features/products/services/search-products";

export function getSearchResults(query: string) {
  return sortBySearchRelevance(searchProducts(PRODUCTS, query), query);
}
