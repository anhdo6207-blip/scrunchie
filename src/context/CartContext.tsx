import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, calculateItemPrice } from '../data/products';

export interface CartItem {
  id: string; // Composite key: `${product.id}-${selectedColor}-${selectedSize}`
  product: Product;
  selectedColor: string;
  selectedSize: 'S' | 'M' | 'L';
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string; // e.g. BLN-20261014-0123
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  note?: string;
  shippingMethod: 'standard' | 'express';
  shippingFee: number;
  paymentMethod: 'cod' | 'vietqr' | 'bank' | 'momo' | 'vnpay';
  items: CartItem[];
  subtotal: number;
  discount: number;
  voucherCode?: string;
  total: number;
  status: 'Chờ giao hàng' | 'Chờ thanh toán' | 'Đang xử lý';
  estimatedDelivery: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, color: string, size?: 'S' | 'M' | 'L', quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  shippingMethod: 'standard' | 'express';
  setShippingMethod: (method: 'standard' | 'express') => void;
  discount: number;
  total: number;
  appliedVoucher: string | null;
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedDelivery'>) => Order;
  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => boolean;
  isWishlisted: (productId: string) => boolean;
  // Quick View / Quick Buy Modal
  quickBuyProduct: Product | null;
  setQuickBuyProduct: (product: Product | null) => void;
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'blonea_cart_v2';
const ORDERS_STORAGE_KEY = 'blonea_orders_v2';
const WISHLIST_STORAGE_KEY = 'blonea_wishlist_v2';

export const FREE_SHIPPING_THRESHOLD = 150000;
export const STANDARD_SHIPPING_FEE = 25000;
export const EXPRESS_SHIPPING_FEE = 40000;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['sp-1', 'sp-7'];
    } catch {
      return [];
    }
  });

  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickBuyProduct, setQuickBuyProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2400);
  };

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  const toggleWishlist = (productId: string): boolean => {
    let nowAdded = false;
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        nowAdded = false;
        showToast('Đã bỏ sản phẩm khỏi danh sách yêu thích');
        return prev.filter((id) => id !== productId);
      } else {
        nowAdded = true;
        showToast('Đã thêm vào danh sách yêu thích ♡');
        return [...prev, productId];
      }
    });
    return nowAdded;
  };

  const isWishlisted = (productId: string) => wishlistIds.includes(productId);

  const addItem = (
    product: Product,
    color: string,
    size: 'S' | 'M' | 'L' = 'M',
    quantity: number = 1
  ) => {
    const finalSize = product.isCombo ? 'M' : size;
    const finalColor = color || product.colors[0];
    const unitPrice = calculateItemPrice(product, finalSize);
    const itemId = `${product.id}-${finalColor}-${finalSize}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            selectedColor: finalColor,
            selectedSize: finalSize,
            quantity,
            unitPrice,
          },
        ];
      }
    });

    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
    setIsCartDrawerOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedVoucher(null);
    setDiscount(0);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Shipping calculation: 25.000đ standard / 40.000đ express; free standard from 150.000đ or with FREESHIP code
  const isFreeShipEligible = subtotal >= FREE_SHIPPING_THRESHOLD || appliedVoucher === 'FREESHIP';
  const shippingFee =
    subtotal === 0
      ? 0
      : shippingMethod === 'express'
      ? isFreeShipEligible
        ? 15000 // Giảm 25k từ 40k
        : EXPRESS_SHIPPING_FEE
      : isFreeShipEligible
      ? 0
      : STANDARD_SHIPPING_FEE;

  const total = Math.max(subtotal + shippingFee - discount, 0);

  const applyVoucher = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BLONEA10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedVoucher('BLONEA10');
      setDiscount(disc);
      showToast('Áp dụng mã BLONEA10 giảm 10% thành công!');
      return { success: true, message: 'Áp dụng mã giảm 10% thành công!' };
    } else if (clean === 'FREESHIP') {
      setAppliedVoucher('FREESHIP');
      showToast('Áp dụng mã FREESHIP miễn phí vận chuyển!');
      return { success: true, message: 'Miễn phí vận chuyển cho đơn hàng!' };
    }
    return { success: false, message: 'Mã giảm giá không hợp lệ. Thử: BLONEA10 hoặc FREESHIP' };
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    setDiscount(0);
    showToast('Đã hủy bỏ mã giảm giá');
  };

  const createOrder = (
    orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedDelivery'>
  ): Order => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `BLN-${dateStr}-${randomSuffix}`;

    const deliveryDays = orderData.shippingMethod === 'express' ? 2 : 4;
    const estDate = new Date(today.getTime() + deliveryDays * 24 * 60 * 60 * 1000);
    const estimatedDelivery = estDate.toLocaleDateString('vi-VN');

    const initialStatus =
      orderData.paymentMethod === 'cod' ? 'Chờ giao hàng' : 'Chờ thanh toán';

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: today.toISOString(),
      status: initialStatus,
      estimatedDelivery,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shippingFee,
        shippingMethod,
        setShippingMethod,
        discount,
        total,
        appliedVoucher,
        applyVoucher,
        removeVoucher,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        orders,
        createOrder,
        wishlistIds,
        toggleWishlist,
        isWishlisted,
        quickBuyProduct,
        setQuickBuyProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
