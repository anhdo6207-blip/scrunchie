import React from 'react';
import { ArrowRight, Scissors, Sparkles, Heart } from 'lucide-react';

interface SizeGuidePageProps {
  onNavigate: (page: string) => void;
}

export const SizeGuidePage: React.FC<SizeGuidePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#5CA0E9] uppercase tracking-wider">
          Cẩm nang Blonéa
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#333333]">
          Hướng Dẫn Chọn Kích Thước & Kiểu Tóc Phù Hợp
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          “Mái Tóc Nào, Scrunchie Đó” – Bí kíp giúp bạn chọn được chiếc scrunchie chuẩn form nhất cho mái tóc của mình.
        </p>
      </div>

      {/* S / M / L Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Size S */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#A7C8F0]/25 text-[#2B6CB0] flex items-center justify-center font-black text-lg mb-3">
              S
            </div>
            <h3 className="text-lg font-bold text-[#333333]">Size S (Mini / Nhỏ Xinh)</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Đường kính vải ~8 - 9 cm · Lõi thun ~4.5 cm
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-600">
              <p>
                <strong>Phù hợp cho:</strong> Tóc mỏng, tóc tơ ngắn, tóc buộc nửa đầu hoặc tết tóc 2 bên năng động.
              </p>
              <p>
                <strong>Điểm cộng:</strong> Rất vừa vặn và xinh xắn khi đeo ở cổ tay làm phụ kiện thời trang hằng ngày mà không bị quá khổ.
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 text-xs text-[#5CA0E9] font-bold">
            Giá: Thấp hơn Size M 5.000 VNĐ
          </div>
        </div>

        {/* Size M */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#5CA0E9] shadow-md flex flex-col justify-between space-y-4 relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#5CA0E9] text-white text-[10px] font-extrabold uppercase rounded-full tracking-wider">
            Kích thước tiêu chuẩn
          </span>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFBFD9]/40 text-[#8A1846] flex items-center justify-center font-black text-lg mb-3">
              M
            </div>
            <h3 className="text-lg font-bold text-[#333333]">Size M (Chuẩn Quốc Dân)</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Đường kính vải ~11 - 12 cm · Lõi thun ~5.5 cm
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-600">
              <p>
                <strong>Phù hợp cho:</strong> Đa số bạn gái, từ tóc vừa đến tóc dày, buộc đuôi ngựa cao hoặc búi củ tỏi gọn gàng.
              </p>
              <p>
                <strong>Điểm cộng:</strong> Độ phồng vừa phải, giữ tóc chắc chắn từ 2 - 3 vòng quấn mà không làm nặng da đầu.
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 text-xs text-slate-800 font-bold">
            Giá cơ bản niêm yết trên website
          </div>
        </div>

        {/* Size L */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFFA8A]/50 text-[#6B5900] flex items-center justify-center font-black text-lg mb-3">
              L
            </div>
            <h3 className="text-lg font-bold text-[#333333]">Size L (Bồng Bềnh Tiểu Thư)</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Đường kính vải ~14 - 15 cm · Lõi thun ~6 cm
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-600">
              <p>
                <strong>Phù hợp cho:</strong> Tóc dày, tóc uốn xoăn sóng bồng bềnh, tóc búi lớn khi đi tiệc hoặc chụp ảnh sống ảo.
              </p>
              <p>
                <strong>Điểm cộng:</strong> Tạo hiệu ứng thị giác mái tóc dày dặn và khuôn mặt thon gọn hơn nhờ độ phồng ấn tượng.
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 text-xs text-[#FF70A6] font-bold">
            Giá: Cao hơn Size M 5.000 VNĐ
          </div>
        </div>
      </div>

      {/* Hair styling guide matching BANNER 2 */}
      <div className="bg-[#FFF8F2] rounded-3xl p-6 sm:p-10 border border-[#D9D9E3]/70 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#FF70A6] uppercase tracking-wider">
            Bí kíp tạo kiểu
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#333333] mt-1">
            Gợi Ý Kiểu Tóc Phù Hợp Từng Dòng Scrunchie
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-sm text-[#333333] flex items-center gap-1.5">
              <span>🌸 Tóc Búi Cao Củ Tỏi (Top Knot)</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Khuyên dùng:</strong> Scrunchie Voan Mộng hoặc Scrunchie Lụa Satin Cao Cấp. Vải voan và lụa tạo độ xòe mây bồng bềnh quanh búi tóc, giúp nàng trông cao ráo và gương mặt bừng sáng.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-sm text-[#333333] flex items-center gap-1.5">
              <span>⚡ Tóc Đuôi Ngựa Năng Động (Ponytail)</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Khuyên dùng:</strong> Scrunchie Cotton Caro hoặc Scrunchie Vải Lạnh. Bề mặt cotton và thun lạnh bám tóc chắc chắn, không bị tuột khi bạn vận động hay chạy nhảy cả ngày.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-sm text-[#333333] flex items-center gap-1.5">
              <span>🎀 Tóc Buộc Nửa Đầu Dịu Dàng (Half-up)</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Khuyên dùng:</strong> Scrunchie Viền Contrast hoặc Scrunchie Vải Thô Basic Size S/M. Tôn lên vẻ đẹp e ấp, thanh lịch đúng chuẩn nàng thơ giảng đường.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-sm text-[#333333] flex items-center gap-1.5">
              <span>💫 Đeo Cổ Tay Làm Phụ Kiện (Wrist Accessory)</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Khuyên dùng:</strong> Combo 4 Scrunchie Pastel hoặc Set 3 Sweet Vibes. Những gam màu pastel dịu mắt điểm xuyết trên cổ tay thay thế chiếc lắc tay đơn điệu!
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('products')}
            className="px-6 py-3 bg-[#5CA0E9] hover:bg-[#4387D3] text-white text-xs font-bold rounded-2xl shadow-md transition-colors inline-flex items-center gap-2"
          >
            <span>Chọn mẫu scrunchie ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
