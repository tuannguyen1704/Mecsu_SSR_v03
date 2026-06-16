"use client";

import type { ElementType } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Package,
  PhoneCall,
  Quote,
  Star,
} from "lucide-react";
import {
  aboutCoreValues,
  aboutIndustries,
  aboutOperationalMetrics,
  aboutPartners,
  aboutStats,
  aboutTestimonials,
  aboutTimeline,
  aboutWhyMecsuStory,
} from "../data/about-data";

const warehouseImage =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop";
const operationsImage =
  "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop";
const manufacturingImage =
  "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=2069&auto=format&fit=crop";
const erpImage =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop";

function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
      <Link href="/" className="transition-colors hover:text-[#163F78]">
        Trang chủ
      </Link>
      <ChevronRight size={14} className="text-slate-400" />
      <span className="font-semibold text-slate-900">Giới thiệu Mecsu</span>
    </nav>
  );
}

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        let startTimestamp = 0;
        const duration = 2000;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(ease * end));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function FloatingStatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-white/20 bg-white/15 px-5 py-4 text-white backdrop-blur-md"
    >
      <div className="mb-1 text-2xl font-bold">{value}</div>
      <div className="text-sm text-white/80">{label}</div>
    </motion.div>
  );
}

function TestimonialCard({
  name,
  company,
  role,
  content,
  rating,
}: {
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md"
    >
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={16}
            className={
              index < rating
                ? "fill-amber-400 text-amber-400"
                : "text-slate-200"
            }
          />
        ))}
      </div>
      <Quote size={24} className="mb-3 text-[#163F78]/20" />
      <p className="mb-5 text-[14px] leading-relaxed text-slate-600">
        {content}
      </p>
      <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-500">
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-[13px] font-semibold text-slate-800">{name}</div>
          <div className="text-[11px] text-slate-500">
            {role} - {company}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function PartnerLogo({ name }: { name: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex h-16 items-center justify-center rounded-lg bg-slate-100 px-6 py-4 grayscale transition-all duration-300 hover:grayscale-0"
    >
      <span className="text-sm font-semibold text-slate-400 hover:text-slate-700">
        {name}
      </span>
    </motion.div>
  );
}

