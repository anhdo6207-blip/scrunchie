import React, { useState, useEffect } from 'react';
import { useCart, Order } from '../context/CartContext';
import { formatVND } from '../data/products';
import { Search, PackageCheck, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface OrderTrackingPageProps {
  initialOrderId?: string;
  onNavigate: (page: string) => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  initialOrderId = '',
  onNavigate,
}) => {
  const { orders } = useCart();
  const [searchId, setSearchId] = useState(initialOrderId);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialOrderId) {
      handleSearch(initialOrderId);
    }
  }, [initialOrderId, orders]);

  const handleSearch = (idToSearch?: string) => {
    const query = (idToSearch || searchId).trim().toUpperCase();
    if (!query) {
      setErrorMsg('Vui lòng nhập mã đơn hàng (Ví dụ: BLO-12345).');
      setSearchedOrder(null);
      return;
    }

    const found = orders.find((o) => o.id.toUpperCase() === query);
    if (found) {
      setSearchedOrder(found);
      setErrorMsg('');
    } else {
      setSearchedOrder(null);
      setErrorMsg(`Không tìm thấy đơn hàng "${query}" trong dữ liệu phiên làm việc này.`);
    }
  };

  const steps = [
    { title: 'Tiếp nhận đơn hàng', desc: 'Hệ thống đã ghi nhận đơn thành công' },
    { title: 'Đang xử lý & đóng gói', desc: 'Nhân viên chọn đúng màu và kiểm tra scrunchie' },
    { title: 'Đang giao hàng', desc: 'Bàn giao cho shipper vận chuyển' },
    { title: 'Đã hoàn thành', desc: 'Khách hàng nhận và kiểm tra kiện hàng' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#5CA0E9] uppercase tracking-wider">
          Theo dõi tiến độ
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#333333]">
          Tra Cứu Đơn Hàng Của Bạn
        </h1>
        <p className="text-xs text-slate-500">
          Nhập mã đơn hàng (bắt đầu bằng <strong>BLO-</strong>) để kiểm tra tình trạng đóng gói và vận chuyển.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-xl mx-auto space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Nhập mã đơn, ví dụ: BLO-74921"
              className="w-full pl-10 pr-3.5 py-3 text-xs sm:text-sm uppercase font-mono rounded-2xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#5CA0E9] hover:bg-[#4387D3] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-colors shrink-0"
          >
            Tra cứu
          </button>
        </form>

        {errorMsg && (
          <p className="text-xs text-rose-500 flex items-center gap-1.5 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </p>
        )}

        {orders.length > 0 && (
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>Đơn hàng gần đây trong trình duyệt: </span>
            <div className="inline-flex flex-wrap gap-1.5 mt-1">
              {orders.slice(0, 3).map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setSearchId(o.id);
                    handleSearch(o.id);
                  }}
                  className="font-mono text-[#5CA0E9] underline hover:text-[#2B6CB0] font-bold"
                >
                  {o.id}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Searched Order Details Card */}
      {searchedOrder && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <span className="text-xs text-slate-400">Mã đơn hàng:</span>
              <h2 className="text-xl font-mono font-black text-[#5CA0E9]">
                {searchedOrder.id}
              </h2>
            </div>
            <span className="px-3.5 py-1.5 bg-[#A7C8F0]/30 text-[#2B6CB0] text-xs font-bold rounded-full self-start sm:self-auto">
              Trạng thái: {searchedOrder.status}
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="py-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-6">
              Tiến trình xử lý
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {steps.map((st, idx) => (
                <div key={idx} className="flex flex-col items-start space-y-1.5 relative">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx === 0
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-slate-800">{st.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-9">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer info & Item list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
            <div className="space-y-1.5 bg-[#FFFDF9] p-4 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">Thông tin người nhận:</h4>
              <p><strong>Khách hàng:</strong> {searchedOrder.customerName}</p>
              <p><strong>Điện thoại:</strong> {searchedOrder.customerPhone}</p>
              <p><strong>Địa chỉ:</strong> {searchedOrder.address}, {searchedOrder.ward}, {searchedOrder.district}, {searchedOrder.province}</p>
            </div>

            <div className="space-y-2 bg-[#FFFDF9] p-4 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">Sản phẩm trong kiện hàng:</h4>
              {searchedOrder.items.map((it) => (
                <div key={it.id} className="flex justify-between items-center text-xs">
                  <span>
                    {it.product.name} ({it.selectedColor}) × {it.quantity}
                  </span>
                  <span className="font-semibold tabular-nums">
                    {formatVND(it.unitPrice * it.quantity)}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-[#5CA0E9]">
                <span>Tổng tiền:</span>
                <span className="tabular-nums">{formatVND(searchedOrder.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
