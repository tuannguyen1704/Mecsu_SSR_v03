export type StockAlertStatus = "waiting" | "available" | "cancelled";

export type StockAlert = {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  imageUrl: string;
  requestedQuantity: number;
  customerName: string;
  phone: string;
  email?: string;
  note?: string;
  status: StockAlertStatus;
  createdAt: string;
  availableAt?: string;
};

export type StockAlertStatusFilter = "all" | StockAlertStatus;

export type StockAlertSortOption = "newest" | "oldest" | "quantity-desc";
