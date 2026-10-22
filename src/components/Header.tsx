import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../data/products';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
}) => {
  const { itemCount, setIsCartDrawerOpen, wishlistIds } = useCart();
  const { isLoggedIn, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Exact menu order according to prompt:
  // 1. Trang chủ
  // 2. Giới thiệu
  // 3. Sản phẩm (with dropdown arrow)
  // 4. Bộ sưu tập
  // 5. Góc làm đẹp
  // 6. Liên hệ
  const navLinks = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'about', label: 'Giới thiệu' },
    { id: 'products', label: 'Sản phẩm', hasDropdown: true },
    { id: 'collections', label: 'Bộ sưu tập' },
    { id: 'beauty-blog', label: 'Góc làm đẹp' },
    { id: 'contact', label: 'Liên hệ' },
  ];

  const handleMouseEnterProducts = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setProductsDropdownOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 200);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onNavigate('products', { search: searchInput.trim() });
    } else {
      onOpenSearch();
    }
  };

  // Close menus on page navigation
  const handleNavClick = (pageId: string, params?: any) => {
    setProductsDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate(pageId, params);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8EFF8] transition-all">
      {/* 2.1. Thanh thông báo trên cùng (Top Announcement Bar, ~26-28px, nền xanh baby #A7C8F0) */}
      <div className="bg-[#A7C8F0] text-[#1B385D] text-[11px] sm:text-xs font-semibold py-1 px-4 text-center flex items-center justify-center gap-1.5 select-none h-7">
        <span className="text-xs">🎀</span>
        <span className="tracking-wide">
          Miễn phí vận chuyển cho đơn hàng từ 150.000đ
        </span>
        <span className="hidden md:inline text-[#1B385D]/40">|</span>
        <span className="hidden md:inline text-[11px] font-normal text-[#1B385D]/80">
          Xinh trên tóc, điệu trên tay ✨
        </span>
      </div>

      {/* 2.2. Thanh điều hướng chính (Chiều cao ~50-54px trên desktop, nền trắng viền mảnh) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[52px] sm:h-[54px] gap-2 lg:gap-4">
          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 -ml-1 text-slate-700 hover:text-[#5CA0E9] rounded-lg transition-colors"
            aria-label="Mở menu điều hướng"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* A. Logo Blonéa (Phía trái, chiều cao hiển thị 38-44px, không méo, nền chuẩn) */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center shrink-0 pr-1 lg:pr-2"
          >
            <Logo height={42} showTagline={false} />
          </div>

          {/* B. Menu điều hướng (Desktop, thứ tự chuẩn, chữ nhỏ gọn màu xanh đậm/xám đậm, đánh dấu hồng pastel) */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 text-xs lg:text-[13px] font-semibold text-slate-700">
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.id ||
                (link.id === 'collections' && currentPage === 'combos');

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={handleMouseEnterProducts}
                    onMouseLeave={handleMouseLeaveProducts}
                  >
                    <button
                      onClick={() => handleNavClick('products')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full transition-all ${
                        isActive
                          ? 'bg-[#FFBFD9]/30 text-[#9C1D4C] font-bold'
                          : 'text-slate-700 hover:text-[#5CA0E9] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          productsDropdownOpen ? 'rotate-180 text-[#5CA0E9]' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Dropdown menu con "Sản phẩm": nền trắng, bo góc, bóng đổ nhẹ, dữ liệu thực tế */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in-50 zoom-in-95">
                        <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5 tracking-wider">
                          Danh mục scrunchies
                        </div>
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleNavClick('products', { category: cat.id })}
                            className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:text-[#5CA0E9] hover:bg-[#F0F7FF] rounded-xl transition-colors flex items-center justify-between group"
                          >
                            <span className="font-medium group-hover:translate-x-0.5 transition-transform">
                              {cat.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2.5 py-1.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-[#FFBFD9]/30 text-[#9C1D4C] font-bold'
                      : 'text-slate-700 hover:text-[#5CA0E9] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* C. Ô tìm kiếm dạng viên thuốc (Pill shape, viền xanh nhạt, placeholder "Tìm scrunchie...") */}
          <div className="flex-1 max-w-[170px] lg:max-w-[210px] hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Tìm scrunchie..."
                className="w-full bg-[#F8F9FA] hover:bg-white focus:bg-white text-slate-700 text-xs rounded-full pl-8 pr-3 py-1.5 border border-[#A7C8F0]/70 focus:outline-none focus:border-[#5CA0E9] focus:ring-2 focus:ring-[#A7C8F0]/30 transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                aria-label="Tìm kiếm"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#5CA0E9] hover:text-[#3B82F6] transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* D. Các biểu tượng chức năng: Tài khoản, Yêu thích, Giỏ hàng */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Mobile search trigger */}
            <button
              onClick={onOpenSearch}
              className="sm:hidden p-1.5 text-slate-600 hover:text-[#5CA0E9] rounded-full transition-colors"
              title="Tìm kiếm"
              aria-label="Tìm kiếm"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Tài khoản */}
            <button
              onClick={() => handleNavClick(isLoggedIn ? 'account' : 'auth')}
              className="p-1.5 text-slate-600 hover:text-[#5CA0E9] hover:bg-[#F8FAFC] rounded-full transition-colors flex items-center gap-1 text-xs"
              title={isLoggedIn ? `Tài khoản: ${user?.name}` : 'Đăng nhập / Tài khoản'}
              aria-label="Tài khoản"
            >
              <User className="w-4 h-4" />
              {isLoggedIn && (
                <span className="hidden xl:inline text-xs font-semibold text-slate-700 max-w-[70px] truncate">
                  {user?.name}
                </span>
              )}
            </button>

            {/* Yêu thích */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="relative p-1.5 text-slate-600 hover:text-[#FF4F8B] hover:bg-[#F8FAFC] rounded-full transition-colors"
              title="Danh sách yêu thích"
              aria-label="Yêu thích"
            >
              <Heart className="w-4 h-4" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] px-1 bg-[#FF4F8B] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Giỏ hàng (Nền hồng pastel bo tròn nhẹ, badge số lượng sản phẩm) */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-1.5 sm:px-2.5 sm:py-1.5 bg-[#FFBFD9]/30 hover:bg-[#FFBFD9]/50 text-[#8A1846] rounded-full transition-all flex items-center gap-1.5 shadow-2xs group"
              aria-label="Mở giỏ hàng"
              title="Giỏ hàng của bạn"
            >
              <ShoppingBag className="w-4 h-4 text-[#8A1846] group-hover:scale-105 transition-transform" />
              <span className="text-xs font-bold text-[#8A1846] hidden xs:inline">
                {itemCount}
              </span>
              {itemCount > 0 && (
                <span className="xs:hidden absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-[#FF4F8B] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Menu mở trên điện thoại) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2">
          {/* Mobile search bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Tìm scrunchie..."
              className="w-full bg-[#F8F9FA] text-slate-700 text-xs rounded-full pl-8 pr-3 py-2 border border-[#A7C8F0]/70 focus:outline-none focus:border-[#5CA0E9]"
            />
            <Search className="w-3.5 h-3.5 text-[#5CA0E9] absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          {/* Navigation Links list */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.id ||
                (link.id === 'collections' && currentPage === 'combos');

              if (link.hasDropdown) {
                return (
                  <div key={link.id} className="space-y-1">
                    <div className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold">
                      <button
                        onClick={() => handleNavClick('products')}
                        className={`text-left flex-1 ${
                          isActive ? 'text-[#9C1D4C] font-bold' : 'text-slate-700'
                        }`}
                      >
                        {link.label}
                      </button>
                      <button
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className="p-1 text-slate-400 hover:text-slate-700"
                        aria-label="Mở danh mục con"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileProductsOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {mobileProductsOpen && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-xl border-l-2 border-[#5CA0E9]">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleNavClick('products', { category: cat.id })}
                            className="w-full text-left py-1.5 px-2 text-xs text-slate-600 hover:text-[#5CA0E9]"
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2 text-sm font-semibold rounded-xl transition-colors ${
                    isActive
                      ? 'bg-[#FFBFD9]/25 text-[#9C1D4C] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Quick links footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-1">
            <button
              onClick={() => handleNavClick(isLoggedIn ? 'account' : 'auth')}
              className="text-slate-700 hover:text-[#5CA0E9] font-medium flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>{isLoggedIn ? user?.name : 'Đăng nhập tài khoản'}</span>
            </button>
            <button
              onClick={() => handleNavClick('wishlist')}
              className="text-[#FF4F8B] font-bold flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Yêu thích ({wishlistIds.length})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
