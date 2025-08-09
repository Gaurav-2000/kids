import nodemailer from 'nodemailer';
import { db } from './db';
import { sendTestOTP, isEmailConfigured } from './test-email';

// Generate a 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
    },
  });
};

// Send OTP via email
export async function sendOTPEmail(email: string, otp: string, type: 'signup' | 'login' = 'signup'): Promise<boolean> {
  // Use test email if credentials are not configured
  if (!isEmailConfigured()) {
    console.log('⚠️  Email credentials not configured, using test mode');
    return await sendTestOTP(email, otp);
  }

  try {
    const transporter = createTransporter();
    
    const subject = type === 'signup' ? 'Verify Your Email - Little Star' : 'Login Verification - Little Star';
    const message = type === 'signup' 
      ? `Welcome to Little Star! Your verification code is: ${otp}. This code will expire in 10 minutes.`
      : `Your login verification code is: ${otp}. This code will expire in 10 minutes.`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Little Star</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">${type === 'signup' ? 'Welcome to Little Star!' : 'Login Verification'}</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              ${message}
            </p>
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h3 style="color: #ff6b35; font-size: 32px; letter-spacing: 4px; margin: 0;">${otp}</h3>
            </div>
            <p style="color: #999; font-size: 14px;">
              If you didn't request this verification code, please ignore this email.
            </p>
          </div>
          <div style="background: #333; padding: 20px; text-align: center;">
            <p style="color: #999; margin: 0; font-size: 12px;">
              © 2024 Little Star. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
}

// Store OTP in database
export async function storeOTP(email: string, otp: string, type: 'signup' | 'login' = 'signup'): Promise<boolean> {
  try {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    await db.verificationToken.upsert({
      where: {
        identifier_token: {
          identifier: email,
          token: otp,
        },
      },
      update: {
        expires: expiresAt,
      },
      create: {
        identifier: email,
        token: otp,
        expires: expiresAt,
      },
    });

    return true;
  } catch (error) {
    console.error('Error storing OTP:', error);
    return false;
  }
}

// Verify OTP
export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  try {
    const verification = await db.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token: otp,
        },
      },
    });

    if (!verification) {
      return false;
    }

    // Check if OTP has expired
    if (verification.expires < new Date()) {
      // Delete expired OTP
      await db.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email,
            token: otp,
          },
        },
      });
      return false;
    }

    // Delete used OTP
    await db.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token: otp,
        },
      },
    });

    return true;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return false;
  }
}

// Clean up expired OTPs (call this periodically)
export async function cleanupExpiredOTPs(): Promise<void> {
  try {
    await db.verificationToken.deleteMany({
      where: {
        expires: {
          lt: new Date(),
        },
      },
    });
  } catch (error) {
    console.error('Error cleaning up expired OTPs:', error);
  }
}
