import React, { useState, useEffect } from 'react';
import { Product, calculateItemPrice, formatVND } from '../data/products';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingBag, Zap, ArrowRight, Check } from 'lucide-react';

interface QuickBuyModalProps {
  product: Product | null;
  onClose: () => void;
  onNavigateToDetail: (product: Product) => void;
  onNavigateToCheckout: () => void;
}

export const QuickBuyModal: React.FC<QuickBuyModalProps> = ({
  product,
  onClose,
  onNavigateToDetail,
  onNavigateToCheckout,
}) => {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize('M');
      setQuantity(1);
      setActiveImage(product.primaryImage);
    }
  }, [product]);

  // Sync image if product has color-specific gallery
  useEffect(() => {
    if (product && selectedColor && product.colorGalleries && product.colorGalleries[selectedColor]) {
      setActiveImage(product.colorGalleries[selectedColor].primaryImage);
    } else if (product) {
      setActiveImage(product.primaryImage);
    }
  }, [selectedColor, product]);

  if (!product) return null;

  const currentPrice = calculateItemPrice(product, selectedSize);

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedSize, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    addItem(product, selectedColor, selectedSize, quantity);
    onClose();
    onNavigateToCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 animate-in zoom-in-95 duration-200 space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Header */}
        <div className="flex gap-4 items-start pr-6">
          <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#FFF8F2] border border-slate-100 shrink-0">
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#5CA0E9] uppercase tracking-wider">
              {product.categoryName}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#333333] leading-snug">
              {product.name}
            </h3>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-lg font-black text-[#FF4F8B] tabular-nums">
                {formatVND(currentPrice)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  {formatVND(product.originalPrice)}
                </span>
              )}
            </div>
            {!product.isCombo && selectedSize !== 'M' && (
              <span className="text-[11px] text-slate-500 font-medium block">
                Size {selectedSize}: {selectedSize === 'S' ? '-5.000đ' : '+5.000đ'}
              </span>
            )}
          </div>
        </div>

        {/* Color Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#333333] flex justify-between">
            <span>Màu sắc: <strong className="text-[#5CA0E9]">{selectedColor}</strong></span>
          </label>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => {
              const hex = product.colorHexes[c] || '#D9D9E3';
              const isSelected = selectedColor === c;
              return (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'border-[#5CA0E9] bg-[#A7C8F0]/20 text-[#2B6CB0] ring-1 ring-[#5CA0E9]'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/15 shrink-0"
                    style={{ backgroundColor: hex }}
                  />
                  <span>{c}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Selector */}
        {!product.isCombo && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#333333] flex justify-between">
              <span>Kích cỡ: <strong className="text-[#5CA0E9]">Size {selectedSize}</strong></span>
              <span className="text-[11px] text-slate-400">S nhỏ / M vừa / L lớn</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['S', 'M', 'L'] as const).map((sz) => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-[#5CA0E9] bg-[#A7C8F0]/20 text-[#2B6CB0] font-bold ring-1 ring-[#5CA0E9]'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 font-medium'
                    }`}
                  >
                    <div className="text-xs font-bold">Size {sz}</div>
                    <div className="text-[10px] text-slate-400">
                      {sz === 'S' ? '-5.000đ' : sz === 'L' ? '+5.000đ' : 'Chuẩn'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity Stepper */}
        <div className="flex items-center justify-between pt-1">
          <label className="text-xs font-bold text-[#333333]">Số lượng</label>
          <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Giảm"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-10 text-center text-xs font-bold tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Tăng"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 px-4 rounded-xl border-2 border-[#5CA0E9] text-[#2B6CB0] hover:bg-[#A7C8F0]/20 font-bold text-xs uppercase transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Thêm vào giỏ</span>
          </button>

          <button
            onClick={handleBuyNow}
            className="w-full py-3 px-4 rounded-xl bg-[#FF4F8B] hover:bg-[#E53874] text-white font-black text-xs uppercase shadow-md shadow-[#FF4F8B]/30 transition-all flex items-center justify-center gap-1.5"
          >
            <Zap className="w-4 h-4 fill-current text-[#FFFA8A]" />
            <span>MUA NGAY</span>
          </button>
        </div>

        {/* View full detail link */}
        <div className="text-center pt-1 border-t border-slate-100">
          <button
            onClick={() => {
              onClose();
              onNavigateToDetail(product);
            }}
            className="text-xs text-[#5CA0E9] hover:underline font-bold inline-flex items-center gap-1"
          >
            <span>Xem trang chi tiết sản phẩm đầy đủ 5 ảnh</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
