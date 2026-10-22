import React, { useState } from 'react';
import { useCart, Order } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatVND } from '../data/products';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info,
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (page: string, params?: any) => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate, onOrderSuccess }) => {
  const { items, subtotal, shippingFee, shippingMethod, discount, total, appliedVoucher, createOrder } = useCart();
  const { user } = useAuth();

  // Form states with initial user info if logged in
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [province, setProvince] = useState(user?.province || 'Hà Nội');
  const [district, setDistrict] = useState(user?.district || 'Cầu Giấy');
  const [ward, setWard] = useState(user?.ward || 'Dịch Vọng');
  const [address, setAddress] = useState(user?.address || '');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank' | 'momo'>('cod');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#333333]">Chưa Có Sản Phẩm Để Thanh Toán</h2>
        <p className="text-xs text-slate-500">Giỏ hàng của bạn đang trống.</p>
        <button
          onClick={() => onNavigate('products')}
          className="px-6 py-2.5 bg-[#5CA0E9] text-white font-bold text-xs rounded-xl"
        >
          Chọn sản phẩm ngay
        </button>
      </div>
    );
  }

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Vui lòng nhập họ và tên nhận hàng.';
    if (!phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại.';
    } else if (!/^[0-9]{9,11}$/.test(phone.replace(/\s+/g, ''))) {
      errs.phone = 'Số điện thoại không đúng định dạng (9 - 11 chữ số).';
    }
    if (!province.trim()) errs.province = 'Vui lòng chọn Tỉnh/Thành phố.';
    if (!district.trim()) errs.district = 'Vui lòng chọn Quận/Huyện.';
    if (!ward.trim()) errs.ward = 'Vui lòng nhập Phường/Xã.';
    if (!address.trim()) errs.address = 'Vui lòng nhập số nhà, tên đường cụ thể.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const newOrder = createOrder({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim(),
        province,
        district,
        ward,
        address: address.trim(),
        note: note.trim(),
        shippingMethod,
        shippingFee,
        paymentMethod,
        items,
        subtotal,
        discount,
        voucherCode: appliedVoucher || undefined,
        total,
      });

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
      onNavigate('order-success', { order: newOrder });
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Breadcrumb & back button */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <button
          onClick={() => onNavigate('cart')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#5CA0E9]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại giỏ hàng</span>
        </button>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>Giỏ hàng</span>
          <span>&gt;</span>
          <span className="font-bold text-[#5CA0E9]">Thanh toán</span>
          <span>&gt;</span>
          <span>Hoàn tất</span>
        </div>
      </div>

      {/* Demo Simulation Notice */}
      <div className="bg-[#FFF8F2] border border-[#FFBFD9] rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#FF70A6] shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 leading-relaxed">
          <strong>Lưu ý môi trường thử nghiệm (Demo Mode):</strong> Đây là phiên bản mô phỏng giao dịch thương mại điện tử giao diện của Blonéa. Đơn hàng sẽ được ghi nhận và lưu trữ trong bộ nhớ trình duyệt để bạn trải nghiệm toàn bộ luồng mua hàng mà không phát sinh trừ tiền thật.
        </div>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Shipping info and payment method */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Customer Shipping Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-extrabold text-[#333333] flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#5CA0E9]" />
                <span>1. Thông Tin Nhận Hàng</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Họ và tên <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Phương Linh"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none ${
                      errors.name
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-slate-200 focus:border-[#5CA0E9]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Số điện thoại <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912345678"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none ${
                      errors.phone
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-slate-200 focus:border-[#5CA0E9]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Địa chỉ email (nhận xác nhận đơn hàng)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="linh@example.com"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>

              {/* Province, District, Ward */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Tỉnh / Thành phố <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#5CA0E9]"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Huế">Thừa Thiên Huế</option>
                    <option value="Quảng Ninh">Quảng Ninh</option>
                    <option value="Tỉnh khác">Tỉnh / Thành khác</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Quận / Huyện <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Quận Cầu Giấy"
                    className={`w-full px-3 py-2.5 text-xs rounded-xl border bg-white focus:outline-none ${
                      errors.district
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-slate-200 focus:border-[#5CA0E9]'
                    }`}
                  />
                  {errors.district && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.district}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Phường / Xã <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    placeholder="Phường Dịch Vọng"
                    className={`w-full px-3 py-2.5 text-xs rounded-xl border bg-white focus:outline-none ${
                      errors.ward
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-slate-200 focus:border-[#5CA0E9]'
                    }`}
                  />
                  {errors.ward && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.ward}</p>
                  )}
                </div>
              </div>

              {/* Detailed Street Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Địa chỉ cụ thể (Số nhà, tên ngõ, tên đường) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ví dụ: Số 18, Ngách 45, Đường Trần Thái Tông"
                  className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none ${
                    errors.address
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-200 focus:border-[#5CA0E9]'
                  }`}
                />
                {errors.address && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.address}</p>
                )}
              </div>

              {/* Order note */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Ghi chú đơn hàng (nếu có)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="Ví dụ: Giao giờ hành chính, gọi điện trước khi giao..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-extrabold text-[#333333] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#FF70A6]" />
                <span>2. Phương Thức Thanh Toán</span>
              </h2>

              <div className="space-y-3">
                {/* COD option */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#5CA0E9] bg-[#A7C8F0]/15 ring-1 ring-[#5CA0E9]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#333333] block">
                      Thanh toán khi nhận hàng (COD)
                    </span>
                    <span className="text-xs text-slate-500">
                      Bạn thanh toán trực tiếp bằng tiền mặt cho shipper khi nhận và kiểm tra hàng.
                    </span>
                  </div>
                </label>

                {/* Bank transfer option */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-[#5CA0E9] bg-[#A7C8F0]/15 ring-1 ring-[#5CA0E9]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="text-xs sm:text-sm font-bold text-[#333333] block">
                      Chuyển khoản ngân hàng qua mã QR (Mô phỏng Demo)
                    </span>
                    <span className="text-xs text-slate-500">
                      Chuyển khoản nhanh qua tài khoản ngân hàng của Blonéa.
                    </span>

                    {paymentMethod === 'bank' && (
                      <div className="mt-3 p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                        <p><strong>Ngân hàng:</strong> Vietcombank (Mô phỏng Demo)</p>
                        <p><strong>Số tài khoản:</strong> 9999 8888 6666 (Blonéa Store)</p>
                        <p><strong>Chủ tài khoản:</strong> CỬA HÀNG PHỤ KIỆN TÓC BLONÉA</p>
                        <p><strong>Cú pháp:</strong> BLO [Số điện thoại của bạn]</p>
                      </div>
                    )}
                  </div>
                </label>

                {/* Online Wallet */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'momo'
                      ? 'border-[#5CA0E9] bg-[#A7C8F0]/15 ring-1 ring-[#5CA0E9]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="momo"
                    checked={paymentMethod === 'momo'}
                    onChange={() => setPaymentMethod('momo')}
                    className="mt-1"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#333333] block">
                      Ví MoMo / ZaloPay / VNPAY (Mô phỏng Demo)
                    </span>
                    <span className="text-xs text-slate-500">
                      Mô phỏng thanh toán trực tuyến qua cổng ví điện tử an toàn.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary: Items & Total breakdown */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-base font-extrabold text-[#333333] pb-3 border-b border-slate-100">
              Đơn Hàng Của Bạn ({items.length} sản phẩm)
            </h2>

            {/* Compact items list */}
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-slate-100">
              {items.map((it) => (
                <div key={it.id} className="pt-2 first:pt-0 flex items-center gap-3">
                  <img
                    src={it.product.primaryImage}
                    alt={it.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover bg-[#FFF8F2] border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 text-xs">
                    <h4 className="font-bold text-[#333333] line-clamp-1">{it.product.name}</h4>
                    <p className="text-slate-500 mt-0.5">
                      {it.selectedColor} {!it.product.isCombo && `· Size ${it.selectedSize}`} · SL: {it.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#333333] tabular-nums shrink-0">
                    {formatVND(it.unitPrice * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations breakdown */}
            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Tiền hàng</span>
                <span className="font-semibold text-slate-800 tabular-nums">{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Phí vận chuyển</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">Miễn phí</span>
                  ) : (
                    formatVND(shippingFee)
                  )}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Mã giảm giá ({appliedVoucher})</span>
                  <span className="tabular-nums">-{formatVND(discount)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-extrabold text-[#333333]">Tổng thanh toán</span>
                <span className="text-xl font-black text-[#5CA0E9] tabular-nums">
                  {formatVND(total)}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-[#5CA0E9] hover:bg-[#4387D3] disabled:opacity-70 text-white font-black text-sm shadow-lg shadow-[#5CA0E9]/30 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Đang xử lý đơn hàng...</span>
              ) : (
                <>
                  <span>ĐẶT HÀNG NGAY</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-slate-400">
              Nhấn "Đặt hàng ngay" đồng nghĩa với việc bạn đồng ý với Điều khoản sử dụng và Chính sách giao nhận của Blonéa.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
