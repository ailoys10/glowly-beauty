export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price * 15000);
}

export function formatRating(rate: number): string {
  return rate.toFixed(1);
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + '…' : str;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ─── Category Display Name ─────────────────────────────────────────────────────
// Label yang tampil di tombol filter. Sumber utama ada di productService.ts
// (CATEGORY_DISPLAY). Fungsi ini sebagai fallback untuk slug yang tidak terdaftar.
export function formatCategoryLabel(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
