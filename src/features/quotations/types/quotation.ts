export type QuotationStatus =
  | "pending"
  | "processing"
  | "sent"
  | "accepted"
  | "expired"
  | "completed"
  | "cancelled";

export type ProductUnit = "cái" | "bộ" | "hộp" | "mét" | "kg" | "bịch";

export type Priority = "normal" | "urgent" | "critical";

export interface QuotationRequestItem {
  id: string;
  productName: string;
  productCode: string;
  quantity: number;
  unit: ProductUnit;
  notes?: string;
}

export interface QuotationItem {
  id: string;
  image: string;
  name: string;
  sku: string;
  quantity: number;
  unit: ProductUnit;
  unitPrice: number;
  discount: number;
  vat: number;
  lineTotal: number;
  notes?: string;
}

export interface Quotation {
  id: string;
  code: string;
  status: QuotationStatus;
  requestDate: string;
  quotationDate: string;
  expiryDate: string;
  productCount: number;
  supplierCount: number;
  subtotal: number;
  discountTotal: number;
  vatTotal: number;
  shippingFee: number;
  total: number;
  estimatedValue: number;
  items: QuotationItem[];
  salesRep: {
    name: string;
    role: string;
    avatar?: string;
    phone?: string;
    email?: string;
  };
  requestName: string;
  priority: Priority;
  generalNotes?: string;
  attachmentNames?: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface CreateQuotationInput {
  requestName: string;
  desiredDeadline?: string;
  priority: Priority;
  items: QuotationRequestItem[];
  generalNotes?: string;
  attachmentNames?: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
}

export const quotationStatusConfig: Record<
  QuotationStatus,
  { label: string; shortLabel: string; bg: string; color: string; dot: string }
> = {
  pending: {
    label: "Đang xử lý",
    shortLabel: "Chờ xử lý",
    bg: "bg-[#FFF7D6]",
    color: "text-[#9A6A00]",
    dot: "bg-[#F4B400]",
  },
  processing: {
    label: "Chờ phản hồi",
    shortLabel: "Đang báo giá",
    bg: "bg-[#E8F1FB]",
    color: "text-[#163F78]",
    dot: "bg-[#3678BA]",
  },
  sent: {
    label: "Đã gửi",
    shortLabel: "Đã báo giá",
    bg: "bg-[#E0F2FE]",
    color: "text-[#0369A1]",
    dot: "bg-[#0284C7]",
  },
  accepted: {
    label: "Đã chấp nhận",
    shortLabel: "Đã chấp nhận",
    bg: "bg-[#ECFDF5]",
    color: "text-[#166534]",
    dot: "bg-[#16A34A]",
  },
  completed: {
    label: "Hoàn tất",
    shortLabel: "Hoàn tất",
    bg: "bg-[#DCFCE7]",
    color: "text-[#166534]",
    dot: "bg-[#22C55E]",
  },
  expired: {
    label: "Hết hạn",
    shortLabel: "Hết hạn",
    bg: "bg-[#FEF2F2]",
    color: "text-[#991B1B]",
    dot: "bg-[#EF4444]",
  },
  cancelled: {
    label: "Đã hủy",
    shortLabel: "Đã hủy",
    bg: "bg-[#F1F5F9]",
    color: "text-[#475569]",
    dot: "bg-[#94A3B8]",
  },
};

export const quotationTimelineSteps = [
  { id: 0, label: "Đã gửi yêu cầu" },
  { id: 1, label: "Đang xử lý" },
  { id: 2, label: "Chờ khách phản hồi" },
  { id: 3, label: "Hoàn tất" },
] as const;

export const quotationStatusTimelineIndex: Record<QuotationStatus, number> = {
  pending: 1,
  processing: 1,
  sent: 2,
  accepted: 3,
  completed: 3,
  expired: 3,
  cancelled: -1,
};
