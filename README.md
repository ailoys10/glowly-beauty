# 🌸 Glowly Beauty

Website e-commerce kecantikan premium dibangun dengan **Next.js 14 App Router**, TypeScript, dan Tailwind CSS.
Data produk diambil secara real-time dari **DummyJSON API** (dummyjson.com).

---

## 🚀 Cara Menjalankan

```bash
npm install
npm run dev
# Buka http://localhost:3000
```

---

## 🏗️ Arsitektur Rendering

### 1. SSG — Static Site Generation
| File | Keterangan |
|------|-----------|
| `app/page.tsx` | Homepage — di-generate saat build, ISR tiap 1 jam |
| `app/products/page.tsx` | Daftar produk — SSG + `revalidate = 3600` |
| `app/products/[id]/page.tsx` | Detail produk — `generateStaticParams()` + ISR |

**Implementasi kunci:**
```ts
// Pre-generate semua URL produk saat build time
export async function generateStaticParams() {
  const products = await fetchProducts(); // fetch dari DummyJSON
  return products.map((p) => ({ id: String(p.id) }));
}
export const revalidate = 3600; // ISR: regenerate tiap 1 jam
```

---

### 2. SSR — Server-Side Rendering
| File | Keterangan |
|------|-----------|
| `app/search/page.tsx` | Search page — render fresh setiap request |

**Implementasi kunci:**
```ts
export const dynamic = 'force-dynamic'; // Tidak ada cache, render per request
// Fetch dengan cache: 'no-store' di service:
const res = await fetch(url, { cache: 'no-store' });
```

---

### 3. CSR — Client-Side Rendering
| File | Keterangan |
|------|-----------|
| `app/products/ProductsClient.tsx` | Filter & sort produk di browser |
| `app/search/SearchInput.tsx` | Input pencarian interaktif |
| `components/ProductCard.tsx` | Wishlist toggle per produk |
| `app/products/[id]/ProductDetailClient.tsx` | Add to Bag + Wishlist di detail produk |
| `components/Navbar.tsx` | Search bar + mobile menu |

**Implementasi kunci:**
```ts
'use client'; // Tandai sebagai Client Component
const [activeCategory, setActiveCategory] = useState('all');
const filtered = useMemo(() => { ... }, [products, activeCategory, sort]);
```

---

## 📡 Sumber Data: DummyJSON API

```
https://dummyjson.com/products         → SSG: semua produk
https://dummyjson.com/products/{id}    → SSG: detail produk
https://dummyjson.com/products/search  → SSR: pencarian (no-store)
https://dummyjson.com/products/category/{slug} → Related products
```

---

## 🗂️ Struktur Folder

```
glowly-beauty/
├── app/
│   ├── layout.tsx               # Root layout + metadata SEO
│   ├── page.tsx                 # Homepage (SSG)
│   ├── loading.tsx              # Root loading skeleton
│   ├── error.tsx                # Root error boundary
│   ├── not-found.tsx            # 404 page
│   ├── products/
│   │   ├── page.tsx             # All Products (SSG)
│   │   ├── ProductsClient.tsx   # Filter/sort CSR component
│   │   ├── loading.tsx          # Products skeleton
│   │   ├── error.tsx            # Products error boundary
│   │   └── [id]/
│   │       ├── page.tsx         # Product Detail (SSG)
│   │       ├── ProductDetailClient.tsx  # Bag + Wishlist (CSR)
│   │       ├── loading.tsx      # Detail skeleton
│   │       └── error.tsx        # Detail error boundary
│   ├── search/
│   │   ├── page.tsx             # Search (SSR — force-dynamic)
│   │   ├── SearchInput.tsx      # Search input (CSR)
│   │   ├── loading.tsx          # Search skeleton
│   │   └── error.tsx            # Search error boundary
│   └── wishlist/
│       └── page.tsx             # Wishlist (CSR via Context)
├── components/
│   ├── Navbar.tsx               # Sticky navbar + search bar
│   ├── Footer.tsx               # Footer
│   ├── HeroSection.tsx          # Hero section homepage
│   ├── ProductCard.tsx          # Reusable card + wishlist
│   └── skeletons/
│       ├── ProductCardSkeleton.tsx
│       └── ProductDetailSkeleton.tsx
├── services/
│   └── productService.ts        # Semua fungsi fetch API
├── types/
│   └── product.ts               # TypeScript interfaces
└── lib/
    ├── utils.ts                 # Helper functions
    └── wishlistContext.tsx      # Context API state management
```

---

## ✅ Checklist Pemenuhan Tugas

| Kriteria | Status | Detail |
|----------|--------|--------|
| Next.js Framework | ✅ | Next.js 14, App Router, TypeScript |
| SSG | ✅ | Homepage, /products, /products/[id] |
| SSR | ✅ | /search dengan `force-dynamic` + `cache: 'no-store'` |
| CSR | ✅ | Filter, Wishlist, SearchInput, ProductCard |
| API Publik | ✅ | DummyJSON (dummyjson.com) |
| useState | ✅ | Di semua client components |
| Context API | ✅ | WishlistContext — state global |
| useMemo | ✅ | Filter + sort di ProductsClient |
| useCallback | ✅ | Handler di Navbar, ProductsClient, ProductDetailClient |
| memo() | ✅ | ProductDetailClient di-wrap dengan React.memo |
| Loading skeleton | ✅ | Setiap route: loading.tsx dengan shimmer animation |
| Error boundary | ✅ | Setiap route: error.tsx dengan retry button |
| Responsive design | ✅ | Mobile-first, semua breakpoint |
| SEO metadata | ✅ | Per-halaman metadata + OpenGraph |
