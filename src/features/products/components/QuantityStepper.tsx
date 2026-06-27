"use client";

import { useEffect, useState } from "react";
import {
  getQuantityValidationMessage,
  normalizeOrderQuantity,
} from "../utils/orderQuantity";

type QuantityStepperProps = {
  value: number;
  minOrderQuantity?: number;
  orderStep?: number;
  unit?: string;
  onChange: (value: number) => void;
  className?: string;
};

export function QuantityStepper({
  value,
  minOrderQuantity = 1,
  orderStep = minOrderQuantity,
  unit = "cái",
  onChange,
  className = "",
}: QuantityStepperProps) {
  const minQuantity = Math.max(1, Math.floor(minOrderQuantity));
  const stepQuantity = Math.max(1, Math.floor(orderStep || minQuantity));
  const [draftValue, setDraftValue] = useState(String(value));
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDraftValue(String(value));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [value]);

  useEffect(() => {
    if (!validationMessage) return;

    const timeoutId = window.setTimeout(() => {
      setValidationMessage("");
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [validationMessage]);

  const commitQuantity = (nextValue: string) => {
    const parsedQuantity = Number.parseInt(nextValue, 10);
    const adjustedQuantity = normalizeOrderQuantity(
      parsedQuantity,
      minQuantity,
      stepQuantity,
    );
    const message = getQuantityValidationMessage({
      inputQty: parsedQuantity,
      adjustedQuantity,
      minOrderQuantity: minQuantity,
      orderStep: stepQuantity,
      unit,
    });

    setDraftValue(String(adjustedQuantity));
    onChange(adjustedQuantity);

    if (message) {
      setValidationMessage(message);
    }
  };

  const decreaseQuantity = () => {
    const nextQuantity = Math.max(minQuantity, value - stepQuantity);
    setDraftValue(String(nextQuantity));
    onChange(nextQuantity);
  };

  const increaseQuantity = () => {
    const nextQuantity = value + stepQuantity;
    setDraftValue(String(nextQuantity));
    onChange(nextQuantity);
  };

  return (
    <>
      <div
        className={`grid grid-cols-[38px_1fr_38px] overflow-hidden rounded-sm border border-slate-300 bg-white ${className}`}
      >
        <button
          type="button"
          onClick={decreaseQuantity}
          disabled={value <= minQuantity}
          className="flex h-9 items-center justify-center border-r border-slate-300 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-white"
          aria-label="Giảm số lượng"
        >
          -
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={draftValue}
          onChange={(event) => {
            const nextValue = event.target.value;

            if (nextValue === "") {
              setDraftValue("");
              return;
            }

            if (!/^\d+$/.test(nextValue)) return;

            setDraftValue(nextValue);
          }}
          onBlur={() => commitQuantity(draftValue)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              commitQuantity(draftValue);
              event.currentTarget.blur();
            }
          }}
          className="h-9 min-w-0 border-0 bg-white px-2 text-center text-sm font-bold text-slate-900 outline-none"
          aria-label="Số lượng"
        />
        <button
          type="button"
          onClick={increaseQuantity}
          className="flex h-9 items-center justify-center border-l border-slate-300 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
          aria-label="Tăng số lượng"
        >
          +
        </button>
      </div>

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
    </>
  );
}
