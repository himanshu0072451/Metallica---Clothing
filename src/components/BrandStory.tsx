import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning the section to create a storytelling scroll experience
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        }
      });

      // Big text reveal
      tl.fromTo('.story-big-text',
        { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power2.out' }
      )
      // Big text fade out, moving up
      .to('.story-big-text', {
        opacity: 0,
        y: -50,
        duration: 2,
        ease: 'power2.inOut'
      })
      // Subtext reveal
      .fromTo('.story-sub-text',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
      )
      // Keep subtext on screen for a moment
      .to({}, { duration: 1 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen bg-brand-black flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background ambient glow/depth */}
      <div className="absolute inset-0 bg-radial from-brand-gray-900 to-brand-black opacity-50" />

      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        <h2 className="story-big-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-none mix-blend-difference">
          More than<br/>clothing.
        </h2>

        <p className="story-sub-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-brand-gray-300 leading-snug">
          We redefine everyday essentials with unapologetic attention to silhouette, fabric, and structure. Created for the modern individual who values quiet confidence over loud branding.
        </p>
      </div>

    </section>
  );
};
