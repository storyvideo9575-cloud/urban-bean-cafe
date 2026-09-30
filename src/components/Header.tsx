import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import {
  ShoppingBag,
  Calendar,
  Menu as MenuIcon,
  X,
  Coffee,
  Sparkles,
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    scrollToSection,
    cartCount,
    setIsCartOpen,
    loyaltyUser,
  } = useCafe();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Menu', id: 'menu-section', tab: 'home' },
    { label: 'Book Table', id: 'reservation-section', tab: 'home' },
    { label: 'Offers', id: 'offers-section', tab: 'home' },
    { label: 'About & Vibe', id: 'about-section', tab: 'home' },
    { label: 'Reviews', id: 'reviews-section', tab: 'home' },
    { label: 'Location', id: 'location-section', tab: 'home' },
  ];

  const handleNavClick = (link: { label: string; id: string; tab: string }) => {
    setMobileMenuOpen(false);
    if (currentTab !== 'home') {
      setCurrentTab('home');
      setTimeout(() => {
        const el = document.getElementById(link.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(link.id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Notification Bar - Bhopal Location & Timings */}
      <div className="bg-[#1B1310] text-[#D8C7B5] text-xs py-2 px-4 border-b border-[#2D201A]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-xs font-normal">
            <span className="flex items-center gap-1.5 text-[#EADECF]">
              <MapPin className="w-3.5 h-3.5 text-[#E86034]" />
              24, MP Nagar Zone-II, Bhopal
            </span>
            <span className="hidden sm:inline text-[#785A4B]">·</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E5A93C]" />
              Open Daily: 10:00 AM – 11:00 PM
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs ml-auto">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1 text-[#EADECF] hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E86034]" />
              <span>+91 98765 43210</span>
            </a>
            <span className="text-[#574035]">|</span>
            <button
              onClick={() => setCurrentTab(currentTab === 'admin' ? 'home' : 'admin')}
              className={`flex items-center gap-1 text-xs transition-colors ${
                currentTab === 'admin'
                  ? 'text-[#E86034] font-semibold'
                  : 'text-[#D8C7B5] hover:text-white'
              }`}
              title="Staff Portal (Orders & Reservations)"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{currentTab === 'admin' ? 'Exit Staff Portal' : 'Staff Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#3E2D25]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Single Brand Title */}
          <button
            onClick={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#231914] flex items-center justify-center text-[#E86034] shadow-sm transition-transform group-hover:scale-105">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1B1310] font-display flex items-center gap-1">
                Urban Bean Café
              </span>
              <span className="text-[11px] text-[#785A4B] block tracking-wider uppercase font-medium -mt-1">
                Bhopal · Est. 2023
              </span>
            </div>
          </button>

          {/* Zone 2: Clean 4-6 Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#574035]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="hover:text-[#1B1310] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E86034] hover:after:w-full after:transition-all"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => setCurrentTab('loyalty')}
              className={`flex items-center gap-1.5 transition-colors py-1 ${
                currentTab === 'loyalty'
                  ? 'text-[#E86034] font-semibold'
                  : 'text-[#574035] hover:text-[#1B1310]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Bean Club {loyaltyUser ? `(${loyaltyUser.beans})` : ''}</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-3">
            {/* Table booking CTA */}
            <button
              onClick={() => {
                if (currentTab !== 'home') setCurrentTab('home');
                setTimeout(() => {
                  const el = document.getElementById('reservation-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#1B1310] bg-[#EADECF] hover:bg-[#D8C7B5] rounded-xl transition-all shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E86034]" />
              <span>Book Table</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#E86034] hover:bg-[#D24E23] rounded-xl transition-all shadow-sm hover:shadow active:scale-95"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Order Bag</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#1B1310] text-white text-[11px] font-bold flex items-center justify-center -ml-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#231914] hover:bg-[#EADECF]/50 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF6F0] border-b border-[#3E2D25]/15 px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="text-left px-3 py-2 rounded-lg bg-[#F4EBE1] text-[#231914] font-medium hover:bg-[#EADECF] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentTab('loyalty');
                }}
                className="text-left px-3 py-2 rounded-lg bg-[#F4EBE1] text-[#231914] font-medium hover:bg-[#EADECF] flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#E5A93C]" />
                Bean Club
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentTab('admin');
                }}
                className="text-left px-3 py-2 rounded-lg bg-[#231914] text-white font-medium hover:bg-[#3E2D25] flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-[#E86034]" />
                Staff Portal
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
