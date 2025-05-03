'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import LoginForm from '@/components/Auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPageContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    if (!loading && user) {
      router.push('/dashboard');
    }

    // Check for success message from signup
    const signupSuccess = searchParams.get('signup');
    if (signupSuccess === 'success') {
      setMessage('Account created successfully! Please check your email for verification and log in.');
    }
  }, [user, loading, router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header/Nav */}
      <div className="w-full px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="bg-blue-600 text-white text-xl font-bold py-1 px-2 rounded-lg mr-2">
            VC
          </div>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">VibeCheck</span>
        </Link>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">New to VibeCheck?</span>
          <Link
            href="/signup"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          >
            Create an account
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
            {/* Card header */}
            <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Sign in to your account to continue
              </p>
            </div>

            {/* Success message */}
            {message && (
              <div className="mx-6 mt-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 rounded-lg text-sm">
                <div className="flex">
                  <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{message}</span>
                </div>
              </div>
            )}

            {/* Login form */}
            <div className="px-6 py-6">
              <LoginForm />
            </div>

            {/* Card footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/30 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                By signing in, you agree to our{' '}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>

          {/* Help links */}
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Forgot your password?
            </a>
            <span className="mx-2 text-gray-400">•</span>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Need help?
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full px-6 py-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} VibeCheck. All rights reserved.
        </p>
      </div>
    </div>
  );
}
