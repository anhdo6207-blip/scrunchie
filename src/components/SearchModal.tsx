import React, { useState } from 'react';
import { PRODUCTS, Product, formatVND } from '../data/products';
import { Search, X, ArrowRight, Tag } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.colors.some((c) => c.toLowerCase().includes(q))
        );
      })
    : [];

  const quickKeywords = ['Lụa', 'Pastel', 'Caro', 'Nhung', 'Combo', 'Hồng', 'Xanh Baby'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-[#5CA0E9] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên sản phẩm, màu sắc (hồng, xanh baby...), chất liệu..."
            autoFocus
            className="w-full text-sm sm:text-base text-[#333333] placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              aria-label="Xóa từ khóa"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            aria-label="Đóng cửa sổ tìm kiếm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick keywords tags */}
        <div className="px-6 py-3 bg-[#FFF8F2]/60 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 flex items-center gap-1 shrink-0 font-medium">
            <Tag className="w-3.5 h-3.5 text-[#FF70A6]" />
            Gợi ý:
          </span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setQuery(kw)}
              className="px-2.5 py-1 rounded-full bg-white border border-[#D9D9E3] hover:border-[#5CA0E9] text-slate-700 hover:text-[#5CA0E9] whitespace-nowrap transition-colors"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-6 divide-y divide-slate-100">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              <p>Nhập từ khóa để tìm kiếm các mẫu scrunchie trong bộ sưu tập Blonéa.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-xs">
              <p className="font-semibold text-sm text-slate-700 mb-1">
                Không tìm thấy sản phẩm phù hợp với "{query}"
              </p>
              <p className="text-slate-400">
                Hãy thử tìm kiếm với các từ khóa ngắn hơn như "lụa", "combo", "hồng", hoặc "xanh".
              </p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="py-3 flex items-center gap-4 hover:bg-[#FFF8F2]/60 px-3 rounded-2xl cursor-pointer transition-colors group"
              >
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-xl object-cover bg-slate-50 border border-slate-100 shrink-0"
                />
                <div className="flex-1">
                  <div className="text-[11px] font-semibold text-[#5CA0E9] uppercase">
                    {product.categoryName}
                  </div>
                  <h4 className="text-sm font-bold text-[#333333] group-hover:text-[#5CA0E9] transition-colors">
                    {product.name}
                  </h4>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>Màu: {product.colors.join(', ')}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-extrabold text-[#333333] tabular-nums block">
                    {formatVND(product.basePrice)}
                  </span>
                  <span className="text-[11px] text-[#5CA0E9] font-medium flex items-center gap-1 justify-end group-hover:translate-x-1 transition-transform">
                    Xem ngay <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
