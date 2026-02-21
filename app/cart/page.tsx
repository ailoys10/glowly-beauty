'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { useToast } from '@/lib/toastContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { showToast } = useToast();

  const handleRemove = (id: number, title: string) => {
    removeFromCart(id);
    showToast(`${title} removed`, 'info');
  };

  const handleCheckout = () => {
    clearCart();
    showToast('Order placed! 🎉', 'success', 'Thank you for shopping at Glowly Beauty');
  };

  const shipping = totalPrice >= 300000 ? 0 : 25000;
  const grandTotal = totalPrice + shipping;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#fff5f7] via-[#fdf8f5] to-[#f9ede4] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-4">My Shopping</p>
          <h1
            className="text-5xl font-display font-light text-[#3d2c2c]"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            My Cart
            {totalItems > 0 && (
              <span className="ml-3 text-2xl text-[#b76e79]">({totalItems})</span>
            )}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#fff5f7] flex items-center justify-center">
              <svg className="w-12 h-12 text-[#ffc9d5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <h2 className="text-3xl font-display font-light text-[#3d2c2c] mb-3" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Your cart is empty
            </h2>
            <p className="text-[#9d7e7e] font-light mb-8">Add some products to get started.</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3d2c2c] text-white rounded-full text-sm font-medium hover:bg-[#b76e79] transition-all duration-300 hover:-translate-y-0.5">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-[#ffc9d5]/30 hover:border-[#ffc9d5] transition-colors">
                  <Link href={`/products/${item.id}`} className="shrink-0">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#f9ede4]">
                      <Image src={item.image} alt={item.title} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="96px" />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-display font-medium text-[#3d2c2c] text-base leading-tight hover:text-[#b76e79] transition-colors line-clamp-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm font-medium text-[#b76e79] mt-1">{formatPrice(item.price)}</p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-[#ffc9d5] rounded-full overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-[#6b4c4c] hover:bg-[#fff5f7] transition-colors text-lg">−</button>
                        <span className="w-8 text-center text-sm font-medium text-[#3d2c2c]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-[#6b4c4c] hover:bg-[#fff5f7] transition-colors text-lg">+</button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-[#3d2c2c]">{formatPrice(item.price * item.quantity)}</span>
                        <button onClick={() => handleRemove(item.id, item.title)} className="w-7 h-7 rounded-full flex items-center justify-center text-[#9d7e7e] hover:text-[#b76e79] hover:bg-[#fff5f7] transition-all" aria-label="Remove">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => { clearCart(); showToast('Cart cleared', 'info'); }}
                className="self-start text-xs text-[#9d7e7e] hover:text-[#b76e79] transition-colors underline underline-offset-2 mt-2"
              >
                Clear all items
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-[#ffc9d5]/30 p-6 sticky top-24">
                <h2 className="text-2xl font-display font-light text-[#3d2c2c] mb-6" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b4c4c] font-light">Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''})</span>
                    <span className="font-medium text-[#3d2c2c]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b4c4c] font-light">Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-[#c9a84c] font-medium">Free ✓</span>
                    ) : (
                      <span className="font-medium text-[#3d2c2c]">{formatPrice(shipping)}</span>
                    )}
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-[#9d7e7e] font-light bg-[#fff5f7] rounded-xl p-2.5">
                      Add {formatPrice(300000 - totalPrice)} more for free shipping 🚚
                    </p>
                  )}
                  <div className="border-t border-[#ffc9d5]/40 pt-3 flex justify-between">
                    <span className="font-medium text-[#3d2c2c]">Total</span>
                    <span className="text-xl font-display font-semibold text-[#3d2c2c]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#3d2c2c] text-white rounded-full text-sm font-medium tracking-wider hover:bg-[#b76e79] transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#3d2c2c]/20 mb-3"
                >
                  Checkout
                </button>
                <Link href="/products" className="block text-center text-sm text-[#6b4c4c] hover:text-[#b76e79] transition-colors font-light">
                  ← Continue Shopping
                </Link>

                <div className="mt-6 pt-5 border-t border-[#ffc9d5]/40 grid grid-cols-3 gap-2">
                  {[{ icon: '🔒', label: 'Secure Payment' }, { icon: '↩️', label: 'Easy Return' }, { icon: '🚚', label: 'Fast Delivery' }].map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-1 text-center">
                      <span className="text-lg">{b.icon}</span>
                      <span className="text-[10px] text-[#9d7e7e] font-light leading-tight">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