function IndustryCard({
  icon: Icon,
  title,
  description,
}: {
  icon: ElementType;
  title: string;
  description: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group rounded-xl border border-slate-100 bg-white p-5 transition-all duration-200 hover:border-[#163F78]/30 hover:shadow-md"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 transition-colors group-hover:bg-[#163F78]/10">
        <Icon
          size={24}
          className="text-slate-600 transition-colors group-hover:text-[#163F78]"
        />
      </div>
      <h3 className="mb-2 font-bold text-slate-800">{title}</h3>
      <p className="text-[13px] leading-relaxed text-slate-500">
        {description}
      </p>
    </motion.article>
  );
}

export function AboutUsPageClient() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1280px] px-4 pt-5 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>

      <section className="relative flex min-h-[65vh] items-center overflow-hidden lg:min-h-[75vh]">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={warehouseImage}
            alt="Industrial Warehouse"
            className="h-full w-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#163F78]/95 to-[#1a4a8a]/85" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-16">
            <div className="max-w-2xl flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-5 text-3xl leading-tight font-bold tracking-tight text-white md:text-[42px] lg:text-[48px]"
              >
                Nền tảng vật tư công nghiệp dành cho doanh nghiệp sản xuất
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8 text-base leading-relaxed text-white/90 md:text-lg"
              >
                Từ linh kiện lắp ráp, vật tư nhà xưởng đến thiết bị công nghiệp
                - Mecsu giúp doanh nghiệp tìm kiếm và mua hàng nhanh chóng,
                minh bạch và đáng tin cậy.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFC928] px-6 py-3 font-bold text-[#163F78] transition-colors hover:bg-[#e6b525]"
                >
                  <Package size={18} />
                  Khám phá sản phẩm
                </Link>
                <Link
                  href="/dich-vu-khach-hang"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <PhoneCall size={18} />
                  Liên hệ Mecsu
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden shrink-0 flex-col gap-4 lg:flex"
            >
              <FloatingStatCard value="30,000+" label="Mã sản phẩm" />
              <FloatingStatCard value="300+" label="Đối tác thương hiệu" />
              <FloatingStatCard value="2h" label="Giao hàng nhanh" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-14 lg:py-18">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
            {aboutStats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="rounded-xl bg-white p-5 text-center shadow-sm transition-all duration-200 hover:shadow-md lg:p-6"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-[#163F78]" />
                <div className="mb-1 text-2xl font-bold text-[#163F78] lg:text-3xl">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
            <div className="flex-1">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
                Mecsu là gì?
              </h2>
              <div className="space-y-5">
                <p className="leading-relaxed text-slate-600">
                  Mecsu là nền tảng thương mại điện tử chuyên cung cấp vật tư
                  công nghiệp hàng đầu tại Việt Nam. Chúng tôi kết nối doanh
                  nghiệp sản xuất với hàng trăm thương hiệu uy tín trong và
                  ngoài nước.
                </p>
                <p className="leading-relaxed text-slate-600">
                  Với hệ thống kho hàng hiện đại và đội ngũ tư vấn kỹ thuật
                  chuyên nghiệp, Mecsu cam kết mang đến giải pháp mua hàng công
                  nghiệp hiệu quả, tiết kiệm chi phí và thời gian cho doanh
                  nghiệp của bạn.
                </p>
                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                  {["Hơn 30,000 sản phẩm", "300+ thương hiệu"].map((label) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#163F78]/10">
                        <CheckCircle2 size={20} className="text-[#163F78]" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex-1">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={operationsImage}
                  alt="Mecsu Warehouse Operations"
                  className="h-[300px] w-full object-cover lg:h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#163F78]/40 to-transparent" />
              </div>
              <div className="absolute -right-4 -bottom-4 rounded-lg bg-[#FFC928] px-4 py-2 text-sm font-bold text-[#163F78] shadow-lg lg:-right-6">
                Kho vận & Vận hành thực tế
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#163F78] to-[#1a4a8a] py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
            <div className="relative flex-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={manufacturingImage}
                  alt="Vietnamese Industrial Manufacturing"
                  className="h-[300px] w-full object-cover lg:h-[400px]"
                />
                <div className="absolute inset-0 bg-[#163F78]/30" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-4 max-w-[280px] rounded-xl bg-white p-5 shadow-2xl lg:-left-8"
              >
                <Quote size={28} className="mb-2 text-[#163F78]/30" />
                <p className="text-[14px] leading-relaxed text-slate-700 italic">
                  &ldquo;Mecsu được xây dựng để đơn giản hóa việc mua hàng công
                  nghiệp.&rdquo;
                </p>
              </motion.div>
            </div>

            <div className="flex-1">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-white lg:text-3xl">
                Vì sao Mecsu được thành lập?
              </h2>
              <div className="space-y-6">
                {aboutWhyMecsuStory.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFC928] text-sm font-bold text-[#163F78]">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="mb-1 font-bold text-white">{item.title}</h3>
                      <p className="text-[14px] leading-relaxed text-white/80">
                        {item.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
            Hành trình phát triển
          </h2>
          <div className="relative">
            <div className="absolute top-6 bottom-6 left-6 w-1 bg-[#FFC928] lg:hidden" />
            <div className="absolute top-6 right-[10%] left-[10%] hidden h-1 bg-[#FFC928] lg:block" />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-4">
              {aboutTimeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="z-10 mx-auto mb-4 hidden h-12 w-12 items-center justify-center rounded-full bg-[#163F78] font-bold text-white shadow-lg lg:flex">
                    {item.year.slice(-2)}
                  </div>
                  <div className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#163F78] font-bold text-white shadow-lg lg:hidden">
                    {item.year.slice(-2)}
                  </div>
                  <div className="ml-16 text-left lg:hidden">
                    <div className="mb-1 text-xs font-bold text-[#163F78]">
                      {item.year}
                    </div>
                    <div className="mb-1 font-bold text-slate-800">
                      {item.title}
                    </div>
                    <div className="text-[12px] text-slate-500">{item.desc}</div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="mb-1 text-xs font-bold text-[#163F78]">
                      {item.year}
                    </div>
                    <div className="mb-1 font-bold text-slate-800">
                      {item.title}
                    </div>
                    <div className="text-[12px] leading-snug text-slate-500">
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
            Giá trị cốt lõi
          </h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {aboutCoreValues.map((value) => (
              <motion.article
                key={value.title}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFC928]/20">
                  <value.icon size={28} className="text-[#163F78]" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">
                  {value.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-slate-500">
                  {value.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
              Kho hàng & Hệ thống vận hành
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Mecsu vận hành trên nền tảng kho hàng và hệ thống ERP nhằm đảm
              bảo tốc độ, độ chính xác và khả năng cung ứng ổn định.
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="relative h-[250px] overflow-hidden rounded-2xl lg:h-[350px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={warehouseImage}
                alt="Mecsu Warehouse"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#163F78]/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">Kho hàng hiện đại</h3>
                <p className="text-sm text-white/80">Hệ thống kho vận quy mô lớn</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { image: operationsImage, title: "Quản lý tồn kho", alt: "Inventory Management" },
                { image: manufacturingImage, title: "Giao hàng nhanh", alt: "Logistics" },
                { image: erpImage, title: "Hệ thống ERP", alt: "ERP System" },
                { image: warehouseImage, title: "Kiểm soát chất lượng", alt: "Quality Control" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="relative h-[115px] overflow-hidden rounded-2xl lg:h-[165px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#163F78]/40" />
                  <div className="absolute bottom-3 left-3 text-sm font-semibold text-white">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {aboutOperationalMetrics.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#163F78]/10">
                  <item.icon size={24} className="text-[#163F78]" />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-slate-800">
                    {item.title}
                  </div>
                  <div className="text-[12px] text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
            Đối tượng phục vụ
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-slate-600">
            Mecsu tự hào là đối tác tin cậy của các doanh nghiệp công nghiệp
            hàng đầu Việt Nam
          </p>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
            {aboutIndustries.map((item) => (
              <IndustryCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.desc}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
            Khách hàng nói gì về Mecsu
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-slate-600">
            Những đánh giá từ các doanh nghiệp đã tin tưởng hợp tác với Mecsu
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aboutTestimonials.map((item) => (
              <TestimonialCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
            Được tin tưởng bởi các thương hiệu công nghiệp
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-slate-600">
            Hệ sinh thái đối tác đa dạng của Mecsu
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {aboutPartners.map((name) => (
              <PartnerLogo key={name} name={name} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={warehouseImage}
            alt="Industrial Background"
            className="h-full w-full object-cover brightness-[.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#163F78]/95 to-[#1a4a8a]/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
              Sẵn sàng tối ưu quy trình mua hàng công nghiệp?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-base text-white/80">
              Bắt đầu với Mecsu ngay hôm nay để trải nghiệm dịch vụ mua hàng vật
              tư công nghiệp chuyên nghiệp và hiệu quả
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC928] px-8 py-4 text-[15px] font-bold text-[#163F78] transition-colors hover:bg-[#e6b525]"
              >
                <Package size={20} />
                Khám phá sản phẩm
              </Link>
              <Link
                href="/dich-vu-khach-hang"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white/20"
              >
                <MessageCircle size={20} />
                Liên hệ tư vấn
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
