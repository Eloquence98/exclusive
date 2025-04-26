'use client';

import { createContext, useContext } from 'react';
import { useLocalStorage } from '@/app/_hooks/useLocalStorage';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((ci) => ci.id === item.id);
      if (existingItem) {
        return prevCart.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + item.quantity } : ci
        );
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
