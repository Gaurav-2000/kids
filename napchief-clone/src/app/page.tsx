'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import SafeImage from '@/components/ui/SafeImage';

// Mock data matching Nap Chief products
const newArrivalsProducts = [
  {
    id: '1',
    name: 'Tom and Jerry High Five Co-Ord Set',
    slug: 'tom-and-jerry-high-five-co-ord-set',
    description: 'Comfortable co-ord set featuring Tom and Jerry characters',
    price: 990,
    salePrice: undefined,
    images: ['https://napchief.com/cdn/shop/files/85_b6b1d282-edaf-4b8d-9210-4983805b4f3d_400x.jpg'],
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
    salePrice: undefined,
    images: ['https://napchief.com/cdn/shop/products/Summer-2_4_400x.jpg'],
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
    salePrice: undefined,
    images: ['https://napchief.com/cdn/shop/files/WB1063_88af273a-7343-46f3-83a8-af2f06bc2411_400x.gif'],
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
    salePrice: undefined,
    images: ['https://napchief.com/cdn/shop/files/2_2_f7a7d708-cb9b-45c8-aeb0-c4292dfd2e86_400x.jpg'],
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
    salePrice: undefined,
    images: ['https://napchief.com/cdn/shop/files/For_lop_400x.jpg'],
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
    salePrice: undefined,
    images: ['https://napchief.com/cdn/shop/files/ForShopify_3_7927599d-578f-4b8a-99d7-5b3f3a5a64f5_400x.jpg'],
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
    salePrice: undefined,
    images: ['https://napchief.com/cdn/shop/files/For_56_400x.jpg'],
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
    salePrice: undefined,
    images: ['https://napchief.com/cdn/shop/files/DS2180_400x.gif'],
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
    images: ['https://napchief.com/cdn/shop/files/1_5eae2fe4-dee8-422a-9c30-13075b268e87_400x.jpg'],
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
    images: ['https://napchief.com/cdn/shop/files/1_44e180ab-1ead-4be2-ae98-1b70dd99654d_400x.jpg'],
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
        {/* Hero Carousel */}
        <section className="relative">
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <Link href="/collections/new-arrivals">
              <SafeImage
                src="https://napchief.com/cdn/shop/files/Resized_New_Arrival_Desktop_1400x.png"
                alt="New Arrivals"
                fill
                className="object-cover"
                priority
                fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwMCIgaGVpZ2h0PSI1MDAiIHZpZXdCb3g9IjAgMCAxNDAwIDUwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRkY2QjM1Ii8+Cjx0ZXh0IHg9IjcwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TmV3IEFycml2YWxzPC90ZXh0Pgo8L3N2Zz4K"
              />
            </Link>
          </div>
        </section>

        {/* Secondary Banners */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/collections/hello-kitty" className="block">
                <SafeImage
                  src="https://napchief.com/cdn/shop/files/desktop_resized_hk_1400x.png"
                  alt="Hello Kitty Collection"
                  width={700}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </Link>
              <Link href="/collections/pokemon" className="block">
                <SafeImage
                  src="https://napchief.com/cdn/shop/files/Pokemon_banner_desktop_RESIZED_1f4d34df-a83b-4fd4-8b77-83f9ce44973a_1400x.png"
                  alt="Pokemon Collection"
                  width={700}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* Shop by Occasion */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Shop by Occasion</h2>

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
            <h2 className="text-3xl font-bold text-center mb-8">Shop By Collection</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  name: 'Shorts Set',
                  href: '/collections/shorts-sets',
                  image: 'https://napchief.com/cdn/shop/collections/Website_Banners-15_720x_4975773b-4228-4f60-b1e3-dc5867f0b0f7_400x.webp'
                },
                {
                  name: 'T-Shirts',
                  href: '/collections/t-shirts',
                  image: 'https://napchief.com/cdn/shop/collections/Website_Banners-13_720x_9dbca3f1-1c86-4a37-bfb4-9c21b1638b79_400x.webp'
                },
                {
                  name: 'Dresses',
                  href: '/collections/dresses',
                  image: 'https://napchief.com/cdn/shop/collections/Website_Banners-12_720x_f592d154-743e-4661-b6b1-af978e44f3e0_400x.webp'
                },
                {
                  name: 'Pajama Sets',
                  href: '/collections/pajama-sets',
                  image: 'https://napchief.com/cdn/shop/collections/WhatsApp_Image_2022-10-08_at_10.00.51_PM_720x_881141cd-2e9b-4d70-a1c7-fed3f8bc7a76_400x.webp'
                },
                {
                  name: 'Joggers',
                  href: '/collections/joggers',
                  image: 'https://napchief.com/cdn/shop/collections/Website_Banners-16_720x_c8695f2c-df09-4ed4-b4ed-e6a3a6439258_400x.webp'
                },
                {
                  name: 'Infant',
                  href: '/collections/infant',
                  image: 'https://napchief.com/cdn/shop/collections/WhatsApp_Image_2024-02-06_at_4.09.12_PM_1_400x.jpg'
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

        {/* Character World Banner */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="relative rounded-lg overflow-hidden">
              <SafeImage
                src="https://napchief.com/cdn/shop/files/character-world-banner.jpg"
                alt="Character World"
                width={1200}
                height={400}
                className="w-full h-64 md:h-80 object-cover"
                fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkY2QjM1Ii8+Cjx0ZXh0IHg9IjYwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2hhcmFjdGVyIFdvcmxkPC90ZXh0Pgo8L3N2Zz4K"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">Character World</h2>
                  <p className="text-lg md:text-xl mb-6">
                    Home to all your kid's favorite characters—wrapped in comfy, summer style! 🌞✨
                  </p>
                  <Link
                    href="/collections/character-world"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    EXPLORE NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Sibling Edit */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">The Sibling Edit</h2>
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

        {/* Home to Kid's Favourite Characters */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Home to Kid's Favourite Characters</h2>
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto">
              We're keeping the magic alive with all the latest heroes and princesses on your <em>favorite Nap Chief</em> outfits.
              Characters that have sparked thousands of imaginations around the world and we've created unique, <em>one-of-a-kind</em> looks for your kids & you!
            </p>

            {/* Character Logos Carousel */}
            <div className="overflow-hidden">
              <div className="flex animate-scroll space-x-8 mb-8">
                {[
                  { name: 'Harry Potter', image: 'https://napchief.com/cdn/shop/files/harry-potter_2_1.png', href: '/collections/harry-potter' },
                  { name: 'Looney Tunes', image: 'https://napchief.com/cdn/shop/files/looney-tunes_2.png', href: '/collections/looney-tunes' },
                  { name: 'Nick Jr', image: 'https://napchief.com/cdn/shop/files/Untitled_design_34.png', href: '/collections/nick-jr' },
                  { name: 'Marvel', image: 'https://napchief.com/cdn/shop/files/marvel_2.png', href: '/collections/marvel' },
                  { name: 'Disney', image: 'https://napchief.com/cdn/shop/files/Group_537.png', href: '/collections/disney' },
                ].map((character, index) => (
                  <Link key={index} href={character.href} className="flex-shrink-0">
                    <SafeImage
                      src={character.image}
                      alt={character.name}
                      width={120}
                      height={80}
                      className="h-20 w-auto hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Infant Collection */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">INFANT COLLECTION</h2>
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
                  id: 'inf1',
                  name: 'Tom and Jerry Half Sleeve Pajama Set for Infant',
                  price: 990,
                  salePrice: 590,
                  image: 'https://napchief.com/cdn/shop/files/Model_Shoot_V2_90e99468-d08b-4cb6-8f73-16f67d7141d3_400x.jpg',
                  discount: 40
                },
                {
                  id: 'inf2',
                  name: 'Hello Kitty Classic Shorts Set For Infant',
                  price: 850,
                  image: 'https://napchief.com/cdn/shop/files/1_71b8cf03-bc42-49c9-83ac-bfded59ddae3_400x.jpg'
                },
                {
                  id: 'inf3',
                  name: 'Batman and Tom and Jerry Pajama Sets Pack Of 2 For Infant',
                  price: 1080,
                  salePrice: 890,
                  image: 'https://napchief.com/cdn/shop/files/16_fdab2136-db9a-4b3f-b727-e3c1756f6b5e_400x.jpg'
                },
                {
                  id: 'inf4',
                  name: 'Nap Chief Originals Shorts Sets Pack Of 3 For Infant',
                  price: 1670,
                  salePrice: 1290,
                  image: 'https://napchief.com/cdn/shop/files/14_795b4f49-d97e-404f-8afd-93310274d5bb_400x.jpg'
                },
                {
                  id: 'inf5',
                  name: 'Hello Kitty and Paris Jogger Set Pack Of 2 For Infant',
                  price: 1880,
                  salePrice: 1690,
                  image: 'https://napchief.com/cdn/shop/files/18_f7903f9f-dc13-4492-a160-87fa62ea25c4_400x.jpg'
                }
              ].map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative aspect-square">
                    {product.salePrice && (
                      <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount || Math.round(((product.price - product.salePrice) / product.price) * 100)}% Off
                      </div>
                    )}
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
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
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/collections/infant"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View all 101 products
              </Link>
            </div>
          </div>
        </section>

        {/* Shop by Gender */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Shop by Gender</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/collections/boys" className="group relative rounded-lg overflow-hidden">
                <SafeImage
                  src="https://napchief.com/cdn/shop/files/Untitled_design_6.png"
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
                  src="https://napchief.com/cdn/shop/files/Untitled_design_2.png"
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
            <h2 className="text-3xl font-bold mb-4">Why shop from us?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Stylish, Functional, & Value for money, That's the Nap Chief promises!<br />
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
                <div className="text-lg font-semibold text-gray-900">Kid's Favourite Characters</div>
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
                  src="https://napchief.com/cdn/shop/files/youstory.png"
                  alt="YouStory"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
                <SafeImage
                  src="https://napchief.com/cdn/shop/files/3_974da7c3-f963-4e02-b89e-9ee6d1775d9a.png"
                  alt="Media Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
                <SafeImage
                  src="https://napchief.com/cdn/shop/files/2_35c956e1-f243-4de0-8a69-06905dfc1f06.png"
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
            <h2 className="text-3xl font-bold mb-8">Let customers speak for us</h2>
            <div className="text-lg text-gray-600 mb-8">from 700 reviews</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Ashok Chhibbar",
                  title: "Nap Chief - The site for quality kids clothing",
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
                  <h4 className="font-semibold mb-2">{review.name}</h4>
                  <h5 className="font-medium text-gray-800 mb-2">{review.title}</h5>
                  <p className="text-gray-600 text-sm mb-4">{review.review}</p>
                  <div className="text-xs text-gray-500">
                    <div>{review.product}</div>
                    <div>{review.date}</div>
                  </div>
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
            <h2 className="text-3xl font-bold mb-8">Follow Us @NapChief_Official</h2>
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
