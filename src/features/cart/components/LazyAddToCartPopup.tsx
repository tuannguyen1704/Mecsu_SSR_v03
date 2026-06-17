"use client";

import dynamic from "next/dynamic";

const AddToCartPopup = dynamic(
  () => import("./AddToCartPopup").then((module) => module.AddToCartPopup),
  { ssr: false },
);

export function LazyAddToCartPopup() {
  return <AddToCartPopup />;
}
