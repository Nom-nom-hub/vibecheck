import dynamic from 'next/dynamic';

// Force this page to be dynamically rendered
export const dynamic = 'force-dynamic';

// Use the Edge runtime for better performance
export const runtime = 'edge';

// Dynamically import the client component with no SSR
const AuthCallbackHandler = dynamic(
  () => import('@/components/Auth/AuthCallbackHandler'),
  { ssr: false }
);

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Completing authentication...</p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">You will be redirected automatically...</p>
      </div>

      {/* Client-side only component that handles the auth callback */}
      <AuthCallbackHandler />
    </div>
  );
}
