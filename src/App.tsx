import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, Order } from './context/CartContext';
import { Product, PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CombosPage } from './pages/CombosPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AuthPage } from './pages/AuthPage';
import { AccountPage } from './pages/AccountPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AboutPage } from './pages/AboutPage';
import { SizeGuidePage } from './pages/SizeGuidePage';
import { FAQPage } from './pages/FAQPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { ContactPage } from './pages/ContactPage';
import { BeautyBlogPage } from './pages/BeautyBlogPage';
import { BlogPost } from './data/beautyBlog';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [colorFilter, setColorFilter] = useState<string>('');
  const [trackingOrderId, setTrackingOrderId] = useState<string>('');
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [wishlistFilter, setWishlistFilter] = useState<boolean>(false);

  // Scroll to top on page change
  const navigateTo = (page: string, params?: any) => {
    if (page === 'wishlist') {
      setCurrentPage('products');
      setWishlistFilter(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (params) {
      if (params.category) setCategoryFilter(params.category);
      if (params.color) setColorFilter(params.color);
      if (params.orderId) setTrackingOrderId(params.orderId);
      if (params.order) setLatestOrder(params.order);
      if (params.product) setSelectedProduct(params.product);
      if (params.article) setSelectedArticle(params.article);
      if (params.search !== undefined) setSearchQuery(params.search);
      if (params.wishlist !== undefined) setWishlistFilter(params.wishlist);
    } else {
      if (page === 'products') {
        setCategoryFilter('all');
        setColorFilter('');
        setSearchQuery('');
        setWishlistFilter(false);
      }
      if (page === 'beauty-blog') {
        setSelectedArticle(null);
      }
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#333333] selection:bg-[#FFBFD9]">
      {/* Universal Header */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onSelectArticle={(art) => {
              setSelectedArticle(art);
              setCurrentPage('beauty-blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            initialCategory={categoryFilter}
            initialColor={colorFilter}
            initialSearch={searchQuery}
            initialWishlistOnly={wishlistFilter}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {(currentPage === 'combos' || currentPage === 'collections') && (
          <CombosPage
            onSelectProduct={handleSelectProduct}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'beauty-blog' && (
          <BeautyBlogPage
            initialArticle={selectedArticle}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage onNavigate={navigateTo} />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onNavigate={navigateTo}
            onOrderSuccess={(order) => {
              setLatestOrder(order);
              setTrackingOrderId(order.id);
            }}
          />
        )}

        {currentPage === 'order-success' && (
          <OrderSuccessPage
            order={latestOrder}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'auth' && (
          <AuthPage onNavigate={navigateTo} />
        )}

        {currentPage === 'account' && (
          <AccountPage onNavigate={navigateTo} />
        )}

        {currentPage === 'order-tracking' && (
          <OrderTrackingPage
            initialOrderId={trackingOrderId}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentPage === 'size-guide' && (
          <SizeGuidePage onNavigate={navigateTo} />
        )}

        {currentPage === 'faq' && (
          <FAQPage onNavigate={navigateTo} />
        )}

        {currentPage === 'shipping-policy' && (
          <PoliciesPage initialTab="shipping" onNavigate={navigateTo} />
        )}

        {currentPage === 'return-policy' && (
          <PoliciesPage initialTab="return" onNavigate={navigateTo} />
        )}

        {currentPage === 'privacy-policy' && (
          <PoliciesPage initialTab="privacy" onNavigate={navigateTo} />
        )}

        {currentPage === 'terms-policy' && (
          <PoliciesPage initialTab="terms" onNavigate={navigateTo} />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Universal Slideover Cart Drawer */}
      <CartDrawer onNavigate={navigateTo} />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Universal Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
