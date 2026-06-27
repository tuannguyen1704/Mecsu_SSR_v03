import type {
  AccountActivity,
  AccountMetric,
  AccountNavigationSection,
  AccountUser,
} from "../types/account";

export const mockAccountUser: AccountUser = {
  name: "Nguyễn Văn A",
  email: "customer@mecsu.vn",
  phone: "0900 000 000",
  role: "Khách hàng doanh nghiệp",
};

export const accountNavigationSections: AccountNavigationSection[] = [
  {
    id: "purchases",
    label: "Mua hàng",
    items: [
      { id: "overview", label: "Tổng quan", href: "/tai-khoan", icon: "overview" },
      { id: "orders", label: "Đơn hàng", href: "/tai-khoan/don-hang", icon: "orders" },
      { id: "wishlist", label: "Danh sách yêu thích", href: "/tai-khoan/danh-sach", icon: "wishlist" },
      { id: "stock-alerts", label: "Nhắc hàng", href: "/tai-khoan/nhac-hang", icon: "stockAlerts" },
    ],
  },
  {
    id: "account",
    label: "Tài khoản",
    items: [
      { id: "addresses", label: "Địa chỉ giao hàng", href: "/tai-khoan/dia-chi", icon: "addresses" },
      { id: "payment", label: "Phương thức thanh toán", href: "/tai-khoan/phuong-thuc-thanh-toan", icon: "payment" },
      { id: "user", label: "Thông tin tài khoản", href: "/tai-khoan/thong-tin-ca-nhan", icon: "user" },
    ],
  },
  {
    id: "support",
    label: "Hỗ trợ",
    items: [
      { id: "support", label: "Hỗ trợ khách hàng", href: "/tai-khoan/ho-tro", icon: "support" },
      { id: "feedback", label: "Góp ý & Đánh giá", href: "/tai-khoan/gop-y", icon: "feedback" },
    ],
  },
];

export const accountMetrics: AccountMetric[] = [
  { id: "orders", label: "Tổng đơn hàng", value: "48", icon: "orders", tone: "navy" },
  { id: "wishlist", label: "Sản phẩm yêu thích", value: "12", icon: "wishlist", tone: "red" },
  { id: "returns", label: "Đơn đổi trả", value: "02", icon: "returns", tone: "yellow" },
];

export const recentOrders: AccountActivity[] = [
  {
    id: "ORD-2026-000128",
    title: "Đơn hàng ORD-2026-000128",
    description: "Bulong Inox, Phe Gài và 4 sản phẩm khác",
    date: "12/06/2026",
    status: "Đang xử lý",
    amount: "8.610.000 đ",
    href: "/tai-khoan/don-hang/ORD-2026-000128",
  },
  {
    id: "ORD-2026-000117",
    title: "Đơn hàng ORD-2026-000117",
    description: "Ren Cấy Inox M6 và vật tư lắp ghép",
    date: "08/06/2026",
    status: "Đang giao",
    amount: "3.240.000 đ",
    href: "/tai-khoan/don-hang/ORD-2026-000117",
  },
  {
    id: "ORD-2026-000096",
    title: "Đơn hàng ORD-2026-000096",
    description: "Thiết bị bảo hộ công trường",
    date: "31/05/2026",
    status: "Hoàn tất",
    amount: "12.450.000 đ",
    href: "/tai-khoan/don-hang/ORD-2026-000096",
  },
];

