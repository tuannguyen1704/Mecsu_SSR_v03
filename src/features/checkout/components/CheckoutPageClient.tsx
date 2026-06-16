"use client";

import { FormEvent, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Banknote,
  Building2,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  Copy,
  FileText,
  Headphones,
  MapPin,
  PackageCheck,
  Pencil,
  Plus,
  QrCode,
  Receipt,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  Truck,
  User,
  Phone,
  X,
} from "lucide-react";
import { useCart } from "@/features/cart";
import type { CartItem } from "@/features/cart/types/cart";
import { formatCartPrice } from "@/features/cart/utils/cart-format";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import { saveLastOrder } from "../services/checkout-storage";
import type {
  CheckoutAddress,
  CheckoutPaymentMethod,
  CheckoutShippingMethod,
} from "../types/checkout";

type CheckoutStep = 1 | 2 | 3;

const orderCode = "MECSU-ORD-000123";

const shippingMethods = [
  {
    id: "standard" as const,
    title: "Giao tiêu chuẩn",
    description: "2-5 ngày làm việc",
    badge: "35.000đ",
    fee: 35000,
    icon: Truck,
  },
  {
    id: "fast" as const,
    title: "Giao nhanh",
    description: "Giao trong ngày",
    badge: "+45.000đ",
    fee: 45000,
    icon: Clock,
  },
  {
    id: "pickup" as const,
    title: "Nhận tại kho",
    description: "TP. Hồ Chí Minh",
    badge: "Miễn phí",
    fee: 0,
    icon: Building2,
  },
];

const paymentMethods = [
  {
    id: "bank" as const,
    title: "Chuyển khoản ngân hàng",
    description: "Chuyển khoản trước qua STK được gửi sau khi đặt hàng",
    icon: Banknote,
  },
  {
    id: "cod" as const,
    title: "Thanh toán khi nhận hàng (COD)",
    description: "Trả tiền mặt cho shipper khi nhận hàng",
    icon: Truck,
  },
  {
    id: "quote" as const,
    title: "Yêu cầu báo giá chính thức",
    description: "Nhận báo giá PDF qua email để duyệt mua",
    badge: "B2B",
    icon: FileText,
  },
];

const accountEmail = "admin@gmail.com";

const defaultCheckoutAddress: CheckoutAddress = {
  address: "df",
  district: "Quận 3",
  fullName: "Admin MECsu",
  note: "adf",
  phone: "0900000000",
  province: "TP. Hồ Chí Minh",
  ward: "Phường 1",
};

const provinces = [
  { id: "hcm", name: "TP. Hồ Chí Minh" },
  { id: "hn", name: "Hà Nội" },
  { id: "dn", name: "Đà Nẵng" },
  { id: "cantho", name: "Cần Thơ" },
  { id: "hue", name: "Huế" },
  { id: "dongnai", name: "Đồng Nai" },
  { id: "binhduong", name: "Bình Dương" },
];

const districts: Record<string, { id: string; name: string }[]> = {
  hcm: [
    { id: "quan1", name: "Quận 1" },
    { id: "quan3", name: "Quận 3" },
    { id: "quan5", name: "Quận 5" },
    { id: "quan7", name: "Quận 7" },
    { id: "quan10", name: "Quận 10" },
    { id: "phunhuan", name: "Phú Nhuận" },
    { id: "tanbinh", name: "Tân Bình" },
    { id: "binhthanh", name: "Bình Thạnh" },
    { id: "govap", name: "Gò Vấp" },
    { id: "thuduc", name: "Thủ Đức" },
  ],
  hn: [
    { id: "hoankiem", name: "Hoàn Kiếm" },
    { id: "badinh", name: "Ba Đình" },
    { id: "dongda", name: "Đống Đa" },
    { id: "haibatrung", name: "Hai Bà Trưng" },
    { id: "thanhxuan", name: "Thanh Xuân" },
    { id: "caugiay", name: "Cầu Giấy" },
    { id: "tuliem", name: "Từ Liêm" },
  ],
  dn: [
    { id: "haichau", name: "Hải Châu" },
    { id: "thanhkhe", name: "Thanh Khê" },
    { id: "sontra", name: "Sơn Trà" },
    { id: "nguhanhson", name: "Ngũ Hành Sơn" },
  ],
};

