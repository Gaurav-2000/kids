#!/usr/bin/env node

// Script to check OAuth configuration
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Google OAuth Configuration...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('Please create a .env.local file in your project root.\n');
  process.exit(1);
}

// Read environment variables
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

let googleClientId = '';
let googleClientSecret = '';
let nextAuthUrl = '';
let nextAuthSecret = '';

envLines.forEach(line => {
  if (line.startsWith('GOOGLE_CLIENT_ID=')) {
    googleClientId = line.split('=')[1];
  }
  if (line.startsWith('GOOGLE_CLIENT_SECRET=')) {
    googleClientSecret = line.split('=')[1];
  }
  if (line.startsWith('NEXTAUTH_URL=')) {
    nextAuthUrl = line.split('=')[1];
  }
  if (line.startsWith('NEXTAUTH_SECRET=')) {
    nextAuthSecret = line.split('=')[1];
  }
});

// Check each configuration
console.log('📋 Configuration Check:');
console.log('========================');

// Check NEXTAUTH_URL
if (nextAuthUrl && nextAuthUrl !== 'your-nextauth-url') {
  console.log('✅ NEXTAUTH_URL:', nextAuthUrl);
} else {
  console.log('❌ NEXTAUTH_URL: Not configured properly');
}

// Check NEXTAUTH_SECRET
if (nextAuthSecret && nextAuthSecret !== 'your-nextauth-secret') {
  console.log('✅ NEXTAUTH_SECRET: Configured');
} else {
  console.log('❌ NEXTAUTH_SECRET: Not configured properly');
}

// Check Google Client ID
if (googleClientId && googleClientId !== 'your-google-client-id' && googleClientId !== 'your-actual-google-client-id-here') {
  console.log('✅ GOOGLE_CLIENT_ID: Configured');
  console.log('   Format check:', googleClientId.endsWith('.apps.googleusercontent.com') ? '✅ Valid format' : '⚠️  Should end with .apps.googleusercontent.com');
} else {
  console.log('❌ GOOGLE_CLIENT_ID: Not configured - replace with your actual Google Client ID');
}

// Check Google Client Secret
if (googleClientSecret && googleClientSecret !== 'your-google-client-secret' && googleClientSecret !== 'your-actual-google-client-secret-here') {
  console.log('✅ GOOGLE_CLIENT_SECRET: Configured');
} else {
  console.log('❌ GOOGLE_CLIENT_SECRET: Not configured - replace with your actual Google Client Secret');
}

console.log('\n🔗 Expected OAuth Redirect URI:');
console.log(`${nextAuthUrl}/api/auth/callback/google`);

console.log('\n📝 Next Steps:');
if (!googleClientId || googleClientId.includes('your-')) {
  console.log('1. Go to https://console.cloud.google.com/');
  console.log('2. Create a new project or select existing one');
  console.log('3. Enable Google+ API and OAuth2 API');
  console.log('4. Configure OAuth consent screen');
  console.log('5. Create OAuth 2.0 Client ID credentials');
  console.log('6. Add the redirect URI above to your OAuth client');
  console.log('7. Copy Client ID and Secret to your .env.local file');
} else {
  console.log('✅ Configuration looks good!');
  console.log('🚀 Try testing Google OAuth in your application');
}

console.log('\n💡 Troubleshooting:');
console.log('- Make sure your redirect URI exactly matches what\'s in Google Cloud Console');
console.log('- Ensure your domain is added to authorized origins');
console.log('- Check that OAuth consent screen is properly configured');
console.log('- Add your email as a test user if using external user type');
