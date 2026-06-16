"use client";

interface BankTransferQrProps {
  orderCode: string;
}

export function BankTransferQr({ orderCode }: BankTransferQrProps) {
  return (
    <div className="mt-4 rounded-sm border border-dashed border-[#005da4]/40 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-[140px_1fr]">
        <div className="flex aspect-square items-center justify-center rounded-sm bg-slate-100 text-center text-[12px] font-black tracking-[0.16em] text-slate-400 uppercase">
          QR Placeholder
        </div>
        <div className="space-y-2 text-[13px] font-bold text-slate-600">
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Tên tài khoản</span>
            <span className="text-right text-[#1a1a1a]">CONG TY TNHH MECSU</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Số tài khoản</span>
            <span className="text-right text-[#1a1a1a]">1900 2026 0068</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Ngân hàng</span>
            <span className="text-right text-[#1a1a1a]">Vietcombank</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Nội dung</span>
            <span className="text-right text-[#005da4]">{orderCode}</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[12px] font-medium text-slate-500">
        QR chỉ là giao diện tạm trong giai đoạn migration. Chưa có xác minh thanh toán.
      </p>
    </div>
  );
}
