'use client';

import { useEffect } from 'react';
import { initializeRevenueCat } from '@/lib/revenuecat';
import { AuthProvider } from '@/contexts/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize RevenueCat when the app starts
    try {
      // Only initialize in browser environment
      if (typeof window !== 'undefined') {
        const initialized = initializeRevenueCat();
        if (initialized) {
          console.log('RevenueCat successfully initialized in providers');
        } else {
          console.warn('RevenueCat initialization failed in providers');
        }
      }
    } catch (error) {
      console.error('Error initializing RevenueCat in providers:', error);
    }
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
}
