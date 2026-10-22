import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2, MessageCircle, Heart } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Tư vấn chọn mẫu & màu');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && (email.trim() || phone.trim()) && message.trim()) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#5CA0E9] uppercase tracking-wider flex items-center justify-center gap-1.5">
          <MessageCircle className="w-4 h-4 text-[#FF70A6]" />
          Kết nối cùng Blonéa
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#333333]">
          Liên Hệ & Hỗ Trợ Khách Hàng
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Bạn cần tư vấn chọn màu, đặt hàng sỉ theo combo hay hỗ trợ đơn hàng? Hãy nhắn tin cho Blonéa nhé!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFF8F2] rounded-3xl p-6 sm:p-8 border border-[#D9D9E3]/70 space-y-6">
            <h2 className="text-base font-extrabold text-[#333333]">
              Kênh Thông Tin Blonéa
            </h2>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#5CA0E9] shrink-0 border border-slate-200">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Hộp thư hỗ trợ</h4>
                  <p className="text-slate-500">cskh@blonea.vn (Hỗ trợ 24/7)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#FF70A6] shrink-0 border border-slate-200">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Hotline / Zalo tư vấn</h4>
                  <p className="text-slate-500">0988.xxx.xxx (Mẫu thông tin liên hệ)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#6B5900] shrink-0 border border-slate-200">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Thời gian làm việc</h4>
                  <p className="text-slate-500">Thứ Hai - Chủ Nhật: 8:30 - 21:30</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#2B6CB0] shrink-0 border border-slate-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Địa chỉ văn phòng đại diện</h4>
                  <p className="text-slate-500">Hà Nội & TP. Hồ Chí Minh (Cửa hàng trực tuyến)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D9D9E3]/60 flex items-center gap-2 text-xs text-slate-500">
              <Heart className="w-4 h-4 text-[#FF70A6] fill-[#FF70A6] shrink-0" />
              <span>Blonéa luôn trân trọng từng lời góp ý chân thành từ bạn!</span>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-[#333333]">
            Gửi Tin Nhắn Cho Đội Ngũ Blonéa
          </h2>
          <p className="text-xs text-slate-500">
            Chúng mình sẽ phản hồi tin nhắn của bạn trong vòng vài giờ làm việc.
          </p>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong>Gửi tin nhắn thành công!</strong>
                <p>Cảm ơn bạn đã liên hệ. Đội ngũ Blonéa sẽ sớm phản hồi lại bạn nhé!</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Họ và tên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Hoàng Mai Chi"
                  required
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Số điện thoại <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912345678"
                  required
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email của bạn</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maichi@gmail.com"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Chủ đề cần hỗ trợ</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#5CA0E9]"
                >
                  <option value="Tư vấn chọn mẫu & màu">Tư vấn chọn mẫu & màu sắc</option>
                  <option value="Hỏi về tiến độ đơn hàng">Hỏi về tiến độ đơn hàng</option>
                  <option value="Yêu cầu đổi trả sản phẩm">Yêu cầu đổi trả sản phẩm</option>
                  <option value="Đặt mua số lượng lớn làm quà tặng">Đặt mua số lượng lớn làm quà</option>
                  <option value="Góp ý cho thương hiệu">Góp ý cho thương hiệu</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Nội dung tin nhắn <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Nhập câu hỏi hoặc yêu cầu hỗ trợ của bạn..."
                required
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#5CA0E9] hover:bg-[#4387D3] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi tin nhắn ngay</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
