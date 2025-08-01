'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Search, Menu, X, User, Heart, LogOut, Star, Users, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import SafeImage from '@/components/ui/SafeImage';
import MiniCart from '@/components/cart/MiniCart';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-gray-100 text-gray-800 text-center py-2 text-sm">
        <span>Easy 7 day exchanges</span>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between py-4">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSearch}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-800"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full text-gray-800" aria-label="Wishlist">
                <Heart size={20} />
              </Link>
              {session ? (
                <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full text-gray-800">
                  <User size={20} />
                </Link>
              ) : (
                <Link href="/auth/signin" className="p-2 hover:bg-gray-100 rounded-full text-gray-800">
                  <User size={20} />
                </Link>
              )}
              <MiniCart />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:block border-t border-gray-200">
            <div className="flex items-center justify-between py-4">
              <ul className="flex items-center space-x-8 text-gray-900">
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
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-1">
                      <Link href="/collections/co-ord-sets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Co-Ord Sets</Link>
                      <Link href="/collections/shorts-sets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Shorts Sets</Link>
                      <Link href="/collections/t-shirts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">T-Shirts</Link>
                      <Link href="/collections/dresses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dresses</Link>
                      <Link href="/collections/pajama-sets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Pajama Sets</Link>
                      <Link href="/collections/joggers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Joggers</Link>
                    </div>
                  </div>
                </li>
                <li className="relative group">
                  <button className="hover:text-orange-500 transition-colors flex items-center">
                    Shop by Gender
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-1">
                      <Link href="/collections/boys" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Boys</Link>
                      <Link href="/collections/girls" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Girls</Link>
                      <Link href="/collections/infant" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Infant</Link>
                    </div>
                  </div>
                </li>

                <li>
                  <Link href="/collections/new-arrivals" className="hover:text-orange-500 transition-colors">
                    New Arrivals
                  </Link>
                </li>
              </ul>

              {/* Right Icons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSearch}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-800"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
                <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full text-gray-800" aria-label="Wishlist">
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
                      className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full text-gray-800"
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
                  <Link href="/auth/signin" className="p-2 hover:bg-gray-100 rounded-full text-gray-800">
                    <User size={20} />
                  </Link>
                )}

                <MiniCart />
              </div>
            </div>
          </nav>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 p-4">
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoFocus
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </form>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <nav className="py-4">
              <ul className="space-y-4 px-4 text-gray-900">
                <li>
                  <Link href="/" className="block py-2 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="block py-2 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                    Shop By Collection
                  </Link>
                </li>
                <li>
                  <Link href="/collections/boys" className="block py-2 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                    Boys
                  </Link>
                </li>
                <li>
                  <Link href="/collections/girls" className="block py-2 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                    Girls
                  </Link>
                </li>
                <li>
                  <Link href="/collections/new-arrivals" className="block py-2 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                    New Arrivals
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
