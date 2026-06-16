"use client";

import { useEffect, useState } from "react";

interface CartQuantityControlProps {
  quantity: number;
  stock: number;
  onChange: (quantity: number) => void;
}

export function CartQuantityControl({
  quantity,
  stock,
  onChange,
}: CartQuantityControlProps) {
  const maxQuantity = Math.max(1, stock);
  const [draftQuantity, setDraftQuantity] = useState(String(quantity));

  useEffect(() => {
    setDraftQuantity(String(quantity));
  }, [quantity]);

  const clampQuantity = (value: number) => {
    if (Number.isNaN(value) || value < 1) return 1;
    return Math.min(maxQuantity, value);
  };

  const commitQuantity = (nextValue: string) => {
    const normalized = nextValue.trim();
    const nextQuantity = clampQuantity(Number.parseInt(normalized, 10));
    setDraftQuantity(String(nextQuantity));
    onChange(nextQuantity);
  };

  return (
    <div className="flex items-center overflow-hidden rounded-md border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => {
          const nextQuantity = clampQuantity(quantity - 1);
          setDraftQuantity(String(nextQuantity));
          onChange(nextQuantity);
        }}
        className="flex h-8 w-8 items-center justify-center border-r border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
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
        className="h-8 w-12 border-r border-slate-200 bg-slate-50/50 px-0 text-center text-[13px] font-semibold tabular-nums text-[#111111] outline-none"
        aria-label="Số lượng"
      />
      <button
        type="button"
        onClick={() => {
          const nextQuantity = clampQuantity(quantity + 1);
          setDraftQuantity(String(nextQuantity));
          onChange(nextQuantity);
        }}
        className="flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        aria-label="Tăng số lượng"
      >
        +
      </button>
    </div>
  );
}
