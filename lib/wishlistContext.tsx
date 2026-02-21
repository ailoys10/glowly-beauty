'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { WishlistItem } from '@/types/product';

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.find((w) => w.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFromWishlist = useCallback((id: number) => {
    setWishlist((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const isInWishlist = useCallback((id: number) => {
    return wishlist.some((w) => w.id === id);
  }, [wishlist]);

  const toggleWishlist = useCallback((item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.find((w) => w.id === item.id);
      if (exists) return prev.filter((w) => w.id !== item.id);
      return [...prev, item];
    });
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
