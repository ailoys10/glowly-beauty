'use client';

// CSR Component — search input dengan real-time behavior di client
// Ini adalah contoh CSR: komponen ini berjalan di browser, bukan di server

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface SearchInputProps {
  initialQuery: string;
}

export default function SearchInput({ initialQuery }: SearchInputProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = query.trim();
      router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
    },
    [query, router]
  );

  const handleClear = () => {
    setQuery('');
    router.push('/search');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="relative flex items-center bg-white rounded-full shadow-sm border border-[#ffc9d5] focus-within:border-[#b76e79] focus-within:shadow-md transition-all duration-300">
        {/* Search Icon */}
        <svg
          className="absolute left-5 w-5 h-5 text-[#b76e79] shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for serum, lipstick, moisturizer…"
          className="flex-1 pl-12 pr-4 py-4 bg-transparent text-[#3d2c2c] text-sm placeholder-[#c9a0a0] focus:outline-none rounded-full"
          autoFocus
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 mr-1 rounded-full text-[#9d7e7e] hover:text-[#b76e79] hover:bg-[#fff5f7] transition-all"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="m-1.5 px-6 py-2.5 bg-[#3d2c2c] text-white text-sm font-medium rounded-full hover:bg-[#b76e79] transition-all duration-300 shrink-0"
        >
          Search
        </button>
      </div>

      {/* Suggested tags — CSR interactivity */}
      <div className="flex items-center justify-center gap-2 flex-wrap mt-4">
        <span className="text-xs text-[#9d7e7e]">Try:</span>
        {['lotion', 'powder', 'body wash', 'eyeshadow', 'fragrance'].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              setQuery(tag);
              router.push(`/search?q=${tag}`);
            }}
            className="px-3 py-1 text-xs bg-white border border-[#ffc9d5] text-[#6b4c4c] rounded-full hover:border-[#b76e79] hover:text-[#b76e79] transition-all duration-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </form>
  );
}
