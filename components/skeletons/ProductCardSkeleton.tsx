export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-[#f9ede4] to-[#ffc9d5]/20 mb-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>
      {/* Category */}
      <div className="h-2.5 w-16 rounded-full bg-[#f2d9c9] mb-2" />
      {/* Title */}
      <div className="h-4 w-3/4 rounded-full bg-[#f2d9c9] mb-1" />
      <div className="h-4 w-1/2 rounded-full bg-[#f2d9c9] mb-3" />
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-[#f2d9c9]" />
        ))}
      </div>
      {/* Price */}
      <div className="h-4 w-24 rounded-full bg-[#f2d9c9]" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
