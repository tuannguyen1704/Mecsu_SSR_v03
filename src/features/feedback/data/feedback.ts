import type { FeedbackStatus, FeedbackTypeOption, RecentFeedbackItem } from "../types/feedback";

export const feedbackTypeOptions: FeedbackTypeOption[] = [
  { value: "shopping_experience", label: "Trải nghiệm mua hàng" },
  { value: "product_quality", label: "Chất lượng sản phẩm" },
  { value: "delivery", label: "Giao hàng" },
  { value: "payment", label: "Thanh toán" },
  { value: "account", label: "Tài khoản" },
  { value: "other", label: "Khác" },
];

export const feedbackCategoryCards = [
  {
    title: "Trải nghiệm mua hàng",
    description: "Góp ý về tìm kiếm sản phẩm, đặt hàng, giỏ hàng và quy trình mua sắm.",
  },
  {
    title: "Dịch vụ vận hành",
    description: "Chia sẻ về giao hàng, thanh toán, đổi trả và chất lượng hỗ trợ sau bán.",
  },
  {
    title: "Tài khoản & tiện ích",
    description: "Đề xuất cải thiện tài khoản, wishlist, báo giá và các công cụ dành cho doanh nghiệp.",
  },
];

export const recentFeedbackItems: RecentFeedbackItem[] = [
  {
    id: "FB-2026-0018",
    subject: "Cần bộ lọc sản phẩm chi tiết hơn",
    type: "Trải nghiệm mua hàng",
    date: "12/06/2026",
    status: "reviewing",
  },
  {
    id: "FB-2026-0014",
    subject: "Thông tin thời gian giao hàng rõ ràng hơn",
    type: "Giao hàng",
    date: "08/06/2026",
    status: "responded",
  },
  {
    id: "FB-2026-0009",
    subject: "Bổ sung thêm phương thức thanh toán",
    type: "Thanh toán",
    date: "02/06/2026",
    status: "recorded",
  },
  {
    id: "FB-2026-0006",
    subject: "Cải thiện phần quản lý báo giá",
    type: "Tài khoản",
    date: "29/05/2026",
    status: "reviewing",
  },
];

export const feedbackStatusLabels: Record<FeedbackStatus, string> = {
  recorded: "Đã ghi nhận",
  reviewing: "Đang xem xét",
  responded: "Đã phản hồi",
};

export const feedbackStatusClasses: Record<FeedbackStatus, string> = {
  recorded: "bg-[#EEF6FF] text-[#163F78] border-[#CFE0F6]",
  reviewing: "bg-[#FFF7DD] text-[#8A6400] border-[#F3D77A]",
  responded: "bg-emerald-50 text-emerald-700 border-emerald-200",
};
