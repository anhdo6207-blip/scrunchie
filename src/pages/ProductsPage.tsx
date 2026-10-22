import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, Product, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Filter, SlidersHorizontal, RotateCcw, Search, Heart } from 'lucide-react';

interface ProductsPageProps {
  initialCategory?: string;
  initialColor?: string;
  initialSearch?: string;
  initialWishlistOnly?: boolean;
  onSelectProduct: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategory = 'all',
  initialColor = '',
  initialSearch = '',
  initialWishlistOnly = false,
  onSelectProduct,
}) => {
  const { wishlistIds } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>('default');
  const [searchFilter, setSearchFilter] = useState(initialSearch);
  const [wishlistOnly, setWishlistOnly] = useState(initialWishlistOnly);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSelectedColor(initialColor);
  }, [initialColor]);

  useEffect(() => {
    setSearchFilter(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setWishlistOnly(initialWishlistOnly);
  }, [initialWishlistOnly]);

  const allAvailableColors = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.colors.forEach((c) => set.add(c)));
    return Array.from(set);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Color filter
      if (selectedColor && !p.colors.includes(selectedColor)) {
        return false;
      }
      // Price range
      if (priceRange === 'under-30' && p.basePrice >= 30000) return false;
      if (priceRange === '30-50' && (p.basePrice < 30000 || p.basePrice > 50000)) return false;
      if (priceRange === 'over-50' && p.basePrice <= 50000) return false;
      // Search
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.categoryName.toLowerCase().includes(q) &&
          !p.colors.some((c) => c.toLowerCase().includes(q))
        ) {
          return false;
        }
      }
      // Wishlist only filter
      if (wishlistOnly && !wishlistIds.includes(p.id)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.basePrice - b.basePrice;
      if (sortOption === 'price-desc') return b.basePrice - a.basePrice;
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedCategory, selectedColor, priceRange, sortOption, searchFilter, wishlistOnly, wishlistIds]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedColor('');
    setPriceRange('all');
    setSortOption('default');
    setSearchFilter('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedColor !== '' || priceRange !== 'all' || searchFilter !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#5CA0E9] uppercase tracking-wider">
          Bộ sưu tập Blonéa
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#333333]">
          Tất Cả Sản Phẩm Scrunchies
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Chất liệu vải may êm ái, bảo vệ tóc với trọn vẹn những sắc màu pastel trẻ trung.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#5CA0E9] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name} (
                {cat.id === 'all'
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.category === cat.id).length}
              )
            </button>
          ))}
        </div>

        {/* Detailed Filters row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-100 items-center">
          {/* Quick search input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Lọc tên hoặc màu..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
            />
          </div>

          {/* Color dropdown */}
          <div>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#5CA0E9] text-slate-700 font-medium"
            >
              <option value="">Tất cả màu sắc</option>
              {allAvailableColors.map((color) => (
                <option key={color} value={color}>
                  Màu: {color}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#5CA0E9] text-slate-700 font-medium"
            >
              <option value="all">Tất cả mức giá</option>
              <option value="under-30">Dưới 30.000 đ</option>
              <option value="30-50">30.000 đ - 50.000 đ</option>
              <option value="over-50">Trên 50.000 đ (Combo)</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#5CA0E9] text-slate-700 font-semibold"
            >
              <option value="default">Mặc định nổi bật</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="name-asc">Tên sản phẩm A-Z</option>
            </select>
          </div>
        </div>

        {/* Active Filter Indicators */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="font-semibold text-slate-700">
                Tìm thấy {filteredProducts.length} sản phẩm
              </span>
              {selectedColor && <span>· Màu: {selectedColor}</span>}
              {selectedCategory !== 'all' && (
                <span>· Danh mục: {CATEGORIES.find((c) => c.id === selectedCategory)?.name}</span>
              )}
            </div>
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[#FF70A6] hover:text-[#FF3E7F] font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <p className="text-base font-bold text-slate-700">
            Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại.
          </p>
          <p className="text-xs text-slate-400">
            Vui lòng thử chọn tiêu chí lọc khác hoặc làm mới bộ lọc.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-2 px-5 py-2.5 bg-[#5CA0E9] hover:bg-[#4387D3] text-white text-xs font-bold rounded-xl transition-colors"
          >
            Làm mới bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};
