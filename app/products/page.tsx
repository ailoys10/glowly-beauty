// ─────────────────────────────────────────────────────────────────────────────
// SSG PAGE — Static Site Generation (dengan ISR)
// Halaman ini di-generate di BUILD TIME dari API DummyJSON.
// revalidate = 3600 → ISR: di-regenerate di background setiap 1 jam.
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchProducts, getCategories } from '@/services/productService';
import { ProductGridSkeleton } from '@/components/skeletons/ProductCardSkeleton';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our full collection of premium skincare, makeup, and beauty essentials at Glowly Beauty.',
};

// ← Kunci SSG/ISR: data di-fetch saat build, di-revalidate tiap 1 jam
export const revalidate = 3600;

export default async function ProductsPage() {
  // Fetch di server saat build time (SSG) dari DummyJSON API publik
  const products = await fetchProducts();
  const categories = getCategories(products);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[#fff5f7] via-[#fdf8f5] to-[#f9ede4] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-4">Our Collection</p>
          <h1
            className="text-5xl md:text-6xl font-light text-[#3d2c2c] mb-4"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            All Products
          </h1>
          <p className="text-[#6b4c4c] font-light max-w-md mx-auto leading-relaxed">
            Discover our curated range of clean beauty essentials, from luxurious serums to everyday staples.
          </p>

          {/* SSG indicator */}
          <div className="inline-flex items-center gap-1.5 mt-5 px-3 py-1.5 bg-white/60 border border-[#ffc9d5]/50 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#b76e79]" />
            <span className="text-[10px] tracking-widest uppercase text-[#6b4c4c] font-medium">
              Static Generated · {products.length} Products
            </span>
          </div>
        </div>
      </div>

      {/* Products with Filters — Client Component (CSR) untuk filtering/sorting */}
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <ProductGridSkeleton count={12} />
        </div>
      }>
        <ProductsClient products={products} categories={categories} />
      </Suspense>
    </div>
  );
}
