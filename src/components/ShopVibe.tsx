import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealImage } from './RevealImage';

gsap.registerPlugin(ScrollTrigger);

const VIBE_IMAGES = [
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80',
  'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&q=80',
  'https://images.unsplash.com/photo-1558769132-cb1fac9c632e?w=1200&q=80',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
];

export const ShopVibe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sliderRef.current) return;

    const ctx = gsap.context(() => {
      const sliderWidth = sliderRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      const scrollAmt = sliderWidth - windowWidth + (windowWidth * 0.2); // extra padding
      
      gsap.to(sliderRef.current, {
        x: -scrollAmt,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollAmt}`,
          invalidateOnRefresh: true,
        }
      });
      
      // Image Parallax logic within scroll
      const images = gsap.utils.toArray('.vibe-image-inner');
      images.forEach((img: any) => {
        gsap.to(img, {
          x: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollAmt}`,
            scrub: true,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full h-screen bg-brand-black flex flex-col justify-center overflow-hidden relative z-20 border-t border-brand-white/10"
    >
      <div className="absolute top-16 left-8 md:left-16 z-30">
        <h2 className="text-sm md:text-base font-medium tracking-[0.2em] text-brand-gray-400 uppercase mb-4">Shop Vibe</h2>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase text-brand-white mix-blend-difference pointer-events-none">
          Inside The Store
        </h3>
      </div>
      
      <div 
        ref={sliderRef}
        className="flex gap-8 px-8 md:px-32 w-max items-center h-full pt-32"
      >
        {VIBE_IMAGES.map((src, index) => (
          <div 
            key={index} 
            className={`w-[60vw] md:w-[45vw] shrink-0 h-[60vh] overflow-hidden rounded-sm relative`}
          >
            <div className="vibe-image-inner absolute inset-0 -left-[20%] w-[140%] h-full">
               <RevealImage src={src} alt="Shop interior detail" className="w-full h-full grayscale hover:grayscale-0 transition-[filter] duration-700 object-cover" />
            </div>
            {/* Dark overlay ensuring text legibility */}
            <div className="absolute inset-0 bg-brand-black/20 pointer-events-none z-10" />
          </div>
        ))}
      </div>
    </section>
  );
};
