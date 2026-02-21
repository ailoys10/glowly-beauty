import { ProductGridSkeleton } from '@/components/skeletons/ProductCardSkeleton';

export default function ProductsLoading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="bg-gradient-to-br from-[#fff5f7] via-[#fdf8f5] to-[#f9ede4] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="h-3 w-28 rounded-full bg-[#ffc9d5]/60 mx-auto animate-pulse" />
          <div className="h-12 w-56 rounded-2xl bg-[#ffc9d5]/40 mx-auto animate-pulse" />
          <div className="h-4 w-80 rounded-full bg-[#f2d9c9]/50 mx-auto animate-pulse" />
        </div>
      </div>
      {/* Filters skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 w-20 rounded-full bg-[#f2d9c9] animate-pulse" />
            ))}
          </div>
          <div className="h-9 w-36 rounded-full bg-[#f2d9c9] animate-pulse" />
        </div>
        <ProductGridSkeleton count={12} />
      </div>
    </div>
  );
}
