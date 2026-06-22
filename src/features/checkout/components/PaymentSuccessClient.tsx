"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { formatCartPrice } from "@/features/cart/utils/cart-format";
import { loadLastOrder } from "../services/checkout-storage";
import type { CheckoutLastOrder, CheckoutPaymentMethod } from "../types/checkout";

const palette = {
  background: "#F7F8FA",
  border: "#E5E7EB",
  cardBg: "#FFFFFF",
  gold: "#F6C343",
  muted: "#6B7280",
  navy: "#173E75",
  softBlue: "#315E8A",
  text: "#111827",
};

const paymentLabels: Record<CheckoutPaymentMethod, string> = {
  bank: "Chuyển khoản ngân hàng",
  cod: "Thanh toán khi nhận hàng (COD)",
  quote: "Yêu cầu báo giá chính thức",
};

function formatDate(value?: string) {
  if (!value) {
    return new Date().toLocaleDateString("vi-VN");
  }

  return new Date(value).toLocaleDateString("vi-VN");
}

export function PaymentSuccessClient() {
  const [order, setOrder] = useState<CheckoutLastOrder | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const successIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setOrder(loadLastOrder());
      setHasLoaded(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const subtotal = useMemo(() => {
    if (!order) return 0;
    return order.total / 1.1;
  }, [order]);

  const vat = order ? order.total - subtotal : 0;

  useSuccessConfetti({
    canvasRef: confettiCanvasRef,
    enabled: Boolean(hasLoaded && order),
    originRef: successIconRef,
  });

  if (!hasLoaded) {
    return (
      <main className="flex min-h-[520px] items-center justify-center bg-[#F7F8FA]">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 rounded-full border-2 border-[#173E75] border-t-transparent" />
          <p className="text-sm text-[#6B7280]">Đang chuyển hướng...</p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="flex min-h-[520px] items-center justify-center bg-[#F7F8FA] px-4">
        <div className="max-w-md text-center">
          <SuccessIcon />
          <h1 className="mt-4 text-2xl font-bold text-[#111827]">Không tìm thấy thông tin đơn hàng</h1>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Dữ liệu đơn hàng tạm thời không còn trong trình duyệt.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-lg border px-6 py-3 font-semibold"
            style={{ borderColor: palette.navy, color: palette.navy }}
          >
            <ShoppingBag size={18} className="mr-2" />
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  const receiverText = [order.address.fullName, order.address.phone].filter(Boolean).join(" - ");
  const fullAddress = [
    order.address.address,
    order.address.ward,
    order.address.district,
    order.address.province,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="flex min-h-[calc(100dvh-112px)] flex-col items-center justify-center overflow-x-hidden bg-[#F7F8FA] px-4 py-3">
      <canvas
        ref={confettiCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] h-dvh w-dvw overflow-hidden"
      />
      <motion.div
        className="relative z-10 mx-auto w-full max-w-3xl space-y-2.5 overflow-visible py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <section className="flex flex-col items-center text-center">
          <SuccessIcon iconRef={successIconRef} />

          <motion.h1
            className="mt-3 mb-1.5 text-2xl font-bold text-[#111827] sm:text-3xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Đơn hàng đã được xác nhận
          </motion.h1>

          <motion.p
            className="mb-3 max-w-md text-sm leading-relaxed text-[#6B7280]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Cảm ơn bạn đã đặt hàng. Chúng tôi đã tiếp nhận đơn hàng và sẽ xử lý
            trong thời gian sớm nhất.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Link
              href={`/tai-khoan/don-hang/${order.orderCode}`}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition-opacity hover:opacity-90"
              style={{ background: palette.navy }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Mã đơn hàng
              </span>
              <span className="text-sm font-bold text-white underline decoration-white/70 underline-offset-2">
                {order.orderCode}
              </span>
            </Link>
          </motion.div>
        </section>

        <section className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          <InfoCard delay={0.5} title="Thông tin giao hàng">
            <InfoLine label="Người nhận" value={receiverText || "Chưa có thông tin"} />
            <InfoLine label="Số điện thoại" value={order.address.phone || "-"} />
            <InfoLine label="Địa chỉ giao hàng" value={fullAddress || "Chưa có địa chỉ giao hàng"} />
          </InfoCard>

          <InfoCard delay={0.6} title="Thanh toán">
            <InfoLine label="Phương thức thanh toán" value={paymentLabels[order.paymentMethod]} />
            <div>
              <span className="mb-0.5 block text-xs text-[#6B7280]">Trạng thái thanh toán</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Đã thanh toán
              </span>
            </div>
            <InfoLine label="Ngày đặt hàng" value={formatDate(order.createdAt)} />
          </InfoCard>
        </section>

        <motion.section
          className="rounded-[20px] border bg-white p-3.5"
          style={{ borderColor: palette.border }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <h2 className="mb-2 text-sm font-semibold text-[#173E75]">Tổng thanh toán</h2>
          <div className="mb-2 text-2xl font-bold text-[#173E75] sm:text-3xl">
            {formatCartPrice(order.total)}
          </div>
          <div className="space-y-1.5 border-t border-[#E5E7EB] pt-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Tạm tính</span>
              <span className="font-medium text-[#111827]">{formatCartPrice(Math.round(subtotal))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">VAT (10%)</span>
              <span className="font-medium text-[#111827]">{formatCartPrice(Math.round(vat))}</span>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="grid w-full grid-cols-2 gap-2 sm:flex sm:gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <Link
            href="/tai-khoan/don-hang"
            className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-[12px] font-semibold whitespace-nowrap text-white transition-all hover:brightness-110 sm:flex-none sm:gap-2 sm:px-6 sm:text-base"
            style={{ background: palette.navy }}
          >
            Theo dõi đơn hàng
            <ArrowRight size={16} className="shrink-0 sm:h-[18px] sm:w-[18px]" />
          </Link>

          <div className="flex min-w-0 sm:justify-end">
            <Link
              href="/"
              className="inline-flex w-full min-w-0 items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-[12px] font-semibold whitespace-nowrap transition-all hover:bg-slate-50 sm:w-auto sm:gap-2 sm:px-6 sm:text-base"
              style={{ borderColor: palette.navy, color: palette.navy }}
            >
              <ShoppingBag size={16} className="shrink-0 sm:h-[18px] sm:w-[18px]" />
              Tiếp tục mua sắm
            </Link>
          </div>
        </motion.section>

      </motion.div>
    </main>
  );
}

function SuccessIcon({ iconRef }: { iconRef?: RefObject<HTMLDivElement | null> }) {
  return (
    <motion.div
      ref={iconRef}
      className="relative flex select-none items-center justify-center"
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute h-28 w-28 rounded-full bg-[#315E8A]/15" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#173E75] shadow-[0_0_24px_rgba(49,94,138,0.2)]">
        <motion.svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.path
            d="M18 3.5C10.1 3.5 3.5 10.1 3.5 18C3.5 25.9 10.1 32.5 18 32.5C25.9 32.5 32.5 25.9 32.5 18C32.5 10.1 25.9 3.5 18 3.5Z"
            stroke="#F6C343"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
          <motion.path
            d="M11 18L16 23L25 14"
            stroke="#F6C343"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}

interface ConfettiParticle {
  age: number;
  color: string;
  delay: number;
  gravity: number;
  life: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

function useSuccessConfetti({
  canvasRef,
  enabled,
  originRef,
}: {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  originRef: RefObject<HTMLDivElement | null>;
}) {
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!enabled || hasRunRef.current) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      hasRunRef.current = true;
      return;
    }

    const canvas = canvasRef.current;
    const originElement = originRef.current;

    if (!canvas || !originElement) {
      return;
    }

    hasRunRef.current = true;

    let animationFrame = 0;
    let startTime = 0;
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const colors = ["#173E75", "#315E8A", "#A8C4E5", "#F6C343", "#FFFFFF"];

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const createBurstParticles = (originX: number, originY: number) => {
      return Array.from({ length: 116 }, (_, index): ConfettiParticle => {
        const angle = (Math.PI * 2 * index) / 116 + (Math.random() - 0.5) * 0.28;
        const speed = 3.2 + Math.random() * 5.4;

        return {
          age: 0,
          color: colors[index % colors.length],
          delay: 500,
          gravity: 0.07 + Math.random() * 0.04,
          life: 1150 + Math.random() * 700,
          rotation: Math.random() * 360,
          rotationSpeed: -7 + Math.random() * 14,
          size: 4 + Math.random() * 5,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.8,
          x: originX,
          y: originY,
        };
      });
    };

    const createFallParticles = () => {
      return Array.from({ length: 80 }, (_, index): ConfettiParticle => ({
        age: 0,
        color: colors[index % colors.length],
        delay: 850 + index * 17,
        gravity: 0.025 + Math.random() * 0.025,
        life: 1900 + Math.random() * 700,
        rotation: Math.random() * 360,
        rotationSpeed: -4 + Math.random() * 8,
        size: 3.5 + Math.random() * 4.5,
        vx: -0.45 + Math.random() * 0.9,
        vy: 0.9 + Math.random() * 1.9,
        x: Math.random() * window.innerWidth,
        y: -16 - Math.random() * 80,
      }));
    };

    resizeCanvas();

    const iconRect = originElement.getBoundingClientRect();
    const originX = iconRect.left + iconRect.width / 2;
    const originY = iconRect.top + iconRect.height / 2;
    const particles = [...createBurstParticles(originX, originY), ...createFallParticles()];

    const drawParticle = (particle: ConfettiParticle, alpha: number) => {
      context.save();
      context.globalAlpha = Math.max(0, Math.min(1, alpha));
      context.translate(particle.x, particle.y);
      context.rotate((particle.rotation * Math.PI) / 180);
      context.fillStyle = particle.color;
      context.fillRect(-particle.size / 2, -particle.size / 2, particle.size * 0.72, particle.size * 1.35);
      context.restore();
    };

    const tick = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle) => {
        if (elapsed < particle.delay || particle.age > particle.life) {
          return;
        }

        particle.age += 16.67;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += particle.gravity;
        particle.rotation += particle.rotationSpeed;

        const progress = particle.age / particle.life;
        const alpha = progress < 0.72 ? 1 : 1 - (progress - 0.72) / 0.28;
        drawParticle(particle, alpha);
      });

      if (elapsed < 3200) {
        animationFrame = window.requestAnimationFrame(tick);
      } else {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const startTimer = window.setTimeout(() => {
      animationFrame = window.requestAnimationFrame(tick);
    }, 0);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.clearTimeout(startTimer);
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, [canvasRef, enabled, originRef]);
}

function InfoCard({
  children,
  delay,
  title,
}: {
  children: ReactNode;
  delay: number;
  title: string;
}) {
  return (
    <motion.div
      className="rounded-[20px] border bg-white p-3.5"
      style={{ borderColor: palette.border }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <h2 className="mb-1.5 text-sm font-semibold text-[#173E75]">{title}</h2>
      <div className="space-y-1.5 text-sm">{children}</div>
    </motion.div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="mb-0.5 block text-xs text-[#6B7280]">{label}</span>
      <span className="font-medium leading-snug text-[#111827]">{value}</span>
    </div>
  );
}
