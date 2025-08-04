import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // @ts-expect-error - NextAuth v4 compatibility with Next.js 15
    const session = await getServerSession(authOptions);
    
    if (!session || !(session as { user?: { email?: string } }).user?.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { email: (session as { user: { email: string } }).user.email }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const cartItems = await db.cartItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          include: {
            category: true
          }
        }
      }
    });

    // Parse product JSON fields
    const cartWithParsedProducts = cartItems.map(item => ({
      ...item,
      product: {
        ...item.product,
        images: JSON.parse(item.product.images || '[]'),
        sizes: JSON.parse(item.product.sizes || '[]'),
        colors: JSON.parse(item.product.colors || '[]')
      }
    }));

    const total = cartWithParsedProducts.reduce((sum, item) => {
      const price = item.product.salePrice || item.product.price;
      return sum + (price * item.quantity);
    }, 0);

    return NextResponse.json({
      success: true,
      data: {
        items: cartWithParsedProducts,
        total,
        itemCount: cartWithParsedProducts.reduce((sum, item) => sum + item.quantity, 0)
      }
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // @ts-expect-error - NextAuth v4 compatibility with Next.js 15
    const session = await getServerSession(authOptions);
    
    if (!session || !(session as { user?: { email?: string } }).user?.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { email: (session as { user: { email: string } }).user.email }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const { productId, quantity = 1, size, color } = await request.json();

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if item already exists in cart
    const existingItem = await db.cartItem.findFirst({
      where: {
        userId: user.id,
        productId,
        size,
        color
      }
    });

    let cartItem;

    if (existingItem) {
      // Update quantity
      cartItem = await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: {
          product: {
            include: {
              category: true
            }
          }
        }
      });
    } else {
      // Create new cart item
      cartItem = await db.cartItem.create({
        data: {
          userId: user.id,
          productId,
          quantity,
          size,
          color
        },
        include: {
          product: {
            include: {
              category: true
            }
          }
        }
      });
    }

    // Parse product JSON fields
    const cartItemWithParsedProduct = {
      ...cartItem,
      product: {
        ...cartItem.product,
        images: JSON.parse(cartItem.product.images || '[]'),
        sizes: JSON.parse(cartItem.product.sizes || '[]'),
        colors: JSON.parse(cartItem.product.colors || '[]')
      }
    };

    return NextResponse.json({
      success: true,
      data: cartItemWithParsedProduct,
      message: 'Item added to cart'
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add to cart' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // @ts-expect-error - NextAuth v4 compatibility with Next.js 15
    const session = await getServerSession(authOptions);
    
    if (!session || !(session as { user?: { email?: string } }).user?.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { email: (session as { user: { email: string } }).user.email }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Clear entire cart
    await db.cartItem.deleteMany({
      where: { userId: user.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to clear cart' },
      { status: 500 }
    );
  }
}
