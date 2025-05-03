'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SignupForm from '@/components/Auth/SignupForm';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

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
          <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Already have an account?</span>
          <Link
            href="/login"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          >
            Sign in
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Join VibeCheck and start creating better social media content
              </p>
            </div>

            {/* Signup form */}
            <div className="px-6 py-6">
              <SignupForm />
            </div>

            {/* Card footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/30 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
              </p>
            </div>
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
