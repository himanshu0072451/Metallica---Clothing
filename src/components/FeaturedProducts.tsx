import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { RevealImage } from './RevealImage';

const PRODUCTS = [
  { id: 'fp1', title: 'Oversized Box Tee', price: '₹2,499', url: '/product/1', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&q=80' },
  { id: 'fp2', title: 'Structured Trousers', price: '₹4,999', url: '/product/2', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&q=80' },
  { id: 'fp3', title: 'Minimalist Hoodie', price: '₹5,499', url: '/product/3', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1000&q=80' },
  { id: 'fp4', title: 'Essential Cropped', price: '₹6,999', url: '/product/4', img: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=1000&q=80' }
];

export const FeaturedProducts = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.product-card-3d', {
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
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {PRODUCTS.map((prod) => (
          <Product3DCard key={prod.id} {...prod} />
        ))}
      </div>
    </section>
  );
};

const Product3DCard = ({ title, url, img, price }: { title: string, url: string, img: string, price: string }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
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
      zIndex: 10
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
      zIndex: 1
    });
  };

  return (
    <Link
      to={url}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="product-card-3d relative block group overflow-hidden aspect-4/5 bg-brand-gray-900 rounded-sm"
      data-cursor="view"
    >
      <RevealImage src={img} alt={title} className="w-full h-full absolute inset-0 grayscale group-hover:grayscale-0 transition-[filter] duration-700" />
      
      {/* Dark overlay ensuring text legibility */}
      <div className="absolute inset-0 bg-linear-to-t from-brand-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" />
      
      <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
        <div className="flex flex-col">
          <h3 className="text-2xl md:text-3xl uppercase font-bold tracking-tighter text-brand-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {title}
          </h3>
          <span className="text-sm tracking-widest uppercase text-brand-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-1">
            Shop Now
          </span>
        </div>
        <p className="text-xl md:text-2xl text-brand-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 font-light tracking-wider">
          {price}
        </p>
      </div>
    </Link>
  );
};
