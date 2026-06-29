# Mecsu SSR v03

`Mecsu SSR v03` là frontend rebuild của website Mecsu theo hướng hiện đại, dễ maintain và thân thiện với SEO. Project sử dụng Next.js App Router để xây lại các flow chính của website Mecsu cũ như trang chủ, danh mục, listing sản phẩm, chi tiết sản phẩm, giỏ hàng, checkout, tài khoản, blog, thương hiệu và hỗ trợ khách hàng.

Mục tiêu chính của project:

- Rebuild giao diện và trải nghiệm mua vật tư công nghiệp của Mecsu bằng kiến trúc frontend rõ ràng hơn.
- Tận dụng SSR/SSG của Next.js để cải thiện SEO, tốc độ tải trang đầu và khả năng index nội dung danh mục/sản phẩm/blog.
- Tách code theo domain để dễ mở rộng, dễ bàn giao cho team backend và dễ thay mock data bằng API thật.
- Cho phép frontend phát triển độc lập trước khi backend API hoàn chỉnh bằng mock/static data và service layer.

## Tech Stack

| Layer | Công nghệ |
| --- | --- |
| Framework | Next.js `16.2.9` App Router |
| Ngôn ngữ | TypeScript `^5` |
| UI | React `19.2.4`, component tự xây theo feature |
| Styling | Tailwind CSS `^4`, `clsx`, `tailwind-merge` |
| Icons | `lucide-react` |
| Animation | `motion` `^12.40.0` |
| Auth tích hợp sẵn | Mock auth/localStorage, có adapter Supabase browser client nếu cấu hình env |
| State/Data hiện tại | React state, localStorage services, mock/static data, service layer trong từng feature |
| Package manager | npm |
| Deployment | Phù hợp Vercel/Next.js hosting; cần cấu hình env khi gắn backend thật |

> Repo chưa dùng Zustand, TanStack Query hoặc shadcn/ui trong source hiện tại.

## Bắt Đầu Nhanh

```bash
# 1. Clone project
git clone <repo-url>
cd Mecsu_SSR_v03

# 2. Cài dependencies
npm install

# 3. Chạy development server
npm run dev
```

Development URL mặc định:

```txt
http://localhost:3000
```

Script `dev` hiện chạy:

```bash
next dev --hostname 0.0.0.0 --port 3000
```

## Scripts

| Command | Mô tả |
| --- | --- |
| `npm run dev` | Chạy development server trên port `3000` |
| `npm run build` | Build production bằng Next.js |
| `npm run start` | Chạy production server sau khi build |
| `npm run lint` | Kiểm tra ESLint |

Repo hiện chưa có script `type-check` riêng; TypeScript được kiểm tra trong `next build`.

## Cấu Trúc Thư Mục

```txt
src/
├── app/                  # Next.js App Router: route, layout, metadata, loading
├── components/           # Shared components dùng nhiều nơi
│   ├── layout/           # Header, footer, floating actions
│   ├── shared/           # Breadcrumb, modal scroll lock, date range picker
│   ├── skeletons/        # Loading skeleton theo page
│   └── ui/               # UI primitives nhỏ như toast, skeleton
├── features/             # Module theo domain nghiệp vụ
│   ├── account/
│   ├── addresses/
│   ├── auth/
│   ├── blog/
│   ├── brands/
│   ├── cart/
│   ├── categories/
│   ├── checkout/
│   ├── home/
│   ├── payment-methods/
│   ├── products/
│   ├── promotions/
│   ├── quotations/
│   ├── returns/
│   ├── search/
│   ├── support/
│   └── wishlist/
├── hooks/                # Shared hooks, ví dụ useDebounce
└── lib/                  # Utils/config dùng chung: routing, storage keys, cn()
```

### Ý nghĩa các folder chính

- `src/app/`: định nghĩa route theo App Router. Page ở đây nên giữ vai trò routing, metadata, gọi shell component hoặc service cần thiết. Ví dụ: `src/app/san-pham/[productId]/page.tsx`, `src/app/danh-muc/[categoryId]/[subSlug]/page.tsx`.
- `src/features/`: nơi chứa phần lớn logic theo domain. Mỗi feature thường có `components/`, `data/`, `services/`, `types/`. Ví dụ `features/products`, `features/cart`, `features/account`.
- `src/components/`: component dùng chung toàn app, không phụ thuộc mạnh vào một domain cụ thể. Ví dụ Header/Footer, Breadcrumb, Skeleton.
- `src/lib/`: helper dùng chung như `routing.ts`, `utils.ts`, `image-placeholders.ts`, `storage/storage-keys.ts`.
- `src/hooks/`: hook dùng chung cho nhiều module. Hiện có `useDebounce.ts`.

Không có folder `stores/` global trong source hiện tại. Các trạng thái như cart, address, wishlist, quotation đang chủ yếu dùng React state kết hợp localStorage service.