const wards: Record<string, { id: string; name: string }[]> = {
  quan1: [
    { id: "bennghe", name: "Bến Nghé" },
    { id: "bennghe2", name: "Bến Nghé 2" },
    { id: "cogiang", name: "Cô Giang" },
    { id: "congtruong", name: "Công Trường" },
    { id: "dakao", name: "Đa Kao" },
  ],
  quan3: [
    { id: "phamngulao", name: "Phạm Ngũ Lão" },
    { id: "phuong1", name: "Phường 1" },
    { id: "phuong2", name: "Phường 2" },
    { id: "phuong3", name: "Phường 3" },
  ],
  quan5: [
    { id: "phuong1", name: "Phường 1" },
    { id: "phuong2", name: "Phường 2" },
    { id: "phuong3", name: "Phường 3" },
  ],
  quan7: [
    { id: "tanthuandong", name: "Tân Thuận Đông" },
    { id: "tanthuantay", name: "Tân Thuận Tây" },
    { id: "tanphu", name: "Tân Phú" },
  ],
};

export function CheckoutPageClient() {
  const router = useRouter();
  const { clearCart, items, subtotal } = useCart();
  const [step, setStep] = useState<CheckoutStep>(1);
  const [needVat, setNeedVat] = useState(true);
  const [address, setAddress] = useState<CheckoutAddress | null>(defaultCheckoutAddress);
  const [vatDetails, setVatDetails] = useState({
    companyName: "Công ty TNHH ABC",
    taxCode: "0123456789",
    email: "accounting@company.com",
    address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
  });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAddressPickerOpen, setIsAddressPickerOpen] = useState(false);
  const [shippingMethod, setShippingMethod] =
    useState<CheckoutShippingMethod>("standard");
  const [paymentMethod, setPaymentMethod] =
    useState<CheckoutPaymentMethod>("bank");

  const selectedShipping =
    shippingMethods.find((method) => method.id === shippingMethod) ?? shippingMethods[0];
  const selectedPayment =
    paymentMethods.find((method) => method.id === paymentMethod) ?? paymentMethods[0];
  const vat = Math.round(subtotal * 0.1);
  const shippingFee = selectedShipping.fee;
  const grandTotal = subtotal + vat + shippingFee;
  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const placeOrder = () => {
    if (!address || items.length === 0) return;

    saveLastOrder({
      address,
      createdAt: new Date().toISOString(),
      items,
      orderCode,
      paymentMethod,
      shippingFee,
      shippingMethod,
      subtotal,
      total: grandTotal,
      vat,
      vatInvoice: needVat,
    });
    clearCart();
    router.push("/thanh-cong");
  };

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[420px] max-w-[980px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
        <ShoppingCart size={42} className="mb-4 text-slate-300" />
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Không có sản phẩm để thanh toán
        </h1>
        <p className="mb-8 max-w-lg text-[15px] leading-relaxed font-medium text-slate-500">
          Giỏ hàng hiện đang trống. Hãy quay lại giỏ hàng trước khi thanh toán.
        </p>
        <Link
          href="/gio-hang"
          className="rounded-xl bg-[#003B73] px-7 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#002d5a]"
        >
          Về giỏ hàng
        </Link>
      </section>
    );
  }

  return (
    <>
      <CheckoutStepper currentStep={step} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-4">
          {step === 1 ? (
            <InformationStep
              address={address}
              needVat={needVat}
              shippingMethod={shippingMethod}
              vatDetails={vatDetails}
              onAddressModalOpen={() => setIsAddressModalOpen(true)}
              onAddressPickerOpen={() => setIsAddressPickerOpen(true)}
              onAddressDelete={() => setAddress(null)}
              onNeedVatChange={setNeedVat}
              onShippingMethodChange={setShippingMethod}
              onVatDetailsChange={setVatDetails}
              onContinue={() => setStep(2)}
            />
          ) : null}

          {step === 2 ? (
            <PaymentMethodStep
              paymentMethod={paymentMethod}
              onBack={() => setStep(1)}
              onContinue={() => setStep(3)}
              onPaymentMethodChange={setPaymentMethod}
            />
          ) : null}

          {step === 3 ? (
            <ConfirmOrderStep
              address={address}
              needVat={needVat}
              paymentMethod={paymentMethod}
              selectedPaymentTitle={selectedPayment.title}
              selectedShippingTitle={selectedShipping.title}
              shippingMethod={shippingMethod}
              onBack={() => setStep(2)}
              onPlaceOrder={placeOrder}
            />
          ) : null}
        </div>

        <CheckoutSummary
          grandTotal={grandTotal}
          itemCount={itemCount}
          items={items}
          shippingFee={shippingFee}
          subtotal={subtotal}
          vat={vat}
        />
      </div>

      {isAddressModalOpen ? (
        <ShippingAddressModal
          initialAddress={address}
          onClose={() => setIsAddressModalOpen(false)}
          onSave={(nextAddress) => {
            setAddress(nextAddress);
            setIsAddressModalOpen(false);
          }}
        />
      ) : null}

      {isAddressPickerOpen ? (
        <CheckoutAddressPicker
          address={address}
          onAddNew={() => {
            setIsAddressPickerOpen(false);
            setIsAddressModalOpen(true);
          }}
          onClose={() => setIsAddressPickerOpen(false)}
          onSelect={() => setIsAddressPickerOpen(false)}
        />
      ) : null}
    </>
  );
}

