import { PRODUCTS } from "@/features/products/data/products";
import { toSlug } from "@/lib/routing";
import type {
  BrandCatalog,
  BrandCatalogNode,
  BrandFilterGroup,
} from "../types";

const products3M = Array.from({ length: 93 }, (_, index) => {
  const source = PRODUCTS[index % PRODUCTS.length];
  const sequence = index + 1;

  return {
    ...source,
    id: `3m-${sequence}-${source.id}`,
    sku: `3M-${String(sequence).padStart(4, "0")}`,
    name: `3M ${source.name}`,
    slug: source.slug || toSlug(source.name),
    brand: "3M",
    tags: [...(source.tags || []), "brand-3m"],
  };
});

const brandFilter = (count: number): BrandFilterGroup => ({
  title: "Thương hiệu",
  values: [{ label: "3M", count }],
});

const usageFilters = (labels: string[]): BrandFilterGroup => ({
  title: "Sử dụng cho",
  values: labels.map((label) => ({ label, count: 1 })),
});

const finishingFilters: BrandFilterGroup[] = [
  {
    title: "Loại sản phẩm",
    values: [{ label: "Miếng Chà Nhám", count: 1 }],
  },
  { title: "Hạt mài", values: [{ label: "Oxit Nhôm", count: 1 }] },
  {
    title: "Phương thức sử dụng",
    values: [{ label: "Chà Thủ Công Bằng Tay", count: 1 }],
  },
];

function leafNode(
  slug: string,
  title: string,
  productCount: number,
  offset: number,
): BrandCatalogNode {
  return {
    slug,
    title,
    productCount,
    filters: [brandFilter(productCount)],
    products: products3M.slice(offset, offset + productCount),
  };
}

const giayNhamNode: BrandCatalogNode = {
  slug: "giay-nham",
  title: "Giấy Nhám 3M",
  description:
    "Giấy nhám 3M gồm các dòng giấy nhám nước, giấy nhám đĩa và miếng chà nhám dùng để xử lý, làm sạch và hoàn thiện bề mặt nhiều loại vật liệu.",
  productCount: 14,
  children: [
    leafNode("giay-nham-nuoc", "Giấy Nhám Nước 3M", 4, 1),
    leafNode("giay-nham-dia", "Giấy Nhám Đĩa 3M", 9, 5),
    leafNode("mieng-cha-nham", "Miếng Chà Nhám 3M", 1, 14),
  ],
  filters: [
    brandFilter(14),
    usageFilters([
      "Composite",
      "Đồng",
      "Gỗ",
      "Inox",
      "Nhôm",
      "Nhựa",
      "Sắt",
      "Titan",
    ]),
    ...finishingFilters,
  ],
  products: products3M.slice(1, 15),
};

const vatTuGiaCongNode: BrandCatalogNode = {
  slug: "vat-tu-gia-cong",
  title: "Vật Tư Gia Công 3M",
  description:
    "Khám phá các sản phẩm vật tư gia công 3M dùng cho cắt, mài, chà nhám, đánh bóng và hoàn thiện bề mặt trong sản xuất.",
  productCount: 19,
  children: [
    leafNode("da-cat", "Đá Cắt 3M", 1, 0),
    giayNhamNode,
    leafNode("mieng-danh-bong", "Miếng Đánh Bóng 3M", 3, 15),
    leafNode("dia-mai-hop-kim", "Đĩa Mài Hợp Kim 3M", 1, 18),
  ],
  filters: [
    brandFilter(19),
    usageFilters([
      "Cắt Sắt/Inox",
      "Composite",
      "Đồng",
      "Gỗ",
      "Inox",
      "Nhôm",
      "Nhựa",
      "Sắt",
      "Titan",
    ]),
    { title: "Đường kính ngoài", values: [{ label: "107 mm", count: 1 }] },
    { title: "Bề dày", values: [{ label: "1.2 mm", count: 1 }] },
    { title: "Đường kính trục", values: [{ label: "16 mm", count: 1 }] },
    ...finishingFilters,
    { title: "Độ hạt", values: [{ label: "60 Grit", count: 1 }] },
    {
      title: "Tốc độ tối đa",
      values: [{ label: "15300 vòng/phút", count: 1 }],
    },
    { title: "Xuất xứ", values: [{ label: "China", count: 1 }] },
  ],
  products: products3M.slice(0, 19),
};

const rootFilters: BrandFilterGroup[] = [
  brandFilter(93),
  usageFilters([
    "Cắt Sắt/Inox",
    "Composite",
    "Đồng",
    "Gỗ",
    "Inox",
    "Nhôm",
    "Nhựa",
    "Sắt",
    "Titan",
  ]),
  {
    title: "Loại sản phẩm",
    values: [
      { label: "Băng Keo Điện", count: 2 },
      { label: "Băng Keo Giấy", count: 1 },
      { label: "Miếng Chà Nhám", count: 1 },
    ],
  },
  {
    title: "Màu sắc",
    values: [
      { label: "Trắng Suốt", count: 1 },
      { label: "Đen", count: 2 },
      { label: "Trắng", count: 1 },
    ],
  },
  {
    title: "Bề rộng",
    values: [
      { label: "19 mm", count: 2 },
      { label: "24 mm", count: 1 },
    ],
  },
  { title: "Đường kính ngoài", values: [{ label: "107 mm", count: 1 }] },
  {
    title: "Dung tích / Trọng lượng",
    values: [{ label: "310 ml", count: 1 }],
  },
  {
    title: "Chiều dài",
    values: [
      { label: "6.7 m", count: 1 },
      { label: "20 m", count: 1 },
      { label: "27 m", count: 1 },
    ],
  },
  { title: "Bề dày", values: [{ label: "1.2 mm", count: 1 }] },
  { title: "Đường kính trục", values: [{ label: "16 mm", count: 1 }] },
  { title: "Độ hạt", values: [{ label: "60 Grit", count: 1 }] },
  { title: "Hạt mài", values: [{ label: "Oxit Nhôm", count: 1 }] },
  {
    title: "Tốc độ tối đa",
    values: [{ label: "15300 vòng/phút", count: 1 }],
  },
  {
    title: "Phương thức sử dụng",
    values: [{ label: "Chà Thủ Công Bằng Tay", count: 1 }],
  },
  { title: "Xuất xứ", searchable: true, values: [{ label: "China", count: 1 }] },
];

export const BRAND_CATALOGS: BrandCatalog[] = [
  {
    brand: {
      name: "3M",
      slug: "3m",
      productCount: 93,
      description:
        "3M là thương hiệu cung cấp các giải pháp vật tư công nghiệp, băng keo, keo dán, vật liệu mài, bảo hộ lao động và sản phẩm hỗ trợ sản xuất. Các sản phẩm 3M được sử dụng phổ biến trong cơ khí, điện, xây dựng, bảo trì và gia công.",
    },
    root: {
      slug: "",
      title: "3M",
      productCount: 93,
      children: [
        vatTuGiaCongNode,
        {
          ...leafNode("son-keo-boi-tron", "Sơn - Keo - Bôi Trơn 3M", 29, 19),
          description:
            "Các giải pháp sơn, keo dán và vật tư bôi trơn 3M phục vụ lắp ráp, sửa chữa và bảo trì công nghiệp.",
        },
        {
          ...leafNode("vat-tu-nha-xuong", "Vật Tư Nhà Xưởng 3M", 45, 48),
          description:
            "Danh mục vật tư nhà xưởng 3M hỗ trợ vệ sinh, an toàn, bảo trì và vận hành sản xuất.",
        },
      ],
      filters: rootFilters,
      products: products3M,
    },
  },
];
