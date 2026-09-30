import React from 'react';
import { useCafe } from '../context/CafeContext';
import {
  Coffee,
  Heart,
  Users,
  Wifi,
  Sparkles,
  MapPin,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { scrollToSection } = useCafe();

  return (
    <section id="about-section" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Bento */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#F4EBE1] shadow-md border border-[#EADECF]">
                <img
                  src="/src/assets/images/cafe_work_lounge_1790678796217.jpg"
                  alt="Urban Bean quiet work lounge in Bhopal"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 rounded-3xl bg-[#FAF6F0] border border-[#EADECF]">
                <span className="text-2xl font-black text-[#E86034] font-mono block">
                  2023
                </span>
                <span className="text-xs font-bold text-[#1B1310] block mt-1">
                  Established in MP Nagar
                </span>
                <p className="text-xs text-[#785A4B] mt-1">
                  Serving Bhopal's creative thinkers, students & coffee purists.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-5 rounded-3xl bg-[#1B1310] text-white">
                <Coffee className="w-6 h-6 text-[#E86034] mb-2" />
                <span className="text-2xl font-black font-mono block text-[#E5A93C]">
                  100%
                </span>
                <span className="text-xs font-bold block mt-0.5">
                  Single-Estate Arabica
                </span>
                <p className="text-xs text-[#D8C7B5] mt-1">
                  Small-batch roasted and pulled on Italian commercial espresso machines.
                </p>
              </div>

              <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#F4EBE1] shadow-md border border-[#EADECF]">
                <img
                  src="/src/assets/images/food_cappuccino_latte_art_1790678767702.jpg"
                  alt="Artisanal cappuccino latte art"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Right Editorial Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#785A4B]">
              <span>About Urban Bean Café</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#E86034]">Bhopal Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1310] tracking-tight font-display text-balance">
              Where Bhopal’s Coffee Culture Meets Warm Hospitality
            </h2>

            <p className="text-base text-[#574035] leading-relaxed">
              Founded in 2023 in the bustling hub of MP Nagar Zone-II, Urban Bean Café was
              envisioned as an antidote to noisy generic coffee chains. We set out to create
              a modern sanctuary where high-grade specialty coffee, comforting Italian-American
              bites, and genuine community thrive together.
            </p>

            <p className="text-sm text-[#785A4B] leading-relaxed">
              Whether you are a MANIT or LNCT student cramming for semester exams, a remote
              developer needing seamless high-speed Wi-Fi and power outlets, or a family gathering
              for Sunday evening pizza and sizzling brownies, you'll always find your corner here.
            </p>

            {/* Core Values / Features */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E86034]/15 text-[#E86034] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B1310]">
                    Artisan Brews & Hand-Stretched Pizzas
                  </h4>
                  <p className="text-xs text-[#785A4B]">
                    Every pizza base is fermented slow for 24 hours; every shot of espresso is calibrated for optimal crema and sweetness.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E86034]/15 text-[#E86034] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B1310]">
                    Dedicated Quiet Work Lounge & Terrace Garden
                  </h4>
                  <p className="text-xs text-[#785A4B]">
                    Separate acoustic zones ensure those who need to study work undisturbed while friends enjoy laughs on our open-air balcony.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E86034]/15 text-[#E86034] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B1310]">
                    Strict Hygiene & 100% Vegetarian Excellence
                  </h4>
                  <p className="text-xs text-[#785A4B]">
                    Spotless open prep bar, RO-purified water, and fresh daily dairy deliveries from local Madhya Pradesh farms.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('reservation-section')}
                className="px-6 py-3 bg-[#1B1310] hover:bg-[#3E2D25] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#E86034]" />
                <span>Visit Us in MP Nagar</span>
              </button>

              <button
                onClick={() => scrollToSection('menu-section')}
                className="px-6 py-3 bg-[#FAF6F0] hover:bg-[#EADECF] text-[#1B1310] text-xs font-bold rounded-xl border border-[#D8C7B5] transition-colors"
              >
                Explore Full Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
