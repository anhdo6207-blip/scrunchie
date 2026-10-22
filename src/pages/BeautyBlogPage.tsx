import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/beautyBlog';
import { PRODUCTS, Product, formatVND } from '../data/products';
import {
  Sparkles,
  Clock,
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Tag,
  Share2,
  Check,
} from 'lucide-react';

interface BeautyBlogPageProps {
  initialArticle?: BlogPost | null;
  onNavigate: (page: string, params?: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const BeautyBlogPage: React.FC<BeautyBlogPageProps> = ({
  initialArticle,
  onNavigate,
  onSelectProduct,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(
    initialArticle || null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    { id: 'all', label: 'Tất cả bài viết' },
    { id: 'Kiểu tóc', label: 'Kiểu tóc' },
    { id: 'Phối đồ', label: 'Phối đồ' },
    { id: 'Chăm sóc & bảo quản scrunchie', label: 'Chăm sóc scrunchie' },
    { id: 'Xu hướng', label: 'Xu hướng' },
  ];

  const filteredPosts =
    selectedCategory === 'all'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Detailed article view
  if (selectedArticle) {
    const featuredProducts = PRODUCTS.filter((p) =>
      selectedArticle.featuredProductIds.includes(p.id)
    );

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#5CA0E9] transition-colors"
          >
            Trang chủ
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => setSelectedArticle(null)}
            className="hover:text-[#5CA0E9] transition-colors"
          >
            Góc làm đẹp
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-xs">
            {selectedArticle.title}
          </span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#5CA0E9] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách bài viết</span>
        </button>

        {/* Article header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="px-3 py-1 bg-[#FFBFD9]/30 text-[#8A1846] font-bold rounded-full">
              {selectedArticle.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {selectedArticle.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {selectedArticle.readTime}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {selectedArticle.author}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#333333] leading-tight">
            {selectedArticle.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 italic leading-relaxed border-l-4 border-[#FF5B94] pl-4 py-1">
            "{selectedArticle.excerpt}"
          </p>
        </header>

        {/* Hero image */}
        <div className="aspect-16/9 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
          <img
            src={selectedArticle.coverImage}
            alt={selectedArticle.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main content body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed font-normal">
          <p className="text-base text-slate-800 font-medium">
            {selectedArticle.content.intro}
          </p>

          {selectedArticle.content.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3 pt-4 border-t border-slate-100 first:border-0 first:pt-0">
              <h2 className="text-lg sm:text-xl font-bold text-[#333333] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5CA0E9]" />
                <span>{sec.heading}</span>
              </h2>
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-slate-600 leading-relaxed">
                  {p}
                </p>
              ))}
              {sec.bulletPoints && (
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 text-xs sm:text-sm">
                  {sec.bulletPoints.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Outro */}
          <div className="p-4 bg-[#FFF8F2] rounded-2xl border border-[#D9D9E3]/70 text-slate-700 text-xs sm:text-sm space-y-2 mt-6">
            <h3 className="font-bold text-[#333333] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF5B94]" />
              <span>Lời kết từ Blonéa</span>
            </h3>
            <p className="italic text-slate-600">{selectedArticle.content.outro}</p>
          </div>

          {/* Share action */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#5CA0E9] px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Đã sao chép liên kết!' : 'Chia sẻ bài viết'}</span>
            </button>
          </div>
        </div>

        {/* Featured Products in this article */}
        {featuredProducts.length > 0 && (
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-[#333333]">
                  Sản Phẩm Được Nhắc Đến Trong Bài Viết
                </h3>
                <p className="text-xs text-slate-500">
                  Các mẫu scrunchie được chuyên gia gợi ý trong phong cách này
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {featuredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-white rounded-2xl p-3 border border-slate-200 hover:border-[#5CA0E9] hover:shadow-md transition-all cursor-pointer flex items-center gap-3 group"
                >
                  <img
                    src={prod.primaryImage}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover bg-[#FFF8F2] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#333333] group-hover:text-[#5CA0E9] truncate">
                      {prod.name}
                    </h4>
                    <span className="text-xs font-extrabold text-[#FF5B94] block mt-1">
                      {formatVND(prod.basePrice)}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {prod.colors.join(', ')}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // Blog catalog view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Header banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFBFD9]/30 text-[#8A1846] rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#FF5B94]" />
          <span>Cẩm nang làm đẹp Blonéa</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#333333] tracking-tight">
          Góc Làm Đẹp & Mẹo Buộc Tóc Điệu
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Chia sẻ cảm hứng tạo kiểu tóc xinh xắn, cách phối màu scrunchie với outfit hàng ngày và bí quyết chăm sóc mái tóc bồng bềnh không gãy rụng.
        </p>
      </div>

      {/* Category tabs filter */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 text-xs font-bold rounded-2xl whitespace-nowrap transition-all ${
              selectedCategory === c.id
                ? 'bg-[#5CA0E9] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedArticle(post)}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col group"
          >
            <div className="aspect-16/10 overflow-hidden bg-slate-100 relative">
              <img
                src={post.coverImage}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-xs text-[#8A1846] text-[11px] font-bold rounded-full shadow-xs">
                {post.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h2 className="text-base font-bold text-[#333333] group-hover:text-[#5CA0E9] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#5CA0E9]">
                <span>Đọc bài viết chi tiết</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
