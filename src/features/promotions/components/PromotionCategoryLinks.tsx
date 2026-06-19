import Link from "next/link";

const categories = [
  "Vật liệu xây dựng",
  "Bulong & Ốc vít",
  "Dụng cụ",
  "Bảo hộ lao động",
  "Điện công nghiệp",
  "Vật tư MRO",
];

export function PromotionCategoryLinks() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category}
          href="#uu-dai-noi-bat"
          className="rounded-sm border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-[#163F78] hover:text-[#163F78]"
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
