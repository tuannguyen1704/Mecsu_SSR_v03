"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Filter, Minus, Plus, Search, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface FilterItem {
  id: string;
  label: string;
  count?: number;
}

interface ProductFilterSidebarProps {
  brandFilters: FilterItem[];
  selectedBrands: string[];
  onBrandToggle: (brand: string) => void;
  selectedAvailability: string[];
  onAvailabilityToggle: (value: string) => void;
  variant?: "desktop" | "mobile";
}

const MATERIAL_FILTERS: FilterItem[] = [
  { id: "steel", label: "Thép", count: 1200 },
  { id: "inox304", label: "Inox 304", count: 850 },
  { id: "inox316", label: "Inox 316", count: 320 },
  { id: "carbon-steel", label: "Thép Carbon", count: 450 },
  { id: "aluminum", label: "Nhôm", count: 120 },
  { id: "brass", label: "Đồng", count: 85 },
];

const ORIGIN_FILTERS: FilterItem[] = [
  { id: "vn", label: "Việt Nam", count: 420 },
  { id: "jp", label: "Nhật Bản", count: 280 },
  { id: "kr", label: "Hàn Quốc", count: 160 },
  { id: "cn", label: "Trung Quốc", count: 980 },
  { id: "de", label: "Đức", count: 90 },
  { id: "us", label: "Mỹ", count: 74 },
];

const AVAILABILITY_FILTERS: FilterItem[] = [
  { id: "in_stock", label: "Sẵn hàng tại kho" },
  { id: "express", label: "Giao hàng nhanh 2H" },
  { id: "preorder", label: "Đặt hàng (7-14 ngày)" },
];

