import React from 'react';
import { useCafe } from '../context/CafeContext';
import {
  Coffee,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Instagram,
  Facebook,
  ShieldCheck,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { scrollToSection, setCurrentTab, currentTab } = useCafe();

  return (
    <footer className="bg-[#1B1310] text-[#D8C7B5] pt-16 pb-12 border-t border-[#2D201A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2D201A]">
          {/* Col 1 & 2: Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#E86034] flex items-center justify-center text-white shadow-sm">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  Urban Bean Café
                </span>
                <span className="text-[11px] text-[#D8C7B5] block uppercase tracking-wider">
                  Bhopal, Madhya Pradesh
                </span>
              </div>
            </div>

            <p className="text-xs text-[#C4B29E] leading-relaxed max-w-sm">
              Your neighborhood café in MP Nagar Zone-II. Serving specialty coffee,
              stone-baked pizzas, and decadent desserts in a comfortable modern setting
              designed for studying, remote work, and memorable conversations.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#E86034] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#E86034] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                onClick={() => setCurrentTab(currentTab === 'admin' ? 'home' : 'admin')}
                className="text-xs text-[#EADECF] hover:text-[#E86034] flex items-center gap-1.5 ml-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#E86034]" />
                <span>Staff Portal</span>
              </button>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('menu-section')}
                  className="hover:text-white transition-colors"
                >
                  Café Menu & Pizzas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('reservation-section')}
                  className="hover:text-white transition-colors"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('offers-section')}
                  className="hover:text-white transition-colors"
                >
                  Student Deals & Combos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about-section')}
                  className="hover:text-white transition-colors"
                >
                  Our Bhopal Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('loyalty')}
                  className="hover:text-white transition-colors text-[#E5A93C]"
                >
                  Bean Rewards Club
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Specialties */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Signature Favorites
            </h4>
            <ul className="space-y-2 text-xs text-[#C4B29E]">
              <li>Double Shot Cappuccino</li>
              <li>Signature Cold Coffee</li>
              <li>10" Farmhouse Veg Pizza</li>
              <li>Paneer Tikka Pizza</li>
              <li>White Sauce Penne Pasta</li>
              <li>Sizzling Brownie & Ice Cream</li>
            </ul>
          </div>

          {/* Col 5: Location & Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Bhopal Café Info
            </h4>
            <div className="space-y-2.5 text-xs text-[#C4B29E]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E86034] shrink-0 mt-0.5" />
                <span>24, MP Nagar Zone-II, Bhopal, MP – 462011</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
                <span>10:00 AM – 11:00 PM (Everyday)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E86034] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E86034] shrink-0" />
                <a href="mailto:hello@urbanbeancafe.in" className="hover:text-white">
                  hello@urbanbeancafe.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#785A4B]">
          <p>© {new Date().getFullYear()} Urban Bean Café Bhopal. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Brewed with</span>
            <Heart className="w-3 h-3 text-[#E86034] fill-current" />
            <span>for Bhopal’s coffee lovers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
