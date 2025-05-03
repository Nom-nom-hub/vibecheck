import { lazy, Suspense } from 'react';

// Force this page to be dynamically rendered
export const dynamic = 'force-dynamic';

// Dynamically import the client component with no SSR
const SignupPageContent = lazy(() => import('@/components/Auth/SignupPageContent'));

// Loading component
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SignupPageContent />
    </Suspense>
  );
}
