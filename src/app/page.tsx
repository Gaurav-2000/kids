'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import SafeImage from '@/components/ui/SafeImage';
import QuickAddButton from '@/components/product/QuickAddButton';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

// Mock data matching Little Start products
const newArrivalsProducts = [
  {
    id: '1',
    name: 'Tom and Jerry High Five Co-Ord Set',
    slug: 'tom-and-jerry-high-five-co-ord-set',
    description: 'Comfortable co-ord set featuring Tom and Jerry characters',
    price: 990,
    salePrice: 0,
    images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&crop=center'],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: ['Blue', 'Red'],
    stock: 10,
    featured: true,
    categoryId: '1',
    category: { id: '1', name: 'Co-Ord Sets', slug: 'co-ord-sets', createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Lion King Girls Shorts set',
    slug: 'lion-king-girls-shorts-set',
    description: 'Beautiful Lion King themed shorts set for girls',
    price: 990,
    salePrice: 0,
    images: ['https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center'],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: ['Pink', 'Yellow'],
    stock: 8,
    featured: true,
    categoryId: '2',
    category: { id: '2', name: 'Shorts Sets', slug: 'shorts-sets', createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Quidditch 07 Harry Potter T-Shirt',
    slug: 'quidditch-07-harry-potter-t-shirt',
    description: 'Official Harry Potter Quidditch themed t-shirt',
    price: 650,
    salePrice: 0,
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center'],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: ['Maroon', 'Black'],
    stock: 15,
    featured: true,
    categoryId: '3',
    category: { id: '3', name: 'T-Shirts', slug: 't-shirts', createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Smiley World Colourblock Heart Girls Co-Ord Set',
    slug: 'smiley-world-colourblock-heart-girls-co-ord-set',
    description: 'Cheerful Smiley World co-ord set with colorblock heart design',
    price: 1290,
    salePrice: 0,
    images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop&crop=center'],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: ['Pink', 'Purple', 'Blue'],
    stock: 15,
    featured: true,
    categoryId: '1',
    category: { id: '1', name: 'Co-Ord Sets', slug: 'co-ord-sets', createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Pikachu Electrifying Jogger Set',
    slug: 'pikachu-electrifying-jogger-set',
    description: 'Electric Pikachu themed jogger set for active kids',
    price: 1290,
    salePrice: 0,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center'],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: ['Yellow', 'Blue'],
    stock: 12,
    featured: true,
    categoryId: '5',
    category: { id: '5', name: 'Joggers', slug: 'joggers', createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Tom and Jerry Running Classic Co-Ord Set',
    slug: 'tom-and-jerry-running-classic-co-ord-set',
    description: 'Classic Tom and Jerry running themed co-ord set',
    price: 890,
    salePrice: 0,
    images: ['https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop&crop=center'],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: ['Blue', 'Red'],
    stock: 20,
    featured: true,
    categoryId: '1',
    category: { id: '1', name: 'Co-Ord Sets', slug: 'co-ord-sets', createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    name: 'Chase Raglan Jogger Set',
    slug: 'chase-raglan-jogger-set',
    description: 'Paw Patrol Chase themed raglan jogger set',
    price: 1049,
    salePrice: 0,
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&crop=center'],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: ['Blue', 'Navy'],
    stock: 18,
    featured: true,
    categoryId: '5',
    category: { id: '5', name: 'Joggers', slug: 'joggers', createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    name: 'The Lion King Simba Iconic Shorts Set',
    slug: 'the-lion-king-simba-iconic-shorts-set',
    description: 'Iconic Lion King Simba themed shorts set',
    price: 890,
    salePrice: 0,
    images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop&crop=center'],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: ['Orange', 'Yellow'],
    stock: 14,
    featured: true,
    categoryId: '2',
    category: { id: '2', name: 'Shorts Sets', slug: 'shorts-sets', createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const homeWearProducts = [
  {
    id: '9',
    name: 'Pikachu I Choose You Pajama Set',
    slug: 'pikachu-i-choose-you-pajama-set',
    description: 'Comfortable Pokemon Pikachu pajama set',
    price: 1049,
    salePrice: 990,
    images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&crop=center'],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: ['Yellow', 'Blue'],
    stock: 12,
    featured: true,
    categoryId: '4',
    category: { id: '4', name: 'Pajama Sets', slug: 'pajama-sets', createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '10',
    name: 'Tom and Jerry Half Sleeve Pajama Set',
    slug: 'tom-and-jerry-half-sleeve-pajama-set',
    description: 'Comfortable Tom and Jerry half sleeve pajama set',
    price: 990,
    salePrice: 590,
    images: ['https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center'],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: ['Blue', 'White'],
    stock: 8,
    featured: true,
    categoryId: '4',
    category: { id: '4', name: 'Pajama Sets', slug: 'pajama-sets', createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('new-arrivals');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 4);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 4) % 4);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const getCurrentProducts = () => {
    switch (activeTab) {
      case 'new-arrivals':
        return newArrivalsProducts;
      case 'outdoor-wear':
        return newArrivalsProducts.slice(0, 8);
      case 'home-wear':
        return homeWearProducts.concat(newArrivalsProducts.slice(0, 6));
      default:
        return newArrivalsProducts;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Image Slider */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-lg">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {/* Slide 1 */}
                <div className="w-full flex-shrink-0">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop&crop=center"
                    alt="Kids Playing with Colors"
                    width={1200}
                    height={400}
                    className="w-full h-[300px] md:h-[400px] object-cover"
                    fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkY2QjM1Ii8+Cjx0ZXh0IHg9IjYwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+S2lkcyBQbGF5aW5nPC90ZXh0Pgo8L3N2Zz4K"
                  />
                </div>

                {/* Slide 2 */}
                <div className="w-full flex-shrink-0">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=400&fit=crop&crop=center"
                    alt="Kids Fashion Collection"
                    width={1200}
                    height={400}
                    className="w-full h-[300px] md:h-[400px] object-cover"
                    fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkY2QjM1Ii8+Cjx0ZXh0IHg9IjYwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RmFzaGlvbiBDb2xsZWN0aW9uPC90ZXh0Pgo8L3N2Zz4K"
                  />
                </div>

                {/* Slide 3 */}
                <div className="w-full flex-shrink-0">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=400&fit=crop&crop=center"
                    alt="Hello Kitty Collection"
                    width={1200}
                    height={400}
                    className="w-full h-[300px] md:h-[400px] object-cover"
                    fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkY2QjM1Ii8+Cjx0ZXh0IHg9IjYwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SGVsbG8gS2l0dHk8L3RleHQ+Cjwvc3ZnPgo="
                  />
                </div>

                {/* Slide 4 */}
                <div className="w-full flex-shrink-0">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop&crop=center"
                    alt="Pokemon Collection"
                    width={1200}
                    height={400}
                    className="w-full h-[300px] md:h-[400px] object-cover"
                    fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkY2QjM1Ii8+Cjx0ZXh0IHg9IjYwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UG9rZW1vbiBDb2xsZWN0aW9uPC90ZXh0Pgo8L3N2Zz4K"
                  />
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      currentSlide === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Shop by Occasion */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Shop by Occasion</h2>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-8 border-b">
                <button
                  onClick={() => setActiveTab('new-arrivals')}
                  className={`pb-2 border-b-2 font-medium transition-colors ${
                    activeTab === 'new-arrivals'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-600 hover:text-orange-500'
                  }`}
                >
                  New Arrivals
                </button>
                <button
                  onClick={() => setActiveTab('outdoor-wear')}
                  className={`pb-2 border-b-2 font-medium transition-colors ${
                    activeTab === 'outdoor-wear'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-600 hover:text-orange-500'
                  }`}
                >
                  Outdoor wear
                </button>
                <button
                  onClick={() => setActiveTab('home-wear')}
                  className={`pb-2 border-b-2 font-medium transition-colors ${
                    activeTab === 'home-wear'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-600 hover:text-orange-500'
                  }`}
                >
                  Home Wear
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getCurrentProducts().slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href={`/collections/${activeTab}`}
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View all
              </Link>
            </div>
          </div>
        </section>

        {/* Shop By Collection */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Shop By Collection</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  name: 'Shorts Set',
                  href: '/collections/shorts-sets',
                  image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop&crop=center'
                },
                {
                  name: 'T-Shirts',
                  href: '/collections/t-shirts',
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center'
                },
                {
                  name: 'Dresses',
                  href: '/collections/dresses',
                  image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center'
                },
                {
                  name: 'Pajama Sets',
                  href: '/collections/pajama-sets',
                  image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&crop=center'
                },
                {
                  name: 'Joggers',
                  href: '/collections/joggers',
                  image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center'
                },
                {
                  name: 'Infant',
                  href: '/collections/infant',
                  image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&crop=center'
                },
              ].map((collection) => (
                <Link
                  key={collection.name}
                  href={collection.href}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <SafeImage
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">{collection.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Character World */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Images */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {/* Kids with Pokemon shirts */}
                  <div className="relative">
                    <SafeImage
                      src="/images/placeholder.jpg"
                      alt="Kids wearing Pokemon shirts"
                      width={300}
                      height={400}
                      className="w-full h-80 object-cover rounded-lg"
                      fallbackSrc="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=400&fit=crop&crop=center"
                    />
                    {/* Overlay text for demo */}
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                      <div className="text-white text-center font-bold">
                        <div className="text-2xl">⚡</div>
                        <div className="text-sm">Pokemon Kids</div>
                      </div>
                    </div>
                  </div>

                  {/* Hello Kitty dress */}
                  <div className="relative mt-8">
                    <div className="bg-pink-200 rounded-lg p-4 h-80 flex items-center justify-center">
                      <SafeImage
                        src="/images/placeholder.jpg"
                        alt="Girl in Hello Kitty dress"
                        width={250}
                        height={300}
                        className="w-full h-full object-cover rounded-lg"
                        fallbackSrc="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=250&h=300&fit=crop&crop=center"
                      />
                      {/* Overlay text for demo */}
                      <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                        <div className="text-white text-center font-bold">
                          <div className="text-2xl">🎀</div>
                          <div className="text-sm">Hello Kitty</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative sun icon */}
                <div className="absolute -bottom-4 -left-4">
                  <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="text-center lg:text-left">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">CHARACTER WORLD</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
                  Home to all your kid&apos;s favorite characters—wrapped in comfy, summer style! 🌞✨
                </p>
                <Link
                  href="/collections/character-world"
                  className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold text-lg transition-colors"
                >
                  EXPLORE NOW
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The Sibling Edit */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">The Sibling Edit</h2>
              <Link
                href="/collections/sibling-edit"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Explore Now
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivalsProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/collections/sibling-edit"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </section>



        {/* Infant Collection */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">INFANT COLLECTION</h2>
              <p className="text-gray-600 mb-6">
                Soft as a cloud, adorable as their giggles, and made for all-day cuddles! Explore the Infant Collection for your tiny bundle of cuteness!
              </p>
              <Link
                href="/collections/infant"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Explore Now
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  id: 'tom-jerry-infant-pajama-set',
                  slug: 'tom-jerry-infant-pajama-set',
                  name: 'Tom and Jerry Half Sleeve Pajama Set for Infant',
                  price: 990,
                  salePrice: 590,
                  image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&crop=center',
                  discount: 40
                },
                {
                  id: 'hello-kitty-infant-shorts-set',
                  slug: 'hello-kitty-infant-shorts-set',
                  name: 'Hello Kitty Classic Shorts Set For Infant',
                  price: 850,
                  salePrice: 650,
                  image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center'
                },
                {
                  id: 'batman-tom-jerry-infant-pack',
                  slug: 'batman-tom-jerry-infant-pack',
                  name: 'Batman and Tom and Jerry Pajama Sets Pack Of 2 For Infant',
                  price: 1080,
                  salePrice: 890,
                  image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&crop=center'
                },
                {
                  id: 'little-start-infant-shorts-pack',
                  slug: 'little-start-infant-shorts-pack',
                  name: 'Little Start Originals Shorts Sets Pack Of 3 For Infant',
                  price: 1670,
                  salePrice: 1290,
                  image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop&crop=center'
                },
                {
                  id: 'hello-kitty-paris-infant-jogger-pack',
                  slug: 'hello-kitty-paris-infant-jogger-pack',
                  name: 'Hello Kitty and Paris Jogger Set Pack Of 2 For Infant',
                  price: 1880,
                  salePrice: 1690,
                  image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center'
                }
              ].map((product) => (
                <div key={product.id} className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative aspect-square">
                      {product.salePrice && (
                        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {product.discount || Math.round(((product.price - product.salePrice) / product.price) * 100)}% Off
                        </div>
                      )}
                      <QuickAddButton
                        productId={product.id}
                        productName={product.name}
                        price={product.price}
                        salePrice={product.salePrice}
                        image={product.image}
                      />
                      <SafeImage
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <Link href={`/products/${product.slug}`}>
                    <div className="p-4">
                      <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">{product.name}</h3>
                      <div className="text-xs text-gray-500 mb-2">No reviews</div>
                      <div className="flex items-center space-x-2">
                        {product.salePrice ? (
                          <>
                            <span className="text-sm font-bold text-gray-900">₹{product.salePrice}</span>
                            <span className="text-xs text-gray-500 line-through">₹{product.price}</span>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Mobile Add to Cart Button */}
                  <div className="p-4 pt-0 md:hidden">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Create a product object compatible with the cart
                        const cartProduct = {
                          id: product.id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          salePrice: product.salePrice,
                          images: [product.image],
                          sizes: ['One Size'],
                          colors: ['Default'],
                          stock: 10,
                          featured: false,
                          categoryId: 'default',
                          category: { id: 'default', name: 'Default', slug: 'default', createdAt: new Date(), updatedAt: new Date() },
                          createdAt: new Date(),
                          updatedAt: new Date(),
                        };
                        addItem(cartProduct, 1, 'One Size', 'Default');
                      }}
                      className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart size={16} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/collections/infant"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View all 9 products
              </Link>
            </div>
          </div>
        </section>

        {/* Shop by Gender */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Shop by Gender</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/collections/boys" className="group relative rounded-lg overflow-hidden">
                <SafeImage
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center"
                  alt="Shop for Boys"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">Shop for Boys</h3>
                </div>
              </Link>

              <Link href="/collections/girls" className="group relative rounded-lg overflow-hidden">
                <SafeImage
                  src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop&crop=center"
                  alt="Shop for Girls"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">Shop for Girls</h3>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Shop From Us */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Why shop from us?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Stylish, Functional, & Value for money, That&apos;s the Little Start promises!<br />
              Thoughtfully designed fashion meets Comfort. Our collection is so buttery soft, your kids will want to wear them All Day - All Night!
            </p>

            <Link
              href="/collections/best-sellers"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors mb-12"
            >
              View Bestsellers
            </Link>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">Kid&apos;s Favourite Characters</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">Made Proudly in India</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">Mommy tested, Kid Approved</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">Super Soft & Breathable</div>
              </div>
            </div>

            {/* Media Logos */}
            <div className="mt-12">
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <SafeImage
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=40&fit=crop&crop=center"
                  alt="YouStory"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
                <SafeImage
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=40&fit=crop&crop=center"
                  alt="Media Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
                <SafeImage
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=40&fit=crop&crop=center"
                  alt="Media Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Let customers speak for us</h2>
            <div className="text-lg text-gray-600 mb-8">from 700 reviews</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Ashok Chhibbar",
                  title: "Little Start - The site for quality kids clothing",
                  review: "An excellent site to get good quality clothes for children. Lovely designs which are pleasing to the eye and loved by children. Modestly priced, the delivery is prompt.",
                  product: "Poser Daisy Shorts Set",
                  date: "06/18/2025"
                },
                {
                  name: "Shripriya",
                  title: "Lovely design and great quality",
                  review: "Loved the shirt with the reversible sequins.",
                  product: "Sorted Harry Potter Reversible Sequins Tee Unisex",
                  date: "06/01/2025"
                },
                {
                  name: "Hina khan",
                  title: "The best",
                  review: "Bought so many for my grandson..classy,not cheap.. Cool material..awesome prints n colors..size perfect..",
                  product: "Chill Pluto Co-Ord Set",
                  date: "04/22/2025"
                }
              ].map((review, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <h5 className="font-medium text-gray-800 mb-2">{review.title}</h5>
                  <p className="text-gray-600 text-sm mb-4">{review.review}</p>
                  <div className="text-xs text-gray-500 mb-2">
                    <div>{review.product}</div>
                    <div>{review.date}</div>
                  </div>
                  <h4 className="font-bold text-xl text-black border-t pt-3 mt-2">{review.name}</h4>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/pages/reviews"
                className="inline-block text-orange-500 hover:text-orange-600 font-medium"
              >
                Customers rate us 4.9/5 based on 700 reviews.
              </Link>
            </div>
          </div>
        </section>

        {/* Follow Us Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Follow Us @LittleStart_Official</h2>
            <div className="text-lg text-gray-600">
              <Link href="/pages/reviews" className="text-orange-500 hover:text-orange-600">
                423 Verified Reviews
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
