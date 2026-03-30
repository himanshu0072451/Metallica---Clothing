import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  
  // Actions
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      addToCart: (newItem) => set((state) => {
        const existingItem = state.items.find(item => item.id === newItem.id);
        let updatedItems;
        
        if (existingItem) {
          updatedItems = state.items.map(item =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          updatedItems = [...state.items, { ...newItem, quantity: 1 }];
        }
        
        return {
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + newItem.price
        };
      }),

      removeFromCart: (id) => set((state) => {
        const itemToRemove = state.items.find(item => item.id === id);
        if (!itemToRemove) return state;

        const updatedItems = state.items.filter(item => item.id !== id);
        
        return {
          items: updatedItems,
          totalItems: state.totalItems - itemToRemove.quantity,
          totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
        };
      }),

      updateQuantity: (id, quantity) => set((state) => {
        if (quantity < 1) return state;
        
        const itemToUpdate = state.items.find(item => item.id === id);
        if (!itemToUpdate) return state;

        const quantityDiff = quantity - itemToUpdate.quantity;
        
        const updatedItems = state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        
        return {
          items: updatedItems,
          totalItems: state.totalItems + quantityDiff,
          totalPrice: state.totalPrice + (itemToUpdate.price * quantityDiff)
        };
      }),

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 })
    }),
    {
      name: 'metalica-cart-storage',
      partialize: (state) => ({ 
        items: state.items, 
        totalItems: state.totalItems, 
        totalPrice: state.totalPrice 
      }), // Don't persist isOpen state
    }
  )
);