## Kiến Trúc Tổng Quan

```txt
src/app
  ↓
features/<domain>
  ├── components
  ├── services
  ├── data
  └── types
      ↓
mock/static data hoặc backend API thật sau này
```

Nguyên tắc kiến trúc hiện tại:

- `app/` xử lý route, layout, metadata, static params và gọi page shell.
- Logic theo domain đặt trong `features/<feature-name>/`.
- Data mock/static đặt trong `features/<feature>/data/`.
- Service/data access đặt trong `features/<feature>/services/`.
- TypeScript types đặt trong `features/<feature>/types/` hoặc file `types.ts` của feature.
- Component dùng chung đặt trong `components/`.
- Không nên gọi API rải rác trực tiếp trong nhiều component nếu domain đã có service layer.
- Page cần SEO như category/product/blog nên ưu tiên server component, `generateMetadata`, `generateStaticParams` khi phù hợp.

## Routes Chính Hiện Có

| Route | Chức năng | Module liên quan | Data hiện tại |
| --- | --- | --- | --- |
| `/` | Trang chủ Mecsu | `features/home` | Mock/static home data |
| `/danh-muc` | Tổng quan danh mục | `features/home`, `features/categories` | Mock categories |
| `/danh-muc/[categoryId]` | Trang category cha | `features/categories` | Category service/mock |
| `/danh-muc/[categoryId]/[subSlug]` | Listing theo subcategory | `features/categories`, `features/products` | Product/category mock |
| `/danh-muc/[categoryId]/[subSlug]/[childSlug]` | Listing cate con | `features/categories`, `features/products` | Product/category mock |
| `/san-pham/[productId]` | Chi tiết sản phẩm | `features/products` | `products.ts`, product service |
| `/search?q=` | Tìm kiếm sản phẩm | `features/search` | Search service từ mock products/categories |
| `/gio-hang` | Giỏ hàng | `features/cart` | localStorage cart |
| `/thanh-toan` | Checkout | `features/checkout` | Cart/local form state |
| `/thanh-toan/thanh-cong` | Redirect sang success | `features/checkout` | Redirect `/thanh-cong` |
| `/thanh-cong` | Kết quả thanh toán | `features/checkout` | Last order localStorage |
| `/tai-khoan` | Dashboard tài khoản | `features/account` | Mock account data |
| `/tai-khoan/don-hang` | Danh sách đơn hàng | `features/account` | Mock account orders |
| `/tai-khoan/don-hang/[orderId]` | Chi tiết đơn hàng | `features/account` | Mock order detail |
| `/tai-khoan/dia-chi` | Sổ địa chỉ | `features/addresses` | localStorage addresses |
| `/tai-khoan/phuong-thuc-thanh-toan` | Phương thức thanh toán | `features/payment-methods` | localStorage payment methods |
| `/tai-khoan/thong-tin-ca-nhan` | Hồ sơ cá nhân | `features/account` | Mock profile |
| `/tai-khoan/nhac-hang` | Nhắc hàng/tồn kho | `features/account/stock-alerts` | Mock stock alerts |
| `/tai-khoan/wishlist`, `/tai-khoan/danh-sach` | Wishlist | `features/wishlist` | localStorage wishlist |
| `/tai-khoan/doi-tra` | Đổi trả | `features/returns` | Mock returns |
| `/tai-khoan/gop-y` | Góp ý đánh giá | `features/feedback` | Mock/local form |
| `/tai-khoan/ho-tro` | Hỗ trợ trong tài khoản | `features/support` | Static/mock support data |
| `/blog`, `/blog/[slug]` | Blog/resource hub | `features/blog` | Static blog data |
| `/blog-ky-thuat` | Blog kỹ thuật | `features/blog` | Static technical blog data |
| `/thuong-hieu`, `/thuong-hieu/[slug]`, `/thuong-hieu/[slug]/[...categoryPath]` | Brand listing/detail/catalog | `features/brands` | Mock brands/catalog |
| `/coupons-promo-codes` | Ưu đãi/mã giảm giá | `features/promotions` | Mock promotions |
| `/dich-vu-khach-hang`, `/faqs`, `/faqs/[categoryId]` | CSKH/FAQ public | `features/support` | Static FAQ/support data |
| `/gioi-thieu` | Giới thiệu Mecsu | `features/about` | Static about data |
| `/auth/callback` | Auth callback | `features/auth` | Supabase/mock callback |

## Các Module Chính Hiện Có

