import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { cn } from '../utils/utils';

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const RevealImage = ({ src, alt, className }: RevealImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded && imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1,
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      });
    }
  }, [isLoaded]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden bg-brand-gray-900", className)}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full object-cover origin-center scale-[1.1] blur-md opacity-0"
      />
    </div>
  );
};
