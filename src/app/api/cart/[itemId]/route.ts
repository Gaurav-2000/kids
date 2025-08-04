import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
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

    const { itemId } = await params;
    const { quantity } = await request.json();

    if (quantity <= 0) {
      return NextResponse.json(
        { success: false, message: 'Quantity must be greater than 0' },
        { status: 400 }
      );
    }

    // Verify the cart item belongs to the user
    const cartItem = await db.cartItem.findFirst({
      where: {
        id: itemId,
        userId: user.id
      }
    });

    if (!cartItem) {
      return NextResponse.json(
        { success: false, message: 'Cart item not found' },
        { status: 404 }
      );
    }

    // Update quantity
    const updatedItem = await db.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: {
        product: {
          include: {
            category: true
          }
        }
      }
    });

    // Parse product JSON fields
    const cartItemWithParsedProduct = {
      ...updatedItem,
      product: {
        ...updatedItem.product,
        images: JSON.parse(updatedItem.product.images || '[]'),
        sizes: JSON.parse(updatedItem.product.sizes || '[]'),
        colors: JSON.parse(updatedItem.product.colors || '[]')
      }
    };

    return NextResponse.json({
      success: true,
      data: cartItemWithParsedProduct,
      message: 'Cart item updated'
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update cart item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
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

    const { itemId } = await params;

    // Verify the cart item belongs to the user
    const cartItem = await db.cartItem.findFirst({
      where: {
        id: itemId,
        userId: user.id
      }
    });

    if (!cartItem) {
      return NextResponse.json(
        { success: false, message: 'Cart item not found' },
        { status: 404 }
      );
    }

    // Delete the cart item
    await db.cartItem.delete({
      where: { id: itemId }
    });

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to remove cart item' },
      { status: 500 }
    );
  }
}
