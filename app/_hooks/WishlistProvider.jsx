'use client';

import { createContext, useContext } from 'react';
import { useLocalStorage } from '@/app/_hooks/useLocalStorage';


const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);

  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((wi) => wi.id === item.id)) {
        return prevWishlist; // item already in wishlist, no duplicates
      }
      return [...prevWishlist, item];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
