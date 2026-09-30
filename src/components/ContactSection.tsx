import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  Navigation,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('Table Query / Private Event');
  const [formMessage, setFormMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
    }, 3000);
  };

  return (
    <section id="location-section" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#785A4B] mb-2">
            <span>Find Us in Bhopal</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E86034]">MP Nagar Zone-II</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1310] tracking-tight font-display">
            Visit Urban Bean Café
          </h2>
          <p className="mt-3 text-[#574035] text-base leading-relaxed">
            Conveniently nestled in Zone-II MP Nagar, just minutes away from DB City Mall
            and Chetak Bridge. Stop by for coffee, food, or a comfortable workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Stylized Bhopal Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address card */}
              <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#EADECF]">
                <div className="w-9 h-9 rounded-xl bg-[#E86034]/15 text-[#E86034] flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#1B1310]">Café Address</h4>
                <p className="text-xs text-[#574035] mt-1 leading-relaxed">
                  24, MP Nagar Zone-II, Bhopal, Madhya Pradesh – 462011
                </p>
                <span className="text-[11px] text-[#785A4B] block mt-2">
                  Landmark: Near Sargam Cinema & DB City Road
                </span>
              </div>

              {/* Hours Card */}
              <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#EADECF]">
                <div className="w-9 h-9 rounded-xl bg-[#E5A93C]/15 text-[#E5A93C] flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#1B1310]">Opening Hours</h4>
                <p className="text-xs text-[#574035] mt-1 leading-relaxed">
                  Monday – Sunday: 10:00 AM – 11:00 PM
                </p>
                <span className="text-[11px] text-emerald-700 font-semibold block mt-2">
                  Kitchen closes at 10:30 PM
                </span>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#EADECF]">
                <div className="w-9 h-9 rounded-xl bg-[#1B1310] text-white flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#1B1310]">Phone & WhatsApp</h4>
                <p className="text-xs text-[#574035] mt-1 font-mono">
                  +91 98765 43210
                </p>
                <a
                  href="tel:+919876543210"
                  className="text-[11px] text-[#E86034] font-semibold hover:underline block mt-2"
                >
                  Call Reception Desk →
                </a>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#EADECF]">
                <div className="w-9 h-9 rounded-xl bg-[#1B1310] text-white flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#1B1310]">Email Us</h4>
                <p className="text-xs text-[#574035] mt-1">
                  hello@urbanbeancafe.in
                </p>
                <a
                  href="mailto:hello@urbanbeancafe.in"
                  className="text-[11px] text-[#E86034] font-semibold hover:underline block mt-2"
                >
                  Send Inquiry Email →
                </a>
              </div>
            </div>

            {/* Stylized Bhopal Map representation */}
            <div className="rounded-3xl overflow-hidden border border-[#EADECF] bg-[#FAF6F0] p-6 relative shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#E86034]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1B1310]">
                    MP Nagar Zone-II Map Context
                  </span>
                </div>
                <span className="text-xs text-[#785A4B]">Bhopal Central Hub</span>
              </div>

              {/* Map Illustration / Schema */}
              <div className="h-56 rounded-2xl bg-[#F4EBE1] border border-[#D8C7B5] relative overflow-hidden p-4 flex flex-col justify-between">
                {/* Street grid visual */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#574035_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Road overlays */}
                <div className="absolute top-1/2 left-0 right-0 h-6 bg-white/70 border-y border-[#D8C7B5] -translate-y-1/2 flex items-center px-4">
                  <span className="text-[10px] text-[#785A4B] font-medium tracking-wider">
                    Zone-II Main Avenue
                  </span>
                </div>
                <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-white/70 border-x border-[#D8C7B5] flex items-center justify-center">
                  <span className="text-[9px] text-[#785A4B] font-medium rotate-90 whitespace-nowrap">
                    Towards DB City Mall
                  </span>
                </div>

                {/* Pin for Urban Bean */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-8 z-10 flex flex-col items-center">
                  <div className="px-3 py-1 bg-[#1B1310] text-white text-[11px] font-bold rounded-lg shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-[#E86034] animate-ping" />
                    <span>Urban Bean Café</span>
                  </div>
                  <div className="w-3 h-3 bg-[#1B1310] rotate-45 -mt-1.5" />
                </div>

                {/* Landmarks nearby */}
                <div className="relative z-1 flex justify-between text-[11px] text-[#785A4B]">
                  <span className="bg-white/80 px-2 py-0.5 rounded shadow-xs">
                    DB City Mall (750m)
                  </span>
                  <span className="bg-white/80 px-2 py-0.5 rounded shadow-xs">
                    Chetak Bridge
                  </span>
                </div>
                <div className="relative z-1 flex justify-between text-[11px] text-[#785A4B]">
                  <span className="bg-white/80 px-2 py-0.5 rounded shadow-xs">
                    Sargam Cinema (300m)
                  </span>
                  <span className="bg-white/80 px-2 py-0.5 rounded shadow-xs">
                    Bhopal Railway Stn (3.2 km)
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 items-center justify-between">
                <a
                  href="https://maps.google.com/?q=MP+Nagar+Zone+II+Bhopal"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#1B1310] hover:bg-[#3E2D25] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E86034]" />
                  <span>Get Driving Directions</span>
                </a>

                <a
                  href="https://wa.me/919876543210?text=Hi%20Urban%20Bean%20Cafe%2C%20I%20have%20an%20inquiry"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Party Booking Form */}
          <div className="lg:col-span-5 bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 border border-[#EADECF] shadow-sm">
            <h3 className="text-xl font-bold text-[#1B1310] font-display">
              Send an Inquiry or Booking Note
            </h3>
            <p className="text-xs text-[#785A4B] mt-1">
              Have a question about large group parties, birthdays, or special diets? We'll reply promptly.
            </p>

            {sent ? (
              <div className="py-12 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#1B1310]">Message Dispatched!</h4>
                <p className="text-xs text-[#785A4B]">
                  Our Bhopal manager will get back to you within 30 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Varun Dubey"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#574035] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#574035] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1">
                    Purpose
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                  >
                    <option value="Table Query / Private Event">
                      Table Query / Private Event
                    </option>
                    <option value="Birthday / Anniversary Celebration">
                      Birthday / Anniversary Celebration
                    </option>
                    <option value="Corporate / Remote Work Pass">
                      Corporate / Remote Work Pass
                    </option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Details about date, number of guests, or your questions..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full p-3 text-xs sm:text-sm bg-white border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#E86034] hover:bg-[#D24E23] text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Café</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
