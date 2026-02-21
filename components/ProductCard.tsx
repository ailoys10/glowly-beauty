'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/lib/wishlistContext';
import { useCart } from '@/lib/cartContext';
import { useToast } from '@/lib/toastContext';
import { Product } from '@/types/product';
import { formatPrice, formatRating } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const wishlisted = isInWishlist(product.id);
  const [imgError, setImgError] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ id: product.id, title: product.title, price: product.price, image: product.image });
    showToast(
      wishlisted ? 'Removed from wishlist' : 'Saved to wishlist ♥',
      'wishlist',
      product.title
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: product.id, title: product.title, price: product.price, image: product.image });
    showToast('Added to cart!', 'success', product.title);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/products/${product.id}`} className="group relative flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[#f9ede4] to-[#ffc9d5]/20 mb-4">
        {!imgError ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <svg className="w-12 h-12 text-[#ffc9d5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-xs text-[#c9a84c] font-medium text-center px-4">{product.category}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#3d2c2c]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#3d2c2c] text-white text-[10px] tracking-wider uppercase font-medium rounded-full">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-10 px-2 py-1 bg-[#b76e79] text-white text-[10px] font-medium rounded-full">
            -{discount}%
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
            wishlisted
              ? 'bg-[#b76e79] text-white scale-110'
              : 'bg-white/90 text-[#b76e79] opacity-0 group-hover:opacity-100 hover:bg-[#b76e79] hover:text-white'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Add to Cart — muncul saat hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-[#3d2c2c]/90 backdrop-blur-sm text-white text-xs font-medium tracking-wider rounded-xl hover:bg-[#b76e79] transition-colors duration-200 flex items-center justify-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 px-1">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] font-medium mb-1">{product.category}</span>
        <h3 className="font-display text-base font-medium text-[#3d2c2c] leading-tight mb-2 group-hover:text-[#b76e79] transition-colors duration-200" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
          {product.title}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((i) => (
              <svg key={i} className={`w-3 h-3 ${i <= Math.round(product.rating.rate) ? 'text-[#c9a84c]' : 'text-[#e8d5a0]'} fill-current`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-[#9d7e7e] font-light">{formatRating(product.rating.rate)} ({product.rating.count})</span>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-base font-medium text-[#3d2c2c]">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-[#9d7e7e] line-through font-light">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
