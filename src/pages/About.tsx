import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageTransition } from '../utils/PageTransition';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-text', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
      
      gsap.from('.reveal-img', {
        scale: 1.05,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.reveal-img',
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
    <div className="pt-32 pb-32 px-8 min-h-screen max-w-4xl mx-auto" ref={containerRef}>
      <h1 className="reveal-text text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-20 text-center">About Metalica</h1>
      
      <div className="space-y-16">
        <p className="reveal-text text-2xl md:text-4xl leading-snug font-light text-brand-gray-300">
          Founded in Nagpur, Metalica Clothing was born out of a desire for uncompromising quality and minimalist aesthetics.
        </p>
        
        <div className="reveal-img w-full aspect-video bg-brand-gray-900 rounded-sm overflow-hidden my-16">
          {/* <img src="https://images.unsplash.com/photo-1558769132-cb1fac0840c2?w=1200&q=80" alt="Brand Story" className="w-full h-full object-cover grayscale" /> */}
          <video src="./Videos/AboutBrand.mp4" autoPlay muted loop className="w-full h-full object-cover"></video>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-brand-gray-300 font-light leading-relaxed">
          <p className="reveal-text">
            We believe that modern everyday wear should be both functional and beautiful. By stripping away the unnecessary, we focus entirely on silhouette, texture, and construction.
          </p>
          <p className="reveal-text">
            Every piece is designed to seamlessly integrate into your wardrobe, providing a foundation of versatile staples that stand the test of time. No loud branding. Just pure design.
          </p>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

