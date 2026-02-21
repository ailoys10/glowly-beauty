import { ProductGridSkeleton } from '@/components/skeletons/ProductCardSkeleton';

// Loading skeleton untuk halaman search (SSR)
// Ditampilkan selama server sedang memproses request
export default function SearchLoading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="bg-gradient-to-br from-[#fff5f7] via-[#fdf8f5] to-[#f9ede4] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-3 w-24 rounded-full bg-[#ffc9d5]/60 mx-auto mb-5 animate-pulse" />
          <div className="h-14 w-64 rounded-2xl bg-[#ffc9d5]/40 mx-auto mb-8 animate-pulse" />
          {/* Search bar skeleton */}
          <div className="max-w-xl mx-auto h-14 rounded-full bg-white/80 border border-[#ffc9d5] animate-pulse shadow-sm" />
          {/* Suggested tags skeleton */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 w-16 rounded-full bg-[#ffc9d5]/30 animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Results skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="h-4 w-40 rounded-full bg-[#f2d9c9] animate-pulse" />
          <div className="h-7 w-48 rounded-full bg-[#f2d9c9]/50 animate-pulse" />
        </div>
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
