import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const product = await db.product.findUnique({
      where: { slug },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields and calculate ratings
    const productWithDetails = {
      ...product,
      images: JSON.parse(product.images || '[]'),
      sizes: JSON.parse(product.sizes || '[]'),
      colors: JSON.parse(product.colors || '[]'),
      averageRating: product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0,
      reviewCount: product.reviews.length
    };

    return NextResponse.json({
      success: true,
      data: productWithDetails
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
    const {
      name,
      description,
      price,
      salePrice,
      images,
      sizes,
      colors,
      stock,
      categoryId,
      featured
    } = body;

    // Generate new slug if name changed
    const newSlug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : slug;

    const product = await db.product.update({
      where: { slug },
      data: {
        ...(name && { name, slug: newSlug }),
        ...(description && { description }),
        ...(price && { price }),
        ...(salePrice !== undefined && { salePrice }),
        ...(images && { images: JSON.stringify(images) }),
        ...(sizes && { sizes: JSON.stringify(sizes) }),
        ...(colors && { colors: JSON.stringify(colors) }),
        ...(stock !== undefined && { stock }),
        ...(categoryId && { categoryId }),
        ...(featured !== undefined && { featured })
      },
      include: {
        category: true
      }
    });

    // Parse JSON fields for response
    const productWithParsedFields = {
      ...product,
      images: JSON.parse(product.images),
      sizes: JSON.parse(product.sizes),
      colors: JSON.parse(product.colors)
    };

    return NextResponse.json({
      success: true,
      data: productWithParsedFields,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    await db.product.delete({
      where: { slug }
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