function CheckoutStepper({ currentStep }: { currentStep: CheckoutStep }) {
  const steps = [
    { number: 0, label: "Giỏ hàng", status: "completed" },
    { number: 1, label: "Thông tin", status: currentStep === 1 ? "active" : "completed" },
    {
      number: 2,
      label: "Thanh toán",
      status: currentStep === 2 ? "active" : currentStep > 2 ? "completed" : "pending",
    },
    { number: 3, label: "Xác nhận", status: currentStep === 3 ? "active" : "pending" },
  ];

  return (
    <div className="mb-8 overflow-x-auto pb-2">
      <div className="mx-auto flex min-w-[620px] max-w-[780px] items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                  step.status === "completed"
                    ? "bg-emerald-500 text-white"
                    : step.status === "active"
                      ? "bg-[#003B73] text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {step.status === "completed" ? <Check size={18} /> : step.number + 1}
              </div>
              <span
                className={`text-xs font-bold ${
                  step.status === "pending" ? "text-slate-400" : "text-slate-800"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <div
                className={`mx-4 mb-7 h-px flex-1 ${
                  step.status === "completed" ? "bg-emerald-300" : "bg-slate-200"
                }`}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function InformationStep({
  address,
  needVat,
  onAddressDelete,
  onAddressModalOpen,
  onAddressPickerOpen,
  onContinue,
  onNeedVatChange,
  onShippingMethodChange,
  onVatDetailsChange,
  shippingMethod,
  vatDetails,
}: {
  address: CheckoutAddress | null;
  needVat: boolean;
  onAddressDelete: () => void;
  onAddressModalOpen: () => void;
  onAddressPickerOpen: () => void;
  onContinue: () => void;
  onNeedVatChange: (checked: boolean) => void;
  onShippingMethodChange: (method: CheckoutShippingMethod) => void;
  onVatDetailsChange: (details: {
    companyName: string;
    taxCode: string;
    email: string;
    address: string;
  }) => void;
  shippingMethod: CheckoutShippingMethod;
  vatDetails: {
    companyName: string;
    taxCode: string;
    email: string;
    address: string;
  };
}) {
  return (
    <>
      <VatCard
        checked={needVat}
        details={vatDetails}
        onChange={onNeedVatChange}
        onDetailsChange={onVatDetailsChange}
      />

      <CheckoutSection icon={<MapPin size={20} />} title="Địa chỉ giao hàng" subtitle="Nơi nhận hàng">
        <div className="space-y-4 pt-4">
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            <span className="font-medium">Đang đặt hàng bằng tài khoản:</span>{" "}
            <span className="font-semibold text-[#003B73]">{accountEmail}</span>
          </div>

          {address ? (
            <AddressSummary
              address={address}
              onChange={onAddressModalOpen}
              onDelete={onAddressDelete}
            />
          ) : (
            <div className="rounded-xl bg-slate-50 px-4 py-8 text-center">
              <MapPin size={48} className="mx-auto mb-3 text-slate-300" />
              <p className="font-semibold text-slate-700">Bạn chưa có địa chỉ giao hàng</p>
              <p className="mt-1 text-sm text-slate-500">
                Vui lòng thêm địa chỉ để tiếp tục đặt hàng
              </p>
              <button
                type="button"
                onClick={onAddressModalOpen}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#003B73] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#002d5a]"
              >
                <Plus size={18} />
                Thêm địa chỉ giao hàng
              </button>
            </div>
          )}

          {address ? (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onAddressPickerOpen}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#003B73] transition-colors hover:bg-slate-50"
              >
                Đổi địa chỉ
              </button>
              <button
                type="button"
                onClick={onAddressModalOpen}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#003B73] transition-colors hover:bg-slate-50"
              >
                <Plus size={16} />
                Thêm địa chỉ mới
              </button>
            </div>
          ) : null}
        </div>
      </CheckoutSection>

      <CheckoutSection
        icon={<Truck size={20} />}
        title="Phương thức vận chuyển"
        subtitle="Chọn cách nhận hàng"
      >
        <div className="grid grid-cols-1 gap-3 pt-4 md:grid-cols-3">
          {shippingMethods.map((method) => {
            const Icon = method.icon;

            return (
              <RadioCard
                key={method.id}
                badge={method.badge}
                description={method.description}
                icon={<Icon size={20} />}
                selected={shippingMethod === method.id}
                title={method.title}
                onClick={() => onShippingMethodChange(method.id)}
              />
            );
          })}
        </div>
      </CheckoutSection>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!address}
          onClick={onContinue}
          className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-bold transition-all ${
            address
              ? "bg-[#003B73] text-white hover:bg-[#002d5a]"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          }`}
        >
          Tiếp tục
          <ArrowRight size={16} />
        </button>
      </div>
    </>
  );
}

