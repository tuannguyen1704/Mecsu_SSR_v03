import type { UserProfile } from "../types/account";

export const mockUserProfile: UserProfile = {
  id: "usr-001",
  personal: {
    fullName: "Nguyễn Văn Minh",
    email: "minhnv@mecsu.vn",
    phone: "0909123456",
    gender: "male",
    birthDate: "1990-05-15",
  },
  business: {
    company: "Công Ty TNHH Mecsu Việt Nam",
    taxCode: "0123456789",
    companyAddress: "123 Đường Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh",
    companyRepresentative: "Nguyễn Văn Minh",
    customerGroup: "Khách hàng VIP",
    currentDiscount: "5%",
  },
  security: {
    emailConfirmed: true,
    customerGroup: "Khách hàng VIP",
    createdAt: "2026-01-15",
    lastSignInAt: "2026-06-15T10:30:00",
  },
};

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatGender(gender: string): string {
  switch (gender) {
    case "male":
      return "Nam";
    case "female":
      return "Nữ";
    case "other":
      return "Khác";
    default:
      return "Chưa cập nhật";
  }
}

export function emptyValue(value?: string): string {
  return value?.trim() || "Chưa cập nhật";
}
