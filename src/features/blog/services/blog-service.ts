import {
  blogArticles,
  blogCategories,
  featuredBlogArticle,
} from "../data/blog-articles";
import type {
  BlogArticle,
  BlogCategory,
  BlogContentBlock,
  BlogTocItem,
} from "../types/blog";

export interface BlogListingData {
  articles: BlogArticle[];
  categories: BlogCategory[];
  featuredArticle: BlogArticle;
}

export interface BlogDetailData {
  article: BlogArticle;
}

const blogAdapter = {
  async listArticles(): Promise<BlogArticle[]> {
    return blogArticles;
  },
  async listCategories(): Promise<BlogCategory[]> {
    return blogCategories;
  },
  async getFeaturedArticle(): Promise<BlogArticle> {
    return featuredBlogArticle;
  },
  async getArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
    return getBlogArticleBySlug(slug);
  },
  async getStaticParams(): Promise<{ slug: string }[]> {
    return getBlogStaticParams();
  },
};

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCategoryContext(article: BlogArticle) {
  switch (article.category) {
    case "Buying Guides":
      return {
        audience: "đội mua hàng, bảo trì và vận hành",
        checklist: [
          "Xác định môi trường sử dụng, tải trọng và tần suất thay thế.",
          "Chuẩn hóa mã sản phẩm, tiêu chuẩn kỹ thuật và đơn vị tính trước khi báo giá.",
          "So sánh tổng chi phí sở hữu thay vì chỉ nhìn giá mua ban đầu.",
        ],
        steps: [
          "Thu thập yêu cầu kỹ thuật từ bộ phận sử dụng.",
          "Đối chiếu thông số với catalogue hoặc tiêu chuẩn đang áp dụng.",
          "Chốt nhà cung cấp, thời gian giao hàng và chứng từ cần kèm theo.",
        ],
      };
    case "Technical Guides":
      return {
        audience: "kỹ sư, QA và đội bảo trì",
        checklist: [
          "Kiểm tra tiêu chuẩn DIN, ISO, JIS hoặc thông số nhà sản xuất.",
          "Đối chiếu vật liệu, cấp bền, dung sai và điều kiện làm việc.",
          "Lưu lại thông số thay thế để giảm sai sót ở lần mua tiếp theo.",
        ],
        steps: [
          "Xác định thông số chính ảnh hưởng trực tiếp đến an toàn vận hành.",
          "So sánh với yêu cầu thiết kế hoặc bản vẽ kỹ thuật.",
          "Kiểm tra mẫu thực tế trước khi triển khai số lượng lớn.",
        ],
      };
    case "Industry News":
      return {
        audience: "nhà quản lý mua hàng và vận hành",
        checklist: [
          "Theo dõi biến động nguồn cung và năng lực giao hàng của nhà cung cấp.",
          "Đánh giá tác động của công nghệ mới lên quy trình mua vật tư.",
          "Chuẩn bị dữ liệu tồn kho để ra quyết định nhanh hơn.",
        ],
        steps: [
          "Nhận diện xu hướng có ảnh hưởng trực tiếp đến chi phí hoặc lead time.",
          "Thử nghiệm thay đổi ở một nhóm vật tư nhỏ trước.",
          "Đo hiệu quả và mở rộng khi quy trình ổn định.",
        ],
      };
    case "Product Comparisons":
      return {
        audience: "đội kỹ thuật và mua hàng cần ra quyết định nhanh",
        checklist: [
          "So sánh theo môi trường sử dụng, tuổi thọ và chi phí thay thế.",
          "Kiểm tra khả năng tương thích với thiết bị hoặc tiêu chuẩn hiện có.",
          "Ưu tiên lựa chọn có dữ liệu kỹ thuật rõ ràng và nguồn cung ổn định.",
        ],
        steps: [
          "Liệt kê tiêu chí bắt buộc và tiêu chí có thể linh hoạt.",
          "Chấm điểm từng lựa chọn theo cùng một bộ tiêu chí.",
          "Chọn phương án tối ưu theo tổng chi phí và rủi ro vận hành.",
        ],
      };
    case "Warehouse Insights":
    default:
      return {
        audience: "đội kho, mua hàng và bảo trì",
        checklist: [
          "Phân nhóm vật tư theo mức độ quan trọng và tần suất sử dụng.",
          "Thiết lập tồn tối thiểu cho các linh kiện ảnh hưởng đến dừng máy.",
          "Cập nhật dữ liệu xuất nhập kho để tránh mua trùng hoặc thiếu hàng.",
        ],
        steps: [
          "Rà soát dữ liệu tồn kho và lịch sử tiêu hao.",
          "Xác định nhóm vật tư cần bổ sung định kỳ.",
          "Thiết lập cảnh báo hoặc quy trình đặt hàng lặp lại.",
        ],
      };
  }
}

export function getAllBlogArticles() {
  return blogArticles;
}

