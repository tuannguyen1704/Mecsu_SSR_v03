"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type DateRangeValue = {
  from: Date | null;
  to: Date | null;
};

interface DateRangePickerProps {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  onApply?: (value: DateRangeValue) => void;
  placeholder?: string;
  className?: string;
}

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const MONTH_NAMES = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(left: Date | null, right: Date | null) {
  if (!left || !right) return false;
  return startOfDay(left).getTime() === startOfDay(right).getTime();
}

function isBefore(left: Date, right: Date) {
  return startOfDay(left).getTime() < startOfDay(right).getTime();
}

function isWithinRange(date: Date, range: DateRangeValue) {
  if (!range.from || !range.to) return false;
  const time = startOfDay(date).getTime();
  return (
    time > startOfDay(range.from).getTime() &&
    time < startOfDay(range.to).getTime()
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getInputLabel(value: DateRangeValue, placeholder: string) {
  if (!value.from) return placeholder;
  if (!value.to) return `${formatDate(value.from)} - ...`;
  return `${formatDate(value.from)} - ${formatDate(value.to)}`;
}

function getCalendarDays(visibleMonth: Date) {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - mondayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function createRange(from: Date, to: Date): DateRangeValue {
  if (isBefore(to, from)) {
    return { from: startOfDay(to), to: startOfDay(from) };
  }

  return { from: startOfDay(from), to: startOfDay(to) };
}

function getMonthRange(offset: number) {
  const today = startOfDay(new Date());
  const firstDay = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + offset + 1, 0);
  return { from: firstDay, to: lastDay };
}

export function DateRangePicker({
  value,
  onChange,
  onApply,
  placeholder = "Chọn khoảng ngày",
  className,
}: DateRangePickerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(
    () => value.from ?? startOfDay(new Date()),
  );
  const calendarDays = useMemo(
    () => getCalendarDays(visibleMonth),
    [visibleMonth],
  );
  const previewRange = useMemo(() => {
    if (value.from && !value.to && hoveredDate) {
      return createRange(value.from, hoveredDate);
    }

    return value;
  }, [hoveredDate, value]);

  const presets = useMemo(() => {
    const today = startOfDay(new Date());
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 6);
    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 29);

    return [
      { label: "Hôm nay", value: { from: today, to: today } },
      { label: "7 ngày qua", value: { from: last7Days, to: today } },
      { label: "30 ngày qua", value: { from: last30Days, to: today } },
      { label: "Tháng này", value: getMonthRange(0) },
      { label: "Tháng trước", value: getMonthRange(-1) },
    ];
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const handleDateClick = (date: Date) => {
    const selectedDate = startOfDay(date);

    if (!value.from || value.to) {
      onChange({ from: selectedDate, to: null });
      setVisibleMonth(selectedDate);
      return;
    }

    onChange(createRange(value.from, selectedDate));
  };

  const handlePresetClick = (range: DateRangeValue) => {
    onChange(range);
    if (range.from) {
      setVisibleMonth(range.from);
    }
  };

  const handleTodayClick = () => {
    const today = startOfDay(new Date());
    const range = { from: today, to: today };
    onChange(range);
    setVisibleMonth(today);
  };

  const handleClear = () => {
    onChange({ from: null, to: null });
    setHoveredDate(null);
  };

  const handleApply = () => {
    onApply?.(value);
    setIsOpen(false);
  };

  const handleToggleOpen = () => {
    if (!isOpen && value.from) {
      setVisibleMonth(value.from);
    }

    setIsOpen((open) => !open);
  };

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={handleToggleOpen}
        className="flex w-full items-center gap-3 rounded-xl border border-[#E5EAF2] bg-slate-50 px-4 py-2.5 text-left text-sm transition-all hover:border-[#C8D7EA] focus:border-[#3D82C4] focus:outline-none focus:ring-2 focus:ring-[#3D82C4]/20"
        aria-expanded={isOpen}
      >
        <Calendar size={16} className="shrink-0 text-slate-400" />
        <span
          className={cn(
            "min-w-0 flex-1 truncate",
            value.from ? "text-slate-800" : "text-slate-400",
          )}
        >
          {getInputLabel(value, placeholder)}
        </span>
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-full z-50 mt-2 w-[min(36rem,calc(100vw-2rem))] rounded-xl border border-[#DDE7F3] bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
          <div className="grid gap-4 md:grid-cols-[8.5rem_1fr]">
            <div className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handlePresetClick(preset.value)}
                  className="shrink-0 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-600 transition-colors hover:bg-[#F1F6FD] hover:text-[#163F78]"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5EAF2] text-slate-500 transition-colors hover:bg-slate-50 hover:text-[#163F78]"
                  aria-label="Tháng trước"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="text-sm font-bold text-slate-900">
                  {MONTH_NAMES[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
                </div>
                <button
                  type="button"
                  onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5EAF2] text-slate-500 transition-colors hover:bg-slate-50 hover:text-[#163F78]"
                  aria-label="Tháng sau"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {WEEKDAYS.map((weekday) => (
                  <div
                    key={weekday}
                    className="py-1 text-[11px] font-bold uppercase text-slate-400"
                  >
                    {weekday}
                  </div>
                ))}
                {calendarDays.map((date) => {
                  const isCurrentMonth =
                    date.getMonth() === visibleMonth.getMonth();
                  const isToday = isSameDay(date, new Date());
                  const isStart = isSameDay(date, value.from);
                  const isEnd = isSameDay(date, value.to);
                  const inRange = isWithinRange(date, previewRange);

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => handleDateClick(date)}
                      onMouseEnter={() => setHoveredDate(date)}
                      onMouseLeave={() => setHoveredDate(null)}
                      className={cn(
                        "flex h-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                        isCurrentMonth
                          ? "text-slate-700"
                          : "text-slate-300",
                        "hover:bg-[#EEF5FC] hover:text-[#163F78]",
                        inRange && "bg-[#EAF3FF] text-[#163F78]",
                        isToday && "ring-1 ring-[#BFD4ED]",
                        (isStart || isEnd) &&
                          "bg-[#163F78] text-white hover:bg-[#163F78] hover:text-white",
                      )}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#EEF2F7] pt-3">
            <div className="text-xs font-medium text-slate-500">
              {getInputLabel(value, placeholder)}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="rounded-lg px-3 py-2 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleTodayClick}
                className="rounded-lg px-3 py-2 text-xs font-bold text-[#163F78] transition-colors hover:bg-[#F1F6FD]"
              >
                Today
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="rounded-lg bg-[#163F78] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#1A4A8A]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
