'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function SearchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Search Error]', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#fff5f7] flex items-center justify-center">
          <svg className="w-9 h-9 text-[#b76e79]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <h2
          className="text-3xl font-light text-[#3d2c2c] mb-3"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          Search unavailable
        </h2>
        <p className="text-sm text-[#9d7e7e] font-light mb-6 leading-relaxed">
          We couldn&apos;t connect to our product database. Please try again in a moment.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#3d2c2c] text-white text-sm font-medium rounded-full hover:bg-[#b76e79] transition-all duration-300"
          >
            Try Again
          </button>
          <Link
            href="/products"
            className="px-6 py-3 border border-[#ffc9d5] text-[#6b4c4c] text-sm font-medium rounded-full hover:border-[#b76e79] hover:text-[#b76e79] transition-all duration-300"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
