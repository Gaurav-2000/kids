import { NextRequest, NextResponse } from 'next/server';
import { generateOTP, sendOTPEmail, storeOTP } from '@/lib/otp';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, type = 'signup' } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // For signup, check if user already exists
    if (type === 'signup') {
      const existingUser = await db.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return NextResponse.json(
          { success: false, message: 'User already exists with this email' },
          { status: 400 }
        );
      }
    }

    // For login, check if user exists
    if (type === 'login') {
      const existingUser = await db.user.findUnique({
        where: { email }
      });

      if (!existingUser) {
        return NextResponse.json(
          { success: false, message: 'No account found with this email' },
          { status: 400 }
        );
      }
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in database
    const stored = await storeOTP(email, otp, type);
    if (!stored) {
      return NextResponse.json(
        { success: false, message: 'Failed to generate verification code' },
        { status: 500 }
      );
    }

    // Send OTP via email
    const sent = await sendOTPEmail(email, otp, type);
    if (!sent) {
      return NextResponse.json(
        { success: false, message: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to your email'
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
