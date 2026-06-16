export type TechnicalBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
};

export type TechnicalBlogBanner = {
  id: number;
  image: string;
  badge: string;
  title: {
    text: string;
    highlight1: string;
    and: string;
    highlight2: string;
  };
  description: string;
};

export const technicalBlogCategories = [
  "Tất cả",
  "Vật liệu học",
  "Cơ khí chính xác",
  "Công nghệ mới",
  "Vận hành & Bảo trì",
];

export const technicalBlogPosts: TechnicalBlogPost[] = [
  {
    id: "5",
    slug: "bulong-he-inch-hex-bolt-huong-dan-chon-chuan-size-grade-mua-uy-tin",
    title: "Bulong Hệ Inch (hex Bolt): Hướng Dẫn Chọn Chuẩn Size, Grade & Mua Uy Tín",
    excerpt:
      "Tìm hiểu cách đọc size, phân biệt Grade 2, 5, 8, TPI và chọn mua bulong hex bolt hệ inch chính hãng tại Mecsu.",
    author: "Admin Mecsu",
    date: "02/05/2026",
    readTime: "15 phút",
    category: "Vật liệu học",
    image: "https://images.unsplash.com/photo-1530124560677-bda8ca8a306c?w=900&auto=format&fit=crop&q=70",
  },
  {
    id: "6",
    slug: "luc-siet-bulong-la-gi-bang-tra-luc-siet-va-cach-tinh-chuan",
    title: "Lực Siết Bulong Là Gì? Bảng Tra Lực Siết và Cách Tính Chuẩn",
    excerpt: "Tra cứu bảng tra lực siết bulong tiêu chuẩn, cách tính lực siết và lưu ý khi vận hành.",
    author: "Tuấn Kỹ Thuật",
    date: "01/05/2026",
    readTime: "10 phút",
    category: "Vận hành & Bảo trì",
    image: "https://images.unsplash.com/photo-1542013936693-884638332954?w=900&auto=format&fit=crop&q=70",
  },
  {
    id: "7",
    slug: "bu-long-cap-ben-8-8-thong-so-ky-thuat-va-ung-dung",
    title: "Bu Lông Cấp Bền 8.8: Thông Số Kỹ Thuật Và Ứng Dụng",
    excerpt: "Tìm hiểu về Grade 8.8 Steel Hex Bolt và các ứng dụng trong kết cấu công nghiệp.",
    author: "Admin Mecsu",
    date: "30/04/2026",
    readTime: "12 phút",
    category: "Vật liệu học",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&auto=format&fit=crop&q=70",
  },
  {
    id: "1",
    slug: "phan-biet-bulong-inox-304-va-316-trong-moi-truong-hoa-chat",
    title: "Phân biệt Bulong inox 304 và 316 trong môi trường hóa chất",
    excerpt: "Hướng dẫn chi tiết cách lựa chọn loại bulong inox phù hợp với điều kiện ăn mòn.",
    author: "Kỹ sư Tuấn Nguyễn",
    date: "15/04/2024",
    readTime: "8 phút",
    category: "Vật liệu học",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=900&auto=format&fit=crop&q=70",
  },
  {
    id: "2",
    slug: "tieu-chuan-ren-he-met-va-he-inch-nhung-sai-lam-thuong-gap",
    title: "Tiêu chuẩn ren hệ Met và hệ Inch: Những sai lầm thường gặp",
    excerpt: "Tại sao việc lắp lẫn hai hệ ren này lại gây nguy hiểm cho hệ thống cơ khí?",
    author: "Kỹ sư Minh Phạm",
    date: "12/04/2024",
    readTime: "12 phút",
    category: "Cơ khí chính xác",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=900&auto=format&fit=crop&q=70",
  },
  {
    id: "3",
    slug: "ung-dung-cua-gia-cong-cnc-5-truc-trong-san-xuat-hang-khong",
    title: "Ứng dụng của gia công CNC 5 trục trong sản xuất hàng không",
    excerpt: "Công nghệ 5 trục mang lại độ chính xác vượt trội như thế nào?",
    author: "Admin Mecsu",
    date: "10/04/2024",
    readTime: "15 phút",
    category: "Công nghệ mới",
    image: "https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?w=900&auto=format&fit=crop&q=70",
  },
  {
    id: "4",
    slug: "cach-bao-tri-may-moc-cong-nghiep-trong-mua-nong",
    title: "Cách bảo trì máy móc công nghiệp trong mùa nóng",
    excerpt: "Mùa nóng là thử thách lớn với khớp nối, bạc đạn và các cụm truyền động.",
    author: "Kỹ sư Hoàng Trần",
    date: "08/04/2024",
    readTime: "6 phút",
    category: "Vận hành & Bảo trì",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&auto=format&fit=crop&q=70",
  },
];

