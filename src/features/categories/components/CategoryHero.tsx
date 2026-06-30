import type { Category } from "../types/category";

export function CategoryHero({ category }: { category: Category }) {
  const description =
    category.description ||
    `Khám phá danh mục ${category.name} với đa dạng các loại sản phẩm chất lượng cao, phục vụ cho mọi nhu cầu công trình và sản xuất.`;

  return (
    <div className="mb-12 rounded-3xl bg-slate-50 p-12">
      <h1 className="mb-4 text-4xl font-black text-slate-900">{category.name}</h1>
      <p className="max-w-2xl text-lg text-slate-600">
        {description}
      </p>
    </div>
  );
}
