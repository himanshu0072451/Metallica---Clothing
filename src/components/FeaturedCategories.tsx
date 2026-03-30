import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { RevealImage } from './RevealImage';

const CATEGORIES = [
  { id: 'c1', title: 'Shirts', url: '/collection', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80' },
  { id: 'c2', title: 'Pants', url: '/collection', img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1200&q=80' },
  { id: 'c3', title: 'New Arrivals', url: '/collection', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80' }
];

export const FeaturedCategories = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.category-card', {
        y: 80,
        opacity: 0,
        duration: 1.2,
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
    <section ref={containerRef} className="w-full bg-brand-black py-32 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} {...cat} />
        ))}
      </div>
    </section>
  );
};

const CategoryCard = ({ title, url, img }: { title: string, url: string, img: string }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.5,
      ease: 'power3.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.5,
      ease: 'power3.out',
      boxShadow: '0px 30px 40px rgba(0,0,0,0.5)',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out',
      boxShadow: '0px 0px 0px rgba(0,0,0,0)',
    });
  };

  return (
    <Link
      to={url}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="category-card relative block group overflow-hidden aspect-[4/5] bg-brand-gray-900 rounded-sm"
      data-cursor="view"
    >
      <RevealImage src={img} alt={title} className="w-full h-full absolute inset-0 grayscale group-hover:grayscale-0 transition-[filter] duration-700" />
      
      {/* Dark overlay ensuring text legibility */}
      <div className="absolute inset-0 bg-linear-to-t from-brand-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" />
      
      <div className="absolute bottom-8 left-8 z-20 flex flex-col">
        <h3 className="text-3xl md:text-4xl uppercase font-bold tracking-tighter text-brand-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {title}
        </h3>
        <span className="text-sm tracking-widest uppercase text-brand-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          Shop Now
        </span>
      </div>
    </Link>
  );
};
