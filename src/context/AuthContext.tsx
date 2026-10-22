import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, pass: string) => { success: boolean; message: string };
  register: (name: string, email: string, phone: string, pass: string) => { success: boolean; message: string };
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'blonea_user_session_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Pre-seed a friendly demo account so user can immediately experience the account tab if they want
      return {
        id: 'user-demo-1',
        name: 'Phương Linh',
        email: 'linh.blonea@gmail.com',
        phone: '0987654321',
        address: 'Số 18, Ngõ 45 Cầu Giấy',
        province: 'Hà Nội',
        district: 'Cầu Giấy',
        ward: 'Dịch Vọng',
        createdAt: '2026-03-15',
      };
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving user to storage', e);
    }
  }, [user]);

  const login = (email: string, _pass: string) => {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Vui lòng nhập địa chỉ email hợp lệ.' };
    }
    const loggedUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email: email,
      phone: '0901234567',
      address: 'Phường Bến Nghé, Quận 1',
      province: 'TP. Hồ Chí Minh',
      district: 'Quận 1',
      ward: 'Bến Nghé',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(loggedUser);
    return { success: true, message: 'Đăng nhập thành công (Môi trường Demo)!' };
  };

  const register = (name: string, email: string, phone: string, _pass: string) => {
    if (!name.trim()) return { success: false, message: 'Vui lòng nhập họ và tên.' };
    if (!email || !email.includes('@')) return { success: false, message: 'Email không hợp lệ.' };
    if (!phone || phone.length < 9) return { success: false, message: 'Số điện thoại không hợp lệ.' };

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: '',
      province: 'Hà Nội',
      district: '',
      ward: '',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    return { success: true, message: 'Đăng ký tài khoản thành công (Môi trường Demo)!' };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
