'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// This is a client component, so it's safe to use hooks
export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Function to handle the auth callback
    const handleAuthCallback = async () => {
      try {
        // Get the code from the URL
        const code = searchParams.get('code');

        if (code) {
          // Exchange the code for a session
          await supabase.auth.exchangeCodeForSession(code);

          // Redirect to dashboard after successful authentication
          router.push('/dashboard');
        } else {
          // If no code is present, redirect to login
          router.push('/login');
        }
      } catch (error) {
        console.error('Error exchanging code for session:', error);
        router.push('/login?error=auth_callback_error');
      }
    };

    // Add a small delay to ensure the component is fully mounted
    const timer = setTimeout(() => {
      handleAuthCallback();
    }, 500);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Completing authentication...</p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">You will be redirected automatically...</p>
      </div>
    </div>
  );
}
