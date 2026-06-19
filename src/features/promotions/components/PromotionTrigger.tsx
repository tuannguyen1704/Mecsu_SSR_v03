interface PromotionTriggerProps {
  open: boolean;
  onClick: () => void;
}

export function PromotionTrigger({ onClick }: PromotionTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[18px] font-medium text-blue-600 hover:underline"
    >
      Ưu đãi mua hàng
    </button>
  );
}
