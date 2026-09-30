import React from 'react';
import { CafeProvider, useCafe } from './context/CafeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { OffersSection } from './components/OffersSection';
import { ReservationSection } from './components/ReservationSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { LoyaltySection } from './components/LoyaltySection';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { ShoppingBag, Calendar, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentTab, cartCount, setIsCartOpen, scrollToSection } = useCafe();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] selection:bg-[#E86034] selection:text-white">
      <Header />

      <main className="flex-1">
        {currentTab === 'admin' ? (
          <AdminDashboard />
        ) : currentTab === 'loyalty' ? (
          <LoyaltySection />
        ) : (
          <>
            <Hero />
            <MenuSection />
            <OffersSection />
            <ReservationSection />
            <AboutSection />
            <GallerySection />
            <ReviewsSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />

      {/* Slide-over & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />

      {/* Floating Bottom Quick Bar for Mobile (capped under 15% viewport height) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-white/95 backdrop-blur-md border-t border-[#EADECF] flex items-center gap-2">
        <button
          onClick={() => scrollToSection('reservation-section')}
          className="flex-1 py-2.5 px-3 bg-[#EADECF] text-[#1B1310] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-[#E86034]" />
          <span>Book Table</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 py-2.5 px-3 bg-[#E86034] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Order ({cartCount})</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CafeProvider>
      <MainContent />
    </CafeProvider>
  );
}
