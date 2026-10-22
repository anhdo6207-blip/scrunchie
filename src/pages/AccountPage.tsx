import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatVND } from '../data/products';
import {
  User,
  ShoppingBag,
  LogOut,
  MapPin,
  Phone,
  Mail,
  Package,
  Calendar,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface AccountPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate }) => {
  const { user, logout, updateProfile } = useAuth();
  const { orders } = useCart();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editAddress, setEditAddress] = useState(user?.address || '');

  if (!user) {
    onNavigate('auth');
    return null;
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      address: editAddress,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header Profile Summary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#A7C8F0]/30 border-2 border-[#5CA0E9] flex items-center justify-center text-xl font-black text-[#2B6CB0]">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#333333]">{user.name}</h1>
            <p className="text-xs text-slate-500">{user.email} · Khách hàng thân thiết Blonéa</p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            onNavigate('home');
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Đăng xuất</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 relative flex items-center gap-2 ${
            activeTab === 'orders' ? 'text-[#5CA0E9]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Lịch sử đơn hàng ({orders.length})</span>
          {activeTab === 'orders' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5CA0E9] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 relative flex items-center gap-2 ${
            activeTab === 'profile' ? 'text-[#5CA0E9]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Thông tin cá nhân & Sổ địa chỉ</span>
          {activeTab === 'profile' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5CA0E9] rounded-full" />
          )}
        </button>
      </div>

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">Bạn chưa có đơn hàng nào</h3>
              <p className="text-xs text-slate-400">
                Hãy dạo quanh cửa hàng để tìm chiếc scrunchie xinh xắn bạn yêu thích nhé!
              </p>
              <button
                onClick={() => onNavigate('products')}
                className="mt-2 px-5 py-2.5 bg-[#5CA0E9] hover:bg-[#4387D3] text-white text-xs font-bold rounded-xl transition-colors"
              >
                Khám phá sản phẩm
              </button>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-black text-[#5CA0E9]">
                      {ord.id}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(ord.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#A7C8F0]/30 text-[#2B6CB0] text-xs font-extrabold rounded-full">
                      {ord.status}
                    </span>
                    <button
                      onClick={() => onNavigate('order-tracking', { orderId: ord.id })}
                      className="text-xs font-bold text-[#5CA0E9] hover:underline flex items-center gap-1"
                    >
                      <span>Tra cứu</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-2">
                  {ord.items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <img
                          src={it.product.primaryImage}
                          alt={it.product.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover bg-slate-50"
                        />
                        <span>
                          <strong>{it.product.name}</strong> ({it.selectedColor}
                          {!it.product.isCombo && ` - Size ${it.selectedSize}`}) × {it.quantity}
                        </span>
                      </div>
                      <span className="font-semibold tabular-nums">
                        {formatVND(it.unitPrice * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Địa chỉ: {ord.address}, {ord.ward}, {ord.district}, {ord.province}
                  </span>
                  <div className="text-right">
                    <span className="text-slate-500">Tổng tiền: </span>
                    <strong className="text-sm text-[#5CA0E9] font-black tabular-nums">
                      {formatVND(ord.total)}
                    </strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Profile Tab Content */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-extrabold text-[#333333]">
              Thông Tin Tài Khoản
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs text-[#5CA0E9] font-bold hover:underline"
            >
              {isEditing ? 'Hủy' : 'Chỉnh sửa thông tin'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Họ và tên</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Số điện thoại</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Địa chỉ mặc định</label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  placeholder="Số nhà, đường, phường, quận..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#5CA0E9] hover:bg-[#4387D3] text-white text-xs font-bold rounded-xl transition-colors"
              >
                Lưu thay đổi
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 max-w-xl">
              <div className="p-3 bg-[#FFFDF9] rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#5CA0E9]" /> Họ và tên:
                </span>
                <p className="font-bold text-slate-800 text-sm">{user.name}</p>
              </div>

              <div className="p-3 bg-[#FFFDF9] rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#5CA0E9]" /> Email đăng nhập:
                </span>
                <p className="font-bold text-slate-800 text-sm">{user.email}</p>
              </div>

              <div className="p-3 bg-[#FFFDF9] rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#5CA0E9]" /> Số điện thoại:
                </span>
                <p className="font-bold text-slate-800 text-sm">{user.phone || 'Chưa cập nhật'}</p>
              </div>

              <div className="p-3 bg-[#FFFDF9] rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#5CA0E9]" /> Địa chỉ giao hàng:
                </span>
                <p className="font-bold text-slate-800 text-sm">
                  {user.address ? `${user.address}, ${user.district}, ${user.province}` : 'Chưa có địa chỉ mặc định'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
