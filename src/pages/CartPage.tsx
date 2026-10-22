import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatVND } from '../data/products';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Tag,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shippingFee,
    discount,
    total,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyVoucher(couponInput);
    if (res.success) {
      setCouponMessage({ type: 'success', text: res.message });
      setCouponInput('');
    } else {
      setCouponMessage({ type: 'error', text: res.message });
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-[#FFF8F2] flex items-center justify-center mx-auto mb-4 border border-[#FFBFD9]">
          <ShoppingBag className="w-12 h-12 text-[#FF70A6]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#333333] mb-2">
          Giỏ Hàng Của Bạn Đang Trống
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
          Chưa có chiếc scrunchie nào trong giỏ. Hãy cùng ngắm nghía những sắc màu pastel ngọt ngào của Blonéa nhé!
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="px-6 py-3 bg-[#5CA0E9] hover:bg-[#4387D3] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-colors inline-flex items-center gap-2"
        >
          <span>Khám phá sản phẩm ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#333333]">
            Giỏ Hàng ({items.length} mẫu)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kiểm tra số lượng, màu sắc và kích cỡ trước khi tiến hành thanh toán.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-rose-500 font-semibold self-start sm:self-auto"
        >
          Xóa toàn bộ giỏ hàng
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items Table / List */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
          {items.map((item) => (
            <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Product Thumbnail */}
              <img
                src={item.product.primaryImage}
                alt={item.product.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover bg-[#FFF8F2] border border-slate-100 shrink-0"
              />

              {/* Item Info */}
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-bold text-[#5CA0E9] uppercase tracking-wider">
                  {item.product.categoryName}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#333333]">
                  {item.product.name}
                </h3>
                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                  <span>
                    Màu:{' '}
                    <strong className="text-slate-800">{item.selectedColor}</strong>
                  </span>
                  {!item.product.isCombo && (
                    <>
                      <span>·</span>
                      <span>
                        Kích cỡ:{' '}
                        <strong className="text-slate-800">Size {item.selectedSize}</strong>
                      </span>
                    </>
                  )}
                  <span>·</span>
                  <span>
                    Đơn giá:{' '}
                    <strong className="text-slate-800 tabular-nums">
                      {formatVND(item.unitPrice)}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Stepper & Line Total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0">
                {/* Stepper */}
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 text-slate-500 hover:bg-slate-200 transition-colors"
                    aria-label="Giảm"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-slate-500 hover:bg-slate-200 transition-colors"
                    aria-label="Tăng"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal of item */}
                <div className="text-right min-w-[90px]">
                  <span className="text-sm sm:text-base font-black text-[#333333] tabular-nums block">
                    {formatVND(item.unitPrice * item.quantity)}
                  </span>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                  aria-label="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Continue Shopping button */}
          <div className="p-4 bg-[#FFFDF9] flex items-center justify-between">
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#5CA0E9] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tiếp tục chọn thêm sản phẩm</span>
            </button>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h2 className="text-base font-extrabold text-[#333333] pb-3 border-b border-slate-100">
            Tóm Tắt Đơn Hàng
          </h2>

          {/* Calculations */}
          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Tổng tiền hàng</span>
              <span className="font-bold text-slate-800 tabular-nums">
                {formatVND(subtotal)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Phí vận chuyển</span>
              <span className="font-bold text-slate-800 tabular-nums">
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold">Miễn phí (Freeship)</span>
                ) : (
                  formatVND(shippingFee)
                )}
              </span>
            </div>

            {subtotal < 150000 && (
              <p className="text-[11px] text-[#2B6CB0] bg-[#A7C8F0]/20 p-2.5 rounded-xl">
                💡 Mua thêm <strong>{formatVND(150000 - subtotal)}</strong> để được hưởng chính sách Freeship toàn quốc!
              </p>
            )}

            {appliedVoucher && (
              <div className="flex justify-between text-emerald-600 font-bold pt-1">
                <span>Mã giảm giá ({appliedVoucher})</span>
                <div className="flex items-center gap-1.5">
                  <span className="tabular-nums">-{formatVND(discount)}</span>
                  <button
                    onClick={removeVoucher}
                    className="text-xs text-rose-500 hover:underline font-normal"
                  >
                    (Bỏ)
                  </button>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <div>
                <span className="text-sm font-extrabold text-[#333333]">Tổng thanh toán</span>
                <span className="block text-[11px] text-slate-400">Đã bao gồm VAT nếu có</span>
              </div>
              <span className="text-xl font-black text-[#5CA0E9] tabular-nums">
                {formatVND(total)}
              </span>
            </div>
          </div>

          {/* Coupon Form */}
          <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#FF70A6]" />
              <span>Mã giảm giá / Voucher</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Nhập mã: BLONEA10"
                className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#5CA0E9] uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
              >
                Áp dụng
              </button>
            </div>
            {couponMessage && (
              <p
                className={`text-[11px] flex items-center gap-1 mt-1 ${
                  couponMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {couponMessage.type === 'success' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                )}
                <span>{couponMessage.text}</span>
              </p>
            )}
            <p className="text-[10px] text-slate-400">
              * Gợi ý: Dùng mã <strong>BLONEA10</strong> (giảm 10%) hoặc <strong>XINHTRENTC</strong> (giảm 15k).
            </p>
          </form>

          {/* Checkout CTA */}
          <button
            onClick={() => onNavigate('checkout')}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#5CA0E9] hover:bg-[#4387D3] text-white font-extrabold text-sm shadow-md shadow-[#5CA0E9]/30 transition-all flex items-center justify-center gap-2"
          >
            <span>TIẾN HÀNH THANH TOÁN</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Trust note */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Thanh toán an toàn · Kiểm tra hàng trước khi nhận</span>
          </div>
        </div>
      </div>
    </div>
  );
};
