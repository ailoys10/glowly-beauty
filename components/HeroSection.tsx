import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fff5f7] via-[#fdf8f5] to-[#f9ede4] min-h-[85vh] flex items-center">
      {/* Decorative circles */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#ffc9d5]/20 blur-3xl" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#f2d9c9]/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-[#ffc9d5] rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b76e79]" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#b76e79] font-medium font-body">
                Clean Beauty Collection
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-light text-[#3d2c2c] leading-[1.1] mb-6"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Reveal Your
              <br />
              <em className="italic font-semibold text-[#b76e79]">Natural</em>
              <br />
              Glow
            </h1>

            <p className="text-base sm:text-lg font-body font-light text-[#6b4c4c] leading-relaxed max-w-md mb-8">
              Luxury skincare and makeup crafted with the finest botanicals. Because your skin deserves nothing but the best.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="px-8 py-3.5 bg-[#3d2c2c] text-white text-sm font-medium tracking-wider rounded-full hover:bg-[#b76e79] transition-all duration-300 shadow-lg shadow-[#3d2c2c]/20 hover:shadow-[#b76e79]/30 hover:-translate-y-0.5"
              >
                Shop Now
              </Link>
              <Link
                href="/products?category=serum"
                className="px-8 py-3.5 bg-transparent border border-[#3d2c2c]/30 text-[#3d2c2c] text-sm font-medium tracking-wider rounded-full hover:border-[#b76e79] hover:text-[#b76e79] transition-all duration-300"
              >
                View Skincare
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-[#ffc9d5]/40">
              {[
                { value: '50K+', label: 'Happy Customers' },
                { value: '100%', label: 'Clean Formula' },
                { value: '4.9★', label: 'Average Rating' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-xl font-display font-semibold text-[#3d2c2c]"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs font-light text-[#9d7e7e] mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm lg:max-w-md">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-[#b76e79]/20">
                {/* Hero image: beauty products flatlay - by Content Pixie (very popular, stable) */}
                <Image
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=90&auto=format&fit=crop"
                  alt="Glowly Beauty Hero"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d2c2c]/30 via-transparent to-transparent" />
              </div>

              {/* Floating card 1 */}
              <div className="absolute -left-6 top-1/4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-[#b76e79]/10 max-w-[140px]">
                <div className="flex items-center gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-3 h-3 text-[#c9a84c] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-[#3d2c2c] font-medium leading-tight">Bestselling Formula</p>
                <p className="text-xs text-[#9d7e7e] font-light mt-0.5">12,000+ reviews</p>
              </div>

              {/* Floating card 2 */}
              <div className="absolute -right-4 bottom-1/4 bg-[#3d2c2c] rounded-2xl p-4 shadow-lg max-w-[130px]">
                <p
                  className="text-2xl font-display font-light text-[#ffc9d5] mb-0.5"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  New
                </p>
                <p className="text-xs text-white/70 font-light leading-snug">Spring Collection 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
