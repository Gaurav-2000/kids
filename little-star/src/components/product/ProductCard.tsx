'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import SafeImage from '@/components/ui/SafeImage';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();

  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercentage = hasDiscount
    ? calculateDiscount(product.price, product.salePrice!)
    : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to cart with default size and color if available
    const defaultSize = product.sizes.length > 0 ? product.sizes[0] : undefined;
    const defaultColor = product.colors.length > 0 ? product.colors[0] : undefined;
    addItem(product, 1, defaultSize, defaultColor);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden">
          {/* Discount Badge */}
          {hasDiscount && (
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
            className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Add to wishlist"
          >
            <Heart
              size={16}
              className={`${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
              } transition-colors`}
            />
          </button>

          {/* Product Image */}
          <div className="relative w-full h-full">
            <SafeImage
              src={product.images[currentImageIndex] || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              fallbackSrc="/images/placeholder.jpg"
            />
          </div>

          {/* Image Indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {product.images.map((_, index) => (
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

          {/* Quick Add to Cart */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            {product.name}
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
                  {formatPrice(product.salePrice!)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Available Sizes */}
          {product.sizes.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {product.sizes.slice(0, 4).map((size) => (
                  <span
                    key={size}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {size}
                  </span>
                ))}
                {product.sizes.length > 4 && (
                  <span className="text-xs text-gray-500">
                    +{product.sizes.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Stock Status */}
          {product.stock === 0 && (
            <div className="mt-2">
              <span className="text-sm text-red-500 font-medium">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