| Module | Mô tả | Trạng thái |
| --- | --- | --- |
| Homepage | Hero, search, category, promotion, best deals, featured brands, blog preview | Đã có, mock/static data |
| Header / Navigation | Header desktop/mobile, category menu, search suggestions, account menu, cart button | Đã có |
| Search | Search page và header suggestions | Đã có, dùng mock products/categories |
| Categories | Category overview, breadcrumb, subcategory carousel, listing, filter/sort/view mode | Đã có, cần API thật |
| Product Listing | Grid/list view, filter sidebar, pagination, quantity selector, add cart | Đã có, mock products |
| Product Detail | Gallery, share links, purchase panel, specs, similar products, reviews | Đã có, mock products |
| Cart | Cart page, drawer, add-to-cart popup, quantity control | Đã có, localStorage |
| Checkout | Form checkout, payment method, order summary, success page | Đã có, localStorage/mock |
| Auth | Login/register modal, email verification flow, callback | Đã có, mock + Supabase optional |
| Account | Dashboard, sidebar, profile, orders, addresses, payment methods, wishlist, returns, stock alerts, feedback/support | Đã có, phần lớn mock/localStorage |
| Quotations | Quotation list/detail/create modal trong feature | Có trong source, hiện không còn route `/tai-khoan/bao-gia` |
| Blog | Blog listing/detail, technical blog | Đã có, static data |
| Brands | Brand listing/detail/category catalog | Đã có, mock data |
| Promotions | Coupon/promo page và promotion drop panel | Đã có, mock data |
| Support / FAQ | Customer service public page, FAQ, account support | Đã có, static/mock data |

## Data/API Hiện Tại

| Domain | Data hiện tại | File/folder liên quan | Gợi ý backend sau này |
| --- | --- | --- | --- |
| Products | Mock/static generated data | `features/products/data/products.ts`, `features/products/services/product-service.ts` | Product listing, detail, related, price/stock, images, specs |
| Categories | Mock/static category tree | `features/categories/data/*`, `features/categories/services/category-service.ts` | Category tree, category by slug, subcategory products |
| Search | Search trên mock products/categories | `features/search/services/search-service.ts`, `features/products/services/search-products.ts` | Search API, suggestions API |
| Cart | localStorage snapshot | `features/cart/services/cart-storage.ts` | Cart sync API nếu cần đăng nhập nhiều thiết bị |
| Checkout | localStorage last order + form state | `features/checkout/services/checkout-storage.ts` | Checkout preview, order create, shipping fee, coupon/payment |
| Auth | Mock accounts/localStorage, Supabase optional | `features/auth/services/*`, `features/auth/data/mock-accounts.ts` | Auth API hoặc Supabase config thật |
| Account Orders/Profile | Mock data | `features/account/data/*`, `features/account/services/account-order-service.ts` | Profile, order history/detail, activity, metrics |
| Addresses | localStorage | `features/addresses/services/address-storage.ts` | Address book CRUD API |
| Payment Methods | localStorage | `features/payment-methods/services/payment-method-storage.ts` | Payment method CRUD API |
| Wishlist | localStorage | `features/wishlist/services/wishlist-storage.ts` | Wishlist sync API |
| Quotations | Mock + localStorage | `features/quotations/data/quotations.ts`, `features/quotations/services/quotation-storage.ts` | Quotation list/detail/create/update API |
| Returns | Mock data | `features/returns/data/returns.ts` | Return request API |
| Blog | Static article data | `features/blog/data/*`, `features/blog/services/blog-service.ts` | CMS/blog API |
| Brands | Mock brand/catalog data | `features/brands/data/*` | Brand listing/detail/catalog API |
| Support/FAQ | Static support data | `features/support/data/*` | FAQ/customer service topic/contact API |
| Promotions | Mock promotions | `features/promotions/data/mockPromotions.ts` | Promotion/coupon API |

Khi backend API thật sẵn sàng, ưu tiên thay data trong service layer thay vì sửa trực tiếp các component UI.

## Data Models Chính

Các model hiện có trong source:

- `Product`: `id`, `sku`, `name`, `slug`, `category`, `brand`, `price`, `stock`, `unit`, `minOrderQuantity`, `orderStep`, `image/images`, `rating`, `specifications`.
- `Category`: `id`, `name`, `slug`, `icon`, `subcategories`.
- `CategorySubcategory`: `id`, `name`, `slug`, `href`, `count`.
- `CartItem`: `productId`, `sku`, `name`, `image`, `price`, `quantity`, `stock`, `minOrderQuantity`, `orderStep`, `unit`, `slug`.
- `MockAuthUser`: `id`, `fullName`, `email`, `phone`, `createdAt`.
- `Address`: thông tin người nhận, phone, province/ward/street, `isDefault`.
- `AccountOrder`: `id`, `orderCode`, `orderDate`, `status`, `totalAmount`, `items`.
- `Quotation`: `code`, `status`, dates, totals, items, salesRep, priority, contactInfo.
- `BlogArticle`: `id`, `slug`, `title`, `excerpt`, `category`, `coverImage`, `author`, `publishedDate`.
- `BrandCatalog`: brand metadata, root catalog node, filters, products, children.
- `CheckoutLastOrder`: orderCode, cart items, totals, address, shipping/payment method.
- `ReturnRequest`: returnCode, orderCode, status, refundAmount, reason.

