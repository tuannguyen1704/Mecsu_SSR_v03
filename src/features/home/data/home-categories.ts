import { HEADER_CATEGORIES } from "@/features/categories/data/header-categories";

export type HomeCategoryTab = {
  id: string;
  label: string;
  categoryIds: string[];
};

export const HOME_CATEGORIES = HEADER_CATEGORIES;

export const HOME_FEATURED_CATEGORY_IDS = ["1", "3", "5", "7", "10"];

export const HOME_CATEGORY_TABS: HomeCategoryTab[] = [
  {
    id: "all",
    label: "Theo ngành hàng",
    categoryIds: HOME_CATEGORIES.map((category) => category.id),
  },
  {
    id: "fasteners",
    label: "Liên Kết Cơ Khí",
    categoryIds: ["1"],
  },
  {
    id: "clamps-pipes",
    label: "Kẹp & Siết Ống",
    categoryIds: ["2", "3"],
  },
  {
    id: "machining-tools",
    label: "Dụng Cụ Gia Công",
    categoryIds: ["5", "6", "8", "11"],
  },
  {
    id: "pneumatic-connections",
    label: "Kết Nối Khí Nén",
    categoryIds: ["7"],
  },
  {
    id: "electrical-accessories",
    label: "Phụ Kiện Điện",
    categoryIds: ["10"],
  },
];
