export type PublicFaqCategoryId =
  | "dat-hang"
  | "thanh-toan"
  | "giao-hang"
  | "doi-tra-bao-hanh"
  | "tai-khoan"
  | "thong-tin-san-pham"
  | "bao-gia-doanh-nghiep"
  | "hoa-don-chung-tu"
  | "tu-van-ky-thuat";

export interface PublicFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PublicFaqCategory {
  id: PublicFaqCategoryId;
  name: string;
  iconKey: string;
  description: string;
  faqs: PublicFaqItem[];
}

export const publicFaqCategories: PublicFaqCategory[] = [
  {
    id: "dat-hang",
    name: "Đặt hàng",
    iconKey: "package",
    description: "Hướng dẫn các cách đặt hàng trên Mecsu",
    faqs: [
      {
        id: "dh-1",
        question: "Làm sao để đặt hàng trên Mecsu?",
        answer:
          "Bạn có thể tìm sản phẩm qua thanh tìm kiếm hoặc danh mục, chọn sản phẩm, thêm vào giỏ hàng rồi tiến hành thanh toán. Nếu đã có mã hàng, bạn có thể tìm trực tiếp bằng SKU hoặc gửi danh sách mã hàng để Mecsu hỗ trợ.",
      },
      {
        id: "dh-2",
        question: "Tôi có thể đặt hàng khi chưa có tài khoản không?",
        answer:
          "Có. Bạn vẫn có thể đặt hàng nhanh, nhưng tài khoản Mecsu giúp theo dõi đơn hàng, lưu địa chỉ, xem lịch sử mua và gửi lại yêu cầu báo giá tiện hơn.",
      },
      {
        id: "dh-3",
        question: "Làm sao để hủy đơn hàng?",
        answer:
          "Bạn cần liên hệ Mecsu càng sớm càng tốt qua hotline hoặc trung tâm hỗ trợ. Nếu đơn hàng chưa xuất kho, Mecsu sẽ hỗ trợ hủy hoặc điều chỉnh theo tình trạng xử lý.",
      },
      {
        id: "dh-4",
        question: "Tôi có thể chỉnh sửa đơn hàng sau khi đặt không?",
        answer:
          "Có thể chỉnh sửa địa chỉ, số lượng hoặc sản phẩm nếu đơn hàng chưa được xác nhận xuất kho. Hãy vào mục Đơn hàng hoặc liên hệ tư vấn viên để được hỗ trợ.",
      },
      {
        id: "dh-5",
        question: "Làm sao để yêu cầu báo giá trước khi mua?",
        answer:
          "Bạn có thể yêu cầu báo giá từ trang sản phẩm, trang báo giá trong tài khoản hoặc gửi danh sách mã sản phẩm và số lượng qua email/chat để Mecsu phản hồi nhanh.",
      },
      {
        id: "dh-6",
        question: "Tôi có thể mua số lượng lớn cho doanh nghiệp không?",
        answer:
          "Có. Mecsu hỗ trợ báo giá theo số lượng, giao hàng theo lịch trình và xử lý chứng từ cho khách hàng doanh nghiệp.",
      },
      {
        id: "dh-7",
        question: "Làm sao để kiểm tra trạng thái đơn hàng?",
        answer:
          "Bạn có thể truy cập mục Đơn hàng trong tài khoản để xem trạng thái xử lý, vận chuyển và chi tiết từng đơn.",
      },
      {
        id: "dh-8",
        question: "Tôi có thể đặt hàng bằng mã sản phẩm hoặc hình ảnh không?",
        answer:
          "Có. Bạn có thể tìm bằng mã sản phẩm hoặc gửi hình ảnh/thông số cho đội ngũ tư vấn để được gợi ý mã tương đương.",
      },
      {
        id: "dh-9",
        question: "Mecsu có hỗ trợ tìm sản phẩm tương đương không?",
        answer:
          "Có. Đội ngũ kỹ thuật hỗ trợ kiểm tra tiêu chuẩn, vật liệu, kích thước và đề xuất sản phẩm tương đương khi cần.",
      },
      {
        id: "dh-10",
        question: "Tôi có thể đặt lại sản phẩm đã mua trước đó không?",
        answer:
          "Có. Hãy vào lịch sử đơn hàng, mở đơn cũ và chọn mua lại hoặc gửi lại danh sách mã hàng cho Mecsu.",
      },
    ],
  },
  {
    id: "thanh-toan",
    name: "Thanh toán",
    iconKey: "file-check",
    description: "Thông tin về phương thức thanh toán và hóa đơn",
    faqs: [
      {
        id: "tt-1",
        question: "Mecsu hỗ trợ những phương thức thanh toán nào?",
        answer:
          "Mecsu hỗ trợ chuyển khoản, thanh toán khi nhận hàng và các phương thức phù hợp với từng loại đơn hàng hoặc điều khoản doanh nghiệp.",
      },
      {
        id: "tt-2",
        question: "Khi nào tôi nhận được hóa đơn?",
        answer:
          "Hóa đơn được xử lý sau khi đơn hàng hoàn tất thông tin thanh toán và xuất hóa đơn. Bạn có thể xem hoặc yêu cầu tải lại trong mục đơn hàng.",
      },
      {
        id: "tt-3",
        question: "Tôi có thể thanh toán bằng thẻ doanh nghiệp không?",
        answer:
          "Có thể hỗ trợ tùy trường hợp. Với đơn hàng doanh nghiệp, Mecsu sẽ xác nhận phương án thanh toán phù hợp trước khi xử lý.",
      },
      {
        id: "tt-4",
        question: "Làm sao để xuất hóa đơn VAT cho doanh nghiệp?",
        answer:
          "Bạn cần cung cấp tên công ty, mã số thuế, địa chỉ và email nhận hóa đơn khi thanh toán hoặc trong phần thông tin tài khoản.",
      },
      {
        id: "tt-5",
        question: "Chính sách thanh toán cho đơn hàng số lượng lớn?",
        answer:
          "Đơn hàng số lượng lớn có thể được báo giá và xác nhận điều kiện thanh toán riêng theo nhu cầu doanh nghiệp.",
      },
    ],
  },
  {
    id: "giao-hang",
    name: "Giao hàng",
    iconKey: "truck",
    description: "Thông tin vận chuyển và nhận hàng",
    faqs: [
      {
        id: "gh-1",
        question: "Thời gian giao hàng dự kiến là bao lâu?",
        answer:
          "Thời gian phụ thuộc vào tồn kho, địa chỉ nhận hàng và phương thức vận chuyển. Mecsu sẽ hiển thị hoặc thông báo thời gian dự kiến khi xác nhận đơn.",
      },
      {
        id: "gh-2",
        question: "Tôi có thể thay đổi địa chỉ giao hàng không?",
        answer:
          "Có thể thay đổi nếu đơn hàng chưa xuất kho. Vui lòng cập nhật sớm qua trang thanh toán, tài khoản hoặc liên hệ hỗ trợ.",
      },
      {
        id: "gh-3",
        question: "Mecsu có giao hàng vào cuối tuần không?",
        answer:
          "Một số khu vực có thể hỗ trợ giao cuối tuần. Hãy liên hệ Mecsu để kiểm tra khả năng giao hàng và phí phát sinh nếu có.",
      },
      {
        id: "gh-4",
        question: "Làm sao để theo dõi đơn hàng đang vận chuyển?",
        answer:
          "Bạn có thể xem trạng thái trong mục Đơn hàng. Nếu có mã vận đơn, Mecsu sẽ cập nhật theo từng mốc vận chuyển.",
      },
      {
        id: "gh-5",
        question: "Phí vận chuyển được tính như thế nào?",
        answer:
          "Phí vận chuyển phụ thuộc vào khu vực, trọng lượng, kích thước hàng và dịch vụ giao hàng được chọn.",
      },
    ],
  },
  {
    id: "doi-tra-bao-hanh",
    name: "Đổi trả & bảo hành",
    iconKey: "refresh",
    description: "Chính sách đổi trả và bảo hành sản phẩm",
    faqs: [
      {
        id: "dt-1",
        question: "Chính sách đổi trả của Mecsu như thế nào?",
        answer:
          "Mecsu hỗ trợ đổi trả khi sản phẩm lỗi, sai mô tả hoặc hư hỏng trong vận chuyển theo điều kiện từng đơn hàng.",
      },
      {
        id: "dt-2",
        question: "Sản phẩm lỗi kỹ thuật thì xử lý ra sao?",
        answer:
          "Bạn cần gửi hình ảnh/video và mô tả lỗi. Đội ngũ Mecsu sẽ kiểm tra và đề xuất đổi mới, bảo hành hoặc phương án phù hợp.",
      },
      {
        id: "dt-3",
        question: "Quy trình đổi trả sản phẩm như thế nào?",
        answer:
          "Gửi yêu cầu đổi trả, chờ xác nhận điều kiện, đóng gói sản phẩm và thực hiện theo hướng dẫn của Mecsu.",
      },
      {
        id: "dt-4",
        question: "Sản phẩm đặt hàng riêng có được đổi trả không?",
        answer:
          "Sản phẩm đặt riêng thường không đổi trả trừ khi lỗi kỹ thuật, sai thông số hoặc có thỏa thuận riêng trong báo giá.",
      },
      {
        id: "dt-5",
        question: "Thời gian bảo hành sản phẩm là bao lâu?",
        answer:
          "Thời gian bảo hành phụ thuộc nhóm hàng và chính sách nhà sản xuất. Thông tin cụ thể được xác nhận theo từng sản phẩm.",
      },
    ],
  },
  {
    id: "tai-khoan",
    name: "Tài khoản",
    iconKey: "building",
    description: "Quản lý tài khoản và thông tin cá nhân",
    faqs: [
      {
        id: "tk-1",
        question: "Làm sao để tạo tài khoản Mecsu?",
        answer:
          "Bạn có thể đăng ký bằng email/số điện thoại từ header hoặc tạo tài khoản trong quá trình mua hàng.",
      },
      {
        id: "tk-2",
        question: "Quên mật khẩu thì phải làm gì?",
        answer:
          "Chọn Quên mật khẩu tại form đăng nhập và làm theo hướng dẫn để đặt lại mật khẩu.",
      },
      {
        id: "tk-3",
        question: "Tôi có thể thay đổi thông tin tài khoản không?",
        answer:
          "Có. Bạn có thể cập nhật thông tin cá nhân, địa chỉ giao hàng và phương thức thanh toán trong khu vực tài khoản.",
      },
      {
        id: "tk-4",
        question: "Làm sao để xem lịch sử mua hàng?",
        answer:
          "Đăng nhập tài khoản, vào mục Đơn hàng để xem danh sách và chi tiết các đơn đã đặt.",
      },
      {
        id: "tk-5",
        question: "Mecsu có chương trình khách hàng thân thiết không?",
        answer:
          "Mecsu có các chương trình ưu đãi theo mùa và chính sách riêng cho khách hàng doanh nghiệp.",
      },
    ],
  },
  {
    id: "thong-tin-san-pham",
    name: "Thông tin sản phẩm",
    iconKey: "file-text",
    description: "Tìm hiểu thông số và đặc tính sản phẩm",
    faqs: [
      {
        id: "tsp-1",
        question: "Làm sao để kiểm tra thông số kỹ thuật của sản phẩm?",
        answer:
          "Thông số được hiển thị trong trang sản phẩm. Nếu cần xác minh thêm, bạn có thể gửi mã hàng hoặc hình ảnh để Mecsu hỗ trợ.",
      },
      {
        id: "tsp-2",
        question: "Nếu hình ảnh không giống sản phẩm thực tế thì sao?",
        answer:
          "Hình ảnh có thể khác nhẹ do góc chụp hoặc phiên bản nhà sản xuất. Nếu sản phẩm nhận được sai mô tả, Mecsu sẽ hỗ trợ xử lý.",
      },
      {
        id: "tsp-3",
        question: "Mecsu có cung cấp mẫu thử sản phẩm không?",
        answer:
          "Một số nhóm hàng có thể hỗ trợ mẫu hoặc tài liệu kỹ thuật tùy điều kiện cung ứng.",
      },
      {
        id: "tsp-4",
        question: "Làm sao để tìm sản phẩm tương đương thay thế?",
        answer:
          "Gửi thông số, tiêu chuẩn hoặc hình ảnh sản phẩm hiện tại, đội ngũ kỹ thuật sẽ đề xuất mã tương đương phù hợp.",
      },
      {
        id: "tsp-5",
        question: "Sản phẩm trên Mecsu có chính hãng không?",
        answer:
          "Mecsu ưu tiên sản phẩm từ nhà cung cấp uy tín và cung cấp chứng từ khi có yêu cầu phù hợp với nhóm hàng.",
      },
    ],
  },
  {
    id: "bao-gia-doanh-nghiep",
    name: "Báo giá doanh nghiệp",
    iconKey: "quote",
    description: "Báo giá và ưu đãi cho doanh nghiệp",
    faqs: [
      {
        id: "bg-1",
        question: "Làm sao để yêu cầu báo giá cho doanh nghiệp?",
        answer:
          "Bạn có thể tạo yêu cầu báo giá trong tài khoản hoặc gửi danh sách mã hàng, số lượng và thời gian cần hàng cho Mecsu.",
      },
      {
        id: "bg-2",
        question: "Mecsu có hỗ trợ giá sỉ cho doanh nghiệp không?",
        answer:
          "Có. Giá sỉ được xem xét theo số lượng, nhóm hàng, tồn kho và chính sách nhà cung cấp.",
      },
      {
        id: "bg-3",
        question: "Mecsu có ký hợp đồng cung cấp hàng cho doanh nghiệp không?",
        answer:
          "Có thể hỗ trợ với các đơn hàng dự án hoặc nhu cầu mua định kỳ. Mecsu sẽ trao đổi điều khoản cụ thể theo từng trường hợp.",
      },
      {
        id: "bg-4",
        question: "Thời gian phản hồi báo giá là bao lâu?",
        answer:
          "Báo giá thông thường được phản hồi trong giờ làm việc. Danh sách nhiều mã hoặc hàng đặc thù có thể cần thêm thời gian xác nhận.",
      },
      {
        id: "bg-5",
        question: "Doanh nghiệp có được xuất hóa đơn VAT riêng không?",
        answer:
          "Có. Vui lòng cung cấp thông tin doanh nghiệp đầy đủ khi đặt hàng hoặc gửi yêu cầu báo giá.",
      },
    ],
  },
  {
    id: "hoa-don-chung-tu",
    name: "Hóa đơn & chứng từ",
    iconKey: "download",
    description: "Quản lý hóa đơn và chứng từ mua hàng",
    faqs: [
      {
        id: "hd-1",
        question: "Làm sao để xuất hóa đơn VAT?",
        answer:
          "Cung cấp tên công ty, mã số thuế, địa chỉ và email nhận hóa đơn trong quá trình thanh toán hoặc liên hệ hỗ trợ.",
      },
      {
        id: "hd-2",
        question: "Tôi có thể tải lại hóa đơn cũ không?",
        answer:
          "Bạn có thể vào chi tiết đơn hàng hoặc liên hệ hỗ trợ để yêu cầu gửi lại hóa đơn.",
      },
      {
        id: "hd-3",
        question: "Tôi cần sửa thông tin hóa đơn thì làm sao?",
        answer:
          "Liên hệ Mecsu càng sớm càng tốt. Việc điều chỉnh phụ thuộc trạng thái phát hành hóa đơn.",
      },
      {
        id: "hd-4",
        question: "Làm sao để lấy chứng từ giao hàng?",
        answer:
          "Chứng từ giao hàng được cung cấp theo từng đơn. Bạn có thể yêu cầu trong trang đơn hàng hoặc qua email hỗ trợ.",
      },
      {
        id: "hd-5",
        question: "Mecsu có xuất hóa đơn điện tử không?",
        answer:
          "Có. Hóa đơn điện tử được gửi qua email sau khi hoàn tất xử lý thông tin hóa đơn.",
      },
    ],
  },
  {
    id: "tu-van-ky-thuat",
    name: "Tư vấn kỹ thuật",
    iconKey: "wrench",
    description: "Hỗ trợ chọn đúng sản phẩm và thông số",
    faqs: [
      {
        id: "tv-1",
        question: "Tôi không biết chọn đúng sản phẩm thì phải làm sao?",
        answer:
          "Bạn có thể gửi nhu cầu sử dụng, thông số hoặc ảnh sản phẩm hiện tại để đội ngũ Mecsu tư vấn mã phù hợp.",
      },
      {
        id: "tv-2",
        question: "Có thể gửi hình ảnh/mã sản phẩm để được tư vấn không?",
        answer:
          "Có. Gửi hình ảnh, SKU, tiêu chuẩn hoặc kích thước giúp Mecsu tư vấn nhanh và chính xác hơn.",
      },
      {
        id: "tv-3",
        question: "Mecsu có hỗ trợ tư vấn tại công trường không?",
        answer:
          "Tùy dự án và khu vực, Mecsu có thể trao đổi hình thức hỗ trợ kỹ thuật phù hợp.",
      },
      {
        id: "tv-4",
        question: "Thời gian phản hồi tư vấn kỹ thuật là bao lâu?",
        answer:
          "Các yêu cầu đơn giản thường được phản hồi trong giờ làm việc. Yêu cầu phức tạp có thể cần thêm thời gian kiểm tra.",
      },
      {
        id: "tv-5",
        question: "Mecsu có tài liệu kỹ thuật không?",
        answer:
          "Có thể cung cấp catalogue, datasheet hoặc thông số kỹ thuật nếu nhà cung cấp có sẵn tài liệu.",
      },
    ],
  },
];

export function getPublicFaqCategory(categoryId: string) {
  return publicFaqCategories.find((category) => category.id === categoryId);
}

export function getAllPublicFaqItems() {
  return publicFaqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({ category, faq })),
  );
}
