import { NextResponse } from 'next/server';
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

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Access denied' },
        { status: 403 }
      );
    }

    // Get dashboard statistics
    const [
      totalProducts,
      totalUsers,
      totalOrders,
      orderStats
    ] = await Promise.all([
      db.product.count(),
      db.user.count(),
      db.order.count(),
      db.order.aggregate({
        _sum: {
          total: true
        }
      })
    ]);

    const stats = {
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue: orderStats._sum.total || 0
    };

    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
