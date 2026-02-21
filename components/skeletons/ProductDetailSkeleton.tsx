export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2">
          {[60, 80, 120].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`h-3 w-${w === 60 ? '10' : w === 80 ? '14' : '24'} rounded-full bg-[#f2d9c9] animate-pulse`} />
              {i < 2 && <div className="w-1 h-1 rounded-full bg-[#f2d9c9]" />}
            </div>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image skeleton */}
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#f9ede4] to-[#ffc9d5]/20 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>

          {/* Info skeleton */}
          <div className="flex flex-col gap-4 animate-pulse">
            <div className="h-3 w-20 rounded-full bg-[#f2d9c9]" />
            <div className="space-y-2">
              <div className="h-10 w-full rounded-2xl bg-[#f2d9c9]/70" />
              <div className="h-10 w-3/4 rounded-2xl bg-[#f2d9c9]/50" />
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 rounded bg-[#f2d9c9]" />)}
            </div>
            <div className="h-16 rounded-2xl bg-[#fff5f7] border border-[#ffc9d5]/30" />
            <div className="h-20 rounded-2xl bg-[#f2d9c9]/30" />
            <div className="grid grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => <div key={i} className="h-16 rounded-2xl bg-[#f9ede4]" />)}
            </div>
            <div className="h-14 rounded-full bg-[#f2d9c9]" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetailSkeleton;
