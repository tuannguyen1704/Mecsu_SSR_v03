export type ReturnRequestStatus =
  | "pending"
  | "inspecting"
  | "refunded"
  | "rejected"
  | "completed";

export interface ReturnRequest {
  id: string;
  returnCode: string;
  orderCode: string;
  createdDate: string;
  status: ReturnRequestStatus;
  itemCount: number;
  refundAmount: number;
  reason: string;
}
