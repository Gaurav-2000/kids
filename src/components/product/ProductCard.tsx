'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import SafeImage from '@/components/ui/SafeImage';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Ensure rating fields don't accidentally render
  const cleanProduct = {
    ...product,
  };

  const hasDiscount = cleanProduct.salePrice && cleanProduct.salePrice < cleanProduct.price;
  const discountPercentage = hasDiscount
    ? calculateDiscount(cleanProduct.price, cleanProduct.salePrice!)
    : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(cleanProduct.id)) {
      removeFromWishlist(cleanProduct.id);
    } else {
      addToWishlist(cleanProduct);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to cart with default size and color if available
    const defaultSize = cleanProduct.sizes.length > 0 ? cleanProduct.sizes[0] : undefined;
    const defaultColor = cleanProduct.colors.length > 0 ? cleanProduct.colors[0] : undefined;
    addItem(cleanProduct, 1, defaultSize, defaultColor);
  };

  if (viewMode === 'list') {
    return (
      <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <Link href={`/products/${cleanProduct.slug}`} className="flex">
          <div className="relative w-48 h-48 flex-shrink-0">
            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {discountPercentage}% Off
              </div>
            )}

            <SafeImage
              src={cleanProduct.images[0] || '/images/placeholder.jpg'}
              alt={cleanProduct.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              fallbackSrc="/images/placeholder.jpg"
            />
          </div>

          <div className="flex-1 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
              {cleanProduct.name}
            </h3>

            <div className="flex items-center space-x-2 mb-4">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(cleanProduct.salePrice!)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(cleanProduct.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(cleanProduct.price)}
                </span>
              )}
            </div>

            {cleanProduct.sizes.length > 0 && (
              <div className="mb-4">
                <span className="text-sm text-gray-600 mr-2">Available sizes:</span>
                <div className="flex flex-wrap gap-1">
                  {cleanProduct.sizes.map((size) => (
                    <span
                      key={size}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleWishlistToggle}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={16}
                    className={`${
                      isInWishlist(cleanProduct.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    } transition-colors`}
                  />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-orange-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <ShoppingCart size={16} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link href={`/products/${cleanProduct.slug}`}>
        <div className="relative aspect-square overflow-hidden">
          {/* Discount Badge */}
          {hasDiscount && discountPercentage > 0 && (
            <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discountPercentage}% Off
            </div>
          )}

          {/* Sale Badge */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              Sale
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute z-10 p-2 bg-white rounded-full shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ${
              hasDiscount ? 'top-12 right-2' : 'top-2 right-2'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart
              size={16}
              className={`${
                isInWishlist(cleanProduct.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
              } transition-colors`}
            />
          </button>

          {/* Product Image */}
          <div className="relative w-full h-full">
            <SafeImage
              src={cleanProduct.images[currentImageIndex] || '/images/placeholder.jpg'}
              alt={cleanProduct.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              fallbackSrc="/images/placeholder.jpg"
            />
          </div>

          {/* Image Indicators */}

          {Array.isArray(cleanProduct.images) && cleanProduct.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {cleanProduct.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Mobile Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 z-10 md:hidden bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
            aria-label="Quick add to cart"
          >
            <ShoppingCart size={18} />
          </button>

          {/* Desktop Quick Add to Cart */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
            <button
              onClick={handleAddToCart}
              className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={16} />
              <span>Quick Add</span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {cleanProduct.name}
          </h3>

          {/* Reviews */}
          <div className="flex items-center mb-2">
            <div className="text-sm text-gray-500">No reviews</div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(cleanProduct.salePrice!)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(cleanProduct.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(cleanProduct.price)}
              </span>
            )}
          </div>

          {/* Available Sizes */}
          {cleanProduct.sizes.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {cleanProduct.sizes.slice(0, 4).map((size) => (
                  <span
                    key={size}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {size}
                  </span>
                ))}
                {cleanProduct.sizes.length > 4 && (
                  <span className="text-xs text-gray-500">
                    +{cleanProduct.sizes.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Stock Status */}
          {cleanProduct.stock === 0 && (
            <div className="mt-2">
              <span className="text-sm text-red-500 font-medium">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      {/* Mobile Add to Cart Button */}
      <div className="p-4 pt-0 md:hidden">
        <button
          onClick={handleAddToCart}
          disabled={cleanProduct.stock === 0}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <ShoppingCart size={16} />
          <span>{cleanProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
