"use client";

import { useEffect, useState } from "react";
import {
  CATEGORY_MENU_OPEN_EVENT,
  PROMOTION_PANEL_OPEN_EVENT,
} from "../events";
import { PromotionDropPanel } from "./PromotionDropPanel";
import { PromotionTrigger } from "./PromotionTrigger";

interface PromotionDropControllerProps {
  children: React.ReactNode;
}

export function PromotionDropController({
  children,
}: PromotionDropControllerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    const handleCategoryOpen = () => setOpen(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(CATEGORY_MENU_OPEN_EVENT, handleCategoryOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(CATEGORY_MENU_OPEN_EVENT, handleCategoryOpen);
    };
  }, [open]);

  const toggleOpen = () => {
    if (!open) {
      window.dispatchEvent(new Event(PROMOTION_PANEL_OPEN_EVENT));
    }

    setOpen((current) => !current);
  };

  return (
    <>
      <section className="border-b border-slate-100 bg-white pt-[14px] pb-0">
        <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8">
          <div className="mb-4">
            <PromotionTrigger open={open} onClick={toggleOpen} />
          </div>

          <div
            id="uu-dai-mua-hang"
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-6"
          >
            {children}
          </div>
        </div>
      </section>

      <PromotionDropPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
