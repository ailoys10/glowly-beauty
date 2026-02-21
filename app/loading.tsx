import { ProductGridSkeleton } from '@/components/skeletons/ProductCardSkeleton';

export default function RootLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="animate-pulse bg-gradient-to-br from-[#fff5f7] via-[#fdf8f5] to-[#f9ede4] min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="h-3 w-40 rounded-full bg-[#ffc9d5]" />
              <div className="space-y-3">
                <div className="h-14 w-3/4 rounded-2xl bg-[#ffc9d5]/60" />
                <div className="h-14 w-1/2 rounded-2xl bg-[#ffc9d5]/60" />
                <div className="h-14 w-2/3 rounded-2xl bg-[#ffc9d5]/60" />
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-32 rounded-full bg-[#f2d9c9]" />
                <div className="h-12 w-36 rounded-full bg-[#f2d9c9]" />
              </div>
            </div>
            <div className="aspect-[4/5] rounded-3xl bg-[#ffc9d5]/30 hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Featured skeleton */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-48 rounded-2xl bg-[#f2d9c9] mb-10 animate-pulse" />
        <ProductGridSkeleton count={4} />
      </div>
    </div>
  );
}
