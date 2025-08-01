'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

interface QuickAddButtonProps {
  productId: string;
  productName: string;
  price: number;
  salePrice?: number;
  image: string;
  className?: string;
}

export default function QuickAddButton({
  productId,
  productName,
  price,
  salePrice,
  image,
  className = ''
}: QuickAddButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding || isAdded) return;

    setIsAdding(true);

    try {
      // Create a minimal product object for the cart
      const product: Product = {
        id: productId,
        name: productName,
        slug: productId,
        price: price,
        salePrice: salePrice,
        images: [image],
        sizes: ['One Size'],
        colors: ['Default'],
        stock: 10,
        featured: false,
        categoryId: 'infant',
        category: {
          id: 'infant',
          name: 'Infant',
          slug: 'infant',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Add to cart with default size and color
      addItem(product, 1, 'One Size', 'Default');

      setIsAdded(true);

      // Reset the button after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleQuickAdd}
      disabled={isAdding}
      className={`
        absolute top-2 right-2 z-10 
        w-8 h-8 rounded-full 
        flex items-center justify-center
        transition-all duration-200
        ${isAdded 
          ? 'bg-green-500 text-white' 
          : 'bg-white/90 hover:bg-orange-500 text-gray-700 hover:text-white'
        }
        shadow-md hover:shadow-lg
        ${isAdding ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      title={isAdded ? 'Added to cart!' : 'Quick add to cart'}
    >
      {isAdding ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : isAdded ? (
        <Check className="w-4 h-4" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
    </button>
  );
}
