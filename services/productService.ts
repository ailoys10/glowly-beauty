import { Product } from '@/types/product';

// ─── DummyJSON API Types ───────────────────────────────────────────────────────
interface DummyProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  discountPercentage: number;
  tags: string[];
}

interface DummyResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

const CUSTOM_IMAGES: Record<number, string> = {
};

// ─── Kategori Skincare yang ditampilkan ───────────────────────────────────────
// Ini adalah kategori dari DummyJSON yang relevan dengan skincare/beauty.
// Masing-masing akan muncul sebagai tab filter di halaman Products.
// Kamu bisa tambah/hapus kategori di sini sesuai kebutuhan.
const SKINCARE_CATEGORIES = [
  'skin-care',    // → label: "Serum & Essence"
  'beauty',       // → label: "Makeup"
  'fragrances',   // → label: "Fragrances"
];

// ─── Label kategori yang tampil di UI ─────────────────────────────────────────
// Ganti label di sini kalau mau nama yang berbeda di tampilan.
export const CATEGORY_DISPLAY: Record<string, string> = {
  'all':        'All',
  'skin-care':  'Skincare',
  'beauty':     'Makeup',
  'fragrances': 'Fragrances',
};

// ─── Transform DummyJSON → Product interface ───────────────────────────────────
function transformProduct(p: DummyProduct): Product {
  const originalPrice =
    p.discountPercentage > 0
      ? parseFloat((p.price / (1 - p.discountPercentage / 100)).toFixed(2))
      : undefined;

  let badge: string | undefined;
  if (p.discountPercentage >= 20) badge = 'Hot Deal';
  else if (p.tags?.includes('new')) badge = 'New';
  else if (p.rating >= 4.8) badge = 'Bestseller';

  return {
    id: p.id,
    title: p.title,
    price: p.price,
    originalPrice,
    description: p.description,
    category: p.category,      // slug asli dari API, dipakai untuk filter logic
    image: CUSTOM_IMAGES[p.id] ?? p.thumbnail,
    images: p.images,
    rating: {
      rate: parseFloat(p.rating.toFixed(1)),
      count: p.stock * 12,
    },
    badge,
    featured: p.rating >= 4.7,
  };
}

// ─── BASE URL ──────────────────────────────────────────────────────────────────
const BASE = 'https://dummyjson.com';

// ─── SSG — Fetch dari SEMUA kategori skincare, gabungkan jadi satu list ────────
export async function fetchProducts(): Promise<Product[]> {
  // Fetch semua kategori secara paralel (lebih cepat dari sequential)
  const results = await Promise.all(
    SKINCARE_CATEGORIES.map((cat) =>
      fetch(`${BASE}/products/category/${cat}?limit=6`, {
        next: { revalidate: 3600 },
      }).then(async (r) => {
        if (!r.ok) {
          return {
            products: [],
            total: 0,
            skip: 0,
            limit: 0,
          } as DummyResponse;
        }
        return (await r.json()) as DummyResponse;
      })
    )
  );

  // Gabungkan semua produk dari tiap kategori
  const all = results.flatMap((data) => data.products.map(transformProduct));
  return all;
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const res = await fetch(`${BASE}/products/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const p: DummyProduct = await res.json();
  return transformProduct(p);
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const all = await fetchProducts();
  return all.filter((p) => p.featured).slice(0, 4);
}

export async function fetchRelatedProducts(
  category: string,
  excludeId: number
): Promise<Product[]> {
  const encoded = encodeURIComponent(category);
  const res = await fetch(`${BASE}/products/category/${encoded}?limit=6`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const data: DummyResponse = await res.json();
  return data.products
    .map(transformProduct)
    .filter((p) => p.id !== excludeId)
    .slice(0, 3);
}

// ─── SSR — Search, fresh setiap request ───────────────────────────────────────
export async function searchProductsSSR(query: string): Promise<Product[]> {
  if (!query.trim()) {
    const all = await Promise.all(
      SKINCARE_CATEGORIES.map((cat) =>
        fetch(`${BASE}/products/category/${cat}?limit=4`, { cache: 'no-store' })
          .then(async (r) => {
            if (!r.ok) {
              return {
                products: [],
                total: 0,
                skip: 0,
                limit: 0,
              } as DummyResponse;
            }
            return (await r.json()) as DummyResponse;
          })
      )
    );
    return all.flatMap((d) => d.products.map(transformProduct));
  }

  const res = await fetch(
    `${BASE}/products/search?q=${encodeURIComponent(query)}&limit=20`,
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error('searchProductsSSR failed');
  const data: DummyResponse = await res.json();
  return data.products.map(transformProduct);
}

// ─── CSR — Filter per kategori dari browser ───────────────────────────────────
export async function fetchProductsCSR(category?: string): Promise<Product[]> {
  const url =
    category && category !== 'all'
      ? `${BASE}/products/category/${encodeURIComponent(category)}?limit=12`
      : `${BASE}/products?limit=12`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('fetchProductsCSR failed');
  const data: DummyResponse = await res.json();
  return data.products.map(transformProduct);
}

// ─── Utility: ambil kategori unik dari list produk ────────────────────────────
export function getCategories(products: Product[]): string[] {
  const cats = new Set(products.map((p) => p.category));
  return ['all', ...Array.from(cats)];
}
