# Authentication Setup Guide

This guide will help you set up Google OAuth and Email OTP verification for your Little Star application.

## 🔧 Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API

### Step 2: Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type
3. Fill in the required information:
   - App name: `Little Star`
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users (your email addresses for testing)

### Step 3: Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Choose **Web application**
4. Add authorized redirect URIs:
   - `http://localhost:3001/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
5. Copy the **Client ID** and **Client Secret**

### Step 4: Update Environment Variables

Update your `.env.local` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
```

## 📧 Email OTP Setup

### Step 1: Gmail App Password (Recommended)

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google Account Settings](https://myaccount.google.com/)
3. Navigate to **Security** > **2-Step Verification** > **App passwords**
4. Generate an app password for "Mail"
5. Copy the 16-character password

### Step 2: Update Environment Variables

Add to your `.env.local` file:

```env
# Email configuration for OTP
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

### Alternative: Using Other Email Providers

#### Outlook/Hotmail
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

#### Custom SMTP
```env
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASSWORD=your-password
```

## 🚀 Testing the Setup

### Test Google OAuth
1. Start your development server: `npm run dev`
2. Go to `http://localhost:3001/auth/signin`
3. Click "Continue with Google"
4. You should be redirected to Google's OAuth consent screen

### Test Email OTP
1. Go to `http://localhost:3001/auth/signup`
2. Fill in the signup form
3. Click "Send Verification Code"
4. Check your email for the 6-digit code
5. Enter the code to complete registration

## 🔒 Security Best Practices

1. **Never commit credentials to version control**
2. **Use environment variables for all sensitive data**
3. **Enable 2FA on your Google account**
4. **Use app passwords instead of your main password**
5. **Regularly rotate your credentials**

## 🐛 Troubleshooting

### Google OAuth Issues

**Error: "OAuth client was not found"**
- Check that your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Ensure the redirect URI matches exactly (including protocol and port)

**Error: "Access blocked"**
- Add your email to test users in OAuth consent screen
- Make sure the app is not in production mode if you haven't completed verification

### Email OTP Issues

**Error: "Failed to send verification email"**
- Check your email credentials in `.env.local`
- Ensure you're using an app password for Gmail
- Check that 2FA is enabled on your Gmail account

**Error: "Invalid or expired verification code"**
- OTP codes expire after 10 minutes
- Make sure you're entering the correct 6-digit code
- Try requesting a new code

## 📝 Environment Variables Template

Create a `.env.local` file with these variables:

```env
# Database
DATABASE_URL="your-database-url"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3001"

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email configuration for OTP
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## ✅ Verification Checklist

- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] OAuth credentials created
- [ ] Redirect URIs added
- [ ] Environment variables updated
- [ ] Gmail app password generated
- [ ] Email credentials added to `.env.local`
- [ ] Google OAuth tested
- [ ] Email OTP tested

## 🎉 You're All Set!

Your authentication system now supports:
- ✅ Email/Password registration with OTP verification
- ✅ Google OAuth sign-in
- ✅ Secure email verification
- ✅ Multi-step signup process
- ✅ Automatic sign-in after verification

Users can now:
1. Sign up with email and verify via OTP
2. Sign in with Google OAuth
3. Sign in with email/password
4. Have their email automatically verified

Need help? Check the troubleshooting section above or create an issue in the repository.
