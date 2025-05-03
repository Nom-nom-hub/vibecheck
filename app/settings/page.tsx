'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import UserProfile from '@/components/UserProfile';
import SubscriptionStatus from '@/components/SubscriptionStatus';

export default function SettingsPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

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

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 text-white text-3xl font-bold py-2 px-4 rounded-lg">
            VC
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Account Settings
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Manage your VibeCheck account
        </p>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <nav className="space-y-2">
              <a 
                href="/dashboard" 
                className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Dashboard
              </a>
              <a 
                href="/settings" 
                className="block px-3 py-2 rounded-md bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-medium"
              >
                Account Settings
              </a>
              <button 
                onClick={handleSignOut}
                className="w-full text-left block px-3 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Sign Out
              </button>
            </nav>
          </div>
          
          <div className="md:col-span-3 space-y-6">
            <UserProfile />
            
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Subscription
              </h2>
              <SubscriptionStatus />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
