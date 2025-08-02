'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import SafeImage from '@/components/ui/SafeImage';

const MiniCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, itemCount, total, removeItem } = useCart();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // 150ms delay before closing
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="p-2 hover:bg-gray-100 rounded-full relative"
      >
        <ShoppingCart size={20} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>

      {/* Mini Cart Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 w-80 bg-white rounded-lg shadow-lg border z-50"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Shopping Cart ({itemCount})</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="max-h-64 overflow-y-auto space-y-3">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <SafeImage
                        src={item.product.images[0] || '/images/placeholder.jpg'}
                        alt={item.product.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-gray-500">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.size && item.color && <span> • </span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                          <span className="text-sm font-medium">
                            {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {items.length > 3 && (
                    <div className="text-center text-sm text-gray-500 py-2">
                      +{items.length - 3} more items
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold text-lg">{formatPrice(total)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      href="/cart"
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded text-center block text-sm font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      View Cart
                    </Link>
                    <Link
                      href="/checkout"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-center block text-sm font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
