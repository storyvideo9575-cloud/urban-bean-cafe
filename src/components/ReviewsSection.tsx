import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { Star, MessageSquarePlus, Check, X, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview } = useCafe();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [favoriteItem, setFavoriteItem] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    addReview({
      name: authorName.trim(),
      role: authorRole.trim() || 'Bhopal Foodie',
      rating,
      comment: comment.trim(),
      favoriteItem: favoriteItem.trim() || undefined,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setAuthorName('');
      setAuthorRole('');
      setComment('');
      setFavoriteItem('');
    }, 1200);
  };

  return (
    <section id="reviews-section" className="py-16 sm:py-20 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#785A4B] mb-2">
              <span>Customer Stories</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#E86034]">Bhopal Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1310] tracking-tight font-display">
              Loved by Bhopal's Coffee Lovers
            </h2>
            <p className="mt-2 text-sm text-[#574035] max-w-xl">
              From college students to startup teams and local families — here is what our guests have to say about their Urban Bean moments.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1 text-[#E5A93C]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
                <span className="ml-1.5 font-bold text-[#1B1310] text-sm">4.9 / 5.0</span>
              </div>
              <span className="text-xs text-[#785A4B]">Over 1,200+ verified ratings</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 bg-[#1B1310] hover:bg-[#3E2D25] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 shrink-0 active:scale-95"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#E86034]" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-[#EADECF] hover:border-[#D8C7B5] shadow-xs flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-[#E5A93C] mb-4">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#3E2D25] leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F4EBE1]">
                <h4 className="text-sm font-bold text-[#1B1310]">{rev.name}</h4>
                <div className="flex items-center justify-between text-[11px] text-[#785A4B] mt-0.5">
                  <span className="truncate max-w-[140px]">{rev.role}</span>
                  <span>{rev.date}</span>
                </div>
                {rev.favoriteItem && (
                  <div className="mt-2 text-[10px] text-[#E86034] font-medium bg-[#FAF6F0] px-2 py-0.5 rounded-md inline-block">
                    Fave: {rev.favoriteItem}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#EADECF] animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4EBE1]">
              <h3 className="text-lg font-bold text-[#1B1310]">Share Your Experience</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-[#785A4B] hover:bg-[#FAF6F0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#1B1310]">Thank You!</h4>
                <p className="text-xs text-[#785A4B]">Your review has been posted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-1 transition-colors ${
                          star <= rating ? 'text-[#E5A93C]' : 'text-gray-300'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-[#1B1310] ml-2 font-mono">
                      {rating} of 5 stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shruti Sen"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1">
                    Role / Neighborhood (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Student at LNCT Bhopal, MP Nagar Resident"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1">
                    Favorite Dish / Beverage (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cold Coffee, Farmhouse Pizza"
                    value={favoriteItem}
                    onChange={(e) => setFavoriteItem(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1">
                    Review Comment *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell other Bhopal foodies about the coffee, taste, vibe, or service..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 text-xs bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#E86034] hover:bg-[#D24E23] text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                >
                  Publish Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