export const innovationPosts: TechnicalBlogPost[] = [
  {
    id: "inv-1",
    slug: "ai-giup-nha-may-tiet-kiem-thoi-gian-kiem-kho",
    title: "Khám phá cách AI giúp các nhà máy tiết kiệm 30% thời gian kiểm kho",
    date: "28/04/2026",
    category: "Công nghệ",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60",
    excerpt: "Ứng dụng trí tuệ nhân tạo để tự động hóa quy trình kho vận.",
    author: "Mecsu Insights",
    readTime: "7 phút",
  },
  {
    id: "inv-2",
    slug: "mecsu-ra-mat-tro-ly-ao-ky-thuat",
    title: "Mecsu ra mắt trợ lý ảo kỹ thuật tư vấn chọn bulong chuẩn xác",
    date: "29/04/2026",
    category: "Sản phẩm mới",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
    excerpt: "Trợ lý ảo giúp đội mua hàng tra cứu thông số nhanh hơn.",
    author: "Mecsu Product",
    readTime: "5 phút",
  },
  {
    id: "inv-3",
    slug: "tuong-lai-gia-cong-chinh-xac-voi-ai",
    title: "Tương lai của gia công chính xác với sự hỗ trợ từ trí tuệ nhân tạo (AI)",
    date: "28/04/2026",
    category: "Công nghệ",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b6d196?w=800&auto=format&fit=crop&q=60",
    excerpt: "AI đang thay đổi cách nhà máy kiểm soát sai số gia công.",
    author: "Mecsu Lab",
    readTime: "8 phút",
  },
  {
    id: "inv-4",
    slug: "toi-uu-chuoi-cung-ung-co-khi-bang-machine-learning",
    title: "Tối ưu hóa chuỗi cung ứng cơ khí bằng thuật toán Machine Learning",
    date: "29/04/2026",
    category: "Giải pháp",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    excerpt: "Dự báo nhu cầu và tối ưu tồn kho vật tư bảo trì.",
    author: "Mecsu Operations",
    readTime: "9 phút",
  },
];

export const shoppingPosts: TechnicalBlogPost[] = [
  {
    id: "shp-1",
    slug: "goi-tiet-kiem-mecsu-plus",
    title: "Gói tiết kiệm Mecsu Plus: Giảm ngay 5% cho doanh nghiệp sản xuất",
    date: "14/04/2026",
    category: "Khuyến mãi",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=60",
    excerpt: "Tối ưu chi phí mua hàng định kỳ cho doanh nghiệp.",
    author: "Mecsu B2B",
    readTime: "4 phút",
  },
  {
    id: "shp-2",
    slug: "khach-hang-b2b-chuyen-doi-chi-tieu-vat-tu-thanh-hoan-tien",
    title: "Cách khách hàng B2B chuyển đổi các khoản chi tiêu vật tư thành hoàn tiền",
    date: "19/03/2026",
    category: "Bán lẻ",
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&auto=format&fit=crop&q=60",
    excerpt: "Quản trị chi tiêu vật tư hiệu quả hơn với chương trình doanh nghiệp.",
    author: "Mecsu Finance",
    readTime: "6 phút",
  },
  {
    id: "shp-3",
    slug: "bao-cao-quy-1-doanh-nghiep-toi-uu-chi-phi",
    title: "Báo cáo quý 1: Doanh nghiệp tối ưu chi phí hiệu quả nhờ Mecsu PRO",
    date: "29/04/2026",
    category: "Tin công ty",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    excerpt: "Những chỉ số nổi bật từ nhóm khách hàng công nghiệp.",
    author: "Mecsu Team",
    readTime: "5 phút",
  },
  {
    id: "shp-4",
    slug: "top-20-dung-cu-dien-cam-tay-giam-manh",
    title: "Top 20 sản phẩm dụng cụ điện cầm tay giảm mạnh nhất mùa hè này",
    date: "27/04/2026",
    category: "Bán lẻ",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=60",
    excerpt: "Danh sách sản phẩm đáng chú ý cho đội bảo trì.",
    author: "Mecsu Buying Guide",
    readTime: "6 phút",
  },
];

