import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sizes = searchParams.get('sizes')?.split(',');
    const colors = searchParams.get('colors')?.split(',');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    // Handle different collection types
    if (slug === 'boys' || slug === 'girls' || slug === 'infant') {
      // Gender-based collections - you might want to add a gender field to products
      // For now, we'll use category names that contain the gender
      where.OR = [
        { category: { name: { contains: slug, mode: 'insensitive' } } },
        { name: { contains: slug, mode: 'insensitive' } },
        { description: { contains: slug, mode: 'insensitive' } }
      ];
    } else if (slug === 'new-arrivals') {
      // New arrivals - products created in last 30 days or featured
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      where.OR = [
        { createdAt: { gte: thirtyDaysAgo } },
        { featured: true }
      ];
    } else if (slug === 'best-sellers') {
      // Best sellers - you might want to track sales, for now use featured
      where.featured = true;
    } else {
      // Category-based collections
      where.category = { slug };
    }

    // Price filters
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Size and color filters would need custom logic since they're stored as JSON
    // For now, we'll implement basic filtering

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          category: true,
          reviews: {
            select: {
              rating: true
            }
          }
        },
        orderBy: {
          [sortBy]: sortOrder
        },
        skip,
        take: limit
      }),
      db.product.count({ where })
    ]);

    // Parse JSON fields and calculate ratings
    let productsWithDetails = products.map(product => {
      const parsedSizes = JSON.parse(product.sizes || '[]');
      const parsedColors = JSON.parse(product.colors || '[]');
      
      return {
        ...product,
        images: JSON.parse(product.images || '[]'),
        sizes: parsedSizes,
        colors: parsedColors,
        averageRating: product.reviews.length > 0
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
          : 0,
        reviewCount: product.reviews.length
      };
    });

    // Apply size and color filters after parsing
    if (sizes && sizes.length > 0) {
      productsWithDetails = productsWithDetails.filter(product =>
        sizes.some(size => product.sizes.includes(size))
      );
    }

    if (colors && colors.length > 0) {
      productsWithDetails = productsWithDetails.filter(product =>
        colors.some(color => product.colors.includes(color))
      );
    }

    const totalPages = Math.ceil(total / limit);

    // Get collection info
    let collectionInfo = {
      name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
      description: `Discover our amazing ${slug.replace('-', ' ')} collection`,
      slug
    };

    // Try to get category info if it's a category-based collection
    if (!['boys', 'girls', 'infant', 'new-arrivals', 'best-sellers'].includes(slug)) {
      const category = await db.category.findUnique({
        where: { slug }
      });
      if (category) {
        collectionInfo = {
          name: category.name,
          description: category.description || collectionInfo.description,
          slug: category.slug
        };
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        collection: collectionInfo,
        products: productsWithDetails,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      }
    });
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch collection' },
      { status: 500 }
    );
  }
}
