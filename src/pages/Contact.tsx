import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PageTransition } from '../utils/PageTransition';

export const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
    <div className="pt-32 pb-32 px-8 min-h-screen max-w-4xl mx-auto flex flex-col items-center justify-center text-center" ref={containerRef}>
      <h1 className="reveal-item text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-8">Contact Us</h1>
      <p className="reveal-item text-xl text-brand-gray-500 mb-20 max-w-lg mx-auto font-light">
        Reach out to us for any inquiries, appointments, or simply to learn more about our collection.
      </p>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-brand-gray-900 pt-16">
        <div className="reveal-item space-y-4">
          <h3 className="uppercase tracking-widest text-sm font-semibold text-brand-white">Visit Us</h3>
          <p className="text-brand-gray-300 font-light">Nagpur, Maharashtra<br/>India, 440001</p>
        </div>
        
        <div className="reveal-item space-y-4">
          <h3 className="uppercase tracking-widest text-sm font-semibold text-brand-white">Say Hello</h3>
          <p className="text-brand-gray-300 font-light"><a href="https://wa.me/919999999999" className="hover:text-brand-white transition-colors" data-cursor="link">WhatsApp: +91 99999 99999</a><br/>Call: +91 99999 99999</p>
        </div>

        <div className="reveal-item space-y-4">
          <h3 className="uppercase tracking-widest text-sm font-semibold text-brand-white">Store Hours</h3>
          <p className="text-brand-gray-300 font-light">Mon - Sat<br/>10:00 AM - 9:00 PM</p>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

