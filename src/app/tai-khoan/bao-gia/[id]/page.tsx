import type { Metadata } from "next";
import { AccountLayout } from "@/features/account";
import { mockQuotations } from "@/features/quotations/data/quotations";
import { QuotationDetailPageShell } from "@/features/quotations/components/QuotationDetailPageShell";

interface QuotationDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return mockQuotations.map((quotation) => ({ id: quotation.id }));
}

export async function generateMetadata({
  params,
}: QuotationDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const quotation = mockQuotations.find((item) => item.id === id);

  return {
    title: quotation ? `Chi tiết báo giá ${quotation.code}` : "Chi tiết báo giá",
    description: quotation
      ? `Theo dõi thông tin và tiến trình báo giá ${quotation.code}.`
      : "Theo dõi thông tin và tiến trình báo giá.",
  };
}

export default async function QuotationDetailPage({
  params,
}: QuotationDetailPageProps) {
  const { id } = await params;
  const quotation = mockQuotations.find((item) => item.id === id);

  return (
    <AccountLayout activeHref="/tai-khoan/bao-gia">
      <QuotationDetailPageShell quotationId={id} initialQuotation={quotation} />
    </AccountLayout>
  );
}
