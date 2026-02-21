// ─────────────────────────────────────────────────────────────────────────────
// SSG PAGE — Homepage
// Data featured products di-fetch dari DummyJSON saat BUILD TIME.
// revalidate = 3600 → ISR: otomatis refresh setiap 1 jam.
// ─────────────────────────────────────────────────────────────────────────────
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/skeletons/ProductCardSkeleton';
import { fetchFeaturedProducts } from '@/services/productService';

export const revalidate = 3600; // ← SSG/ISR

export default async function HomePage() {
  // Fetch featured dari DummyJSON API (server-side, build time)
  const featured = await fetchFeaturedProducts();

  const categories = [
    {
      name: 'Skincare',
      slug: 'skin-care',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80&auto=format&fit=crop',
      count: '24 Products',
    },
    {
      name: 'Beauty',
      slug: 'beauty',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80&auto=format&fit=crop',
      count: '18 Products',
    },
    {
      name: 'Fragrances',
      slug: 'fragrances',
      image: 'https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=500&q=80&auto=format&fit=crop',
      count: '12 Products',
    },
  ];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Categories ────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-3">Curated For You</p>
          <h2
            className="text-4xl md:text-5xl font-light text-[#3d2c2c]"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Shop By Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d2c2c]/70 via-[#3d2c2c]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  className="text-2xl font-semibold text-white mb-1"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {cat.name}
                </h3>
                <p className="text-xs text-[#ffc9d5] tracking-wider">{cat.count}</p>
              </div>
              <div className="absolute inset-0 ring-2 ring-inset ring-white/0 group-hover:ring-white/20 rounded-3xl transition-all duration-300" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products (SSG dari API) ──────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[#fffbf9] to-[#fff5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-3">Hand-Picked</p>
              <h2
                className="text-4xl md:text-5xl font-light text-[#3d2c2c]"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Featured Products
              </h2>
              <p className="text-xs text-[#9d7e7e] mt-1 font-light">
                Live data from{' '}
                <a href="https://dummyjson.com" target="_blank" rel="noopener noreferrer"
                  className="underline hover:text-[#b76e79] transition-colors">
                  DummyJSON API
                </a>
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#b76e79] hover:text-[#3d2c2c] transition-colors duration-200 group"
            >
              View All
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <Suspense fallback={<ProductGridSkeleton count={4} />}>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Suspense>

          <div className="sm:hidden mt-8 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#b76e79] text-[#b76e79] rounded-full text-sm font-medium hover:bg-[#b76e79] hover:text-white transition-all duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── Rendering Mode Info Section ───────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-3">Architecture</p>
          <h2 className="text-3xl font-light text-[#3d2c2c]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Rendering Techniques
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              mode: 'SSG',
              label: 'Static Site Generation',
              color: '#b76e79',
              bg: '#fff5f7',
              border: '#ffc9d5',
              pages: ['Homepage', 'Products List', 'Product Detail'],
              desc: 'Di-generate saat build time dari DummyJSON API. Di-cache di CDN, sangat cepat.',
            },
            {
              mode: 'SSR',
              label: 'Server-Side Rendering',
              color: '#c9a84c',
              bg: '#fdf8f0',
              border: '#f2d9a0',
              pages: ['Search Page'],
              desc: 'Di-render fresh setiap request. Cocok untuk data yang personalized atau sering berubah.',
            },
            {
              mode: 'CSR',
              label: 'Client-Side Rendering',
              color: '#6b9e8a',
              bg: '#f0fdf8',
              border: '#a8d5c2',
              pages: ['Filter & Sort', 'Wishlist', 'Search Input'],
              desc: 'Berjalan di browser. Interaksi real-time tanpa reload halaman.',
            },
          ].map((item) => (
            <div
              key={item.mode}
              className="p-6 rounded-3xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ background: item.bg, borderColor: item.border }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="px-3 py-1 rounded-full text-white text-xs font-bold tracking-widest"
                  style={{ background: item.color }}
                >
                  {item.mode}
                </span>
                <span className="text-xs font-medium text-[#3d2c2c]">{item.label}</span>
              </div>
              <p className="text-xs text-[#6b4c4c] font-light leading-relaxed mb-3">{item.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.pages.map((page) => (
                  <span
                    key={page}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={{ background: item.color + '20', color: item.color }}
                  >
                    {page}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Brand Promise ─────────────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
              title: 'Premium Quality',
              desc: 'Formulated with the finest botanical extracts and clinically-proven actives.',
            },
            {
              icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
              title: 'Clean & Safe',
              desc: 'Free from parabens, sulfates, and harmful chemicals. Safe for all skin types.',
            },
            {
              icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
              title: 'Cruelty-Free',
              desc: 'Never tested on animals. Certified cruelty-free and vegan-friendly.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-[#fff5f7] to-[#fdf8f5] border border-[#ffc9d5]/30 hover:border-[#ffc9d5] transition-colors duration-300"
            >
              <div className="text-[#b76e79] mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {item.icon}
                </svg>
              </div>
              <h3
                className="text-xl font-semibold text-[#3d2c2c] mb-2"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                {item.title}
              </h3>
              <p className="text-sm font-light text-[#6b4c4c] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#3d2c2c] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#6b4c4c]/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#b76e79]/20 blur-3xl" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-4">Join The Club</p>
          <h2
            className="text-4xl md:text-5xl font-light text-white mb-4"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Get 15% Off Your
            <em className="italic text-[#ffc9d5]"> First Order</em>
          </h2>
          <p className="text-[#e8bfa5] font-light text-sm mb-8 leading-relaxed">
            Subscribe to receive exclusive offers, beauty tips, and early access to new launches.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm font-light focus:outline-none focus:border-[#ffc9d5] transition-colors duration-200"
            />
            <button className="px-6 py-3.5 bg-[#b76e79] hover:bg-[#ffc9d5] text-white hover:text-[#3d2c2c] text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap hover:-translate-y-0.5">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
