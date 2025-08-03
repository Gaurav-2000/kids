'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function OrderSuccessPage() {
  const orderNumber = `LS${Date.now().toString().slice(-6)}`;

  useEffect(() => {
    // Clear any cart data from localStorage
    localStorage.removeItem('littlestart-cart');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle size={80} className="mx-auto text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-lg text-gray-600">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Order Number:</span>
                <span className="font-medium text-gray-900">#{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Order Date:</span>
                <span className="font-medium text-gray-900">
                  {new Date().toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span className="font-medium text-gray-900">
                  {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">What happens next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Mail size={24} className="text-orange-500" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Order Confirmation</h3>
                <p className="text-sm text-gray-600">
                  You&apos;ll receive an email confirmation with your order details shortly.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Package size={24} className="text-blue-500" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Order Processing</h3>
                <p className="text-sm text-gray-600">
                  We&apos;ll prepare your order and send you tracking information.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Truck size={24} className="text-green-500" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-600">
                  Your order will be delivered within 3-5 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/collections"
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                href="/orders"
                className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Track Your Order
              </Link>
            </div>
          </div>

          {/* Customer Support */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about your order, our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a href="mailto:support@littlestart.com" className="text-orange-500 hover:text-orange-600">
                Email: support@littlestart.com
              </a>
              <a href="tel:+911234567890" className="text-orange-500 hover:text-orange-600">
                Phone: +91 12345 67890
              </a>
            </div>
          </div>

          {/* Social Sharing */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Share your Little Start experience!</p>
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Share on Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Share on Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
