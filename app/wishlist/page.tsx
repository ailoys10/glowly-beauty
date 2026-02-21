'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/lib/wishlistContext';
import { formatPrice } from '@/lib/utils';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#fff5f7] via-[#fdf8f5] to-[#f9ede4] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-4">My Collection</p>
          <h1
            className="text-5xl font-display font-light text-[#3d2c2c]"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            My Wishlist
            {wishlist.length > 0 && (
              <span className="ml-3 text-2xl text-[#b76e79]">({wishlist.length})</span>
            )}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#fff5f7] flex items-center justify-center">
              <svg className="w-10 h-10 text-[#ffc9d5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2
              className="text-3xl font-display font-light text-[#3d2c2c] mb-3"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Your wishlist is empty
            </h2>
            <p className="text-[#9d7e7e] font-light mb-8">Discover products you'll love and save them here.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3d2c2c] text-white rounded-full text-sm font-medium hover:bg-[#b76e79] transition-all duration-300 hover:-translate-y-0.5"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="group relative flex flex-col">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#f9ede4] mb-4">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[#b76e79] hover:bg-[#b76e79] hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Remove from wishlist"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <h3
                  className="font-display text-base font-medium text-[#3d2c2c] mb-1"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#6b4c4c] mb-3">{formatPrice(item.price)}</p>
                <Link
                  href={`/products/${item.id}`}
                  className="mt-auto py-2.5 text-center text-xs font-medium tracking-wider border border-[#3d2c2c] text-[#3d2c2c] rounded-full hover:bg-[#3d2c2c] hover:text-white transition-all duration-300"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
