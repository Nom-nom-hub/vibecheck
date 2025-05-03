'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the auth code from the URL
    const handleAuthCallback = async () => {
      const code = searchParams.get('code');
      
      if (code) {
        try {
          // Exchange the code for a session
          await supabase.auth.exchangeCodeForSession(code);
          
          // Redirect to dashboard after successful authentication
          router.push('/dashboard');
        } catch (error) {
          console.error('Error exchanging code for session:', error);
          router.push('/login?error=auth_callback_error');
        }
      } else {
        // If no code is present, redirect to login
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Completing authentication...</p>
      </div>
    </div>
  );
}