function VatCard({
  checked,
  details,
  onChange,
  onDetailsChange,
}: {
  checked: boolean;
  details: {
    companyName: string;
    taxCode: string;
    email: string;
    address: string;
  };
  onChange: (checked: boolean) => void;
  onDetailsChange: (details: {
    companyName: string;
    taxCode: string;
    email: string;
    address: string;
  }) => void;
}) {
  const updateVatField = (field: keyof typeof details, value: string) => {
    onDetailsChange({ ...details, [field]: value });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <label className="flex cursor-pointer items-start gap-4">
        <span
          className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border-2 ${
            checked ? "border-[#003B73] bg-[#003B73]" : "border-slate-300 bg-white"
          }`}
        >
          <input
            checked={checked}
            className="sr-only"
            type="checkbox"
            onChange={(event) => onChange(event.target.checked)}
          />
          {checked ? <Check size={14} className="text-white" /> : null}
        </span>
        <span className="flex-1">
          <span className="flex items-center gap-2">
            <Receipt size={18} className="text-[#003B73]" />
            <span className="text-sm font-bold text-slate-900">Xuất hóa đơn VAT</span>
          </span>
          <span className="mt-1 block text-xs text-slate-500">
            Yêu cầu xuất hóa đơn giá trị gia tăng cho đơn hàng này
          </span>
        </span>
      </label>

      {checked ? (
        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 md:grid-cols-2">
          <VatInput
            className="md:col-span-2"
            label="Tên công ty trên hóa đơn"
            placeholder="Công ty TNHH ABC"
            value={details.companyName}
            onChange={(value) => updateVatField("companyName", value)}
          />
          <VatInput
            label="Mã số thuế"
            placeholder="0123456789"
            value={details.taxCode}
            onChange={(value) => updateVatField("taxCode", value)}
          />
          <VatInput
            label="Email nhận hóa đơn"
            placeholder="accounting@company.com"
            value={details.email}
            onChange={(value) => updateVatField("email", value)}
          />
          <VatInput
            className="md:col-span-2"
            label="Địa chỉ công ty"
            placeholder="123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
            value={details.address}
            onChange={(value) => updateVatField("address", value)}
          />
        </div>
      ) : null}
    </div>
  );
}

function VatInput({
  className = "",
  label,
  onChange,
  placeholder,
  value,
}: {
  className?: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#003B73] focus:ring-2 focus:ring-[#003B73]/10"
      />
    </label>
  );
}

function CheckoutSection({
  children,
  icon,
  subtitle,
  title,
}: {
  children: ReactNode;
  icon: ReactNode;
  subtitle: string;
  title: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#003B73]/10 text-[#003B73]">
            {icon}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">{title}</h2>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>
        <ChevronDown size={18} className="text-slate-400" />
      </div>
      {children}
    </section>
  );
}

function AddressSummary({
  address,
  onChange,
  onDelete,
}: {
  address: CheckoutAddress;
  onChange: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="relative rounded-xl border border-slate-200 bg-white px-6 py-5">
      <div className="pr-10">
        <span className="mb-3 inline-flex items-center gap-1 rounded-md bg-[#FFF4D6] px-2.5 py-1 text-[11px] font-bold text-[#173E75]">
          <Check size={12} />
          Mặc định
        </span>
        <div className="space-y-2 text-sm text-slate-600">
          <p className="flex items-center gap-2 text-lg font-bold text-slate-950">
            <User size={15} className="text-slate-400" />
            {address.fullName}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={15} className="text-slate-400" />
            {address.phone}
          </p>
          <p className="flex items-start gap-2 leading-6">
            <MapPin size={15} className="mt-1 text-slate-400" />
            <span>
              {address.address}, {address.ward}, {address.district}, {address.province}
            </span>
          </p>
          {address.note ? (
            <p className="pl-7 text-sm italic text-slate-400">Ghi chú: {address.note}</p>
          ) : null}
        </div>
        <div className="mt-5 h-px bg-slate-100" />
      </div>
      <button
        type="button"
        onClick={onChange}
        className="absolute top-7 right-6 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-[#003B73]"
        aria-label="Chỉnh sửa địa chỉ"
      >
        <Pencil size={18} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-[70px] right-6 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-red-500"
        aria-label="Xóa địa chỉ"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

function PaymentMethodStep({
  onBack,
  onContinue,
  onPaymentMethodChange,
  paymentMethod,
}: {
  onBack: () => void;
  onContinue: () => void;
  onPaymentMethodChange: (method: CheckoutPaymentMethod) => void;
  paymentMethod: CheckoutPaymentMethod;
}) {
  return (
    <>
      <CheckoutSection
        icon={<CreditCard size={20} />}
        title="Phương thức thanh toán"
        subtitle="Chọn cách thanh toán"
      >
        <div className="space-y-3 pt-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;

            return (
              <RadioCard
                key={method.id}
                badge={method.badge}
                description={method.description}
                icon={<Icon size={20} />}
                selected={paymentMethod === method.id}
                title={method.title}
                onClick={() => onPaymentMethodChange(method.id)}
              />
            );
          })}
        </div>
      </CheckoutSection>

      <StepActions onBack={onBack} onContinue={onContinue} continueLabel="Tiếp tục" />
    </>
  );
}

function ConfirmOrderStep({
  address,
  needVat,
  onBack,
  onPlaceOrder,
  paymentMethod,
  selectedPaymentTitle,
  selectedShippingTitle,
}: {
  address: CheckoutAddress | null;
  needVat: boolean;
  onBack: () => void;
  onPlaceOrder: () => void;
  paymentMethod: CheckoutPaymentMethod;
  selectedPaymentTitle: string;
  selectedShippingTitle: string;
  shippingMethod: CheckoutShippingMethod;
}) {
  return (
    <>
      {paymentMethod === "bank" ? <QrPaymentBlock /> : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Xác nhận đơn hàng</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <ConfirmInfo label="Địa chỉ giao hàng" value={address ? `${address.address}, ${address.ward}, ${address.district}, ${address.province}` : "Chưa có địa chỉ"} />
          <ConfirmInfo label="Phương thức vận chuyển" value={selectedShippingTitle} />
          <ConfirmInfo label="Phương thức thanh toán" value={selectedPaymentTitle} />
          <ConfirmInfo label="Xuất hóa đơn VAT" value={needVat ? "Có yêu cầu" : "Không yêu cầu"} />
        </div>
      </section>

      <StepActions onBack={onBack} onContinue={onPlaceOrder} continueLabel="Đặt hàng" />
    </>
  );
}

function QrPaymentBlock() {
  const copyText = (value: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(value);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#003B73]/10 text-[#003B73]">
            <QrCode size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Thanh toán bằng mã QR</h2>
            <p className="text-xs text-slate-500">Quét mã hoặc chuyển khoản theo thông tin bên dưới</p>
          </div>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
          Đang chờ thanh toán
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-[180px_minmax(0,1fr)]">
        <div className="flex aspect-square items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
          <QrCode size={92} className="text-[#003B73]" />
        </div>
        <div className="space-y-3">
          <BankRow label="Ngân hàng" value="MB Bank" />
          <BankRow label="Tên tài khoản" value="CÔNG TY TNHH MECSU" />
          <BankRow label="Số tài khoản" value="0900000000" onCopy={() => copyText("0900000000")} />
          <BankRow label="Nội dung chuyển khoản" value={orderCode} onCopy={() => copyText(orderCode)} />
        </div>
      </div>
    </section>
  );
}

function BankRow({
  label,
  onCopy,
  value,
}: {
  label: string;
  onCopy?: () => void;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-sm font-bold text-slate-900">{value}</p>
      </div>
      {onCopy ? (
        <button
          type="button"
          onClick={onCopy}
          className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:text-[#003B73]"
          aria-label={`Sao chép ${label}`}
        >
          <Copy size={15} />
        </button>
      ) : null}
    </div>
  );
}

function ConfirmInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="text-sm font-semibold leading-6 text-slate-800">{value}</p>
    </div>
  );
}

function StepActions({
  continueLabel,
  onBack,
  onContinue,
}: {
  continueLabel: string;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onBack}
        className="h-12 rounded-xl border border-slate-200 bg-white px-7 text-sm font-bold text-slate-700 hover:bg-slate-50"
      >
        Quay lại
      </button>
      <button
        type="button"
        onClick={onContinue}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#003B73] px-7 text-sm font-bold text-white hover:bg-[#002d5a]"
      >
        {continueLabel}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

function RadioCard({
  badge,
  description,
  icon,
  onClick,
  selected,
  title,
}: {
  badge?: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  selected: boolean;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full rounded-xl border p-4 text-left transition-all ${
        selected
          ? "border-[#003B73] bg-[#f8fbff] shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <span
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
          selected ? "bg-[#003B73] text-white" : "bg-slate-100 text-slate-500"
        }`}
      >
        {icon}
      </span>
      <span className="block text-sm font-bold text-slate-900">{title}</span>
      <span className="mt-1 block text-xs text-slate-500">{description}</span>
      {badge ? (
        <span className="mt-3 inline-flex rounded-full bg-[#003B73]/10 px-2.5 py-1 text-xs font-bold text-[#003B73]">
          {badge}
        </span>
      ) : null}
      <span
        className={`absolute top-4 right-4 h-4 w-4 rounded-full border ${
          selected ? "border-[#003B73] bg-[#003B73] ring-2 ring-[#003B73]/10" : "border-slate-300"
        }`}
      >
        {selected ? <span className="mx-auto mt-[3px] block h-1.5 w-1.5 rounded-full bg-white" /> : null}
      </span>
    </button>
  );
}