Backend nên ưu tiên giữ các field này hoặc cung cấp mapping rõ ràng để frontend chuyển đổi trong service layer.

## Environment Variables

Project hiện không có `.env.example`. Các biến môi trường được source code tham chiếu:

| Biến | Mô tả |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL Supabase dùng cho auth browser client nếu bật Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `NEXT_PUBLIC_MOCK_EMAIL_VERIFICATION` | Nếu `"true"` thì dùng flow verify email mock |
| `NEXT_PUBLIC_SITE_URL` | Base URL dùng build absolute URL cho share/metadata |
| `NEXT_PUBLIC_APP_URL` | Fallback base URL cho share/metadata |

Nếu chưa cấu hình Supabase, auth vẫn có mock flow/localStorage để phục vụ phát triển frontend.

## Development Conventions

- Component dùng chung đặt trong `src/components/`.
- Component theo nghiệp vụ đặt trong `src/features/<feature-name>/components/`.
- Type dùng riêng cho domain đặt trong `src/features/<feature-name>/types/` hoặc `types.ts`.
- Mock/static data đặt trong `src/features/<feature-name>/data/`.
- Service/API function đặt trong `src/features/<feature-name>/services/`.
- Helper dùng chung đặt trong `src/lib/` hoặc `src/hooks/`.
- Không gọi API trực tiếp rải rác trong nhiều component nếu domain đã có service layer.
- Với route cần SEO, ưu tiên server component, `metadata`/`generateMetadata`, và chỉ dùng client component cho phần thật sự cần tương tác.
- Component/file nên đặt tên rõ nghĩa, dễ search theo domain.
- Khi thêm UI mới, giữ đúng style Mecsu hiện tại: B2B, clean, navy/yellow, border nhẹ, ít shadow.

## Cách Thêm Feature Mới

1. Tạo type nếu feature có data model mới.
2. Tạo mock data hoặc service function trong feature tương ứng.
3. Tạo component UI trong `features/<feature>/components/`.
4. Tạo route trong `src/app/` nếu feature có page riêng.
5. Gắn navigation/header/sidebar nếu cần.
6. Bổ sung loading, empty state, error state nếu flow có dữ liệu động.
7. Chạy `npm run lint` và `npm run build` trước khi merge/push.

Ví dụ cấu trúc feature:

```txt
src/features/example/
├── components/
├── data/
├── services/
├── types/
└── index.ts
```

## Deployment

Project là Next.js App Router nên có thể deploy lên Vercel hoặc môi trường Node.js hỗ trợ Next.js.

Khi deploy production cần lưu ý:

- Chạy `npm run build` để kiểm tra production build.
- Cấu hình các env cần thiết nếu bật Supabase hoặc backend API thật.
- Nếu dùng backend API khác domain, cần thống nhất base URL và CORS.
- Kiểm tra SEO metadata cho route category/product/blog sau khi thay API thật.

## Current Status

### Đã có

- Trang chủ và các section chính.
- Header desktop/mobile, category menu, search suggestions, cart button, account menu.
- Category overview, subcategory page, child subcategory page, product listing grid/list.
- Product detail, gallery, share links, quantity selector, related/similar sections.
- Cart, checkout và payment success flow.
- Account dashboard, orders, order detail, address book, payment methods, wishlist, returns, stock alerts, feedback/support.
- Blog/resource hub, technical blog.
- Brand listing/detail/catalog.
- Promotions/coupons page.
- Public customer service và FAQ.
- Mock auth/register/login/email verification flow, có Supabase optional.
- Phase tối ưu render/listing cơ bản đã có: memo hóa product/listing controls, throttle scroll listener.

### Đang dùng mock/static/localStorage

- Products, categories, homepage data, brands, blog, support/FAQ, promotions.
- Account profile, orders, best sellers, returns, stock alerts.
- Cart, wishlist, addresses, payment methods, checkout last order dùng localStorage.
- Auth có mock account/localStorage nếu chưa cấu hình Supabase.
- Quotation data dùng mock/localStorage trong feature.

### Cần làm tiếp

- Chuẩn hóa API contract với backend cho products, categories, search, cart, checkout, account, blog, brand, support.
- Thay mock/static data bằng API thật qua service layer.
- Chuẩn hóa loading/error/empty state cho các flow dùng API.
- Rà lại responsive mobile/tablet sau khi thay data thật.
- Tối ưu SEO metadata cho category/product/blog theo dữ liệu backend.
- Bổ sung `.env.example` khi thống nhất biến môi trường.
- Thêm test hoặc smoke test cho các flow quan trọng nếu project bước vào production.

