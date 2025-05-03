'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the code from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
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
  }, [router]);

  return null;
}
