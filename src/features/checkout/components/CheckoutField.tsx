"use client";

interface CheckoutFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  error?: string;
  onChange: (value: string) => void;
}

export function CheckoutField({
  label,
  name,
  value,
  placeholder,
  type = "text",
  error,
  onChange,
}: CheckoutFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-black tracking-[0.12em] text-[#1a1a1a] uppercase">
        {label}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`h-12 w-full rounded-sm border bg-white px-4 text-[14px] font-bold text-[#1a1a1a] outline-none transition-colors placeholder:text-slate-400 focus:border-[#005da4] ${
          error ? "border-red-400" : "border-slate-300"
        }`}
      />
      {error ? (
        <span className="mt-1 block text-[12px] font-bold text-red-600">{error}</span>
      ) : null}
    </label>
  );
}
