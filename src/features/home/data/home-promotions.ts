export type HomePromotion = {
  id: string;
  title: string;
  image: string;
  disclaimer: string;
  href: string;
};

export const HOME_PROMOTIONS: HomePromotion[] = [
  {
    id: "sat-thep-xay-dung",
    title: "Giảm 15% Vật Liệu\nSắt Thép Xây Dựng",
    image: "/assets/promotions/NhaMay.png",
    disclaimer: "Áp dụng cho đơn hàng dự án. Kết thúc ngày 25/05/2026",
    href: "#",
  },
  {
    id: "bulong-oc-vit",
    title: "Ưu Đãi 20%\nBulong & Ốc Vít\nCông Trình",
    image: "/assets/promotions/NhaMay01.png",
    disclaimer: "Áp dụng thương hiệu đạt chuẩn ISO. Kết thúc ngày 17/05/2026",
    href: "#",
  },
  {
    id: "bo-cong-cu",
    title: "Tặng Bộ Công Cụ\nKhi Mua Máy Thi\nCông",
    image: "/assets/promotions/NhaMay02.png",
    disclaimer: "Áp dụng dòng máy DEWALT & Milwaukee. Kết thúc ngày 28/06/2026",
    href: "#",
  },
  {
    id: "bao-ho-lao-dong",
    title: "Combo Bảo Hộ\nLao Động Công\nTrường",
    image: "/assets/promotions/NhaMay03.jpg",
    disclaimer: "Giảm thêm 10% khi mua theo nhóm. Kết thúc ngày 17/05/2026",
    href: "#",
  },
];
