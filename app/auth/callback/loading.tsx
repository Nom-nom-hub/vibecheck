export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading authentication...</p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Please wait while we process your request...</p>
      </div>
    </div>
  );
}
