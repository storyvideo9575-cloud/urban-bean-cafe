import React from 'react';
import { useCafe } from '../context/CafeContext';
import {
  Coffee,
  Calendar,
  Wifi,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollToSection } = useCafe();

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 bg-gradient-to-b from-[#FAF6F0] via-[#FAF6F0] to-[#F4EBE1]">
      {/* Subtle organic background glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#E86034]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Quiet metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#785A4B]">
              <span className="flex items-center gap-1.5 text-[#E86034]">
                <MapPin className="w-3.5 h-3.5" />
                MP Nagar Zone-II, Bhopal
              </span>
              <span aria-hidden="true" className="text-[#C4B29E]">·</span>
              <span>Specialty Coffee & Quick Bites</span>
              <span aria-hidden="true" className="text-[#C4B29E]">·</span>
              <span className="text-[#231914] font-bold">Est. 2023</span>
            </div>

            {/* User-requested Main Hero Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B1310] tracking-tight leading-[1.12] font-display text-balance">
              Good Coffee.{' '}
              <span className="text-[#E86034]">Great Food.</span>{' '}
              Better Moments.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#574035] max-w-2xl leading-relaxed font-normal">
              Your neighborhood café in the heart of Bhopal. Crafted for students,
              creative professionals, and families seeking artisanal brews, wood-fired
              pizzas, and comfortable spaces to connect or work.
            </p>

            {/* User-requested CTA Buttons: Explore Menu | Book a Table */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('menu-section')}
                className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#E86034] hover:bg-[#D24E23] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 active:scale-95 group"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('reservation-section')}
                className="px-6 py-3.5 text-sm sm:text-base font-semibold text-[#1B1310] bg-[#EADECF] hover:bg-[#D8C7B5] rounded-xl transition-all shadow-xs flex items-center gap-2.5 active:scale-95"
              >
                <Calendar className="w-4.5 h-4.5 text-[#E86034]" />
                <span>Book a Table</span>
              </button>
            </div>

            {/* Trust Markers & Quick Signals */}
            <div className="pt-6 border-t border-[#3E2D25]/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#1B1310]">
                  <Coffee className="w-4 h-4 text-[#E86034]" />
                  <span>100% Arabica</span>
                </div>
                <p className="text-xs text-[#785A4B]">Locally roasted beans</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#1B1310]">
                  <Wifi className="w-4 h-4 text-[#E86034]" />
                  <span>200 Mbps Wi-Fi</span>
                </div>
                <p className="text-xs text-[#785A4B]">Dedicated work pods</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#1B1310]">
                  <ShieldCheck className="w-4 h-4 text-[#E86034]" />
                  <span>100% Veg</span>
                </div>
                <p className="text-xs text-[#785A4B]">Fresh kitchen standards</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#1B1310]">
                  <Star className="w-4 h-4 text-[#E5A93C] fill-[#E5A93C]" />
                  <span>4.9 / 5.0</span>
                </div>
                <p className="text-xs text-[#785A4B]">1,200+ Bhopal foodies</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card frame with subtle shadow */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/src/assets/images/hero_cafe_ambiance_1790678754298.jpg"
                  alt="Urban Bean Café modern ambient interior in MP Nagar Bhopal"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Contrast gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1310]/80 via-transparent to-black/20" />

                {/* Floating caption card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#1B1310]/85 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#E5A93C] font-semibold block">
                      MP Nagar Zone-II Lounge
                    </span>
                    <p className="text-sm font-medium text-[#FAF6F0]">
                      Open till 11:00 PM tonight
                    </p>
                  </div>
                  <button
                    onClick={() => scrollToSection('reservation-section')}
                    className="text-xs font-semibold px-3 py-1.5 bg-[#E86034] text-white rounded-lg hover:bg-[#D24E23] transition-colors"
                  >
                    Reserve Spot
                  </button>
                </div>
              </div>

              {/* Little floating badge */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-[#EADECF] hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#E86034]">
                  <Sparkles className="w-5 h-5 text-[#E86034]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1B1310]">Bhopal’s Best Café</div>
                  <div className="text-[11px] text-[#785A4B]">Voted by college crowd</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
