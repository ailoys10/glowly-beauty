'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Glowly Error]', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#fff5f7] flex items-center justify-center">
          <svg className="w-10 h-10 text-[#b76e79]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </div>
        <h2
          className="text-3xl font-display font-light text-[#3d2c2c] mb-3"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          Something went wrong
        </h2>
        <p className="text-sm text-[#9d7e7e] font-light mb-2 leading-relaxed">
          We couldn&apos;t load the page. This might be a temporary issue with our data provider.
        </p>
        {error.digest && (
          <p className="text-xs text-[#c9a84c] mb-6 font-mono">Error ID: {error.digest}</p>
        )}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#3d2c2c] text-white text-sm font-medium rounded-full hover:bg-[#b76e79] transition-all duration-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-[#ffc9d5] text-[#6b4c4c] text-sm font-medium rounded-full hover:border-[#b76e79] hover:text-[#b76e79] transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
