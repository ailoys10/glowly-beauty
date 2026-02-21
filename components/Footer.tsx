import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#3d2c2c] text-[#f2d9c9] mt-20">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex flex-col leading-none mb-4">
              <span className="text-3xl font-display font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                glowly
              </span>
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c] font-medium -mt-1">
                beauty
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#e8bfa5] max-w-xs font-light">
              Crafted for the woman who believes beauty begins with care. Clean formulas, conscious choices, and a touch of luxury.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/sipazzh?igsh=MTJ6d2U1ajVpOWJ3Zw==' },
                { name: 'TikTok', url: 'https://www.tiktok.com/@ailup.00?_r=1&_t=ZS-945jaG1gYkS' },
                { name: 'Pinterest', url: 'https://pin.it/7AV1nVqac' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase text-[#c9a84c] hover:text-white transition-colors duration-200"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#c9a84c] font-medium mb-4">Shop</h4>
            <ul className="space-y-3">
              {['All Products', 'Skincare', 'Makeup', 'Lip Care', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <Link href="/products" className="text-sm text-[#e8bfa5] hover:text-white transition-colors duration-200 font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#c9a84c] font-medium mb-4">Help</h4>
            <ul className="space-y-3">
              {['About Us', 'FAQ', 'Shipping Policy', 'Returns', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#e8bfa5] hover:text-white transition-colors duration-200 font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#6b4c4c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#9d7e7e]">
            © 2024 Glowly Beauty. All rights reserved.
          </p>
          <p className="text-xs text-[#9d7e7e]">
            Made with <span className="text-[#ffc9d5]">♥</span> for your natural glow
          </p>
        </div>
      </div>
    </footer>
  );
}
