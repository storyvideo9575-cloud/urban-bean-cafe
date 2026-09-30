import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  Wifi,
  Sparkles,
  Phone,
  Mail,
  User,
  Coffee,
} from 'lucide-react';

const TIME_SLOTS = [
  '11:00 AM',
  '12:30 PM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
  '07:45 PM',
  '09:00 PM',
  '10:00 PM',
];

const SEATING_ZONES: {
  id: 'Work Lounge' | 'Main Café Hall' | 'Terrace Garden';
  title: string;
  desc: string;
  badge: string;
  icon: string;
}[] = [
  {
    id: 'Work Lounge',
    title: 'Co-Work Quiet Lounge',
    desc: 'Power sockets at every table, 200 Mbps Wi-Fi, low acoustic ambience. Ideal for students & remote developers.',
    badge: 'Study & Work Ready',
    icon: '💻',
  },
  {
    id: 'Main Café Hall',
    title: 'Main Café Hall',
    desc: 'Warm leather sofas, curated indie music playlist, lively conversations and cozy aroma of freshly ground coffee.',
    badge: 'Popular for Friends & Fam',
    icon: '☕',
  },
  {
    id: 'Terrace Garden',
    title: 'Terrace Garden & Balcony',
    desc: 'Open-air breezy seating under fairy string lights and lush potted greens. Perfect for romantic dates or sunset drinks.',
    badge: 'Bhopal Evening Vibes',
    icon: '🌿',
  },
];

export const ReservationSection: React.FC = () => {
  const { createReservation, activeReservation, setActiveReservation } = useCafe();

  const [date, setDate] = useState<string>('Today');
  const [timeSlot, setTimeSlot] = useState<string>('07:45 PM');
  const [guests, setGuests] = useState<number>(2);
  const [seatingZone, setSeatingZone] = useState<
    'Work Lounge' | 'Main Café Hall' | 'Terrace Garden'
  >('Main Café Hall');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const res = createReservation({
      customerName: name,
      phone,
      email,
      date,
      timeSlot,
      guests,
      seatingZone,
      specialRequests,
    });

    setConfirmedBooking(res);
  };

  return (
    <section
      id="reservation-section"
      className="py-16 sm:py-20 bg-gradient-to-b from-[#F4EBE1] to-[#FAF6F0] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#785A4B] mb-2">
            <span>Instant Confirmation</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E86034]">Zero Reservation Fee</span>
            <span aria-hidden="true">·</span>
            <span>MP Nagar Bhopal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1310] tracking-tight font-display">
            Book Your Café Table
          </h2>
          <p className="mt-3 text-[#574035] text-base leading-relaxed">
            Planning a study session, a birthday celebration, or an intimate coffee date?
            Reserve your preferred corner at Urban Bean in seconds.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Success Card */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#EADECF] text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl font-black text-[#1B1310] font-display mt-3">
                We're Saving a Table for You!
              </h3>
              <p className="text-sm text-[#785A4B] mt-1">
                A confirmation SMS will be sent to{' '}
                <strong className="text-[#1B1310]">{confirmedBooking.phone}</strong>
              </p>
            </div>

            {/* Pass details */}
            <div className="p-5 bg-[#FAF6F0] rounded-2xl border border-[#EADECF] text-left grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[#785A4B] block">Booking Ref</span>
                <span className="font-mono font-bold text-[#1B1310] text-sm">
                  {confirmedBooking.id}
                </span>
              </div>
              <div>
                <span className="text-[#785A4B] block">Date & Time</span>
                <span className="font-bold text-[#1B1310] text-sm">
                  {confirmedBooking.date} · {confirmedBooking.timeSlot}
                </span>
              </div>
              <div>
                <span className="text-[#785A4B] block">Party Size</span>
                <span className="font-bold text-[#1B1310] text-sm">
                  {confirmedBooking.guests} Guests
                </span>
              </div>
              <div>
                <span className="text-[#785A4B] block">Zone</span>
                <span className="font-bold text-[#E86034] text-sm">
                  {confirmedBooking.seatingZone}
                </span>
              </div>
            </div>

            <div className="text-xs text-[#785A4B] flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E86034]" />
              <span>Urban Bean Café, 24, MP Nagar Zone-II, Bhopal (Near Sargam Cinema)</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => setConfirmedBooking(null)}
                className="px-6 py-2.5 bg-[#E86034] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#D24E23] transition-colors"
              >
                Make Another Reservation
              </button>
              <a
                href="https://wa.me/919876543210?text=Hi%20Urban%20Bean%2C%20I%20have%20confirmed%20reservation"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 bg-[#FAF6F0] hover:bg-[#EADECF] text-[#1B1310] text-xs font-bold rounded-xl border border-[#D8C7B5] transition-colors"
              >
                WhatsApp Café Desk
              </a>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form */
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#EADECF]">
            <form onSubmit={handleBooking} className="space-y-8">
              {/* Step 1: Seating Zone Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#574035] block mb-3">
                  Step 1: Choose Your Preferred Seating Zone
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {SEATING_ZONES.map((zone) => (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSeatingZone(zone.id)}
                      className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                        seatingZone === zone.id
                          ? 'border-[#E86034] bg-[#FAF6F0] shadow-sm'
                          : 'border-[#EADECF] hover:border-[#D8C7B5] bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl">{zone.icon}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EADECF] text-[#574035]">
                            {zone.badge}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#1B1310]">{zone.title}</h4>
                        <p className="text-xs text-[#785A4B] mt-1 line-clamp-3 leading-relaxed">
                          {zone.desc}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[#F4EBE1] flex items-center justify-between text-xs">
                        <span className="text-[#574035] font-medium">Select zone</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            seatingZone === zone.id
                              ? 'border-[#E86034] bg-[#E86034]'
                              : 'border-[#D8C7B5]'
                          }`}
                        >
                          {seatingZone === zone.id && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Date, Time & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-[#FAF6F0] rounded-2xl border border-[#EADECF]">
                {/* Date */}
                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#E86034]" />
                    Date
                  </label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                  >
                    <option value="Today">Today (Open till 11 PM)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Friday Evening">This Friday Evening</option>
                    <option value="This Saturday">This Saturday</option>
                    <option value="This Sunday">This Sunday</option>
                  </select>
                </div>

                {/* Time Slot */}
                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E86034]" />
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#E86034]" />
                    Guests Count
                  </label>
                  <div className="flex items-center gap-2 bg-white px-2 py-1 border border-[#D8C7B5] rounded-xl">
                    {[1, 2, 4, 6, '8+'].map((num) => (
                      <button
                        key={String(num)}
                        type="button"
                        onClick={() => setGuests(typeof num === 'number' ? num : 8)}
                        className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors ${
                          (num === '8+' && guests >= 8) || guests === num
                            ? 'bg-[#1B1310] text-white'
                            : 'text-[#574035] hover:bg-[#FAF6F0]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Contact Info */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#574035] block mb-3">
                  Step 3: Lead Guest Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="relative">
                    <User className="w-4 h-4 text-[#785A4B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#785A4B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#785A4B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="Email Address (Optional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Special requests: Birthday cake decor, quiet corner, baby high chair, etc."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#785A4B]">
                  <Sparkles className="w-4 h-4 text-[#E5A93C]" />
                  <span>Free cancellation up to 30 mins before reservation.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#E86034] hover:bg-[#D24E23] text-white font-bold rounded-xl shadow-md transition-all active:scale-95 text-sm"
                >
                  Confirm Reservation Table
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
