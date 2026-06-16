export type HomeBlogPreviewItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  slug: string;
};

export const HOME_BLOG_PREVIEW_ITEMS: HomeBlogPreviewItem[] = [
  {
    id: "huong-dan-may-khoan",
    category: "HƯỚNG DẪN",
    title: "Hướng dẫn lựa chọn máy khoan phù hợp cho xưởng cơ khí",
    description:
      "Những tiêu chí quan trọng giúp doanh nghiệp lựa chọn thiết bị phù hợp với nhu cầu vận hành.",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80",
    slug: "so-sanh-may-khoan-pin-va-may-khoan-dien",
  },
  {
    id: "ai-cung-ung-cong-nghiep",
    category: "XU HƯỚNG",
    title: "AI đang thay đổi ngành cung ứng công nghiệp như thế nào?",
    description:
      "Các doanh nghiệp đang ứng dụng AI để tối ưu quản lý kho và vận hành sản xuất.",
    image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800&q=80",
    slug: "ai-thay-doi-nganh-cung-ung-cong-nghiep",
  },
  {
    id: "bao-quan-dung-cu",
    category: "MẸO KỸ THUẬT",
    title: "Cách bảo quản dụng cụ công nghiệp bền hơn",
    description:
      "Những phương pháp giúp tăng tuổi thọ thiết bị và giảm chi phí bảo trì.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22531d30f7?auto=format&fit=crop&w=800&q=80",
    slug: "cach-bao-quan-dung-cu-cong-nghiep-ben-hon",
  },
  {
    id: "may-khoan-pin-dien",
    category: "TƯ VẤN MUA HÀNG",
    title: "So sánh máy khoan pin và máy khoan điện cho doanh nghiệp",
    description: "Đâu là lựa chọn phù hợp cho môi trường sản xuất hiện đại?",
    image:
      "https://images.unsplash.com/photo-1503698711475-43038fc7164b?auto=format&fit=crop&w=800&q=80",
    slug: "so-sanh-may-khoan-pin-va-may-khoan-dien",
  },
];