function CheckoutSummary({
  grandTotal,
  itemCount,
  items,
  shippingFee,
  subtotal,
  vat,
}: {
  grandTotal: number;
  itemCount: number;
  items: CartItem[];
  shippingFee: number;
  subtotal: number;
  vat: number;
}) {
  return (
    <aside className="space-y-3 lg:sticky lg:top-28 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Tóm tắt đơn hàng</h2>
            <span className="text-xs text-slate-500">{itemCount} sản phẩm</span>
          </div>
        </div>

        <div className="max-h-[240px] space-y-3 overflow-y-auto p-5">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-50 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image || getSeededPlaceholder(item.productId)}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-2 text-sm font-medium text-slate-900">
                  {item.name}
                </h4>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">SL: {item.quantity}</span>
                  <span className="shrink-0 text-sm font-bold text-slate-900">
                    {formatCartPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2.5 border-t border-slate-100 p-5">
          <SummaryRow label="Tạm tính" value={formatCartPrice(subtotal)} />
          <SummaryRow label="VAT (10%)" value={formatCartPrice(vat)} />
          <SummaryRow
            label="Phí vận chuyển"
            value={shippingFee === 0 ? "Miễn phí" : formatCartPrice(shippingFee)}
          />
          <div className="my-2 h-px bg-slate-100" />
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-slate-900">Tổng thanh toán</span>
            <span className="text-2xl font-black text-[#003B73]">
              {formatCartPrice(grandTotal)}
            </span>
          </div>
          <p className="text-right text-[11px] text-slate-400">Đã bao gồm VAT</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
        <div className="grid grid-cols-2 gap-3">
          <TrustItem icon={<Receipt size={14} />} text="Hỗ trợ xuất hóa đơn VAT" />
          <TrustItem icon={<ShieldCheck size={14} />} text="Giá minh bạch, không phí ẩn" />
          <TrustItem icon={<Headphones size={14} />} text="Hỗ trợ kỹ thuật 24/7" />
          <TrustItem icon={<PackageCheck size={14} />} text="Đơn hàng xác nhận bởi MECSU" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 py-2 text-slate-400">
        <ShieldCheck size={16} />
        <span className="text-[11px] font-medium">Thanh toán bảo mật 256-bit SSL</span>
      </div>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}

function TrustItem({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-2 text-[#003B73]">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <p className="text-xs font-medium text-slate-600">{text}</p>
    </div>
  );
}

function CheckoutAddressPicker({
  address,
  onAddNew,
  onClose,
  onSelect,
}: {
  address: CheckoutAddress | null;
  onAddNew: () => void;
  onClose: () => void;
  onSelect: () => void;
}) {
  const addressCount = address ? 1 : 0;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex min-h-dvh items-center justify-center">
        <div className="flex max-h-[calc(100dvh-32px)] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold leading-tight text-slate-900">
                Chọn địa chỉ giao hàng
              </h2>
              <p className="mt-0.5 text-sm font-medium text-slate-500">
                {addressCount} địa chỉ đã lưu
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-1 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              aria-label="Đóng chọn địa chỉ"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-7">
            {address ? (
              <button
                type="button"
                onClick={onSelect}
                className="flex w-full items-start gap-4 rounded-2xl border-2 border-[#173E75] bg-[#f8fbff] px-6 py-6 text-left transition-colors hover:bg-[#f4f8ff]"
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[6px] border-[#173E75] bg-white" />
                <span className="min-w-0 flex-1">
                  <span className="mb-3 inline-flex items-center gap-1 rounded-md bg-[#FFF4D6] px-2.5 py-1 text-[11px] font-bold text-[#173E75]">
                    <Check size={12} />
                    Mặc định
                  </span>
                  <span className="block text-base font-bold leading-tight text-slate-900">
                    {address.fullName}
                    <span className="mx-3 font-normal text-slate-300">|</span>
                    <span className="font-medium text-slate-500">{address.phone}</span>
                  </span>
                  <span className="mt-2 block text-sm font-medium leading-6 text-slate-500">
                    {address.address}, {address.ward}, {address.district}, {address.province}
                  </span>
                </span>
              </button>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center text-sm font-semibold text-slate-500">
                Chưa có địa chỉ đã lưu
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-7">
            <button
              type="button"
              onClick={onAddNew}
              className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-white py-3.5 text-sm font-semibold text-slate-600 transition-colors hover:border-[#003B73] hover:text-[#003B73]"
            >
              <Plus size={20} />
              Thêm địa chỉ mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShippingAddressModal({
  initialAddress,
  onClose,
  onSave,
}: {
  initialAddress: CheckoutAddress | null;
  onClose: () => void;
  onSave: (address: CheckoutAddress) => void;
}) {
  const [form, setForm] = useState<CheckoutAddress>(
    initialAddress ?? {
      address: "",
      district: "",
      fullName: "",
      note: "",
      phone: "",
      province: "",
      ward: "",
    },
  );
  const [submitted, setSubmitted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"province" | "district" | "ward" | null>(
    null,
  );

  const requiredFields: (keyof CheckoutAddress)[] = [
    "fullName",
    "phone",
    "province",
    "district",
    "ward",
    "address",
  ];
  const hasErrors = requiredFields.some((field) => !form[field].trim());

  const updateField = (field: keyof CheckoutAddress, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const selectedProvince = provinces.find((province) => province.name === form.province);
  const districtOptions = selectedProvince ? districts[selectedProvince.id] || [] : [];
  const selectedDistrict = districtOptions.find((district) => district.name === form.district);
  const wardOptions = selectedDistrict ? wards[selectedDistrict.id] || [] : [];

  const selectProvince = (provinceName: string) => {
    setForm((current) => ({
      ...current,
      district: "",
      province: provinceName,
      ward: "",
    }));
    setOpenDropdown(null);
  };

  const selectDistrict = (districtName: string) => {
    setForm((current) => ({
      ...current,
      district: districtName,
      ward: "",
    }));
    setOpenDropdown(null);
  };

  const selectWard = (wardName: string) => {
    updateField("ward", wardName);
    setOpenDropdown(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!hasErrors) {
      onSave(form);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex min-h-dvh items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex max-h-[calc(100dvh-32px)] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-[22px] font-bold leading-tight text-slate-900">
                Thêm địa chỉ mới
              </h2>
              <p className="mt-1 text-[17px] font-medium text-slate-500">
                Nhập thông tin địa chỉ giao hàng mới
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-1 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              aria-label="Đóng modal"
            >
              <X size={22} />
            </button>
          </div>

          <div className="custom-scrollbar-thin flex-1 space-y-4 overflow-y-auto px-6 py-6">
            <AddressTextField
              error={submitted && !form.fullName.trim()}
              label="Họ và tên"
              placeholder="Nguyễn Văn A"
              value={form.fullName}
              onChange={(value) => updateField("fullName", value)}
            />
            <AddressTextField
              error={submitted && !form.phone.trim()}
              label="Số điện thoại"
              placeholder="0901234567"
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
            />
            <AddressDropdownField
              error={submitted && !form.province.trim()}
              label="Tỉnh/Thành phố"
              isOpen={openDropdown === "province"}
              options={provinces}
              placeholder="Chọn Tỉnh/Thành phố"
              value={form.province}
              onSelect={(option) => selectProvince(option.name)}
              onToggle={() => setOpenDropdown(openDropdown === "province" ? null : "province")}
            />
            <AddressDropdownField
              disabled={!form.province}
              error={submitted && !form.district.trim()}
              label="Quận/Huyện"
              isOpen={openDropdown === "district"}
              options={districtOptions}
              placeholder={form.province ? "Chọn Quận/Huyện" : "Chọn Tỉnh trước"}
              value={form.district}
              onSelect={(option) => selectDistrict(option.name)}
              onToggle={() => setOpenDropdown(openDropdown === "district" ? null : "district")}
            />
            <AddressDropdownField
              disabled={!form.district}
              error={submitted && !form.ward.trim()}
              label="Phường/Xã"
              isOpen={openDropdown === "ward"}
              options={wardOptions}
              placeholder={form.district ? "Chọn Phường/Xã" : "Chọn Quận trước"}
              value={form.ward}
              onSelect={(option) => selectWard(option.name)}
              onToggle={() => setOpenDropdown(openDropdown === "ward" ? null : "ward")}
            />
            <AddressTextField
              error={submitted && !form.address.trim()}
              label="Địa chỉ cụ thể"
              placeholder="123 Đường ABC, Phường XYZ"
              value={form.address}
              onChange={(value) => updateField("address", value)}
            />
            <label className="block">
              <span className="mb-3 block text-[13px] font-bold tracking-wider text-slate-600 uppercase">
                Ghi chú giao hàng
              </span>
              <textarea
                value={form.note}
                onChange={(event) => updateField("note", event.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border border-[#E2E8F0] px-4 py-3.5 text-[17px] font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#003B73] focus:ring-2 focus:ring-[#003B73]/10"
                placeholder="Giao giờ hành chính, gọi trước khi giao..."
              />
            </label>
            {submitted && hasErrors ? (
              <p className="text-sm font-medium text-red-500">
                Vui lòng nhập đầy đủ thông tin bắt buộc.
              </p>
            ) : null}
          </div>

          <div className="flex gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#E2E8F0] bg-white py-3.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#003B73] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#002d5a]"
            >
              Lưu địa chỉ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddressDropdownField({
  disabled = false,
  error,
  isOpen,
  label,
  onSelect,
  onToggle,
  options,
  placeholder,
  value,
}: {
  disabled?: boolean;
  error: boolean;
  isOpen: boolean;
  label: string;
  onSelect: (option: { id: string; name: string }) => void;
  onToggle: () => void;
  options: { id: string; name: string }[];
  placeholder: string;
  value: string;
}) {
  return (
    <div className="relative">
      <span className={`mb-3 block text-[13px] font-bold tracking-wider uppercase ${error ? "text-red-500" : "text-slate-500"}`}>
        <MapPin size={13} className="mr-1 inline align-[-2px]" />
        {label}
      </span>
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3.5 text-left text-[17px] font-medium outline-none transition-all ${
          disabled ? "cursor-not-allowed bg-slate-100 opacity-60" : "hover:border-slate-300"
        } ${
          error
            ? "border-red-300 text-red-600"
            : "border-[#E2E8F0] text-slate-700 focus:border-[#003B73] focus:ring-2 focus:ring-[#003B73]/10"
        }`}
      >
        <span className={value ? "text-slate-700" : "text-slate-400"}>{value || placeholder}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && !disabled ? (
        <div className="absolute z-[100000] mt-1 max-h-60 w-full overflow-auto rounded-xl border border-[#E2E8F0] bg-white py-1 shadow-lg">
          {options.length > 0 ? (
            options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option)}
                className={`w-full px-4 py-3 text-left text-[16px] transition-colors hover:bg-slate-50 ${
                  value === option.name
                    ? "bg-[#003B73]/5 font-semibold text-[#003B73]"
                    : "text-slate-700"
                }`}
              >
                {option.name}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-[15px] text-slate-400">Không có dữ liệu</div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function AddressTextField({
  error,
  label,
  onChange,
  placeholder,
  value,
}: {
  error: boolean;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className={`mb-3 block text-[13px] font-bold tracking-wider uppercase ${error ? "text-red-500" : "text-slate-500"}`}>
        {label === "Địa chỉ cụ thể" ? (
          <MapPin size={13} className="mr-1 inline align-[-2px]" />
        ) : null}
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white px-4 py-3.5 text-[17px] font-medium outline-none transition-all placeholder:text-slate-400 focus:ring-2 ${
          error
            ? "border-red-300 text-red-600 focus:border-red-500 focus:ring-red-500/10"
            : "border-[#E2E8F0] text-slate-700 focus:border-[#003B73] focus:ring-[#003B73]/10"
        }`}
      />
    </label>
  );
}
