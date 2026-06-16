import type { Product } from "@/features/products/types/product";
import type { Category, CategorySubcategory } from "../types/category";
import { getCategorySubcategories } from "../services/category-service";
import { getProductHref } from "@/features/products/services/product-service";

export interface SubcategoryFaqItem {
  question: string;
  answer: string;
}

export interface ExploreMoreLink {
  label: string;
  href: string;
}

export function getSubcategoryIntroCopy(
  category: Category,
  subcategory: CategorySubcategory,
) {
  return [
    `${subcategory.name} là nhóm vật tư quan trọng trong danh mục ${category.name}, thường được sử dụng cho hoạt động lắp đặt, bảo trì, sửa chữa và vận hành tại nhà máy, công trình hoặc xưởng sản xuất. Khi chọn ${subcategory.name}, người mua nên cân nhắc vật liệu, kích thước, tải trọng, tiêu chuẩn kỹ thuật và môi trường sử dụng để đảm bảo độ ổn định trong quá trình vận hành.`,
    `Tại Mecsu, các sản phẩm ${subcategory.name} được sắp xếp theo thông tin thương hiệu, SKU, tình trạng tồn kho và giá bán để đội mua hàng có thể so sánh nhanh. Danh sách hiện tại dùng dữ liệu mock trong giai đoạn migration, nhưng vẫn giữ cấu trúc hiển thị cũ nhằm chuẩn bị cho việc kết nối API và dữ liệu kỹ thuật thật ở các phase sau.`,
  ];
}

export function getSubcategoryFaqs(subcategory: CategorySubcategory): SubcategoryFaqItem[] {
  const name = subcategory.name;

  return [
    {
      question: `${name} là gì?`,
      answer: `${name} là nhóm sản phẩm dùng trong các ứng dụng công nghiệp, thi công hoặc bảo trì, hỗ trợ liên kết, cố định, nâng hạ hoặc hoàn thiện hệ thống tùy theo đặc tính của từng sản phẩm.`,
    },
    {
      question: `Có những loại ${name} nào phổ biến?`,
      answer: `Các loại ${name} phổ biến thường được phân theo vật liệu, kích thước, tải trọng, kiểu kết nối, thương hiệu và tiêu chuẩn sản xuất. Khi mua hàng, nên đối chiếu thông số kỹ thuật với bản vẽ hoặc yêu cầu thực tế.`,
    },
    {
      question: `Nên chọn ${name} theo tiêu chuẩn nào?`,
      answer: `Bạn nên ưu tiên các tiêu chuẩn thông dụng như DIN, ISO, JIS hoặc tiêu chuẩn riêng của nhà sản xuất nếu hệ thống hiện hữu đã quy định rõ. Việc chọn đúng tiêu chuẩn giúp đồng bộ kích thước và hiệu năng sử dụng.`,
    },
    {
      question: `Làm sao để chọn đúng kích thước ${name}?`,
      answer: `Hãy kiểm tra đường kính, chiều dài, tải trọng, vật liệu, môi trường lắp đặt và yêu cầu chống ăn mòn. Với ứng dụng quan trọng, nên so sánh datasheet hoặc hỏi kỹ thuật trước khi đặt hàng số lượng lớn.`,
    },
    {
      question: `${name} có tiêu chuẩn nào phổ biến?`,
      answer: `Tùy nhóm sản phẩm, ${name} có thể đi theo tiêu chuẩn DIN, ISO, ASTM, JIS hoặc các tiêu chuẩn công nghiệp tương đương. Mecsu sẽ bổ sung dữ liệu tiêu chuẩn chi tiết khi backend sản phẩm thật được tích hợp.`,
    },
  ];
}

export function getExploreMoreLinks(
  category: Category,
  subcategory: CategorySubcategory,
  products: Product[],
): ExploreMoreLink[] {
  const siblingLinks = getCategorySubcategories(category)
    .filter((item) => item.slug !== subcategory.slug)
    .slice(0, 8)
    .map((item) => ({
      label: item.name,
      href: item.href,
    }));

  const productLinks = products.slice(0, 8).map((product) => ({
    label: product.name,
    href: getProductHref(product),
  }));

  const uniqueLinks = new Map<string, ExploreMoreLink>();

  [...productLinks, ...siblingLinks].forEach((link) => {
    const key = `${link.href}|${link.label}`;

    if (!uniqueLinks.has(key)) {
      uniqueLinks.set(key, link);
    }
  });

  return Array.from(uniqueLinks.values()).slice(0, 16);
}

export function getTopSellerProducts(products: Product[]) {
  return [...products]
    .sort((first, second) => {
      const firstScore = (first.rating || 4) * 100 + Math.max(first.stock, 0);
      const secondScore = (second.rating || 4) * 100 + Math.max(second.stock, 0);

      return secondScore - firstScore;
    })
    .slice(0, 5);
}
