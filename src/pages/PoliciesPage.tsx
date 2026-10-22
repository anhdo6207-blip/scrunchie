import React, { useState } from 'react';
import { Truck, RefreshCw, Shield, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface PoliciesPageProps {
  initialTab?: 'shipping' | 'return' | 'privacy' | 'terms';
  onNavigate: (page: string) => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({
  initialTab = 'shipping',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'return' | 'privacy' | 'terms'>(initialTab);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#5CA0E9] uppercase tracking-wider">
          Chính sách khách hàng
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#333333]">
          Quy Định & Quyền Lợi Của Bạn
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Minh bạch thông tin về vận chuyển, đổi trả và bảo mật thông tin cá nhân.
        </p>
      </div>

      {/* Policy Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-4 sm:gap-8 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('shipping')}
          className={`pb-3.5 relative flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'shipping' ? 'text-[#5CA0E9]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Chính sách giao hàng</span>
          {activeTab === 'shipping' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5CA0E9] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('return')}
          className={`pb-3.5 relative flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'return' ? 'text-[#5CA0E9]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Chính sách đổi trả</span>
          {activeTab === 'return' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5CA0E9] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`pb-3.5 relative flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'privacy' ? 'text-[#5CA0E9]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Chính sách bảo mật</span>
          {activeTab === 'privacy' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5CA0E9] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`pb-3.5 relative flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'terms' ? 'text-[#5CA0E9]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Điều khoản sử dụng</span>
          {activeTab === 'terms' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5CA0E9] rounded-full" />
          )}
        </button>
      </div>

      {/* Tab 1: Shipping Policy */}
      {activeTab === 'shipping' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <Truck className="w-6 h-6 text-[#5CA0E9]" />
            <h2 className="text-lg font-bold text-[#333333]">Chính Sách Giao Hàng & Vận Chuyển</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">1. Phạm vi giao hàng</h3>
              <p>
                Blonéa hỗ trợ đóng gói và chuyển phát toàn quốc tới 63 tỉnh/thành phố tại Việt Nam thông qua các đối tác bưu cục chuyên nghiệp.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-1">2. Thời gian xử lý & nhận hàng dự kiến</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li><strong>Thời gian đóng gói:</strong> Từ 12 – 24 giờ sau khi bạn đặt hàng thành công.</li>
                <li><strong>Khu vực nội thành (Hà Nội, TP.HCM):</strong> Dự kiến nhận hàng trong 1 – 2 ngày làm việc.</li>
                <li><strong>Khu vực ngoại thành & các tỉnh thành khác:</strong> Dự kiến nhận hàng trong 2 – 4 ngày làm việc.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-1">3. Cước phí vận chuyển</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li><strong>Phí ship tiêu chuẩn:</strong> Đồng giá 20.000 VNĐ cho mọi đơn hàng dưới 150.000 VNĐ.</li>
                <li><strong>Miễn phí vận chuyển (Freeship):</strong> Áp dụng tự động cho tất cả đơn hàng có tổng tiền hàng từ <strong>150.000 VNĐ</strong> trở lên.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-1">4. Kiểm tra hàng trước khi nhận</h3>
              <p>
                Khách hàng được quyền đồng kiểm ngoại quan (kiểm tra số lượng, màu sắc, đúng mẫu đặt) trước khi thanh toán cho nhân viên giao hàng (áp dụng cho đơn COD).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Return Policy */}
      {activeTab === 'return' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <RefreshCw className="w-6 h-6 text-[#FF70A6]" />
            <h2 className="text-lg font-bold text-[#333333]">Chính Sách Đổi Trả Sản Phẩm (7 Ngày)</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">1. Điều kiện tiếp nhận đổi trả</h3>
              <p>Blonéa chấp nhận đổi trả miễn phí trong các trường hợp:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 mt-1">
                <li>Sản phẩm bị lỗi kỹ thuật may: đứt chỉ, tuột đường may viền, lỗi chun co giãn.</li>
                <li>Sản phẩm giao sai mẫu, sai màu hoặc sai kích cỡ so với đơn đã đặt.</li>
                <li>Sản phẩm còn mới nguyên tem tag thương hiệu Blonéa và chưa qua giặt tẩy.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-1">2. Thời hạn tiếp nhận</h3>
              <p>
                Trong vòng <strong>7 ngày</strong> kể từ ngày bạn nhận được kiện hàng từ đơn vị vận chuyển.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-1">3. Quy trình thực hiện</h3>
              <ol className="list-decimal list-inside space-y-1 text-slate-600">
                <li>Chụp ảnh hoặc quay video ngắn tình trạng sản phẩm có lỗi.</li>
                <li>Gửi thông tin kèm mã đơn hàng (ví dụ: BLO-89421) tới kênh Liên hệ của Blonéa.</li>
                <li>Nhân viên sẽ xác nhận và gửi sản phẩm đổi mới tận nhà cho bạn trong 2-3 ngày làm việc.</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Privacy Policy */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <Shield className="w-6 h-6 text-[#5CA0E9]" />
            <h2 className="text-lg font-bold text-[#333333]">Chính Sách Bảo Mật Thông Tin</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">1. Mục đích thu thập thông tin</h3>
              <p>
                Blonéa chỉ thu thập các thông tin tối thiểu gồm: Họ tên, số điện thoại, địa chỉ nhận hàng và email nhằm mục đích duy nhất là xử lý đóng gói và bàn giao đơn hàng tới tay bạn.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-1">2. Phạm vi sử dụng thông tin</h3>
              <p>
                Thông tin của bạn tuyệt đối không được mua bán, trao đổi hoặc chia sẻ cho bên thứ ba ngoài đối tác vận chuyển phục vụ giao nhận hàng hóa.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-1">3. Bảo vệ dữ liệu trong môi trường Demo</h3>
              <p>
                Website hiện đang vận hành trong môi trường triển khai thử nghiệm giao diện. Mọi dữ liệu giỏ hàng, thông tin tài khoản và đơn hàng được lưu trữ cục bộ trong bộ nhớ trình duyệt (localStorage) của bạn, đảm bảo tính riêng tư cá nhân.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Terms of Service */}
      {activeTab === 'terms' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <FileText className="w-6 h-6 text-[#6B5900]" />
            <h2 className="text-lg font-bold text-[#333333]">Điều Khoản Sử Dụng Website</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">1. Giới thiệu chung</h3>
              <p>
                Chào mừng bạn đến với website thương mại điện tử Blonéa. Khi sử dụng website và thực hiện đặt mua các sản phẩm scrunchie, bạn đồng ý tuân thủ các quy tắc và chính sách mua sắm được nêu rõ tại đây.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-1">2. Giá bán và thanh toán</h3>
              <p>
                Tất cả giá niêm yết trên website được tính bằng Việt Nam Đồng (VNĐ), đã bao gồm các mức chiết khấu combo hoặc ưu đãi niêm yết. Blonéa cam kết tính đúng và đồng nhất giá hiển thị trên thẻ sản phẩm, chi tiết sản phẩm và tổng tiền trong giỏ hàng.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-1">3. Quyền sở hữu trí tuệ</h3>
              <p>
                Logo Blonéa, khẩu hiệu “Xinh trên tóc, điệu trên tay”, tagline “Scrunchies for your everyday vibe”, hình ảnh sản phẩm và nội dung thiết kế thuộc quyền sở hữu của thương hiệu Blonéa.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
