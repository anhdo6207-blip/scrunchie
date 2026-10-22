import React from 'react';
import { BloneaLogo } from '../components/BloneaLogo';
import { BRAND_COLORS } from '../data/products';
import { Sparkles, Heart, Shield, Award, Users, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <BloneaLogo size="lg" showTagline={true} />
        <h1 className="text-2xl sm:text-4xl font-black text-[#333333] pt-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Blonéa – Xinh Trên Tóc, Điệu Trên Tay
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Thương hiệu phụ kiện scrunchies và đồ buộc tóc mang năng lượng tươi sáng, dịu dàng, đồng hành cùng bạn gái trẻ Việt Nam.
        </p>
      </div>

      {/* Brand Story (From user brief) */}
      <div className="bg-[#FFF8F2] rounded-3xl p-8 sm:p-12 border border-[#D9D9E3]/70 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFBFD9]/50 text-[#8A1846] text-xs font-bold rounded-full uppercase">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Về Chúng Mình</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-[#333333]">
          Blonéa – Một Chút Điệu Đà Cho Mỗi Ngày
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Blonéa là thương hiệu phụ kiện tóc hướng đến những cô gái trẻ yêu thích sự nữ tính, tươi sáng và phong cách riêng. Chúng tôi mong muốn mang đến những chiếc scrunchie dễ phối hợp với trang phục hằng ngày, giúp mỗi cô gái tự tin thể hiện cá tính qua những chi tiết nhỏ.
          </p>
          <p>
            Với bảng màu pastel dịu dàng và phong cách thiết kế trẻ trung, Blonéa hướng đến việc biến những phụ kiện quen thuộc thành điểm nhấn đáng yêu trong cuộc sống thường ngày.
          </p>
          <p>
            Từ tóc búi cao đến đuôi ngựa, đến những kiểu tóc cá tính, Blonéa luôn có scrunchies dành riêng cho bạn. Từng đường may, từng loại vải lụa, vải voan mộng hay cotton caro đều được chăm chút kỹ lưỡng để mái tóc luôn được êm ái, bồng bềnh nhất.
          </p>
        </div>
      </div>

      {/* Brand Identity & Color Philosophy */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#5CA0E9] uppercase tracking-wider">
            Ý nghĩa nhận diện
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#333333]">
            Sắc Màu Đồng Điệu Cùng Cảm Xúc
          </h2>
          <p className="text-xs text-slate-500">
            Hệ thống 4 gam màu chủ đạo xây dựng nên bản sắc Blonéa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRAND_COLORS.map((c) => (
            <div
              key={c.name}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2"
            >
              <div
                className="w-10 h-10 rounded-xl shadow-xs border border-black/10"
                style={{ backgroundColor: c.hex }}
              />
              <h3 className="text-sm font-bold text-[#333333]">{c.name}</h3>
              <p className="text-xs text-slate-500">{c.meaning}</p>
              <div className="text-[11px] font-mono text-slate-400">
                Tỷ lệ nhận diện: {c.ratio}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#A7C8F0]/30 text-[#2B6CB0] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-[#333333]">Êm Ái Cho Mái Tóc</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Chất vải mềm mịn kết hợp lõi chun cao su tự nhiên co giãn êm ái, không giật tóc, không gây đau chân tóc.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FFBFD9]/40 text-[#8A1846] flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h3 className="font-bold text-sm text-[#333333]">Tóc Xinh Mọi Lúc</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Dù đi học, đi làm thêm, tập gym hay dạo phố cuối tuần, chiếc scrunchie luôn là điểm nhấn phong cách ngọt ngào.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FFFA8A]/50 text-[#6B5900] flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-[#333333]">Mức Giá Học Sinh</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mức giá chỉ từ 20.000 đ – 42.000 đ cho sản phẩm đơn và ưu đãi combo tiết kiệm giúp bạn gái dễ dàng sở hữu.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('products')}
          className="px-8 py-3.5 bg-[#5CA0E9] hover:bg-[#4387D3] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-colors inline-flex items-center gap-2"
        >
          <span>Khám phá bộ sưu tập Blonéa</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
