import React from 'react';
import { useCart } from '../context/CartContext';
import { formatVND } from '../data/products';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (page: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeItem,
    updateQuantity,
    subtotal,
    shippingFee,
    discount,
    total,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-[#FFF8F2]/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#5CA0E9]" />
            <h2 className="font-bold text-base text-[#333333]">
              Giỏ hàng của bạn ({items.length})
            </h2>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            aria-label="Đóng giỏ hàng"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping bar progress */}
        <div className="px-5 py-2.5 bg-[#A7C8F0]/15 border-b border-[#A7C8F0]/30 text-xs">
          {subtotal >= 150000 ? (
            <p className="text-emerald-700 font-semibold flex items-center gap-1">
              🎉 Bạn đã được MIỄN PHÍ vận chuyển!
            </p>
          ) : (
            <p className="text-slate-700">
              Mua thêm{' '}
              <strong className="text-[#333333]">{formatVND(150000 - subtotal)}</strong> để
              được <strong className="text-emerald-700">Freeship</strong>!
            </p>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <div className="w-20 h-20 rounded-full bg-[#FFF8F2] flex items-center justify-center mb-3">
                <ShoppingBag className="w-10 h-10 text-[#FFBFD9]" />
              </div>
              <p className="text-sm font-semibold text-slate-600 mb-1">
                Giỏ hàng của bạn đang trống
              </p>
              <p className="text-xs text-slate-400 mb-4">
                Hãy chọn những chiếc scrunchie xinh xắn để làm điệu nhé!
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  onNavigate('products');
                }}
                className="px-4 py-2 bg-[#5CA0E9] hover:bg-[#4387D3] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Khám phá sản phẩm
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex gap-3">
                <img
                  src={item.product.primaryImage}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 rounded-xl object-cover bg-[#FFF8F2] shrink-0 border border-slate-100"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs md:text-sm font-bold text-[#333333] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Màu: <span className="font-medium text-slate-700">{item.selectedColor}</span>
                        {!item.product.isCombo && (
                          <> · Size: <span className="font-medium text-slate-700">{item.selectedSize}</span></>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      aria-label="Xóa sản phẩm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-slate-500 hover:bg-slate-200"
                        aria-label="Giảm"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 py-0.5 text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-slate-500 hover:bg-slate-200"
                        aria-label="Tăng"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs md:text-sm font-extrabold text-[#333333] tabular-nums">
                        {formatVND(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-[#FFFDF9] space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Tiền hàng</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  {formatVND(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển (dự tính)</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">Miễn phí</span>
                  ) : (
                    formatVND(shippingFee)
                  )}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Giảm giá</span>
                  <span className="tabular-nums">-{formatVND(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#333333] pt-2 border-t border-slate-200">
                <span>Tổng thanh toán</span>
                <span className="text-base text-[#5CA0E9] tabular-nums">
                  {formatVND(total)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  onNavigate('cart');
                }}
                className="w-full py-2.5 px-3 border border-[#A7C8F0] hover:bg-[#A7C8F0]/20 text-[#333333] text-xs font-bold rounded-xl transition-colors"
              >
                Xem giỏ hàng
              </button>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  onNavigate('checkout');
                }}
                className="w-full py-2.5 px-3 bg-[#5CA0E9] hover:bg-[#4387D3] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#5CA0E9]/30 transition-colors"
              >
                <span>Thanh toán</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
