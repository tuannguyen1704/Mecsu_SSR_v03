import type {
  QuickSupportChannel,
  FaqItem,
  PolicyItem,
  FaqCategory,
} from "../types/support";

export const heroSupportTags = ["Báo giá", "Đơn hàng", "Vận chuyển", "Chính sách"];

export const quickSupportChannels: QuickSupportChannel[] = [
  {
    id: "hotline",
    title: "Gọi hotline",
    description: "Hỗ trợ nhanh trong giờ hành chính",
    buttonLabel: "Gọi ngay",
    iconKey: "phone",
    href: "tel:19009489",
  },
  {
    id: "zalo",
    title: "Zalo hỗ trợ",
    description: "Trao đổi nhanh với nhân viên MECSU",
    buttonLabel: "Mở Zalo",
    iconKey: "message-circle",
    href: "https://zalo.me",
  },
  {
    id: "ticket",
    title: "Gửi yêu cầu",
    description: "Tạo ticket để theo dõi tiến độ xử lý",
    buttonLabel: "Tạo yêu cầu",
    iconKey: "ticket",
  },
  {
    id: "email",
    title: "Email hỗ trợ",
    description: "Gửi thông tin chi tiết để được phản hồi",
    buttonLabel: "Gửi email",
    iconKey: "mail",
    href: "mailto:support@mecsu.vn",
  },
];

export const faqCategories: { id: FaqCategory; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "quotation", label: "Báo giá" },
  { id: "orders", label: "Đơn hàng" },
  { id: "payment", label: "Thanh toán" },
  { id: "shipping", label: "Vận chuyển" },
  { id: "warranty", label: "Bảo hành" },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-quotation-request",
    category: "quotation",
    question: "Làm sao để yêu cầu báo giá?",
    answer:
      "Bạn có thể gửi yêu cầu báo giá trực tiếp từ trang sản phẩm, trung tâm báo giá hoặc form hỗ trợ bên phải. Hãy bổ sung mã sản phẩm, số lượng và thời gian cần hàng để MECSU phản hồi nhanh hơn.",
  },
  {
    id: "faq-order-tracking",
    category: "orders",
    question: "Tôi có thể theo dõi trạng thái đơn hàng ở đâu?",
    answer:
      "Bạn có thể theo dõi tại mục Đơn hàng trong tài khoản hoặc nhập mã đơn hàng ở khối Theo dõi yêu cầu bên dưới. Với các đơn đang vận chuyển, trạng thái sẽ được cập nhật theo từng mốc xử lý.",
  },
  {
    id: "faq-payment-methods",
    category: "payment",
    question: "MECSU hỗ trợ những hình thức thanh toán nào?",
    answer:
      "MECSU hỗ trợ chuyển khoản doanh nghiệp, thanh toán theo công nợ đã duyệt và một số phương thức thanh toán linh hoạt theo loại đơn hàng. Bộ phận chăm sóc khách hàng sẽ xác nhận phương án phù hợp sau khi tiếp nhận yêu cầu.",
  },
  {
    id: "faq-shipping-time",
    category: "shipping",
    question: "Thời gian giao hàng dự kiến là bao lâu?",
    answer:
      "Thời gian giao hàng phụ thuộc vào tồn kho, địa điểm nhận hàng và phương án vận chuyển. Với các đơn nội thành hoặc hàng có sẵn, MECSU sẽ ưu tiên xử lý sớm và thông báo ETA cụ thể cho bạn.",
  },
  {
    id: "faq-vat-invoice",
    category: "orders",
    question: "Tôi cần xuất hóa đơn VAT thì làm thế nào?",
    answer:
      "Bạn chỉ cần cung cấp thông tin doanh nghiệp, mã số thuế và email nhận hóa đơn trong quá trình đặt hàng hoặc qua form hỗ trợ. Đội ngũ MECSU sẽ xác nhận và gửi hóa đơn theo đúng quy trình.",
  },
  {
    id: "faq-warranty-process",
    category: "warranty",
    question: "Khi cần bảo hành sản phẩm tôi cần chuẩn bị gì?",
    answer:
      "Bạn nên chuẩn bị mã đơn hàng, hình ảnh/video lỗi nếu có và mô tả ngắn về tình trạng sử dụng. Điều này giúp đội ngũ kỹ thuật phân loại nhanh và đề xuất phương án xử lý phù hợp.",
  },
];

export const policyItems: PolicyItem[] = [
  {
    id: "return-policy",
    title: "Chính sách đổi trả",
    description:
      "Xem điều kiện, thời gian và quy trình đổi trả dành cho khách hàng doanh nghiệp.",
    href: "#",
    iconKey: "shield-check",
  },
  {
    id: "warranty-policy",
    title: "Chính sách bảo hành",
    description:
      "Tổng hợp phạm vi bảo hành, hồ sơ cần chuẩn bị và thời gian xử lý dự kiến.",
    href: "#",
    iconKey: "check-circle-2",
  },
  {
    id: "shipping-policy",
    title: "Chính sách vận chuyển",
    description:
      "Thông tin về giao hàng, thời gian dự kiến và các hỗ trợ cho từng khu vực nhận hàng.",
    href: "#",
    iconKey: "truck",
  },
];
