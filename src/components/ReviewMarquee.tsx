import React from 'react';

const REVIEWS = [
  { id: 1, text: "The fit is completely unmatched. Best everyday staples I've ever owned.", author: "James T." },
  { id: 2, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80" },
  { id: 3, text: "Minimalist perfection. Holds shape wash after wash. Highly recommended.", author: "Rahul P." },
  { id: 4, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" },
  { id: 5, text: "Finally a brand that understands structure without sacrificing comfort.", author: "Ananya M." },
];

export const ReviewMarquee = () => {
  return (
    <section className="w-full bg-brand-gray-900 py-32 overflow-hidden border-y border-brand-gray-800">
      <div className="mb-20 text-center px-4">
        <h2 className="text-sm font-semibold tracking-[0.3em] uppercase text-brand-gray-500 mb-4">Social Proof</h2>
        <p className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">Don't just take our word</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap items-center group-hover:pause">
          {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex-shrink-0 mx-8 md:mx-16 flex items-center justify-center">
              {item.image ? (
                <div className="w-[30vw] md:w-[20vw] aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                  <img src={item.image} alt="Customer highlight" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-[60vw] md:w-[35vw] text-wrap text-center">
                  <p className="text-xl md:text-3xl font-light italic leading-snug tracking-tight text-brand-gray-100 mb-6">
                    "{item.text}"
                  </p>
                  <p className="text-sm uppercase tracking-widest text-brand-gray-500">— {item.author}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
