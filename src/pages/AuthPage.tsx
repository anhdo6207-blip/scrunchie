import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BloneaLogo } from '../components/BloneaLogo';
import { CheckCircle2, AlertCircle, Info, Lock, Mail, User, Phone } from 'lucide-react';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const { login, register, isLoggedIn } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Register form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPass, setRegPass] = useState('');

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (isLoggedIn) {
    onNavigate('account');
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(loginEmail, loginPass);
    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setTimeout(() => onNavigate('account'), 500);
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const res = register(regName, regEmail, regPhone, regPass);
    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setTimeout(() => onNavigate('account'), 500);
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 space-y-6">
      <div className="text-center space-y-2">
        <BloneaLogo size="md" showTagline={false} />
        <h1 className="text-xl sm:text-2xl font-black text-[#333333] pt-2">
          {tab === 'login' ? 'Đăng Nhập Tài Khoản' : 'Tạo Tài Khoản Mới'}
        </h1>
        <p className="text-xs text-slate-500">
          Lưu trữ lịch sử đơn hàng và nhận thông báo ưu đãi độc quyền từ Blonéa.
        </p>
      </div>

      {/* Demo disclaimer banner */}
      <div className="p-3 bg-[#FFF8F2] border border-[#FFBFD9] rounded-2xl flex items-start gap-2.5 text-xs text-slate-600">
        <Info className="w-4 h-4 text-[#FF70A6] shrink-0 mt-0.5" />
        <span>
          <strong>Lưu ý:</strong> Chức năng tài khoản hoạt động trong phạm vi trình duyệt (Demo Simulation). Không lưu trữ mật khẩu thật.
        </span>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button
          onClick={() => {
            setTab('login');
            setMessage(null);
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            tab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Đăng nhập
        </button>
        <button
          onClick={() => {
            setTab('register');
            setMessage(null);
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            tab === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Đăng ký
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        {message && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="linh@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Mật khẩu</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#5CA0E9] hover:bg-[#4387D3] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Đăng nhập (Demo)
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Họ và tên</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Nguyễn Phương Linh"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="linh@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Số điện thoại</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="0912345678"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Mật khẩu</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5CA0E9]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#5CA0E9] hover:bg-[#4387D3] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Tạo tài khoản ngay (Demo)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