export function ProductFilterSidebar({
  brandFilters,
  selectedBrands,
  onBrandToggle,
  selectedAvailability,
  onAvailabilityToggle,
  variant = "desktop",
}: ProductFilterSidebarProps) {
  const isMobile = variant === "mobile";

  return (
    <aside
      className={
        isMobile ? "w-full min-w-0" : "h-full w-[300px] shrink-0"
      }
    >
      <div
        className={
          isMobile
            ? "w-full min-w-0 bg-[#f5f5f5]"
            : "flex h-[calc(100vh-8px)] flex-col overflow-hidden border-r border-slate-200 bg-[#f5f5f5] lg:sticky lg:top-2"
        }
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[#1a1a1a]" />
            <span className="text-[15px] font-black tracking-tighter text-[#1a1a1a] uppercase">
              Bộ lọc nâng cao
            </span>
          </div>
        </div>

        <div
          className={
            isMobile
              ? "w-full min-w-0 pb-4"
              : "custom-scrollbar flex-1 overflow-y-auto pb-12"
          }
        >
          <div className="bg-white">
            <FilterGroup
              title="Sẵn có & Giao hàng"
              items={AVAILABILITY_FILTERS}
              selectedItems={selectedAvailability}
              onToggle={onAvailabilityToggle}
            />
            <FilterGroup
              title="Thương hiệu"
              items={brandFilters}
              selectedItems={selectedBrands}
              onToggle={onBrandToggle}
            />
            <FilterGroup
              title="Vật liệu"
              items={MATERIAL_FILTERS}
              selectedItems={[]}
              onToggle={() => undefined}
            />
            <FilterGroup
              title="Xuất xứ"
              items={ORIGIN_FILTERS}
              selectedItems={[]}
              onToggle={() => undefined}
              searchable
            />

            <div className="border-b border-slate-200 px-5 py-6">
              <h4 className="mb-4 text-[15px] font-black tracking-wider text-[#1a1a1a] uppercase">
                Khoảng giá (VND)
              </h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full rounded-none border border-slate-300 bg-[#f8f8f8] p-2.5 text-sm font-bold outline-none transition-colors focus:border-blue-600"
                />
                <span className="font-bold text-slate-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full rounded-none border border-slate-300 bg-[#f8f8f8] p-2.5 text-sm font-bold outline-none transition-colors focus:border-blue-600"
                />
              </div>
              <button className="mt-4 w-full bg-[#1a1a1a] py-3 text-sm font-black tracking-[0.2em] text-white uppercase transition-all hover:bg-black active:scale-[0.98]">
                Áp dụng giá
              </button>
            </div>

            <div className="border-b border-slate-200 px-5 py-6">
              <h4 className="mb-4 text-[15px] font-black tracking-wider text-[#1a1a1a] uppercase">
                Đánh giá khách hàng
              </h4>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    className="group flex w-full items-center gap-3 py-1.5 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={14}
                          className={
                            index < rating
                              ? "fill-[#ed6c2d] text-[#ed6c2d]"
                              : "text-slate-200"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[14px] font-bold text-slate-500 transition-colors group-hover:text-[#1a1a1a]">
                      {rating === 5 ? "Tất cả 5 sao" : `Từ ${rating} sao trở lên`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#f5f5f5] px-5 py-6">
              <div className="border border-dashed border-slate-200 bg-white p-4 text-center">
                <p className="text-[11px] leading-relaxed font-bold tracking-widest text-slate-400 uppercase">
                  Đang xem 25,482 sản phẩm
                  <br />
                  trong danh mục này
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function FilterGroup({
  title,
  items,
  selectedItems,
  onToggle,
  searchable = false,
  maxInitialItems = 6,
}: {
  title: string;
  items: FilterItem[];
  selectedItems: string[];
  onToggle: (id: string) => void;
  searchable?: boolean;
  maxInitialItems?: number;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const filteredItems = useMemo(() => {
    if (!searchable || !searchQuery) return items;

    return items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [items, searchable, searchQuery]);
  const displayItems = isExpanded
    ? filteredItems
    : filteredItems.slice(0, maxInitialItems);

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="group flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-slate-100"
      >
        <span className="text-[15px] font-black tracking-wider text-[#1a1a1a] uppercase">
          {title}
        </span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform group-hover:text-slate-600 ${
            isOpen ? "" : "-rotate-180"
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white"
          >
            <div className="space-y-2 px-5 pt-1 pb-5">
              {searchable ? (
                <div className="relative mb-3">
                  <input
                    type="text"
                    placeholder={`Tìm ${title}...`}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full rounded-none border border-slate-300 bg-[#f8f8f8] py-2 pr-3 pl-8 text-sm font-medium outline-none transition-all placeholder:italic focus:border-blue-600"
                  />
                  <Search size={12} className="absolute top-3 left-2.5 text-slate-400" />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute top-2.5 right-2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={12} />
                    </button>
                  ) : null}
                </div>
              ) : null}

              <div
                className={`space-y-1.5 ${
                  filteredItems.length > 8 ? "custom-scrollbar max-h-[240px] overflow-y-auto pr-2" : ""
                }`}
              >
                {displayItems.map((item) => (
                  <label key={item.id} className="group flex cursor-pointer items-start py-0.5">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => onToggle(item.id)}
                      className="mt-0.5 h-4 w-4 cursor-pointer appearance-none rounded-none border border-slate-300 transition-all checked:border-[#1a1a1a] checked:bg-[#1a1a1a]"
                    />
                    <div className="ml-3 flex min-w-0 flex-1 items-start justify-between gap-2">
                      <span
                        className={`min-w-0 break-words text-[14px] leading-tight transition-colors ${
                          selectedItems.includes(item.id)
                            ? "font-black text-[#1a1a1a]"
                            : "font-bold text-slate-600 group-hover:text-slate-900"
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.count !== undefined ? (
                        <span className="shrink-0 text-[12px] font-bold tracking-tighter text-slate-400 tabular-nums">
                          ({item.count.toLocaleString("vi-VN")})
                        </span>
                      ) : null}
                    </div>
                  </label>
                ))}
              </div>

              {filteredItems.length > maxInitialItems ? (
                <button
                  type="button"
                  onClick={() => setIsExpanded((expanded) => !expanded)}
                  className="mt-3 flex w-full items-center border-t border-slate-100 pt-2 text-[11px] font-black tracking-widest text-blue-600 uppercase hover:text-blue-800"
                >
                  {isExpanded ? (
                    <>
                      <Minus size={10} className="mr-2" /> Thu gọn
                    </>
                  ) : (
                    <>
                      <Plus size={10} className="mr-2" /> Xem thêm (
                      {filteredItems.length - maxInitialItems})
                    </>
                  )}
                </button>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
