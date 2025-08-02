import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Subscribe to Our Emails</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-r-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <SafeImage
                src="/images/footer-logo.png"
                alt="Nap Chief"
                width={120}
                height={48}
                className="h-12 w-auto"
                fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMTIwIDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSI2MCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5OYXAgQ2hpZWY8L3RleHQ+Cjwvc3ZnPgo="
              />
            </Link>
            <h4 className="text-lg font-semibold mb-3">Our mission</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              We are a 100% made in India brand that aims to deliver fun, vibrant & high quality clothing to families across the World! Come be a part of our Story
            </p>
          </div>

          {/* More Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">More Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/collections/new-arrivals" className="text-gray-300 hover:text-white transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-300 hover:text-white transition-colors">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Collection */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop Collection</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collections/new-arrivals" className="text-gray-300 hover:text-white transition-colors">
                  Summer
                </Link>
              </li>
              <li>
                <Link href="/collections/shorts-sets" className="text-gray-300 hover:text-white transition-colors">
                  Shorts Sets
                </Link>
              </li>
              <li>
                <Link href="/collections/chief-classics" className="text-gray-300 hover:text-white transition-colors">
                  Chief classics
                </Link>
              </li>
              <li>
                <Link href="/collections/infant" className="text-gray-300 hover:text-white transition-colors">
                  Infant
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping-returns" className="text-gray-300 hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/return-exchange" className="text-gray-300 hover:text-white transition-colors">
                  Return/Exchange an Order
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="text-gray-300 hover:text-white transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Reviews */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Follow Us @NapChief_Official</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Youtube size={24} />
                </a>
              </div>
            </div>
            <div className="text-center">
              <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">
                <div className="text-sm">Customers rate us</div>
                <div className="text-xl font-bold text-yellow-400">4.9/5</div>
                <div className="text-sm">based on 700 reviews</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm font-medium">Kid's Favourite Characters</div>
            </div>
            <div>
              <div className="text-sm font-medium">Made Proudly in India</div>
            </div>
            <div>
              <div className="text-sm font-medium">Mommy tested, Kid Approved</div>
            </div>
            <div>
              <div className="text-sm font-medium">Super Soft & Breathable</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Nap Chief. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