export const lifePosts: TechnicalBlogPost[] = [
  {
    id: "lf-1",
    slug: "tham-quan-trung-tam-phan-phoi-vat-tu-thong-minh",
    title: "Tham quan Trung tâm Phân phối Vật tư Cơ khí thông minh của Mecsu",
    date: "26/03/2026",
    category: "Vận hành",
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c159bf?w=800&auto=format&fit=crop&q=60",
    excerpt: "Bên trong trung tâm vận hành phục vụ đơn hàng B2B.",
    author: "Mecsu Warehouse",
    readTime: "7 phút",
  },
  {
    id: "lf-2",
    slug: "mecsu-ho-tro-trang-thiet-bi-cho-truong-day-nghe",
    title: "Đội ngũ Mecsu chung tay hỗ trợ trang thiết bị cho các trường dạy nghề",
    date: "01/05/2026",
    category: "Cộng đồng",
    image: "https://images.unsplash.com/photo-1531206715517-5c561081788a?w=800&auto=format&fit=crop&q=60",
    excerpt: "Kết nối cộng đồng kỹ thuật trẻ với thiết bị thực hành.",
    author: "Mecsu Community",
    readTime: "5 phút",
  },
  {
    id: "lf-3",
    slug: "ceo-mecsu-toc-do-khong-bang-su-chinh-xac",
    title: "CEO Mecsu chia sẻ: Tốc độ không bằng sự chính xác trong kỹ thuật",
    date: "30/04/2026",
    category: "Nhân vật",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop&q=60",
    excerpt: "Góc nhìn về tốc độ, chuẩn hóa và niềm tin trong B2B.",
    author: "Mecsu Editorial",
    readTime: "8 phút",
  },
  {
    id: "lf-4",
    slug: "9-bai-hoc-sau-10-nam-phan-phoi-vat-tu",
    title: "9 bài học quý giá sau 10 năm gắn bó với ngành phân phối vật tư",
    date: "10/04/2026",
    category: "Góc nhìn",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60",
    excerpt: "Những bài học từ thực tế chuỗi cung ứng công nghiệp.",
    author: "Mecsu Team",
    readTime: "9 phút",
  },
];

export const featuredStories: TechnicalBlogPost[] = [
  {
    id: "fs-1",
    slug: "quy-trinh-kiem-dinh-chat-luong-sieu-toc",
    title: "Bên trong quy trình kiểm định chất lượng siêu tốc từ nhà sản xuất",
    date: "18/02/2026",
    category: "Chất lượng",
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&auto=format&fit=crop&q=60",
    excerpt: "Quy trình kiểm soát chất lượng trước khi xuất kho.",
    author: "Mecsu QA",
    readTime: "6 phút",
  },
  {
    id: "fs-2",
    slug: "giai-phap-mecsu-giup-nha-may-tang-toc-san-xuat",
    title: "Giải pháp từ Mecsu giúp nhà máy lắp ráp tăng tốc độ sản xuất lên 150%",
    date: "25/11/2025",
    category: "Giải pháp",
    image: "https://images.unsplash.com/photo-1565439390118-c215d2a6a623?w=800&auto=format&fit=crop&q=60",
    excerpt: "Case study về đặt hàng nhanh và chuẩn hóa mã vật tư.",
    author: "Mecsu Solutions",
    readTime: "10 phút",
  },
  {
    id: "fs-3",
    slug: "tu-dong-hoa-tram-giao-hang-vat-tu",
    title: "Tự động hóa trạm giao hàng: Đưa vật tư đến công trường vào mọi thời điểm",
    date: "09/10/2025",
    category: "Vận hành",
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=60",
    excerpt: "Mô hình giao hàng linh hoạt cho công trường và nhà máy.",
    author: "Mecsu Logistics",
    readTime: "7 phút",
  },
  {
    id: "fs-4",
    slug: "the-gioi-oc-vit-vi-co-khi",
    title: "Mảnh ghép quan trọng: Khám phá thế giới của những chiếc ốc vít vi cơ khí",
    date: "03/09/2025",
    category: "Kiến thức",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&auto=format&fit=crop&q=60",
    excerpt: "Ứng dụng vi cơ khí trong thiết bị chính xác.",
    author: "Mecsu Technical",
    readTime: "8 phút",
  },
];

export const technicalBlogBanners: TechnicalBlogBanner[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&auto=format&fit=crop&q=80",
    badge: "Cập nhật tin tức và công nghệ mới nhất",
    title: {
      text: "Khám phá thế giới",
      highlight1: "kỹ thuật",
      and: "và",
      highlight2: "công nghiệp",
    },
    description:
      "Nguồn thông tin uy tín về vật liệu học, cơ khí chính xác, công nghệ mới và các giải pháp tối ưu vận hành từ các chuyên gia hàng đầu.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1600&auto=format&fit=crop&q=80",
    badge: "Chuyên đề đặc biệt",
    title: {
      text: "Tối ưu hóa hệ thống",
      highlight1: "tự động hóa",
      and: "trong",
      highlight2: "nhà máy",
    },
    description:
      "Ngành công nghiệp tự động hóa đang chuyển mình. Cập nhật ngay các bài viết phân tích sâu từ các kỹ sư đầu ngành.",
  },
  {
    id: 3,
    image: "https://plus.unsplash.com/premium_photo-1664303886548-5256eafca6d3?w=1600&auto=format&fit=crop&q=80",
    badge: "Kiến thức chuyên môn",
    title: {
      text: "Vật liệu kỹ thuật",
      highlight1: "tiên tiến",
      and: "và",
      highlight2: "ứng dụng",
    },
    description:
      "Hiểu rõ về các loại vật liệu mới, độ bền dai, khả năng chống ăn mòn và cách chọn vật liệu đúng cho thiết kế của bạn.",
  },
];
