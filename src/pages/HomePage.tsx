import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, Product, formatVND } from '../data/products';
import { BLOG_POSTS, BlogPost } from '../data/beautyBlog';
import { Logo } from '../components/Logo';
import { useCart } from '../context/CartContext';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Gift,
  Star,
  CheckCircle2,
  Feather,
  Palette,
  Scissors,
  Send,
  Calendar,
  Clock,
  Zap,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectProduct: (product: Product) => void;
  onSelectArticle?: (article: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProduct,
  onSelectArticle,
}) => {
  const { addItem } = useCart();

  // Featured 4 products
  const featuredProducts = PRODUCTS.slice(0, 4);

  // Signature Combo: Combo 4 Pastel
  const signatureCombo = PRODUCTS.find((p) => p.id === 'sp-10') || PRODUCTS[9];

  // Latest 3 blog articles from Góc làm đẹp
  const latestArticles = BLOG_POSTS.slice(0, 3);

  const reviews = [
    {
      id: 'r1',
      name: 'Phương Linh',
      tag: 'Học sinh THPT',
      avatarText: 'L',
      rating: 5,
      content: 'Chất lụa satin mềm mịn cực kỳ! Mình buộc cả ngày đi học không hề bị đau đầu hay gãy tóc như mấy loại chun thông thường.',
      product: 'Scrunchie Lụa Basic',
    },
    {
      id: 'r2',
      name: 'Ngọc Mai',
      tag: 'Sinh viên năm 2',
      avatarText: 'M',
      rating: 5,
      content: 'Combo 4 pastel siêu hời luôn, 4 màu phối đồ cả tuần. Đeo ở cổ tay nhìn cũng xinh xắn như phụ kiện thời trang vậy á.',
      product: 'Combo 4 Scrunchie Pastel',
    },
    {
      id: 'r3',
      name: 'Hà Trang',
      tag: 'Nhân viên văn phòng',
      avatarText: 'T',
      rating: 5,
      content: 'Mình mua em Scrunchie Voan Mộng để búi tóc củ tỏi, lên form phồng tiểu thư rất mê. Đóng gói chỉn chu, có mùi thơm dịu nhẹ.',
      product: 'Scrunchie Voan Mộng',
    },
  ];

  const handleBuyComboNow = () => {
    addItem(signatureCombo, signatureCombo.colors[0], 'M', 1);
    onNavigate('cart');
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* 1. HERO 2 CỘT */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F2] to-[#F1F6FD] border-b border-[#D9D9E3]/40 py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Cột Trái: Tiêu đề, phụ đề, câu viết tay, nút CTA */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF8F2] border border-[#FFBFD9] text-xs font-bold text-[#8A1846]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF70A6]" />
              <span>Blonéa – Scrunchies for your everyday vibe</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#333333] leading-tight">
              Khám phá bộ sưu tập{' '}
              <span className="text-[#5CA0E9]">Scrunchie</span>{' '}
              <span className="text-[#FF4F8B]">BLONÉA</span>
            </h1>

            <p className="text-base sm:text-lg font-bold text-[#FF4F8B] flex items-center justify-center lg:justify-start gap-1">
              <span>Chọn mẫu phù hợp với bạn ♡</span>
            </p>

            <p
              className="text-base text-slate-600 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0"
              style={{ fontFamily: "'Patrick Hand', cursive, sans-serif", fontSize: '18px' }}
            >
              “Xinh trên tóc, điệu trên tay – mang lại nụ cười rạng rỡ và cảm giác êm ái nâng niu từng sợi tóc mỗi ngày.”
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => onNavigate('products')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#5CA0E9] hover:bg-[#4387D3] text-white font-black text-sm uppercase shadow-lg shadow-[#5CA0E9]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>KHÁM PHÁ NGAY →</span>
              </button>

              <button
                onClick={() => onNavigate('collections')}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white border border-[#FFBFD9] hover:bg-[#FFBFD9]/20 text-[#8A1846] font-bold text-xs uppercase transition-all"
              >
                Xem Combo Ưu Đãi
              </button>
            </div>
          </div>

          {/* Cột Phải: Ảnh banner thật, chữ không che sản phẩm */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#FFF8F2]">
              <img
                src="/src/assets/images/scrunchie_combo_pastel_1792254796204.jpg"
                alt="Bộ sưu tập scrunchie Blonéa màu pastel"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#5CA0E9] shadow-xs">
                100% Ảnh Chụp Thật
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SẢN PHẨM NỔI BẬT (4 thẻ + Xem tất cả →) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#5CA0E9] uppercase tracking-wider">
              Yêu thích nhất tuần
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#333333] mt-1">
              Sản Phẩm Nổi Bật
            </h2>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5CA0E9] hover:text-[#3B82F6] transition-colors"
          >
            <span>Xem tất cả →</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 3. COMBO NỔI BẬT (Ảnh combo bên trái; bên phải nhãn, tên, 79.000đ lớn màu hồng, nút MUA NGAY → sang giỏ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#FFF0F5] via-[#FFF8F2] to-[#EBF3FC] border border-[#FFBFD9] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Ảnh combo bên trái */}
            <div className="lg:col-span-6 flex justify-center">
              <div
                onClick={() => onSelectProduct(signatureCombo)}
                className="relative aspect-4/3 w-full max-w-md rounded-2xl overflow-hidden bg-white shadow-md border-2 border-white cursor-pointer group"
              >
                <img
                  src={signatureCombo.primaryImage}
                  alt={signatureCombo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#FFFA8A] text-[#6B5900] text-xs font-extrabold rounded-full uppercase shadow-xs">
                  Tiết kiệm 21.000đ
                </span>
              </div>
            </div>

            {/* Thông tin bên phải */}
            <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FF4F8B] text-white text-xs font-extrabold uppercase tracking-wider">
                BLONÉA – COMBO ƯU ĐÃI
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-[#333333]">
                {signatureCombo.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                Tập hợp đầy đủ 4 gam màu signature Blonéa: Xanh Baby, Hồng Pastel, Vàng Nhạt và Xám Nhạt. Tự do thay đổi phong cách cả tuần với mức giá tiết kiệm nhất.
              </p>

              {/* 79.000đ lớn màu hồng */}
              <div className="flex items-baseline justify-center lg:justify-start gap-3 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-[#FF4F8B] tabular-nums">
                  79.000đ
                </span>
                <span className="text-sm sm:text-base text-slate-400 line-through tabular-nums">
                  Giá lẻ: 100.000đ
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Tiết kiệm 21.000đ (~21%)
                </span>
              </div>

              {/* Nút lớn MUA NGAY → thêm giỏ và sang giỏ hàng */}
              <div className="pt-2">
                <button
                  onClick={handleBuyComboNow}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FF4F8B] hover:bg-[#E53874] text-white font-black text-sm uppercase shadow-lg shadow-[#FF4F8B]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current text-[#FFFA8A]" />
                  <span>MUA NGAY →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VÌ SAO CHỌN BLONÉA? (3 thẻ: Êm ái, Đa phong cách, Tỉ mỉ thủ công) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-xs font-bold text-[#5CA0E9] uppercase tracking-wider">
            Cam kết chất lượng
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#333333]">
            Vì Sao Chọn Blonéa?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#A7C8F0]/25 text-[#2B6CB0] flex items-center justify-center mx-auto">
              <Feather className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-[#333333]">Êm Ái Cho Mái Tóc</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Vải lụa satin và cotton mềm mịn bọc kín lõi chun đàn hồi cao, không gây hằn nếp gãy hay đau chân tóc sau nhiều giờ buộc.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#FFBFD9]/30 text-[#8A1846] flex items-center justify-center mx-auto">
              <Palette className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-[#333333]">Đa Phong Cách</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Từ tông màu pastel ngọt ngào đến caro năng động hay voan mộng thanh lịch, dễ dàng biến hóa cùng mọi trang phục thường ngày.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#FFFA8A]/50 text-[#6B5900] flex items-center justify-center mx-auto">
              <Scissors className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-[#333333]">Tỉ Mỉ Thủ Công</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Từng đường may zíc-zắc, nếp nhún ruffles và chiếc tag nơ đều được chăm chút cẩn thận, đảm bảo độ bền bỉ khi giặt.
            </p>
          </div>
        </div>
      </section>

      {/* 5. ĐÁNH GIÁ KHÁCH HÀNG (3–4 review ngắn, có sao) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-xs font-bold text-[#FF4F8B] uppercase tracking-wider">
            Chia sẻ chân thật
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#333333]">
            Khách Hàng Nói Gì?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  “{r.content}”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#A7C8F0]/30 text-[#2B6CB0] font-black text-xs flex items-center justify-center">
                    {r.avatarText}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{r.name}</h4>
                    <span className="text-[11px] text-slate-400">{r.tag}</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#5CA0E9] font-semibold bg-[#A7C8F0]/20 px-2 py-0.5 rounded-md">
                  {r.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. XEM NHANH "GÓC LÀM ĐẸP" (3 bài mới nhất) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#5CA0E9] uppercase tracking-wider">
              Cẩm nang & Xu hướng
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#333333] mt-1">
              Góc Làm Đẹp Cùng Blonéa
            </h2>
          </div>
          <button
            onClick={() => onNavigate('beauty-blog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5CA0E9] hover:text-[#3B82F6] transition-colors"
          >
            <span>Xem tất cả bài viết →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => (onSelectArticle ? onSelectArticle(art) : onNavigate('beauty-blog', { article: art }))}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
            >
              <div className="aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="text-[#FF4F8B] font-bold">{art.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {art.readTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#333333] group-hover:text-[#5CA0E9] transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-xs font-bold text-[#5CA0E9] flex items-center justify-between">
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. VỀ BLONÉA (logo, giới thiệu ngắn, nút Tìm hiểu thêm, ảnh thương hiệu) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF8F2] rounded-3xl p-8 sm:p-12 md:p-16 border border-[#D9D9E3]/70">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Logo size="md" showTagline={true} />
              <h2 className="text-2xl sm:text-3xl font-black text-[#333333] pt-2">
                Blonéa – Một Chút Điệu Đà Cho Mỗi Ngày
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Blonéa tin rằng đôi khi, chỉ một phụ kiện nhỏ cũng đủ tạo nên điểm nhấn cho phong cách của bạn. Từ những gam màu pastel dịu dàng đến những thiết kế dễ phối đồ, Blonéa mang đến những chiếc scrunchie giúp bạn tự tin thể hiện cá tính theo cách riêng.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 bg-white border border-[#A7C8F0] hover:bg-[#A7C8F0]/20 text-[#2B6CB0] text-xs font-bold rounded-2xl shadow-xs transition-colors inline-flex items-center gap-2"
                >
                  <span>Tìm hiểu thêm về Blonéa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-md border-4 border-white">
                <img
                  src="/src/assets/images/set_3_sweet_vibes_1792254815816.jpg"
                  alt="Ảnh thương hiệu Blonéa"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. KẾT NỐI CỘNG ĐỒNG INSTAGRAM (#BloneaVibes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFBFD9]/30 text-[#8A1846] rounded-full text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-[#FF5B94] text-[#FF5B94]" />
            <span>#BloneaVibes trên Instagram</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#333333]">
            Xinh Trên Tóc, Điệu Trên Tay Cùng Nàng
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Gắn thẻ <strong>@blonea.scrunchies</strong> để xuất hiện trong góc ảnh xinh xắn của chúng mình nhé!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 group relative">
            <img
              src="/src/assets/images/lua_basic_lifestyle_1792256760178.jpg"
              alt="@blonea style 1"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
              @phuonglinh.hair
            </div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 group relative">
            <img
              src="/src/assets/images/lua_satin_lifestyle_1792256764516.jpg"
              alt="@blonea style 2"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
              @ngocmai.sweet
            </div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 group relative">
            <img
              src="/src/assets/images/set_3_sweet_vibes_1792254815816.jpg"
              alt="@blonea style 3"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
              @blonea.scrunchies
            </div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 group relative">
            <img
              src="/src/assets/images/scrunchie_combo_pastel_1792254795325.jpg"
              alt="@blonea style 4"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
              @blonea.collection
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
