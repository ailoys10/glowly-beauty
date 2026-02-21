// ─────────────────────────────────────────────────────────────────────────────
// SSR PAGE — Server-Side Rendering
// export const dynamic = 'force-dynamic' memaksa Next.js untuk me-render
// halaman ini di server pada SETIAP request, tanpa cache sama sekali.
// Data selalu fresh — cocok untuk halaman search yang hasilnya beda tiap user.
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { searchProductsSSR } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/skeletons/ProductCardSkeleton';
import SearchInput from './SearchInput';

// ← Kunci SSR: paksa render ulang setiap request, tidak ada cache
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Search Products',
  description: 'Search through our full collection of premium beauty products at Glowly Beauty.',
};

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() ?? '';

  // Fetch di SERVER, fresh setiap request (SSR) — cache: 'no-store' di service
  const products = await searchProductsSSR(query);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[#fff5f7] via-[#fdf8f5] to-[#f9ede4] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-4">
            Discover
          </p>
          <h1
            className="text-5xl md:text-6xl font-light text-[#3d2c2c] mb-8"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Search Products
          </h1>

          {/* SearchInput = Client Component (CSR) — embedded dalam halaman SSR */}
          <Suspense fallback={<div className="h-14 bg-white/50 rounded-full max-w-xl mx-auto animate-pulse" />}>
            <SearchInput initialQuery={query} />
          </Suspense>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Result summary bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            {query ? (
              <p className="text-sm text-[#6b4c4c]">
                Found{' '}
                <span className="font-semibold text-[#3d2c2c]">{products.length} products</span>
                {' '}for{' '}
                <span className="italic text-[#b76e79]">&ldquo;{query}&rdquo;</span>
              </p>
            ) : (
              <p className="text-sm text-[#9d7e7e] font-light">
                Showing {products.length} latest products — type something to search
              </p>
            )}
          </div>

          {/* SSR indicator badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3d2c2c]/5 border border-[#3d2c2c]/10 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[10px] tracking-widest uppercase text-[#6b4c4c] font-medium">
              Server-Side Rendered · Fresh data
            </span>
          </span>
        </div>

        {/* Product Grid */}
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          {products.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#fff5f7] flex items-center justify-center">
                <svg className="w-9 h-9 text-[#ffc9d5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h3
                className="text-2xl font-light text-[#3d2c2c] mb-3"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                No results for &ldquo;{query}&rdquo;
              </h3>
              <p className="text-sm text-[#9d7e7e] font-light max-w-xs mx-auto">
                Try different keywords like <em>body wash</em>, <em>lotion</em>, or <em>powder</em>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}
