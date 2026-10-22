import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Blonéa hiện có những dòng scrunchie nào?',
      a: 'Blonéa hiện cung cấp đa dạng các dòng scrunchie được thiết kế riêng cho bạn gái trẻ: Scrunchie Lụa Basic, Scrunchie Vải Thô Basic, Scrunchie Cotton Caro năng động, Scrunchie Vải Lạnh mát mẻ, Scrunchie Voan Mộng tiểu thư, Scrunchie Viền Contrast, Scrunchie Lụa Satin Cao Cấp và Scrunchie Vải Nhung ấm áp. Ngoài ra còn có Set 3 Sweet Vibes và Combo 4 Scrunchie Pastel tiết kiệm tới 21.000 VNĐ.',
    },
    {
      q: 'Tôi có thể tự do chọn màu sắc theo sở thích không?',
      a: 'Hoàn toàn được! Mỗi sản phẩm đơn lẻ tại Blonéa đều có bảng màu pastel đa dạng như Xanh Baby (#A7C8F0), Hồng Pastel (#FFBFD9), Vàng Nhạt (#FFFA8A), Xám Khói, Xám Tím Nhạt hoặc Kem Tự Nhiên. Bạn chỉ cần bấm vào ô màu sắc mong muốn trên trang chi tiết sản phẩm trước khi thêm vào giỏ hàng.',
    },
    {
      q: 'Các kích thước S, M và L khác nhau như thế nào?',
      a: 'Size M là kích thước chuẩn "quốc dân" (đường kính ~11-12cm), phù hợp với đại đa số kiểu tóc đuôi ngựa hay búi gọn. Size S (đường kính ~8-9cm, giá thấp hơn Size M 5.000 VNĐ) dành cho tóc mỏng, tóc ngắn hoặc đeo cổ tay. Size L (đường kính ~14-15cm, giá cao hơn Size M 5.000 VNĐ) có độ phồng bồng bềnh tiểu thư, ôm trọn mái tóc dày hoặc tóc uốn xoăn. Lưu ý: Các combo đóng gói theo bộ giữ mức giá cố định.',
    },
    {
      q: 'Làm thế nào để đặt hàng trên website Blonéa?',
      a: 'Rất đơn giản và nhanh chóng: Bạn chọn sản phẩm ưng ý -> Chọn màu sắc và kích cỡ -> Bấm "Thêm vào giỏ" hoặc "Mua ngay" -> Điền địa chỉ nhận hàng và số điện thoại -> Chọn phương thức thanh toán (COD khi nhận hàng hoặc Chuyển khoản ngân hàng) -> Nhấn "Đặt hàng ngay". Hệ thống sẽ cấp cho bạn một mã đơn hàng duy nhất để theo dõi.',
    },
    {
      q: 'Tôi có thể thay đổi màu sắc hoặc số lượng sau khi đã đặt hàng không?',
      a: 'Nếu bạn cần điều chỉnh thông tin đơn hàng, vui lòng liên hệ ngay với Blonéa qua mục Liên hệ hoặc hotline hỗ trợ trong vòng 2 giờ kể từ khi đặt hàng. Nhân viên sẽ hỗ trợ cập nhật thông tin trước khi kiện hàng được bàn giao cho đơn vị vận chuyển.',
    },
    {
      q: 'Làm thế nào để tôi có thể theo dõi tiến độ đơn hàng?',
      a: 'Sau khi đặt hàng thành công, bạn sẽ nhận được một mã đơn hàng (ví dụ: BLO-89421). Bạn chỉ cần truy cập trang "Theo dõi đơn hàng" trên menu website và nhập mã này để kiểm tra xem đơn hàng đang ở bước nào (Đã tiếp nhận, Đang đóng gói hay Đang giao hàng).',
    },
    {
      q: 'Tôi cần làm gì nếu sản phẩm nhận được có lỗi kỹ thuật?',
      a: 'Blonéa cam kết hỗ trợ đổi trả miễn phí trong vòng 7 ngày nếu sản phẩm có lỗi từ nhà sản xuất (như đứt chun, bung chỉ may, sai màu sắc so với đơn đặt). Bạn chỉ cần gửi ảnh chụp tình trạng sản phẩm tới bộ phận chăm sóc khách hàng của Blonéa để được xử lý đổi mới nhanh chóng.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#5CA0E9] uppercase tracking-wider flex items-center justify-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-[#FF70A6]" />
          Giải đáp thắc mắc
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#333333]">
          Câu Hỏi Thường Gặp (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Những điều bạn gái thường quan tâm khi tìm kiếm chiếc scrunchie hoàn hảo tại Blonéa.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FFFDF9] transition-colors"
              >
                <span className="text-xs sm:text-sm font-bold text-[#333333]">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#5CA0E9]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help CTA */}
      <div className="bg-[#FFF8F2] rounded-3xl p-6 sm:p-8 border border-[#D9D9E3]/70 text-center space-y-3">
        <h3 className="font-bold text-sm sm:text-base text-[#333333]">
          Bạn vẫn còn câu hỏi khác cần được tư vấn?
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Đội ngũ tư vấn Blonéa luôn sẵn sàng hỗ trợ bạn lựa chọn màu sắc và chất liệu scrunchie ưng ý nhất.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-2.5 bg-[#5CA0E9] hover:bg-[#4387D3] text-white text-xs font-bold rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5"
        >
          <span>Liên hệ với Blonéa</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
