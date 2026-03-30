import React, { useRef, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import gsap from 'gsap';

const MOCK_PRODUCTS = [
  { id: 'm1', name: 'Signature Heavy Wool Coat', price: '₹12,999', imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80' },
  { id: 'm2', name: 'Ribbed Knit Sweater', price: '₹3,499', imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80' },
  { id: 'm3', name: 'Everyday Relaxed Chino', price: '₹3,999', imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80' },
  { id: 'm4', name: 'Textured Over-shirt', price: '₹4,499', imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80' },
];

export const AsymmetricalGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.masonry-item', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-brand-black px-4 md:px-8 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-2">Curated</h2>
          <p className="text-brand-gray-500 uppercase tracking-widest text-sm">Pieces that define the silhouette</p>
        </div>

        {/* Asymmetrical CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 grid-flow-row-dense">
          {/* Main large item taking 2 cols in LG, 2 rows */}
          <div className="masonry-item lg:col-span-2 lg:row-span-2">
            <ProductCard {...MOCK_PRODUCTS[0]} />
          </div>
          
          <div className="masonry-item lg:col-span-1 lg:row-span-1 mt-0 lg:mt-32">
            <ProductCard {...MOCK_PRODUCTS[1]} />
          </div>
          
          <div className="masonry-item lg:col-span-1 lg:row-span-1">
            <ProductCard {...MOCK_PRODUCTS[2]} />
          </div>
          
          <div className="masonry-item lg:col-span-1 lg:row-span-1 lg:col-start-2 lg:-mt-32">
            <ProductCard {...MOCK_PRODUCTS[3]} />
          </div>
        </div>
      </div>
    </section>
  );
};
