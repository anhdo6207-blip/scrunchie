import React from 'react';
import { Product, formatVND } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Heart, Eye, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { isWishlisted, toggleWishlist, setQuickBuyProduct } = useCart();
  const wishlisted = isWishlisted(product.id);

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickBuyProduct(product);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-[#D9D9E3]/70 hover:border-[#A7C8F0] shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      {/* Top Badges & Heart Wishlist */}
      <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
        {/* Badge */}
        {product.badge ? (
          <span
            className={`pointer-events-auto inline-flex items-center px-2.5 py-1 text-[11px] font-black rounded-full uppercase tracking-wider ${
              product.badge === 'Combo Tiết Kiệm'
                ? 'bg-[#FFFA8A] text-[#6B5900] shadow-xs'
                : product.badge === 'Ưu đãi'
                ? 'bg-[#FF4F8B] text-white shadow-xs'
                : product.badge === 'Mới'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-[#A7C8F0] text-[#1E4E8C]'
            }`}
          >
            {product.badge}
          </span>
        ) : (
          <div />
        )}

        {/* Heart button */}
        <button
          onClick={handleHeartClick}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-xs transition-all shadow-xs ${
            wishlisted
              ? 'bg-[#FF4F8B] text-white'
              : 'bg-white/85 text-slate-400 hover:text-[#FF4F8B] hover:bg-white'
          }`}
          aria-label={wishlisted ? 'Bỏ yêu thích' : 'Yêu thích'}
          title={wishlisted ? 'Bỏ yêu thích' : 'Yêu thích'}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FFFDF9] flex items-center justify-center p-2">
        <img
          src={product.primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick action buttons on hover (Desktop) */}
        <div className="absolute bottom-3 inset-x-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickBuy}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white/95 hover:bg-[#FF4F8B] hover:text-white text-[#333333] text-xs font-bold rounded-xl shadow-md backdrop-blur-xs transition-colors duration-200"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-[#FFFA8A]" />
            <span>Mua nhanh</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            aria-label="Xem chi tiết sản phẩm"
            className="p-2 bg-white/95 hover:bg-[#A7C8F0] text-[#333333] rounded-xl shadow-md transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white border-t border-slate-100/80">
        <div className="text-[10px] font-bold text-[#5CA0E9] uppercase tracking-wider mb-1">
          {product.categoryName}
        </div>

        <h3 className="text-sm font-bold text-[#333333] line-clamp-1 group-hover:text-[#5CA0E9] transition-colors">
          {product.name}
        </h3>

        {/* Color preview dots */}
        <div className="flex items-center gap-1.5 my-2">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color}
              title={color}
              className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
              style={{ backgroundColor: product.colorHexes[color] || '#D9D9E3' }}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-slate-500 font-medium">+{product.colors.length - 4}</span>
          )}
        </div>

        {/* Price & Savings */}
        <div className="mt-auto pt-2 flex items-baseline justify-between border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-extrabold text-[#333333] tabular-nums">
              {formatVND(product.basePrice)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                {formatVND(product.originalPrice)}
              </span>
            )}
          </div>
          {product.comboSaving ? (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Tiết kiệm {formatVND(product.comboSaving)}
            </span>
          ) : (
            <span className="text-[10px] text-slate-400">Size M</span>
          )}
        </div>

        {/* Mobile Quick Buy trigger button */}
        <button
          onClick={handleQuickBuy}
          className="sm:hidden mt-2.5 w-full py-2 bg-[#FFF8F2] hover:bg-[#FF4F8B] hover:text-white text-[#FF4F8B] border border-[#FFBFD9] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Mua nhanh</span>
        </button>
      </div>
    </div>
  );
};
