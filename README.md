Glowly Beauty
Website e-commerce kecantikan premium dibangun dengan **Next.js 14 App Router**, TypeScript, dan Tailwind CSS.
Data produk diambil secara real-time dari **DummyJSON API** (dummyjson.com). |
## 📡 Sumber Data: DummyJSON API

```
https://dummyjson.com/products         → SSG: semua produk
https://dummyjson.com/products/{id}    → SSG: detail produk
https://dummyjson.com/products/search  → SSR: pencarian (no-store)
https://dummyjson.com/products/category/{slug} → Related products
```
Fitur:
Homepage dengan hero section
Daftar produk
Detail produk
Cart (Context API)
Wishlist
Responsive design
Deploy ke Vercel
Tech Stack:
Next.js 14
TypeScript
Tailwind CSS
React Context API
Live demo: https://glowly-beauty.vercel.app/
