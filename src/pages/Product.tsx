import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { PageTransition } from '../utils/PageTransition';
import { MagneticButton } from '../components/MagneticButton';
import { useCartStore } from '../store/useCartStore';

const MOCK_PRODUCT = {
  id: '1',
  name: 'Oversized Box Tee',
  price: 2499,
  description: 'Crafted from heavy-weight premium cotton, this box-fit tee offers a structured silhouette that holds its shape. Features dropped shoulders and a minimalist aesthetic perfect for everyday wear.',
  sizes: ['S', 'M', 'L', 'XL'],
  images: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80'
  ]
};

export const Product = () => {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart, toggleCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({ 
      id: MOCK_PRODUCT.id, 
      name: MOCK_PRODUCT.name, 
      price: MOCK_PRODUCT.price, 
      imageUrl: MOCK_PRODUCT.images[0] 
    });
    toggleCart(); // Open cart drawer to confirm addition
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      gsap.from('.stagger-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
      
      gsap.from('.image-reveal', {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [id]);
  
  return (
    <PageTransition>
      <div className="pt-32 px-8 min-h-screen max-w-7xl mx-auto" ref={containerRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <div className="space-y-8">
            {MOCK_PRODUCT.images.map((img, idx) => (
              <div key={idx} className="image-reveal w-full aspect-3/4 overflow-hidden bg-brand-gray-900 rounded-sm">
                <img src={img} alt={`${MOCK_PRODUCT.name} ${idx + 1}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-700" />
              </div>
            ))}
          </div>

          <div className="md:sticky md:top-32 h-fit space-y-8">
            <div className="space-y-4">
              <h1 className="stagger-reveal text-4xl md:text-5xl font-bold uppercase tracking-tighter">{MOCK_PRODUCT.name}</h1>
              <p className="stagger-reveal text-xl text-brand-gray-300 font-light">₹{MOCK_PRODUCT.price.toLocaleString('en-IN')}</p>
            </div>
            
            <div className="stagger-reveal">
              <p className="text-brand-gray-500 leading-relaxed font-light">{MOCK_PRODUCT.description}</p>
            </div>

            <div className="stagger-reveal space-y-4 pt-4 border-t border-brand-gray-900">
              <span className="text-sm tracking-widest uppercase text-brand-gray-500">Select Size</span>
              <div className="flex space-x-4">
                {MOCK_PRODUCT.sizes.map((size) => (
                  <button key={size} className="w-12 h-12 border border-brand-gray-700 flex items-center justify-center hover:bg-brand-white hover:text-brand-black transition-colors duration-300">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <MagneticButton className="w-full mt-8">
              <button 
                onClick={handleAddToCart}
                className="stagger-reveal w-full bg-brand-white text-brand-black py-5 uppercase tracking-widest text-sm font-semibold hover:bg-brand-gray-300 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
