import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        }
      });

      tl.fromTo(textRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power2.inOut', transformOrigin: 'left center' },
        "-=0.5"
      )
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in'
      })
      .to(progressRef.current, {
        opacity: 0,
        duration: 0.2
      }, "<")
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut'
      }, "-=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center pointer-events-none">
      <h1 ref={textRef} className="text-2xl md:text-3xl font-light tracking-[0.5em] uppercase text-brand-white mb-8 ml-[0.5em]">
        Metalica
      </h1>
      <div className="w-48 h-[1px] bg-brand-gray-800 overflow-hidden">
        <div ref={progressRef} className="w-full h-full bg-brand-white origin-left" />
      </div>
    </div>
  );
};
