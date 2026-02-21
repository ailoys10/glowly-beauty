'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWishlist } from '@/lib/wishlistContext';
import { useCart } from '@/lib/cartContext';

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Search',   href: '/search' },
];

export default function Navbar() {
  const { wishlist } = useWishlist();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-[#fffbf9]/90 backdrop-blur-md border-b border-[#ffc9d5]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="text-2xl md:text-3xl font-display font-semibold tracking-wide text-[#3d2c2c] group-hover:text-[#b76e79] transition-colors duration-300" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              glowly
            </span>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c] font-medium -mt-1">beauty</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:bg-[#b76e79] after:transition-all after:duration-300 ${
                  isActive(link.href) ? 'text-[#b76e79] after:w-full' : 'text-[#6b4c4c] hover:text-[#b76e79] after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search mobile */}
            <Link href="/search" className="hidden sm:flex md:hidden w-9 h-9 rounded-full items-center justify-center border border-[#ffc9d5] hover:bg-[#fff5f7] text-[#b76e79] transition-colors" aria-label="Search">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#ffc9d5] hover:bg-[#fff5f7] transition-colors duration-200">
              <svg className="w-4 h-4 text-[#b76e79] group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill={isActive('/wishlist') ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="hidden sm:block text-xs font-medium text-[#6b4c4c]">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#b76e79] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3d2c2c] hover:bg-[#b76e79] transition-colors duration-200">
              <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="hidden sm:block text-xs font-medium text-white">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#c9a84c] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 rounded-lg hover:bg-[#fff5f7] transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-[#6b4c4c] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-0.5 bg-[#6b4c4c] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-[#6b4c4c] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-72 pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col gap-1 pt-2 border-t border-[#ffc9d5]/40">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href) ? 'text-[#b76e79] bg-[#fff5f7]' : 'text-[#6b4c4c] hover:text-[#b76e79] hover:bg-[#fff5f7]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/cart" onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm font-medium rounded-lg text-[#6b4c4c] hover:text-[#b76e79] hover:bg-[#fff5f7] transition-colors flex items-center justify-between"
            >
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="w-5 h-5 bg-[#3d2c2c] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
