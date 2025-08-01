'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Search, Menu, X, User, Heart, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import SafeImage from '@/components/ui/SafeImage';
import MiniCart from '@/components/cart/MiniCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-orange-500 text-white text-center py-2 text-sm">
        <Link href="/collections/new-arrivals" className="hover:underline">
          Get UPTO 20% off on new launches! COUPONS AT CHECKOUT
        </Link>
      </div>

      {/* Secondary Banner */}
      <div className="bg-blue-600 text-white text-center py-2 text-sm">
        <span>Get 5% Cashback as Chief coins in your wallet on all Orders!</span>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between py-3">
            {/* Left Menu Items */}
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <Link href="/collections/chief-classics" className="text-orange-500 font-medium hover:underline">
                Chief Classics
              </Link>
              <Link href="https://wa.link/gw3zji" className="text-green-600 hover:underline">
                Let's Chat
              </Link>
              <Link href="/collections/flash-sale" className="text-red-500 font-medium hover:underline">
                FLASH SALE
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <SafeImage
                src="/images/logo.svg"
                alt="Nap Chief"
                width={120}
                height={48}
                className="h-12 w-auto"
                fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMTIwIDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRkY2QjM1Ii8+Cjx0ZXh0IHg9IjYwIiB5PSIyOCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5hcCBDaGllZjwvdGV4dD4KPHN2Zz4K"
              />
            </Link>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSearch}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full">
                <Heart size={20} />
              </Link>

              {/* User Menu */}
              {status === 'loading' ? (
                <div className="p-2">
                  <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
              ) : session ? (
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full"
                  >
                    {session.user?.image ? (
                      <SafeImage
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={20}
                        height={20}
                        className="w-5 h-5 rounded-full"
                      />
                    ) : (
                      <User size={20} />
                    )}
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                      <div className="p-3 border-b">
                        <p className="font-medium text-gray-900">{session.user?.name}</p>
                        <p className="text-sm text-gray-500">{session.user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/account"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Wishlist
                        </Link>
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            signOut();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <LogOut size={16} className="mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/auth/signin" className="p-2 hover:bg-gray-100 rounded-full">
                  <User size={20} />
                </Link>
              )}

              <MiniCart />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:block border-t border-gray-200">
            <ul className="flex items-center space-x-8 py-4">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li className="relative group">
                <button className="hover:text-orange-500 transition-colors flex items-center">
                  Shop By Collection
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </li>
              <li className="relative group">
                <button className="hover:text-orange-500 transition-colors flex items-center">
                  Shop by Gender
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </li>
              <li className="relative group">
                <button className="hover:text-orange-500 transition-colors flex items-center">
                  Shop By Characters
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </li>
              <li>
                <Link href="/collections/family-matching" className="hover:text-orange-500 transition-colors">
                  Family Twinning
                </Link>
              </li>
              <li>
                <Link href="/collections/new-arrivals" className="hover:text-orange-500 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections/sale" className="hover:text-orange-500 transition-colors">
                  Sale
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-orange-500 transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 p-4">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <nav className="py-4">
              <ul className="space-y-4 px-4">
                <li>
                  <Link href="/" className="block py-2 hover:text-orange-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="block py-2 hover:text-orange-500">
                    Shop By Collection
                  </Link>
                </li>
                <li>
                  <Link href="/gender" className="block py-2 hover:text-orange-500">
                    Shop by Gender
                  </Link>
                </li>
                <li>
                  <Link href="/characters" className="block py-2 hover:text-orange-500">
                    Shop By Characters
                  </Link>
                </li>
                <li>
                  <Link href="/collections/family-matching" className="block py-2 hover:text-orange-500">
                    Family Twinning
                  </Link>
                </li>
                <li>
                  <Link href="/collections/new-arrivals" className="block py-2 hover:text-orange-500">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/collections/sale" className="block py-2 hover:text-orange-500">
                    Sale
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="block py-2 hover:text-orange-500">
                    Reviews
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
