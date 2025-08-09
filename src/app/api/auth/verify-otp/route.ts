import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otp';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, otp, password, name, type = 'signup' } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Verify OTP
    const isValidOTP = await verifyOTP(email, otp);
    if (!isValidOTP) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    if (type === 'signup') {
      // For signup, create new user
      if (!password || !name) {
        return NextResponse.json(
          { success: false, message: 'Name and password are required for signup' },
          { status: 400 }
        );
      }

      // Check if user already exists (double check)
      const existingUser = await db.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return NextResponse.json(
          { success: false, message: 'User already exists with this email' },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          emailVerified: new Date(), // Mark email as verified
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });

    } else if (type === 'login') {
      // For login, just verify the user exists
      const user = await db.user.findUnique({
        where: { email }
      });

      if (!user) {
        return NextResponse.json(
          { success: false, message: 'No account found with this email' },
          { status: 400 }
        );
      }

      // Update email verification if not already verified
      if (!user.emailVerified) {
        await db.user.update({
          where: { email },
          data: { emailVerified: new Date() }
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Email verified successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid verification type' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
