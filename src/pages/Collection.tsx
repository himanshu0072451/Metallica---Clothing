import React, { useEffect, useRef } from 'react';
import { ProductCard } from '../components/ProductCard';
import gsap from 'gsap';
import { PageTransition } from '../utils/PageTransition';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Oversized Box Tee', price: '₹2,499', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
  { id: '2', name: 'Structured Trousers', price: '₹4,999', imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80' },
  { id: '3', name: 'Minimalist Hoodie', price: '₹5,499', imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80' },
  { id: '4', name: 'Essential Cropped Jacket', price: '₹6,999', imageUrl: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&q=80' },
  { id: '5', name: 'Heavyweight Long Sleeve', price: '₹2,999', imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80' },
  { id: '6', name: 'Utility Cargo Pants', price: '₹5,999', imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80' }
];

export const Collection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.product-card-wrapper', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <div className="pt-32 px-8 min-h-screen max-w-[1600px] mx-auto" ref={containerRef}>
        <header className="mb-16 flex flex-col md:flex-row justify-between items-baseline">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase">Collection</h1>
          <p className="text-brand-gray-500 uppercase tracking-widest text-sm mt-4 md:mt-0">
            Viewing All [{MOCK_PRODUCTS.length}]
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="product-card-wrapper">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
