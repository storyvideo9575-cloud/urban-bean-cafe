import React, { useState } from 'react';
import { X, Maximize2, Camera } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Ambiance' | 'Coffee' | 'Food' | 'Work Lounge';
  image: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Warm MP Nagar Ambiance',
    category: 'Ambiance',
    image: '/src/assets/images/hero_cafe_ambiance_1790678754298.jpg',
    caption: 'Cozy evening lighting, bespoke wooden furniture, and welcoming hospitality in Zone-II.',
  },
  {
    id: 'g-2',
    title: 'Signature Rosetta Latte Art',
    category: 'Coffee',
    image: '/src/assets/images/food_cappuccino_latte_art_1790678767702.jpg',
    caption: 'Handcrafted double-shot Arabica cappuccino pulled on our Italian espresso group.',
  },
  {
    id: 'g-3',
    title: 'Wood-Fired Farmhouse Pizza',
    category: 'Food',
    image: '/src/assets/images/food_farmhouse_pizza_1790678781599.jpg',
    caption: 'Crispy slow-fermented crust layered with San Marzano sauce and melted mozzarella.',
  },
  {
    id: 'g-4',
    title: 'Quiet Study & Work Lounge',
    category: 'Work Lounge',
    image: '/src/assets/images/cafe_work_lounge_1790678796217.jpg',
    caption: 'Sunlit desks equipped with 200 Mbps Wi-Fi and individual power sockets.',
  },
];

export const GallerySection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const filtered =
    selectedFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  return (
    <section id="gallery-section" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#785A4B] mb-2">
            <span>The Urban Bean Vibe</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E86034]">Photo Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1310] tracking-tight font-display">
            A Glimpse Inside the Café
          </h2>
          <p className="mt-3 text-[#574035] text-base">
            Where thoughtful design meets the aroma of freshly roasted coffee beans.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-1">
          {['All', 'Ambiance', 'Coffee', 'Food', 'Work Lounge'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
                selectedFilter === cat
                  ? 'bg-[#1B1310] text-white'
                  : 'bg-[#FAF6F0] text-[#574035] hover:bg-[#EADECF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-[#F4EBE1] aspect-[16/10]"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#E5A93C] font-semibold block mb-1">
                    {photo.category}
                  </span>
                  <h3 className="text-lg font-bold">{photo.title}</h3>
                  <p className="text-xs text-[#FAF6F0]/80 mt-1 max-w-sm line-clamp-1">
                    {photo.caption}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:bg-[#E86034] transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-[#1B1310] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] bg-black">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 text-white bg-[#1B1310]">
              <span className="text-xs text-[#E5A93C] font-bold uppercase tracking-wider">
                {activePhoto.category}
              </span>
              <h3 className="text-lg font-bold mt-0.5">{activePhoto.title}</h3>
              <p className="text-xs text-[#D8C7B5] mt-1">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
