#  Glowly Beauty

Website e-commerce kecantikan premium yang dibangun menggunakan **Next.js 14 (App Router)**, **TypeScript**, dan **Tailwind CSS**.  
Data produk diambil secara real-time dari **DummyJSON API**.

---

## Sumber Data API

Menggunakan **DummyJSON API**:

- https://dummyjson.com/products  
  → SSG (menampilkan semua produk)

- https://dummyjson.com/products/{id}  
  → SSG (detail produk)

- https://dummyjson.com/products/search  
  → SSR (`no-store`) untuk pencarian produk

- https://dummyjson.com/products/category/{slug}  
  → Menampilkan related products berdasarkan kategori

---

## Fitur

- Homepage dengan hero section  
- Daftar produk  
- Detail produk  
- Cart (React Context API)  
- Wishlist  
- Pencarian produk (SSR)  
- Responsive design  
- Deploy ke Vercel  

---

## Tech Stack

- Next.js 14 (App Router)  
- TypeScript  
- Tailwind CSS  
- React Context API  

---

## Live Demo

👉 https://glowly-beauty.vercel.app/

---


Buka di browser:  
http://localhost:3000
