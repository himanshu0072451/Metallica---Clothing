import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [hoverState, setHoverState] = useState<'normal' | 'link' | 'view'>('normal');
  const location = useLocation();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // High performance mouse tracking with GSAP
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3' });

    const onMouseMove = (e: MouseEvent) => {
      // Center the cursor
      const offset = hoverState === 'normal' ? 6 : (hoverState === 'view' ? 40 : 20);
      xTo(e.clientX - offset);
      yTo(e.clientY - offset);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [hoverState]);

  useEffect(() => {
    // Reset cursor on route change
    setHoverState('normal');

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look up the DOM tree for interactive elements
      const link = target.closest('a, button, [role="button"]');
      const viewElement = target.closest('[data-cursor="view"]');

      if (viewElement) {
        setHoverState('view');
      } else if (link) {
        setHoverState('link');
      } else {
        setHoverState('normal');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [location.pathname]);

  // Handle cursor visual states via GSAP for smoothness
  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || !text) return;

    if (hoverState === 'normal') {
      gsap.to(cursor, { width: 12, height: 12, backgroundColor: '#ffffff', mixBlendMode: 'difference', opacity: 1, duration: 0.3 });
      gsap.to(text, { opacity: 0, scale: 0.5, duration: 0.2 });
    } else if (hoverState === 'link') {
      gsap.to(cursor, { width: 40, height: 40, backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.5)', mixBlendMode: 'difference', duration: 0.3 });
      gsap.to(text, { opacity: 0, scale: 0.5, duration: 0.2 });
    } else if (hoverState === 'view') {
      gsap.to(cursor, { width: 80, height: 80, backgroundColor: '#ffffff', border: 'none', mixBlendMode: 'normal', duration: 0.3 });
      gsap.to(text, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
    }
  }, [hoverState]);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-3 h-3 bg-brand-white rounded-full pointer-events-none z-[100] flex items-center justify-center overflow-hidden mix-blend-difference"
      style={{ transform: 'translate(calc(100vw / 2), calc(100vh / 2))' }} // Start position
    >
      <span ref={textRef} className="text-brand-black text-[10px] font-bold tracking-widest uppercase opacity-0 scale-50">
        View
      </span>
    </div>
  );
};
