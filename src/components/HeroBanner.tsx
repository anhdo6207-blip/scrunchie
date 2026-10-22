import React from 'react';
import { BloneaLogo } from './BloneaLogo';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Product } from '../data/products';

interface HeroBannerProps {
  onExplore: () => void;
  onSelectProductById: (productId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore, onSelectProductById }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F2] to-[#F1F6FD] border-b border-[#D9D9E3]/40 py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background aesthetic decorative pastel waves */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
          <path
            d="M-100 480C250 400 450 560 850 460C1250 360 1400 500 1600 480V600H-100V480Z"
            fill="#A7C8F0"
            fillOpacity="0.3"
          />
          <path
            d="M-50 520C300 470 600 570 950 510C1300 450 1450 540 1550 530V600H-50V520Z"
            fill="#FFBFD9"
            fillOpacity="0.2"
          />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Main Banner Container */}
        <div className="relative bg-white/70 backdrop-blur-md rounded-3xl border border-[#D9D9E3]/60 shadow-xl p-6 sm:p-10 md:p-14 overflow-hidden">
          {/* Sparkle decorative icons in corners */}
          <div className="absolute top-6 left-8 text-[#A7C8F0] animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="absolute top-8 right-10 text-[#FF70A6] animate-pulse">
            <Heart className="w-5 h-5 fill-current" />
          </div>

          {/* Top Brand Logo */}
          <div className="flex justify-center mb-6">
            <BloneaLogo size="lg" showTagline={true} />
          </div>

          {/* Center Content Section */}
          <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
            {/* Main Headline from BANNER 2 */}
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#FF3E7F] leading-tight" style={{ fontFamily: "'Nunito', cursive, sans-serif" }}>
                <span className="text-[#2B6CB0] inline-block mr-2">Mái Tóc Nào,</span>
                <span className="text-[#FF3E7F] inline-block">Scrunchie Đó</span>
              </h1>
              {/* Cute ray doodles */}
              <span className="absolute -left-6 top-1 text-[#2B6CB0] font-black text-lg select-none hidden sm:inline">
                彡
              </span>
              <span className="absolute -right-6 top-1 text-[#FF3E7F] font-black text-lg select-none hidden sm:inline">
                ♡
              </span>
            </div>

            {/* Badge: Cách Chọn Kiểu Phù Hợp */}
            <div className="flex justify-center">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FF70A6] text-white text-xs sm:text-sm font-bold shadow-xs tracking-wide">
                Cách Chọn Kiểu Phù Hợp
              </span>
            </div>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium max-w-xl mx-auto px-4">
              Từ tóc búi cao đến đuôi ngựa, đến những kiểu tóc cá tính, Blonéa luôn có scrunchies dành riêng cho bạn.
            </p>

            {/* Primary Action Button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={onExplore}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1E70E8] hover:bg-[#1557B0] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#1E70E8]/30 hover:shadow-xl hover:scale-102 transition-all duration-200"
              >
                <span>KHÁM PHÁ NGAY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 4 Interactive Featured Scrunchies corresponding to BANNER 2.jpg */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10 pt-8 border-t border-slate-100">
            {/* 1. Baby Blue: Êm ái cho tóc */}
            <div
              onClick={() => onSelectProductById('sp-1')}
              className="group flex flex-col items-center p-3 rounded-2xl bg-white/80 hover:bg-[#A7C8F0]/20 border border-[#D9D9E3]/50 hover:border-[#A7C8F0] transition-all cursor-pointer shadow-xs hover:shadow-md text-center"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-2.5 border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/src/assets/images/scrunchie_lua_basic_1792254794782.jpg"
                  alt="Scrunchie Xanh Baby"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-2 text-[8px] bg-white/90 text-[#2B6CB0] px-1 rounded-sm font-bold border border-[#A7C8F0]">
                  Blonéa
                </span>
              </div>
              <div className="text-xs font-bold text-[#2B6CB0] flex items-center gap-1">
                <span>Êm ái cho tóc</span>
                <span className="text-sm">⤵</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5">Xanh baby mềm mại</span>
            </div>

            {/* 2. Pastel Pink: Tóc xinh mọi lúc */}
            <div
              onClick={() => onSelectProductById('sp-4')}
              className="group flex flex-col items-center p-3 rounded-2xl bg-white/80 hover:bg-[#FFBFD9]/25 border border-[#D9D9E3]/50 hover:border-[#FFBFD9] transition-all cursor-pointer shadow-xs hover:shadow-md text-center"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-2.5 border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/src/assets/images/scrunchie_vai_lanh_1792254814473.jpg"
                  alt="Scrunchie Hồng Pastel"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-2 text-[8px] bg-white/90 text-[#FF3E7F] px-1 rounded-sm font-bold border border-[#FFBFD9]">
                  Blonéa
                </span>
              </div>
              <div className="text-xs font-bold text-[#FF3E7F] flex items-center gap-1">
                <span>Tóc xinh mọi lúc</span>
                <span className="text-sm">⤵</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5">Hồng pastel ngọt ngào</span>
            </div>

            {/* 3. Lemon Yellow: Tóc luôn gọn gàng */}
            <div
              onClick={() => onSelectProductById('sp-9')}
              className="group flex flex-col items-center p-3 rounded-2xl bg-white/80 hover:bg-[#FFFA8A]/30 border border-[#D9D9E3]/50 hover:border-[#FFFA8A] transition-all cursor-pointer shadow-xs hover:shadow-md text-center"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-2.5 border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/src/assets/images/set_3_sweet_vibes_1792254815816.jpg"
                  alt="Scrunchie Vàng Nhạt"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-2 text-[8px] bg-white/90 text-[#7A6A00] px-1 rounded-sm font-bold border border-[#FFFA8A]">
                  Blonéa
                </span>
              </div>
              <div className="text-xs font-bold text-[#7A6A00] flex items-center gap-1">
                <span>Tóc luôn gọn gàng</span>
                <span className="text-sm">⤵</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5">Vàng nhạt tươi tắn</span>
            </div>

            {/* 4. Lavender/Voan: Thanh lịch, điệu đà */}
            <div
              onClick={() => onSelectProductById('sp-5')}
              className="group flex flex-col items-center p-3 rounded-2xl bg-white/80 hover:bg-[#D2C8E4]/30 border border-[#D9D9E3]/50 hover:border-[#D2C8E4] transition-all cursor-pointer shadow-xs hover:shadow-md text-center"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-2.5 border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/src/assets/images/scrunchie_voan_mong_1792254795559.jpg"
                  alt="Scrunchie Xám Tím"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-2 text-[8px] bg-white/90 text-[#6B46C1] px-1 rounded-sm font-bold border border-[#D2C8E4]">
                  Blonéa
                </span>
              </div>
              <div className="text-xs font-bold text-[#6B46C1] flex items-center gap-1">
                <span>Thanh lịch, điệu đà</span>
                <span className="text-sm">⤵</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5">Xám tím nhạt tiểu thư</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
