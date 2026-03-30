import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { MagneticButton } from './MagneticButton';

export const CartDrawer = () => {
  const { 
    isOpen, 
    toggleCart, 
    items, 
    updateQuantity, 
    removeFromCart, 
    totalPrice,
    totalItems
  } = useCartStore();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) toggleCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[150] flex justify-end bg-brand-black/60 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md h-full bg-brand-gray-900 border-l border-brand-gray-800 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-gray-800">
              <h2 className="text-xl font-semibold tracking-widest uppercase flex items-center gap-3">
                <ShoppingBag size={20} /> Cart ({totalItems})
              </h2>
              <button 
                onClick={toggleCart}
                className="hover:text-brand-gray-300 transition-colors p-2 -mr-2"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-brand-gray-500 opacity-70">
                  <ShoppingBag size={48} strokeWidth={1} className="mb-4" />
                  <p className="uppercase tracking-widest text-sm">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-32 bg-brand-black overflow-hidden shrink-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-300" 
                      />
                    </div>
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-semibold tracking-widest uppercase pb-1 pr-2">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-brand-gray-500 hover:text-brand-white transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-brand-gray-300 text-sm mt-1 mb-auto">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-4 border border-brand-gray-800 w-fit">
                        <button 
                          onClick={() => {
                            if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                            else removeFromCart(item.id);
                          }}
                          className="px-3 py-1 hover:bg-brand-gray-800 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-brand-gray-800 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-brand-gray-800 bg-brand-gray-900 mt-auto">
                <div className="flex justify-between items-center mb-6">
                  <span className="uppercase tracking-widest text-sm text-brand-gray-300">Total</span>
                  <span className="text-xl font-bold tracking-widest">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <MagneticButton className="w-full">
                  <button className="w-full bg-brand-white text-brand-black py-5 uppercase tracking-widest text-sm font-semibold hover:bg-brand-gray-300 transition-colors duration-300">
                    Secure Checkout
                  </button>
                </MagneticButton>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
