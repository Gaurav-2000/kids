// Test email configuration for development
// This is a fallback when email credentials are not configured

export function sendTestOTP(email: string, otp: string): Promise<boolean> {
  return new Promise((resolve) => {
    // Simulate email sending delay
    setTimeout(() => {
      console.log('📧 TEST EMAIL SENT');
      console.log('===================');
      console.log(`To: ${email}`);
      console.log(`Subject: Verification Code - Little Star`);
      console.log(`OTP: ${otp}`);
      console.log('===================');
      console.log('💡 Check your console for the OTP code!');
      
      // In development, always return success
      resolve(true);
    }, 1000);
  });
}

export function isEmailConfigured(): boolean {
  return !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD);
}