export function getBlogArticleBySlug(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

export function getBlogStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export function getBlogArticleContent(article: BlogArticle): BlogContentBlock[] {
  const context = getCategoryContext(article);
  const overviewId = slugifyHeading("Tổng quan vấn đề");
  const criteriaId = slugifyHeading("Các tiêu chí cần chú ý");
  const processId = slugifyHeading("Quy trình áp dụng");
  const takeawayId = slugifyHeading("Kết luận cho doanh nghiệp");

  return [
    { type: "h2", id: overviewId, text: "Tổng quan vấn đề" },
    {
      type: "paragraph",
      text: `${article.excerpt} Đây là chủ đề quan trọng với ${context.audience}, đặc biệt khi doanh nghiệp cần cân bằng giữa tốc độ mua hàng, độ chính xác kỹ thuật và khả năng kiểm soát chi phí.`,
    },
    {
      type: "paragraph",
      text: "Trong thực tế, một quyết định mua vật tư tốt không chỉ dựa vào giá. Doanh nghiệp cần hiểu rõ điều kiện sử dụng, dữ liệu kỹ thuật, khả năng thay thế và tác động của lead time đến vận hành.",
    },
    { type: "quote", text: "Một thông số được xác nhận sớm có thể tiết kiệm nhiều vòng trao đổi báo giá và giảm đáng kể rủi ro mua sai vật tư." },
    { type: "h2", id: criteriaId, text: "Các tiêu chí cần chú ý" },
    { type: "paragraph", text: "Trước khi chốt sản phẩm hoặc phương án mua hàng, hãy rà soát các yếu tố dưới đây để đảm bảo lựa chọn phù hợp với nhu cầu sử dụng thực tế." },
    { type: "bulletList", items: context.checklist },
    { type: "h3", text: "Dữ liệu nên chuẩn hóa" },
    {
      type: "paragraph",
      text: "Các trường như mã sản phẩm, tiêu chuẩn, vật liệu, kích thước, đơn vị tính và yêu cầu chứng từ nên được lưu ở cùng một nguồn dữ liệu. Điều này giúp những lần mua sau nhanh hơn và dễ kiểm soát hơn.",
    },
    { type: "h2", id: processId, text: "Quy trình áp dụng" },
    { type: "numberedList", items: context.steps },
    {
      type: "paragraph",
      text: "Khi quy trình đã rõ, đội mua hàng có thể giảm thời gian xác minh, đội kỹ thuật dễ kiểm tra tương thích, còn đội kho nắm được kế hoạch bổ sung vật tư chính xác hơn.",
    },
    { type: "h2", id: takeawayId, text: "Kết luận cho doanh nghiệp" },
    {
      type: "paragraph",
      text: `${article.title} không chỉ là một câu chuyện kỹ thuật đơn lẻ. Đây là một phần trong cách doanh nghiệp xây dựng năng lực mua hàng công nghiệp nhanh, đúng và có thể lặp lại.`,
    },
    {
      type: "paragraph",
      text: "Mecsu tiếp tục phát triển Resource Hub như một nguồn tham khảo thực tế, giúp đội mua hàng và kỹ thuật có thêm dữ liệu để ra quyết định tự tin hơn.",
    },
  ];
}

export function getBlogTocItems(article: BlogArticle): BlogTocItem[] {
  return getBlogArticleContent(article).reduce<BlogTocItem[]>((items, block) => {
    if (block.type !== "h2") {
      return items;
    }

    items.push({ id: block.id || slugifyHeading(block.text), title: block.text });
    return items;
  }, []);
}

export function getRelatedBlogArticles(article: BlogArticle, limit = 3) {
  const sameCategory = blogArticles.filter(
    (candidate) => candidate.id !== article.id && candidate.category === article.category,
  );
  const fallback = blogArticles.filter(
    (candidate) => candidate.id !== article.id && candidate.category !== article.category,
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}

export async function listBlogArticles(): Promise<BlogArticle[]> {
  return blogAdapter.listArticles();
}

export async function listBlogCategories(): Promise<BlogCategory[]> {
  return blogAdapter.listCategories();
}

export async function getFeaturedBlogArticle(): Promise<BlogArticle> {
  return blogAdapter.getFeaturedArticle();
}

export async function getBlogArticle(
  slug: string,
): Promise<BlogArticle | undefined> {
  return blogAdapter.getArticleBySlug(slug);
}

export async function getBlogRouteParams(): Promise<{ slug: string }[]> {
  return blogAdapter.getStaticParams();
}

export async function getBlogListingData(): Promise<BlogListingData> {
  const [articles, categories, featuredArticle] = await Promise.all([
    listBlogArticles(),
    listBlogCategories(),
    getFeaturedBlogArticle(),
  ]);

  return {
    articles,
    categories,
    featuredArticle,
  };
}

export async function getBlogDetailData(
  slug: string,
): Promise<BlogDetailData | undefined> {
  const article = await getBlogArticle(slug);

  if (!article) {
    return undefined;
  }

  return { article };
}

