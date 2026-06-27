"use client";

import { useEffect, useState } from "react";
import {
  getQuantityValidationMessage,
  normalizeOrderQuantity,
} from "@/features/products/utils/orderQuantity";

interface CartQuantityControlProps {
  quantity: number;
  stock: number;
  minOrderQuantity?: number;
  orderStep?: number;
  unit?: string;
  onChange: (quantity: number) => void;
}

export function CartQuantityControl({
  quantity,
  minOrderQuantity = 1,
  orderStep = minOrderQuantity,
  unit = "cái",
  onChange,
}: CartQuantityControlProps) {
  const minQuantity = Math.max(1, Math.floor(minOrderQuantity));
  const stepQuantity = Math.max(1, Math.floor(orderStep || minQuantity));
  const [draftQuantity, setDraftQuantity] = useState(String(quantity));
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDraftQuantity(String(quantity));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [quantity]);

  useEffect(() => {
    if (!validationMessage) return;

    const timeoutId = window.setTimeout(() => setValidationMessage(""), 2500);

    return () => window.clearTimeout(timeoutId);
  }, [validationMessage]);

  const commitQuantity = (nextValue: string) => {
    const normalized = nextValue.trim();
    const parsedQuantity = Number.parseInt(normalized, 10);
    const nextQuantity = normalizeOrderQuantity(
      parsedQuantity,
      minQuantity,
      stepQuantity,
    );
    const message = getQuantityValidationMessage({
      inputQty: parsedQuantity,
      adjustedQuantity: nextQuantity,
      minOrderQuantity: minQuantity,
      orderStep: stepQuantity,
      unit,
    });

    setDraftQuantity(String(nextQuantity));
    onChange(nextQuantity);

    if (message) {
      setValidationMessage(message);
    }
  };

  return (
    <div className="flex w-fit shrink-0 items-center self-start overflow-hidden rounded-md border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => {
          const nextQuantity = Math.max(minQuantity, quantity - stepQuantity);
          setDraftQuantity(String(nextQuantity));
          onChange(nextQuantity);
        }}
        disabled={quantity <= minQuantity}
        className="flex h-8 w-8 shrink-0 items-center justify-center border-r border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        aria-label="Giảm số lượng"
      >
        -
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={draftQuantity}
        onChange={(event) => {
          const digitsOnly = event.target.value.replace(/\D/g, "");
          setDraftQuantity(digitsOnly);
        }}
        onBlur={() => commitQuantity(draftQuantity)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
        className="h-8 w-10 shrink-0 border-r border-slate-200 bg-slate-50/50 px-0 text-center text-[13px] font-semibold tabular-nums text-[#111111] outline-none sm:w-12"
        aria-label="Số lượng"
      />
      <button
        type="button"
        onClick={() => {
          const nextQuantity = quantity + stepQuantity;
          setDraftQuantity(String(nextQuantity));
          onChange(nextQuantity);
        }}
        className="flex h-8 w-8 shrink-0 items-center justify-center text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        aria-label="Tăng số lượng"
      >
        +
      </button>
      {validationMessage ? (
        <div className="fixed inset-x-4 top-[96px] z-[99999] mx-auto max-w-sm rounded-sm border border-amber-200 bg-white px-5 py-4 text-center shadow-2xl">
          <div className="text-sm font-bold text-slate-950">
            Số lượng chưa hợp lệ
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {validationMessage}
          </p>
          <button
            type="button"
            onClick={() => setValidationMessage("")}
            className="mt-3 text-sm font-semibold text-[#163F78] hover:underline"
          >
            Đóng
          </button>
        </div>
      ) : null}
    </div>
  );
}
