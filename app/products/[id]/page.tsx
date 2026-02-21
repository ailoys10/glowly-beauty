// ─────────────────────────────────────────────────────────────────────────────
// SSG PAGE — Static Site Generation untuk Detail Produk
// generateStaticParams() menghasilkan semua URL produk saat BUILD TIME.
// Setiap halaman produk di-render sekali, lalu di-cache di CDN.
// revalidate = 3600 → ISR: otomatis di-regenerate setiap 1 jam dari API.
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProductById, fetchProducts, fetchRelatedProducts } from '@/services/productService';
import { formatPrice, formatRating } from '@/lib/utils';
import ProductDetailClient from './ProductDetailClient';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton';

interface PageProps {
  params: { id: string };
}

// ← SSG: pre-generate semua path produk saat build time
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await fetchProductById(Number(params.id));
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | Glowly Beauty`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

// ← ISR: re-generate di background setiap 1 jam
export const revalidate = 3600;

export default async function ProductDetailPage({ params }: PageProps) {
  const id = Number(params.id);

  // Parallel fetch untuk performa (Promise.all)
  const [product, related] = await Promise.all([
    fetchProductById(id),
    fetchRelatedProducts('', id).catch(() => []),
  ]);

  if (!product) notFound();

  // Re-fetch related dengan category yang benar setelah dapat product
  const relatedProducts = await fetchRelatedProducts(product.category, id).catch(() => []);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs text-[#9d7e7e]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#b76e79] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#b76e79] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#3d2c2c] truncate max-w-[160px]">{product.title}</span>
        </nav>
      </div>

      {/* ── Main Product Section ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#f9ede4] to-[#ffc9d5]/20 sticky top-24">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-[#3d2c2c] text-white text-xs tracking-wider uppercase font-medium rounded-full shadow-sm">
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 px-3 py-1.5 bg-[#b76e79] text-white text-xs font-semibold rounded-full shadow-sm">
                  -{discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category + SSG badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs tracking-[0.25em] uppercase text-[#c9a84c] font-medium">
                {product.category}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#fff5f7] border border-[#ffc9d5]/50 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b76e79]" />
                <span className="text-[9px] tracking-widest uppercase text-[#9d7e7e]">SSG · ID {product.id}</span>
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl font-light text-[#3d2c2c] mb-4 leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i <= Math.round(product.rating.rate) ? 'text-[#c9a84c] fill-current' : 'text-[#e8d5a0] fill-current'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#6b4c4c]">
                {formatRating(product.rating.rate)} · <span className="font-medium">{product.rating.count}</span> reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 p-4 bg-[#fff5f7] rounded-2xl border border-[#ffc9d5]/30">
              <span className="text-3xl font-semibold text-[#3d2c2c]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[#9d7e7e] line-through font-light">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="ml-auto text-sm font-semibold text-[#b76e79]">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-[#ffc9d5]/40 pt-5 mb-6">
              <p className="text-[#6b4c4c] font-light leading-relaxed text-sm">{product.description}</p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {['Cruelty-Free', 'Vegan', 'Dermatologist Tested'].map((b) => (
                <div key={b} className="flex flex-col items-center gap-1.5 p-3 bg-[#fff5f7] rounded-2xl border border-[#ffc9d5]/30 hover:border-[#ffc9d5] transition-colors">
                  <svg className="w-4 h-4 text-[#b76e79]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-[10px] text-center text-[#6b4c4c] font-medium leading-tight">{b}</span>
                </div>
              ))}
            </div>

            {/* ← Client Component untuk interaksi (CSR) */}
            <ProductDetailClient product={product} />

            {/* Shipping info */}
            <div className="mt-5 p-4 bg-[#fff5f7] rounded-2xl border border-[#ffc9d5]/30">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#b76e79] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v4h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-[#3d2c2c]">Free Shipping orders over Rp 500.000</p>
                  <p className="text-xs text-[#9d7e7e] font-light mt-0.5">Estimated 3–5 business days · Free returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Products ─────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="bg-gradient-to-b from-[#fffbf9] to-[#fff5f7] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <h2
                className="text-3xl md:text-4xl font-light text-[#3d2c2c]"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                You May Also Like
              </h2>
              <Link href={`/products?category=${product.category}`}
                className="text-sm text-[#b76e79] hover:text-[#3d2c2c] transition-colors font-medium group flex items-center gap-1">
                More {product.category}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <Suspense fallback={
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                {[...Array(3)].map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            }>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </Suspense>
          </div>
        </section>
      )}
    </div>
  );
}
