'use client';

// import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SafeImage from '@/components/ui/SafeImage';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';

const CartPage = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Cart Items ({items.length})</h2>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className="flex-shrink-0">
                          <SafeImage
                            src={item.product.images[0] || '/images/placeholder.jpg'}
                            alt={item.product.name}
                            width={100}
                            height={100}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                <Link 
                                  href={`/products/${item.product.slug}`}
                                  className="hover:text-orange-500"
                                >
                                  {item.product.name}
                                </Link>
                              </h3>
                              <div className="text-sm text-gray-700 space-y-1">
                                {item.size && <p><span className="font-medium">Size:</span> {item.size}</p>}
                                {item.color && <p><span className="font-medium">Color:</span> {item.color}</p>}
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700 p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-medium w-8 text-center text-gray-900">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">
                                {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                              </div>
                              {item.product.salePrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  {formatPrice(item.product.price * item.quantity)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold text-center block transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/"
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium text-center block transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
                
                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t">
                  <div className="text-sm space-y-3">
                    <div className="flex items-center text-gray-700">
                      <span className="text-green-600 mr-2">✓</span>
                      Free shipping on all orders
                    </div>
                    <div className="flex items-center bg-orange-50 border border-orange-200 rounded-lg p-3 text-orange-800">
                      <span className="text-orange-600 mr-2 font-bold">✓</span>
                      <span className="font-medium">Easy 7-day returns</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="text-green-600 mr-2">✓</span>
                      Secure payment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
