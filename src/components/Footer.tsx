import React, { useState } from 'react';
import { Logo } from './Logo';
import {
  Heart,
  Sparkles,
  RotateCcw,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Email không đúng định dạng. Vui lòng kiểm tra lại.');
      return;
    }

    // Client-side simulation of email registration
    setStatus('success');
    setEmail('');
    setErrorMessage('');
    setTimeout(() => {
      setStatus('idle');
    }, 6000);
  };

  return (
    <footer className="bg-white border-t border-[#E8EFF8] text-[#333333] pt-10 sm:pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* 3.1. Phần thông tin nổi bật phía trên footer (Khung ngang nền kem nhạt #FBF8F2, 3 nhóm cân đối) */}
        <div className="bg-[#FBF8F2] border border-[#EBDCCF]/70 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#EBDCCF]/60">
            {/* Nhóm 1 – Êm dịu cho nàng */}
            <div className="flex items-start gap-3.5 pt-4 first:pt-0 md:pt-0">
              <div className="w-10 h-10 rounded-full bg-[#FFBFD9]/35 text-[#B02B59] flex items-center justify-center shrink-0 mt-0.5">
                <Heart className="w-5 h-5 fill-[#FFBFD9]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-[#333333]">
                  Êm dịu cho nàng
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Chất liệu lựa chọn phù hợp, không gây khó chịu khi sử dụng.
                </p>
              </div>
            </div>

            {/* Nhóm 2 – Chăm chút từng chi tiết (Tỉ mỉ thủ công) */}
            <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-8">
              <div className="w-10 h-10 rounded-full bg-[#A7C8F0]/35 text-[#21548E] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-[#333333]">
                  Chăm chút từng chi tiết
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Từng đường kim mũi chỉ được hoàn thiện cẩn thận, độ phồng bồng bềnh.
                </p>
              </div>
            </div>

            {/* Nhóm 3 – Đổi trả trong 7 ngày */}
            <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-8">
              <div className="w-10 h-10 rounded-full bg-[#FFFA8A]/70 text-[#736300] flex items-center justify-center shrink-0 mt-0.5">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-[#333333]">
                  Đổi trả trong 7 ngày
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Hỗ trợ đổi trả dễ dàng và nhanh chóng nếu có lỗi từ nhà sản xuất.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3.2. Footer chính gồm bốn cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pt-2 pb-6">
          {/* Cột 1 – Logo và giới thiệu ngắn (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer inline-flex items-center"
            >
              <Logo height={44} showTagline={false} />
            </div>

            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-sm">
              Blonéa mang đến những chiếc scrunchie và phụ kiện tóc mang sắc màu pastel, giúp nàng thể hiện phong cách riêng qua những điều nhỏ xinh mỗi ngày.
            </p>

            <div className="space-y-2 pt-1">
              <h5 className="text-[11px] font-bold text-[#2B4C6F] uppercase tracking-wider">
                KẾT NỐI CÙNG BLONÉA
              </h5>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#F0F7FF] text-[#2B6CB0] hover:bg-[#5CA0E9] hover:text-white transition-colors flex items-center justify-center text-xs font-bold"
                  aria-label="Facebook Blonéa"
                  title="Facebook Blonéa"
                >
                  f
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#FFF0F5] text-[#D84B79] hover:bg-[#FF4F8B] hover:text-white transition-colors flex items-center justify-center text-xs font-bold"
                  aria-label="Instagram Blonéa"
                  title="Instagram Blonéa"
                >
                  ig
                </a>
                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-center text-xs font-bold"
                  aria-label="TikTok Blonéa"
                  title="TikTok Blonéa"
                >
                  tt
                </a>
                {/* Shopee */}
                <span
                  className="w-8 h-8 rounded-full bg-[#FFF5F0] text-[#EE4D2D] flex items-center justify-center text-xs font-bold cursor-default"
                  title="Gian hàng Shopee Blonéa"
                >
                  sp
                </span>
              </div>
            </div>
          </div>

          {/* Cột 2 – Liên hệ chúng mình (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h5 className="text-[11px] sm:text-xs font-bold text-[#2B4C6F] uppercase tracking-wider">
              LIÊN HỆ CHÚNG MÌNH
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#5CA0E9] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  128 Cầu Giấy, Q. Cầu Giấy, Hà Nội
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#5CA0E9] shrink-0" />
                <a
                  href="tel:0988123456"
                  className="hover:text-[#5CA0E9] font-medium transition-colors"
                >
                  0988 123 456
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#5CA0E9] shrink-0" />
                <a
                  href="mailto:support@blonea.vn"
                  className="hover:text-[#5CA0E9] font-medium transition-colors"
                >
                  support@blonea.vn
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#5CA0E9] shrink-0 mt-0.5" />
                <span className="leading-snug text-slate-500">
                  08:30 – 21:30 (Thứ 2 – Chủ Nhật)
                </span>
              </li>
            </ul>
          </div>

          {/* Cột 3 – Hỗ trợ khách hàng (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h5 className="text-[11px] sm:text-xs font-bold text-[#2B4C6F] uppercase tracking-wider">
              HỖ TRỢ KHÁCH HÀNG
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('size-guide')}
                  className="hover:text-[#5CA0E9] transition-colors text-left flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-[#5CA0E9] group-hover:translate-x-0.5 transition-all" />
                  <span>Hướng dẫn chọn size</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('return-policy')}
                  className="hover:text-[#5CA0E9] transition-colors text-left flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-[#5CA0E9] group-hover:translate-x-0.5 transition-all" />
                  <span>Chính sách đổi trả</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shipping-policy')}
                  className="hover:text-[#5CA0E9] transition-colors text-left flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-[#5CA0E9] group-hover:translate-x-0.5 transition-all" />
                  <span>Chính sách vận chuyển</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#5CA0E9] transition-colors text-left flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-[#5CA0E9] group-hover:translate-x-0.5 transition-all" />
                  <span>Câu hỏi thường gặp</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('order-tracking')}
                  className="hover:text-[#5CA0E9] transition-colors text-left flex items-center gap-1 group font-semibold text-[#5CA0E9]"
                >
                  <ChevronRight className="w-3 h-3 text-[#5CA0E9] group-hover:translate-x-0.5 transition-all" />
                  <span>Tra cứu đơn hàng</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 4 – Đăng ký nhận tin (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h5 className="text-[11px] sm:text-xs font-bold text-[#2B4C6F] uppercase tracking-wider">
              ĐĂNG KÝ NHẬN TIN
            </h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nhận thông tin bộ sưu tập mới và ưu đãi dành riêng cho nàng.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Nhập email của bạn..."
                  className="flex-1 min-w-0 bg-[#F9FAFB] hover:bg-white focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9] focus:ring-2 focus:ring-[#A7C8F0]/20 transition-all placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  aria-label="Đăng ký nhận tin"
                  className="px-3.5 py-2.5 bg-[#FFBFD9] hover:bg-[#FFAECB] text-[#8A1846] rounded-xl transition-colors flex items-center justify-center shrink-0 shadow-2xs group"
                >
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {status === 'error' && (
                <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1 animate-in fade-in">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errorMessage}</span>
                </p>
              )}

              {status === 'success' && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 animate-in fade-in">
                  <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Đã ghi nhận email của nàng!</span>
                  </p>
                  <p className="text-[10px] text-emerald-600 leading-tight">
                    Mã ưu đãi <strong>BLONEA10</strong> (-10%) đã sẵn sàng áp dụng tại giỏ hàng.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* 3.3. Phần cuối footer (Đường kẻ mảnh, bản quyền, liên kết chính sách & thanh toán) */}
        <div className="pt-6 border-t border-[#E8EFF8] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Blonéa. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500">
            <button
              onClick={() => onNavigate('privacy-policy')}
              className="hover:text-[#5CA0E9] transition-colors"
            >
              Chính sách bảo mật
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('terms-policy')}
              className="hover:text-[#5CA0E9] transition-colors"
            >
              Điều khoản sử dụng
            </button>
            <span>·</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-[10px] font-semibold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                COD
              </span>
              <span className="text-[10px] font-semibold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                VietQR
              </span>
              <span className="text-[10px] font-semibold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                MoMo
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
