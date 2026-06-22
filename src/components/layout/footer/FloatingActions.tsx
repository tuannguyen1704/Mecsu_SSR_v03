"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronsUp, Headphones, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function ZaloIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0068FF">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 16.25c-.021.327-.327.567-.655.567h-1.474c-.327 0-.572-.24-.572-.568v-1.965c0-.104-.063-.198-.146-.25l-.354-.188c-.25-.104-.354-.271-.25-.5l.271-.594c.021-.063.063-.104.104-.146l.333-.25c.313-.271.688-.583.938-.938.042-.083.083-.146.083-.25v-.042c0-.292-.25-.542-.563-.542-.083 0-.146.021-.23.042-.49.146-.896.292-1.407.354-.5.063-.876.292-1.093.771-.25.542-.521 1.084-.771 1.646-.25.521-.563.771-1.093.771-.083 0-.188-.021-.27-.042a.49.49 0 01-.292-.396c-.021-.146-.063-.271-.063-.396 0-.146 0-.271.021-.417 0-.188.021-.375.042-.563 0-.104.021-.188.021-.292.021-.167.083-.292.25-.333.604-.167 1.187-.417 1.729-.729.021-.021.042-.021.063-.021.073-.021.135-.01.188.021l.25.125c.229.104.333.271.229.5-.042.104-.083.188-.125.271-.146.25-.292.48-.459.709-.229.25-.48.459-.75.667a2.8 2.8 0 01-.854.479c-.063.021-.125.063-.167.104-.021.021-.042.042-.042.063v.104c0 .021-.021.042-.021.063l-.083.104c-.021.021-.042.042-.042.063v.188c0 .021.021.042.021.063v.021c.125.167.292.25.5.25h.063c.063-.021.125-.042.188-.063.146-.042.271-.083.396-.146.479-.208.938-.479 1.407-.771.063-.042.146-.063.229-.063.417 0 .771.375.771.813v.063c0 .021.021.042.021.063v.021c0 .354-.063.667-.167.959a3.9 3.9 0 01-.479.875 7.5 7.5 0 01-.729.833 9 9 0 01-.875.771c-.354.292-.75.563-1.187.792-.667.333-1.375.604-2.104.813-.021 0-.063.021-.083.042-.438.125-.875.229-1.333.292-.375.042-.75.083-1.125.083-.146 0-.292 0-.438-.021-.188-.021-.375-.063-.563-.125-.021 0-.042 0-.063-.021-.083-.021-.146-.021-.188-.021-.167-.042-.313-.188-.313-.375 0-.042.021-.083.021-.125v-.083c0-.104.083-.188.188-.188h.021l.125.042c.438.104.896.167 1.375.167.563 0 1.125-.063 1.688-.188.75-.167 1.479-.396 2.187-.688.167-.063.333-.146.5-.229.229-.104.396-.146.625-.042l.021.021c.25.146.521.292.792.396.167.063.313.146.48.208.125.042.271.063.417.084.438.042.854-.063 1.25-.333.167-.104.313-.25.459-.396l.125-.125c.083-.104.146-.146.25-.125h.042c.125.021.25.042.375.042h.354c.188 0 .354-.083.479-.188.104-.104.188-.25.188-.417v-.583z" />
    </svg>
  );
}

function ContactMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const handleChat = () => {
    window.location.href = "/dich-vu-khach-hang";
    setOpen(false);
  };

  const handleZalo = () => {
    window.open("https://zalo.me", "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#D32F2F] p-0 text-sm font-bold text-white shadow-xl hover:bg-[#B71C1C] sm:h-auto sm:w-auto sm:rounded-2xl sm:px-5 sm:py-2.5"
        ref={buttonRef}
      >
        <span className="hidden tracking-tight sm:inline">Liên hệ</span>
        <Headphones size={18} className="text-white" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 bottom-full z-[1001] mb-3 w-[min(272px,calc(100vw-24px))] rounded-xl bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:rounded-[20px] sm:p-4"
            ref={menuRef}
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={handleChat}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                  <MessageCircle size={18} className="text-brand-primary" />
                </div>
                <span className="text-sm font-semibold text-[#1F2937]">
                  Chat với nhân viên
                </span>
              </button>
              <button
                onClick={handleZalo}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0068FF]/10">
                  <ZaloIcon />
                </div>
                <span className="text-sm font-semibold text-[#1F2937]">
                  Liên hệ Zalo
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-3 bottom-3 z-[1000] flex flex-col items-end gap-2 sm:right-6 sm:bottom-6 sm:gap-3">
      <ContactMenu />
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="group flex h-11 w-11 items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-brand-secondary p-0 text-white shadow-xl sm:h-auto sm:w-auto sm:rounded-2xl sm:px-5 sm:py-2.5"
          >
            <span className="hidden text-sm font-bold tracking-tight sm:inline">
              Lên đầu
            </span>
            <ChevronsUp
              size={20}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
