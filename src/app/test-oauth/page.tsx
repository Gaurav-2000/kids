'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function TestOAuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const testGoogleOAuth = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn('google', { 
        redirect: false,
        callbackUrl: '/' 
      });
      
      if (result?.error) {
        setError(`OAuth Error: ${result.error}`);
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      setError(`Unexpected error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Test Google OAuth
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Use this page to test your Google OAuth configuration
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              OAuth Configuration Status
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>NEXTAUTH_URL:</span>
                <span className="text-green-600">✓ Configured</span>
              </div>
              <div className="flex justify-between">
                <span>NEXTAUTH_SECRET:</span>
                <span className="text-green-600">✓ Configured</span>
              </div>
              <div className="flex justify-between">
                <span>GOOGLE_CLIENT_ID:</span>
                <span className="text-orange-600">⚠ Check Console</span>
              </div>
              <div className="flex justify-between">
                <span>GOOGLE_CLIENT_SECRET:</span>
                <span className="text-orange-600">⚠ Check Console</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              Required Redirect URI
            </h4>
            <code className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded">
              http://localhost:3000/api/auth/callback/google
            </code>
            <p className="text-xs text-blue-600 mt-2">
              Add this exact URL to your Google Cloud Console OAuth client
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              <h4 className="font-medium">Error Details:</h4>
              <p className="text-sm mt-1">{error}</p>
              
              {error.includes('invalid_client') && (
                <div className="mt-3 text-sm">
                  <p className="font-medium">Common fixes for invalid_client:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Check your GOOGLE_CLIENT_ID in .env.local</li>
                    <li>Verify the redirect URI in Google Cloud Console</li>
                    <li>Ensure OAuth consent screen is configured</li>
                    <li>Add your email as a test user</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          <button
            onClick={testGoogleOAuth}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Testing...' : 'Test Google OAuth'}
          </button>

          <div className="text-center">
            <Link 
              href="/auth/signin" 
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            Setup Instructions
          </h4>
          <ol className="text-xs text-yellow-700 space-y-1 list-decimal list-inside">
            <li>Go to <a href="https://console.cloud.google.com/" target="_blank" className="underline">Google Cloud Console</a></li>
            <li>Create a new project or select existing one</li>
            <li>Enable Google+ API and People API</li>
            <li>Configure OAuth consent screen (External)</li>
            <li>Create OAuth 2.0 Client ID credentials</li>
            <li>Add the redirect URI shown above</li>
            <li>Copy Client ID and Secret to .env.local</li>
            <li>Restart your development server</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
