import type { Metadata } from 'next';
import './globals.css';
import { WishlistProvider } from '@/lib/wishlistContext';
import { CartProvider } from '@/lib/cartContext';
import { ToastProvider } from '@/lib/toastContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Glowly Beauty — Reveal Your Natural Glow',
    template: '%s | Glowly Beauty',
  },
  description:
    'Glowly Beauty offers premium skincare, makeup, and beauty essentials curated for the modern woman. Discover your natural radiance with our clean, luxurious formulas.',
  keywords: ['beauty', 'skincare', 'makeup', 'glowly', 'natural glow', 'clean beauty'],
  authors: [{ name: 'Glowly Beauty' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://glowly.beauty',
    siteName: 'Glowly Beauty',
    title: 'Glowly Beauty — Reveal Your Natural Glow',
    description: 'Premium beauty essentials for the modern woman.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#fffbf9]">
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
