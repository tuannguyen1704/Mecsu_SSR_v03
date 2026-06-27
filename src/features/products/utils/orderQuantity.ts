import type { Product } from "../types/product";

export function getMinOrderQuantity(product: Product) {
  return Math.max(1, Math.floor(product.minOrderQuantity ?? 1));
}

export function getOrderStep(product: Product) {
  return Math.max(
    1,
    Math.floor(product.orderStep ?? product.minOrderQuantity ?? 1),
  );
}

export function getLowQuantityFee(product: Product) {
  return Math.max(0, Math.floor(product.lowQuantityFee ?? 0));
}

export function normalizeOrderQuantity(
  inputQty: number,
  minOrderQuantity: number,
  orderStep: number,
) {
  if (!Number.isFinite(inputQty) || inputQty <= 0) {
    return minOrderQuantity;
  }

  if (inputQty <= minOrderQuantity) {
    return minOrderQuantity;
  }

  const stepsAboveMin = Math.ceil((inputQty - minOrderQuantity) / orderStep);
  return minOrderQuantity + stepsAboveMin * orderStep;
}

export function getQuantityValidationMessage({
  inputQty,
  adjustedQuantity,
  minOrderQuantity,
  orderStep,
  unit,
}: {
  inputQty: number;
  adjustedQuantity: number;
  minOrderQuantity: number;
  orderStep: number;
  unit?: string;
}) {
  const displayUnit = unit?.trim() || "cái";

  if (!Number.isFinite(inputQty) || inputQty < minOrderQuantity) {
    return `Sản phẩm này cần đặt tối thiểu ${minOrderQuantity.toLocaleString("vi-VN")} ${displayUnit} và tăng theo bội số ${orderStep.toLocaleString("vi-VN")} ${displayUnit}. Số lượng đã được tự động điều chỉnh.`;
  }

  if (adjustedQuantity !== inputQty) {
    return `Sản phẩm này chỉ được đặt theo bội số của ${orderStep.toLocaleString("vi-VN")} ${displayUnit}. Số lượng đã được điều chỉnh về ${adjustedQuantity.toLocaleString("vi-VN")} ${displayUnit}.`;
  }

  return "";
}

export function getInitialOrderQuantity(product: Product) {
  return getMinOrderQuantity(product);
}
