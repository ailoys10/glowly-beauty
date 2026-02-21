'use client';

import { useState, useCallback, memo } from 'react';
import { useWishlist } from '@/lib/wishlistContext';
import { useCart } from '@/lib/cartContext';
import { useToast } from '@/lib/toastContext';
import { Product } from '@/types/product';

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient = memo(function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = useCallback(() => {
    addToCart({ id: product.id, title: product.title, price: product.price, image: product.image }, quantity);
    showToast(
      inCart ? 'Cart updated!' : 'Added to cart!',
      'success',
      `${quantity}x ${product.title}`
    );
  }, [addToCart, showToast, product, quantity, inCart]);

  const handleWishlist = useCallback(() => {
    toggleWishlist({ id: product.id, title: product.title, price: product.price, image: product.image });
    showToast(
      wishlisted ? 'Removed from wishlist' : 'Saved to wishlist ♥',
      'wishlist',
      product.title
    );
  }, [toggleWishlist, showToast, product, wishlisted]);

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium text-[#6b4c4c] tracking-wide uppercase">Qty</span>
        <div className="flex items-center border border-[#ffc9d5] rounded-full overflow-hidden">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-2 text-[#6b4c4c] hover:bg-[#fff5f7] transition-colors text-sm font-medium" aria-label="Decrease">−</button>
          <span className="px-4 py-2 text-sm font-medium text-[#3d2c2c] min-w-[3rem] text-center">{quantity}</span>
          <button onClick={() => setQuantity((q) => Math.min(10, q + 1))} className="px-4 py-2 text-[#6b4c4c] hover:bg-[#fff5f7] transition-colors text-sm font-medium" aria-label="Increase">+</button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 py-4 rounded-full text-sm font-medium tracking-wider transition-all duration-300 flex items-center justify-center gap-2 bg-[#3d2c2c] text-white hover:bg-[#b76e79] hover:-translate-y-0.5 shadow-lg shadow-[#3d2c2c]/20 hover:shadow-[#b76e79]/30 active:scale-95"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {inCart ? 'Update Cart' : 'Add to Cart'}
        </button>

        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 active:scale-95 ${
            wishlisted ? 'bg-[#b76e79] border-[#b76e79] text-white scale-105' : 'border-[#ffc9d5] text-[#b76e79] hover:bg-[#fff5f7] hover:border-[#b76e79]'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {wishlisted && (
        <p className="text-xs text-[#b76e79] text-center">♥ Saved to your wishlist</p>
      )}
    </div>
  );
});

export default ProductDetailClient;
