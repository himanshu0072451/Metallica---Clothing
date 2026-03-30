import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WhyUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-card', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-brand-black/95 py-32 px-4 md:px-8 border-t border-brand-white/10">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm md:text-base font-medium tracking-[0.2em] text-brand-gray-400 uppercase mb-4">Why Us</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-brand-white">
            Built for the Streets
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="why-card p-8 border border-brand-white/10 rounded-sm hover:-translate-y-2 transition-transform duration-500 bg-brand-black cursor-default">
             <div className="text-4xl mb-6">🏆</div>
             <h4 className="text-xl font-bold tracking-widest uppercase mb-4 text-brand-white">Premium Quality</h4>
             <p className="text-brand-gray-400 font-light leading-relaxed">
               Crafted with heavyweight fabrics and meticulous attention to detail. Built to last longer than trends.
             </p>
          </div>
          
          <div className="why-card p-8 border border-brand-white/10 rounded-sm hover:-translate-y-2 transition-transform duration-500 bg-brand-black cursor-default">
             <div className="text-4xl mb-6">🏷️</div>
             <h4 className="text-xl font-bold tracking-widest uppercase mb-4 text-brand-white">Affordable Prices</h4>
             <p className="text-brand-gray-400 font-light leading-relaxed">
               Direct to consumer model ensuring you get luxury streetwear without the crazy markups.
             </p>
          </div>
          
          <div className="why-card p-8 border border-brand-white/10 rounded-sm hover:-translate-y-2 transition-transform duration-500 bg-brand-black cursor-default">
             <div className="text-4xl mb-6">📍</div>
             <h4 className="text-xl font-bold tracking-widest uppercase mb-4 text-brand-white">Local Store</h4>
             <p className="text-brand-gray-400 font-light leading-relaxed">
               Rooted in Nagpur. Drop by our physical location to feel the gear and experience the vibe yourself.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};
