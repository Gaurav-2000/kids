'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const CartIcon = () => {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
      <ShoppingCart size={20} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
