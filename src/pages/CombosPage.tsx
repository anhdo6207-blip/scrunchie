import React from 'react';
import { PRODUCTS, Product, formatVND } from '../data/products';
import { useCart } from '../context/CartContext';
import { Gift, Sparkles, CheckCircle2, ArrowRight, Heart } from 'lucide-react';

interface CombosPageProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const CombosPage: React.FC<CombosPageProps> = ({ onSelectProduct, onNavigate }) => {
  const { addItem } = useCart();
  const comboProducts = PRODUCTS.filter((p) => p.isCombo);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFFA8A] text-[#6B5900] text-xs font-black uppercase tracking-wider">
          <Gift className="w-3.5 h-3.5" />
          <span>Bộ Sưu Tập Tiết Kiệm</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#333333]">
          Combo Scrunchies Tiết Kiệm Tới 21.000 đ
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Tận hưởng sự đồng điệu về màu sắc với mức giá ưu đãi nhất. Tiện lợi làm điệu mỗi ngày hoặc trao gửi món quà ngọt ngào tới người bạn thân yêu.
        </p>
      </div>

      {/* Featured Combo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {comboProducts.map((combo) => (
          <div
            key={combo.id}
            className="bg-white rounded-3xl border border-[#FFBFD9]/70 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-[#FFF8F2]">
              <img
                src={combo.primaryImage}
                alt={combo.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => onSelectProduct(combo)}
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-[#FF70A6] text-white text-xs font-bold rounded-full uppercase shadow-xs">
                  {combo.badge || 'Combo'}
                </span>
                <span className="px-3 py-1 bg-[#FFFA8A] text-[#6B5900] text-xs font-extrabold rounded-full shadow-xs">
                  Tiết kiệm {formatVND(combo.comboSaving || 0)}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h2
                  onClick={() => onSelectProduct(combo)}
                  className="text-xl sm:text-2xl font-black text-[#333333] hover:text-[#5CA0E9] transition-colors cursor-pointer"
                >
                  {combo.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {combo.description}
                </p>

                {/* Colors included in set */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Các màu có trong Combo:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {combo.colors.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8F2] border border-[#D9D9E3] text-xs font-semibold text-slate-700"
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: combo.colorHexes[c] || '#D9D9E3' }}
                        />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                  {combo.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#333333] tabular-nums">
                      {formatVND(combo.basePrice)}
                    </span>
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      {formatVND(combo.comboOriginalTotal || combo.originalPrice || 0)}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold block">
                    Đã giảm {formatVND(combo.comboSaving || 0)} so với mua lẻ
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => onSelectProduct(combo)}
                    className="flex-1 sm:flex-none px-4 py-2.5 border border-[#5CA0E9] hover:bg-[#A7C8F0]/20 text-[#2B6CB0] font-bold text-xs rounded-xl transition-colors"
                  >
                    Chi tiết
                  </button>
                  <button
                    onClick={() => addItem(combo, combo.colors[0], 'M', 1)}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-[#5CA0E9] hover:bg-[#4387D3] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why choose combo info card */}
      <div className="bg-[#FFF8F2] rounded-3xl p-6 sm:p-10 border border-[#D9D9E3]/70 text-center max-w-3xl mx-auto space-y-4">
        <Heart className="w-8 h-8 text-[#FF70A6] fill-[#FF70A6] mx-auto" />
        <h3 className="text-lg sm:text-xl font-bold text-[#333333]">
          Tại Sao Bạn Gái Nên Chọn Mua Theo Combo Tại Blonéa?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Mỗi combo đều được đội ngũ Blonéa cân nhắc phối màu hài hòa giữa các sắc độ nóng - lạnh pastel, giúp bạn dễ dàng mix-and-match với mọi trang phục từ đồng phục học sinh, đồ thể thao năng động đến váy đầm điệu đà cuối tuần.
        </p>
      </div>
    </div>
  );
};
