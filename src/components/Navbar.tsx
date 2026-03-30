import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export const Navbar = () => {
  const { totalItems, toggleCart } = useCartStore();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-brand-white p-6 flex justify-between items-center px-8">
      <Link to="/" className="text-2xl font-bold tracking-tighter uppercase">
        Metalica
      </Link>
      
      <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium">
        <Link to="/collection" className="group relative py-1 hover:text-brand-gray-300 transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-brand-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" data-cursor="link">Collection</Link>
        <Link to="/about" className="group relative py-1 hover:text-brand-gray-300 transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-brand-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" data-cursor="link">About</Link>
        <Link to="/contact" className="group relative py-1 hover:text-brand-gray-300 transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-brand-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" data-cursor="link">Contact</Link>
      </div>

      <div className="flex items-center space-x-6">
        <button 
          onClick={toggleCart}
          className="hover:text-brand-gray-300 transition-colors relative"
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-brand-white text-brand-black text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </button>
        <button className="md:hidden hover:text-brand-gray-300 transition-colors">
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
};
