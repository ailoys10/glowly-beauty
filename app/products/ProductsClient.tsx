'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/skeletons/ProductCardSkeleton';
import { Product } from '@/types/product';
import { CATEGORY_DISPLAY } from '@/services/productService';

interface ProductsClientProps {
  products: Product[];
  categories: string[];
}

const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Best Rated' },
  { value: 'discount',   label: 'Biggest Discount' },
];

// Ambil label dari CATEGORY_DISPLAY, fallback ke capitalize slug
function getLabel(slug: string): string {
  return CATEGORY_DISPLAY[slug] ?? slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function ProductsClient({ products: initialProducts, categories }: ProductsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState('default');
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    setIsFiltering(true);
    const t = setTimeout(() => setIsFiltering(false), 250);
    return () => clearTimeout(t);
  }, [activeCategory, sort]);

  const handleCategoryChange = useCallback(
    (cat: string) => {
      setActiveCategory(cat);
      const params = new URLSearchParams();
      if (cat !== 'all') params.set('category', cat);
      router.replace(`/products${params.toString() ? `?${params}` : ''}`, { scroll: false });
    },
    [router]
  );

  const filtered = useMemo(() => {
    return [...initialProducts]
      .filter((p) => activeCategory === 'all' || p.category === activeCategory)
      .sort((a, b) => {
        switch (sort) {
          case 'price-asc':  return a.price - b.price;
          case 'price-desc': return b.price - a.price;
          case 'rating':     return b.rating.rate - a.rating.rate;
          case 'discount': {
            const da = a.originalPrice ? a.originalPrice - a.price : 0;
            const db = b.originalPrice ? b.originalPrice - b.price : 0;
            return db - da;
          }
          default: return 0;
        }
      });
  }, [initialProducts, activeCategory, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Filter & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#3d2c2c] text-white shadow-sm scale-105'
                  : 'bg-white border border-[#ffc9d5] text-[#6b4c4c] hover:border-[#b76e79] hover:text-[#b76e79]'
              }`}
            >
              {getLabel(cat)}
            </button>
          ))}
        </div>

        {/* Sort + Count */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-[#9d7e7e] whitespace-nowrap">
            {filtered.length} products
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm text-[#3d2c2c] bg-white border border-[#ffc9d5] rounded-full px-4 py-2 focus:outline-none focus:border-[#b76e79] transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* CSR badge */}
      <div className="flex justify-end mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fff5f7] border border-[#ffc9d5]/50 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b76e79]" />
          <span className="text-[10px] tracking-widest uppercase text-[#9d7e7e] font-medium">
            Client-Side Filtering
          </span>
        </span>
      </div>

      {/* Product Grid */}
      {isFiltering ? (
        <ProductGridSkeleton count={filtered.length || 8} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">✨</p>
          <h3 className="text-2xl font-light text-[#3d2c2c] mb-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            No products found
          </h3>
          <p className="text-sm text-[#9d7e7e] font-light">Try selecting a different category</p>
          <button
            onClick={() => handleCategoryChange('all')}
            className="mt-4 px-6 py-2.5 bg-[#3d2c2c] text-white text-sm rounded-full hover:bg-[#b76e79] transition-colors"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 transition-opacity duration-300 ${isFiltering ? 'opacity-0' : 'opacity-100'}`}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
