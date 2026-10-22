import React from 'react';
import { Order } from '../context/CartContext';
import { formatVND } from '../data/products';
import { CheckCircle2, ShoppingBag, ArrowRight, Home, Search, PackageCheck } from 'lucide-react';

interface OrderSuccessPageProps {
  order: Order | null;
  onNavigate: (page: string, params?: any) => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ order, onNavigate }) => {
  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy thông tin đơn hàng vừa tạo</h2>
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-2.5 bg-[#5CA0E9] text-white font-bold text-xs rounded-xl"
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  const paymentLabels: Record<Order['paymentMethod'], string> = {
    cod: 'Thanh toán khi nhận hàng (COD)',
    bank: 'Chuyển khoản ngân hàng (Mô phỏng Demo)',
    vietqr: 'Chuyển khoản VietQR (Mô phỏng Demo)',
    momo: 'Ví điện tử MoMo / ZaloPay / VNPAY (Mô phỏng Demo)',
    vnpay: 'Cổng VNPAY (Mô phỏng Demo)',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      {/* Success banner */}
      <div className="bg-white rounded-3xl border border-[#A7C8F0] p-6 sm:p-10 shadow-sm text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 border border-emerald-200">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#333333] uppercase tracking-tight">
          CẢM ƠN BẠN ĐÃ MUA HÀNG TẠI BLONÉA!
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Đơn hàng của bạn đã được ghi nhận trong hệ thống. Đội ngũ Blonéa sẽ chuẩn bị những chiếc scrunchie xinh xắn nhất để sớm gửi đến bạn!
        </p>

        {/* Order code pill */}
        <div className="pt-2 inline-flex items-center gap-2 px-4 py-2 bg-[#FFF8F2] rounded-2xl border border-[#D9D9E3] text-xs font-bold text-slate-800">
          <span>Mã đơn hàng:</span>
          <span className="font-mono text-base text-[#5CA0E9] tracking-wider font-black">
            {order.id}
          </span>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-base font-extrabold text-[#333333]">
              Thông Tin Đơn Hàng Chi Tiết
            </h2>
            <span className="text-xs text-slate-400">
              Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Trạng thái:</span>
            <span className="px-3 py-1 bg-[#A7C8F0]/30 text-[#2B6CB0] text-xs font-extrabold rounded-full flex items-center gap-1">
              <PackageCheck className="w-3.5 h-3.5" />
              {order.status}
            </span>
          </div>
        </div>

        {/* Customer & Shipping Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 bg-[#FFFDF9] p-4 rounded-2xl border border-slate-100">
          <div className="space-y-1">
            <p><strong>Người nhận:</strong> {order.customerName}</p>
            <p><strong>Số điện thoại:</strong> {order.customerPhone}</p>
            {order.customerEmail && <p><strong>Email:</strong> {order.customerEmail}</p>}
          </div>
          <div className="space-y-1">
            <p><strong>Địa chỉ nhận hàng:</strong> {order.address}, {order.ward}, {order.district}, {order.province}</p>
            <p><strong>Phương thức:</strong> {paymentLabels[order.paymentMethod]}</p>
            {order.note && <p><strong>Ghi chú:</strong> {order.note}</p>}
          </div>
        </div>

        {/* Item list */}
        <div className="space-y-3 divide-y divide-slate-100">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pt-2">
            Danh sách sản phẩm ({order.items.length})
          </h3>
          {order.items.map((it) => (
            <div key={it.id} className="pt-3 flex items-center gap-3">
              <img
                src={it.product.primaryImage}
                alt={it.product.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-xl object-cover bg-[#FFF8F2] border border-slate-100 shrink-0"
              />
              <div className="flex-1 text-xs">
                <h4 className="font-bold text-[#333333]">{it.product.name}</h4>
                <p className="text-slate-500">
                  Màu: {it.selectedColor} {!it.product.isCombo && `· Size: ${it.selectedSize}`} · Số lượng: {it.quantity}
                </p>
              </div>
              <span className="text-xs font-bold text-slate-800 tabular-nums">
                {formatVND(it.unitPrice * it.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Total Summary */}
        <div className="pt-4 border-t border-slate-200 text-xs space-y-1.5 text-right">
          <p className="text-slate-500">
            Tiền hàng: <strong className="text-slate-800 tabular-nums">{formatVND(order.subtotal)}</strong>
          </p>
          <p className="text-slate-500">
            Phí vận chuyển: <strong className="text-slate-800 tabular-nums">{order.shippingFee === 0 ? 'Miễn phí' : formatVND(order.shippingFee)}</strong>
          </p>
          {order.discount > 0 && (
            <p className="text-emerald-600 font-bold">
              Giảm giá voucher: -{formatVND(order.discount)}
            </p>
          )}
          <p className="text-base font-black text-[#5CA0E9] pt-2 border-t border-slate-100">
            Tổng thanh toán: <span className="tabular-nums">{formatVND(order.total)}</span>
          </p>
        </div>
      </div>

      {/* Next Actions matching requirements: Tiếp tục mua sắm | Theo dõi đơn hàng | Về trang chủ */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <button
          onClick={() => onNavigate('home')}
          className="w-full sm:w-auto px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>

        <button
          onClick={() => onNavigate('order-tracking', { orderId: order.id })}
          className="w-full sm:w-auto px-6 py-3 border border-[#A7C8F0] hover:bg-[#A7C8F0]/20 text-[#2B6CB0] text-xs font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Theo dõi đơn hàng</span>
        </button>

        <button
          onClick={() => onNavigate('products')}
          className="w-full sm:w-auto px-6 py-3 bg-[#5CA0E9] hover:bg-[#4387D3] text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Tiếp tục mua sắm</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
