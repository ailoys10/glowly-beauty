import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p
          className="text-8xl font-light text-[#ffc9d5] mb-6"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          404
        </p>
        <h2
          className="text-3xl font-light text-[#3d2c2c] mb-4"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          Page not found
        </h2>
        <p className="text-sm text-[#9d7e7e] font-light leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to something beautiful.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 bg-[#3d2c2c] text-white text-sm font-medium rounded-full hover:bg-[#b76e79] transition-all duration-300"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 border border-[#ffc9d5] text-[#6b4c4c] text-sm font-medium rounded-full hover:border-[#b76e79] hover:text-[#b76e79] transition-all duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
