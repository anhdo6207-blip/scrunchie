import React, { useState, useEffect } from 'react';
import { Product, PRODUCTS, calculateItemPrice, formatVND, GallerySlot } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import {
  ChevronRight,
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  Truck,
  RefreshCw,
  Headphones,
  Heart,
  ZoomIn,
  X,
  Check,
  Camera,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (page: string, params?: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onNavigate,
  onSelectProduct,
}) => {
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');
  const [quantity, setQuantity] = useState(1);
  const [activeSlotIdx, setActiveSlotIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'desc' | 'material' | 'care'>('desc');
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [addedNotice, setAddedNotice] = useState(false);

  // Sync color galleries when selectedColor changes
  const activeGallerySlots: GallerySlot[] =
    product.colorGalleries && product.colorGalleries[selectedColor]
      ? product.colorGalleries[selectedColor].gallerySlots
      : product.gallerySlots;

  const currentActiveSlot = activeGallerySlots[activeSlotIdx] || activeGallerySlots[0];
  const activeImage = currentActiveSlot?.image || product.primaryImage;

  // Reset active image index if current slot has no image
  useEffect(() => {
    if (!activeGallerySlots[activeSlotIdx]?.image) {
      const firstAvailableIdx = activeGallerySlots.findIndex((s) => !!s.image);
      if (firstAvailableIdx !== -1) setActiveSlotIdx(firstAvailableIdx);
    }
  }, [selectedColor, activeGallerySlots, activeSlotIdx]);

  // Dynamic price calculation based on selected size
  const currentPrice = calculateItemPrice(product, selectedSize);

  // Suggested products
  const suggestedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setValidationError(null);
  };

  const handleSizeChange = (size: 'S' | 'M' | 'L') => {
    setSelectedSize(size);
    setValidationError(null);
  };

  // Validation before purchase
  const validateSelection = (): boolean => {
    if (!selectedColor) {
      setValidationError('Vui lòng chọn màu sắc trước khi tiếp tục.');
      return false;
    }
    if (!product.isCombo && !selectedSize) {
      setValidationError('Vui lòng chọn kích cỡ (S, M, hoặc L) trước khi tiếp tục.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelection()) return;
    addItem(product, selectedColor, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    if (!validateSelection()) return;
    addItem(product, selectedColor, selectedSize, quantity);
    onNavigate('checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-12">
      {/* Breadcrumb matching sketch */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#5CA0E9] transition-colors"
        >
          Trang chủ
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          onClick={() => onNavigate('products')}
          className="hover:text-[#5CA0E9] transition-colors"
        >
          Sản phẩm
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid (Left: 5-Photo Gallery | Right: Purchase Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Gallery: 5-Photo Sequence */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Main Large Product Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#FFF8F2] border border-slate-200 shadow-sm group">
            <img
              src={activeImage}
              alt={currentActiveSlot?.label || product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />

            {/* Badge overlay */}
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#FF5B94] text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                {product.badge}
              </span>
            )}

            {/* Current photo slot caption pill */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-[#333333] text-[11px] font-bold px-3 py-1 rounded-full shadow-xs border border-slate-200">
              {currentActiveSlot?.label}
            </div>

            {/* Zoom / Lightbox Trigger Button */}
            <button
              onClick={() => setIsZoomOpen(true)}
              className="absolute bottom-4 right-4 p-2.5 bg-white/90 hover:bg-white text-slate-700 hover:text-[#5CA0E9] rounded-2xl shadow-md transition-all flex items-center gap-1.5 text-xs font-semibold backdrop-blur-xs"
              title="Phóng to ảnh"
            >
              <ZoomIn className="w-4 h-4" />
              <span className="hidden sm:inline">Phóng to</span>
            </button>
          </div>

          {/* 5 Thumbnails Strip (Thứ tự 5 ảnh theo yêu cầu bắt buộc) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
              <span>Thư viện 5 góc chụp chi tiết:</span>
              <span className="text-[11px] text-slate-400 font-normal">
                Ảnh {activeSlotIdx + 1}/5
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {activeGallerySlots.map((slot, idx) => {
                const isSelected = activeSlotIdx === idx;
                const hasImage = !!slot.image;

                return (
                  <button
                    key={slot.type}
                    onClick={() => {
                      if (hasImage) setActiveSlotIdx(idx);
                    }}
                    disabled={!hasImage}
                    className={`relative flex flex-col items-center rounded-2xl p-1 border-2 transition-all text-left ${
                      isSelected
                        ? 'border-[#FF5B94] bg-[#FF5B94]/5 shadow-sm scale-102'
                        : hasImage
                        ? 'border-slate-200 hover:border-[#5CA0E9] bg-white'
                        : 'border-dashed border-slate-200 bg-slate-50/70 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* Thumbnail box */}
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#FFF8F2] relative flex items-center justify-center">
                      {hasImage ? (
                        <img
                          src={slot.image}
                          alt={slot.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="p-1 text-center flex flex-col items-center justify-center text-slate-400">
                          <Camera className="w-4 h-4 text-slate-300 mb-0.5" />
                          <span className="text-[9px] leading-tight">Chờ ảnh</span>
                        </div>
                      )}
                      <span className="absolute bottom-1 left-1 text-[9px] font-black bg-black/60 text-white w-4 h-4 rounded-full flex items-center justify-center">
                        {idx + 1}
                      </span>
                    </div>

                    {/* Short text label */}
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#333333] mt-1.5 truncate max-w-full text-center">
                      {slot.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-400 italic px-1">
              * Quy tắc: 1. Tổng thể → 2. Góc chụp → 3. Cận cảnh vải → 4. Chi tiết đường may → 5. Sử dụng thực tế.
            </p>
          </div>
        </div>

        {/* Right Details: Purchase Module */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#5CA0E9] uppercase tracking-wider">
                {product.categoryName}
              </span>

              {/* Wishlist Heart Button */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full border transition-all ${
                  isFavorite
                    ? 'border-[#FF5B94] bg-[#FF5B94]/10 text-[#FF5B94]'
                    : 'border-slate-200 hover:border-[#FF5B94] text-slate-400 hover:text-[#FF5B94]'
                }`}
                aria-label="Yêu thích sản phẩm"
                title={isFavorite ? 'Đã thêm vào mục yêu thích' : 'Lưu vào mục yêu thích'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#333333] leading-tight">
              {product.name}
            </h1>

            {/* Đánh giá của người mua trước */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">5.0</span>
              <span className="text-xs text-slate-400">· 48 đánh giá thực tế</span>
              <span className="text-xs text-emerald-600 font-semibold ml-2 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Còn hàng
              </span>
            </div>

            {/* Giá bán hiện tại & Giá gốc */}
            <div className="mt-4 flex items-baseline gap-3 p-4 bg-[#FFF8F2] rounded-2xl border border-[#D9D9E3]/60">
              <span className="text-2xl sm:text-3xl font-black text-[#333333] tabular-nums">
                {formatVND(currentPrice)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through tabular-nums">
                  {formatVND(product.originalPrice)}
                </span>
              )}
              {product.comboSaving && (
                <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Tiết kiệm {formatVND(product.comboSaving)}
                </span>
              )}
              {!product.isCombo && selectedSize !== 'M' && (
                <span className="text-xs text-slate-500 font-medium">
                  (Size {selectedSize}: {selectedSize === 'S' ? '-5.000 đ' : '+5.000 đ'})
                </span>
              )}
            </div>
          </div>

          {/* Mô tả ngắn gọn */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Lựa chọn Màu sắc */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#333333] flex items-center justify-between">
              <span>
                Màu sắc:{' '}
                <strong className="text-[#FF5B94] font-bold">{selectedColor}</strong>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                {product.colors.length} lựa chọn
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => {
                const hex = product.colorHexes[color] || '#D9D9E3';
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'border-[#FF5B94] bg-[#FF5B94]/10 text-[#8A1846] ring-1 ring-[#FF5B94]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                      style={{ backgroundColor: hex }}
                    />
                    <span>{color}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lựa chọn Kích cỡ S / M / L */}
          {!product.isCombo ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#333333]">
                  Kích cỡ:{' '}
                  <strong className="text-[#5CA0E9] font-bold">Size {selectedSize}</strong>
                </label>
                <button
                  onClick={() => onNavigate('size-guide')}
                  className="text-xs text-[#5CA0E9] hover:underline font-semibold"
                >
                  Xem bảng hướng dẫn chọn size
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {(['S', 'M', 'L'] as const).map((size) => {
                  const isSelected = selectedSize === size;
                  const priceDiff =
                    size === 'S' ? '-5.000 đ' : size === 'L' ? '+5.000 đ' : 'Chuẩn';
                  return (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`py-2 px-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-[#5CA0E9] bg-[#A7C8F0]/20 text-[#2B6CB0] font-bold ring-1 ring-[#5CA0E9]'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white font-medium'
                      }`}
                    >
                      <div className="text-sm">Size {size}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{priceDiff}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-3 bg-[#FFFA8A]/30 border border-[#FFFA8A] rounded-xl text-xs text-slate-700">
              ✨ <strong>Combo tiêu chuẩn:</strong> Giá combo cố định bao gồm trọn bộ scrunchie theo danh mục, không phụ thuộc kích cỡ.
            </div>
          )}

          {/* Số lượng */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#333333]">Số lượng</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-slate-600 hover:bg-slate-100"
                  aria-label="Giảm số lượng"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-sm font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-slate-600 hover:bg-slate-100"
                  aria-label="Tăng số lượng"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs text-slate-400">
                Thành tiền:{' '}
                <strong className="text-slate-800 tabular-nums">
                  {formatVND(currentPrice * quantity)}
                </strong>
              </span>
            </div>
          </div>

          {/* Validation Warning Alert */}
          {validationError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* NÚT CTA — NỔI BẬT VÀ CÓ HÀNH ĐỘNG THỰC TẾ (PHẦN 9) */}
          <div className="space-y-3 pt-2">
            {/* Primary CTA: MUA NGAY (Nền hồng pastel đậm hơn nền, chữ in hoa, tương phản cao, nổi bật vượt trội) */}
            <button
              onClick={handleBuyNow}
              className="w-full py-4 px-6 rounded-2xl bg-[#FF4F8B] hover:bg-[#E53874] active:scale-[0.98] text-white font-black text-base uppercase tracking-wider shadow-lg shadow-[#FF4F8B]/30 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 group"
            >
              <Zap className="w-5 h-5 fill-current text-[#FFFA8A] group-hover:scale-110 transition-transform" />
              <span>MUA NGAY</span>
            </button>

            {/* Secondary CTA: THÊM VÀO GIỎ HÀNG */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 px-6 rounded-2xl border-2 border-[#5CA0E9] text-[#2B6CB0] hover:bg-[#A7C8F0]/20 font-bold text-xs uppercase tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{addedNotice ? '✓ ĐÃ THÊM VÀO GIỎ' : 'THÊM VÀO GIỎ HÀNG'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Row of 3 badges: Miễn phí vận chuyển | Đổi trả | Hỗ trợ KH */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FFF8F2] border border-[#D9D9E3]/50">
          <Truck className="w-5 h-5 text-[#5CA0E9] shrink-0" />
          <span className="text-xs font-bold text-slate-800">
            Miễn phí vận chuyển từ 150.000 đ
          </span>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FFF8F2] border border-[#D9D9E3]/50">
          <RefreshCw className="w-5 h-5 text-[#FF5B94] shrink-0" />
          <span className="text-xs font-bold text-slate-800">
            Đổi trả dễ dàng trong 7 ngày
          </span>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FFF8F2] border border-[#D9D9E3]/50">
          <Headphones className="w-5 h-5 text-[#6B5900] shrink-0" />
          <span className="text-xs font-bold text-slate-800">
            Hỗ trợ tư vấn nhiệt tình 24/7
          </span>
        </div>
      </div>

      {/* Tabbed Info Section: Mô tả sp chi tiết | Chất liệu | HD bảo quản */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('desc')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'desc'
                ? 'bg-[#5CA0E9] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Mô tả sản phẩm chi tiết
          </button>
          <button
            onClick={() => setActiveTab('material')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'material'
                ? 'bg-[#5CA0E9] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Chất liệu
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'care'
                ? 'bg-[#5CA0E9] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Hướng dẫn bảo quản
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-6">
          <div className="md:col-span-8 space-y-4">
            {activeTab === 'desc' && (
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>{product.description}</p>
                <div className="pt-2">
                  <h4 className="font-bold text-slate-900 mb-2">Đặc điểm nổi bật:</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                    {product.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-[#FFF8F2] rounded-xl border border-slate-200 text-xs">
                  <strong>Phù hợp nhất cho:</strong> {product.bestFor}
                </div>
              </div>
            )}

            {activeTab === 'material' && (
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <h4 className="font-bold text-slate-900">Chi tiết chất liệu sản phẩm:</h4>
                <p>{product.material}</p>
                <p className="text-slate-600">
                  Chun lõi đàn hồi cao cấp được bọc kín bên trong ống vải, hạn chế tối đa tình trạng ma sát gây đứt tóc hoặc giật tóc khi tháo ra.
                </p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <h4 className="font-bold text-slate-900">Hướng dẫn giặt & bảo quản:</h4>
                <p>{product.careGuide}</p>
                <ul className="space-y-1 list-disc list-inside text-slate-600">
                  <li>Không ngâm scrunchie quá lâu trong nước xà phòng đặc.</li>
                  <li>Tránh dùng bàn là/ủi trực tiếp với nhiệt độ cao.</li>
                  <li>Nên cất giữ trong túi lụa hoặc hộp phụ kiện để tránh bám bụi.</li>
                </ul>
              </div>
            )}
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-[#FFF8F2] rounded-2xl border border-slate-200 text-center">
            <img
              src={activeImage}
              alt="Hình ảnh minh họa"
              referrerPolicy="no-referrer"
              className="w-36 h-36 rounded-2xl object-cover mb-2 border border-white shadow-xs"
            />
            <span className="text-xs font-bold text-slate-700">Hình ảnh minh họa thực tế</span>
            <span className="text-[11px] text-slate-400">100% Ảnh chụp sản phẩm thật Blonéa</span>
          </div>
        </div>
      </div>

      {/* Suggested Products Section: Có thể bạn sẽ thích (SP2, SP3, SP4, SP5) */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <span className="text-xs font-bold text-[#FF5B94] uppercase tracking-wider">
            Gợi ý cho bạn
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#333333] mt-1">
            Có Thể Bạn Sẽ Thích
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {suggestedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* Lightbox Modal for Full Image Zoom */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div
            onClick={() => setIsZoomOpen(false)}
            className="fixed inset-0"
          />
          <div className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl z-10 p-2 sm:p-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700">
                {product.name} — {currentActiveSlot?.label}
              </span>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Đóng phóng to"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-square max-h-[75vh] w-full overflow-hidden flex items-center justify-center bg-[#FFF8F2] rounded-2xl mt-2">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
