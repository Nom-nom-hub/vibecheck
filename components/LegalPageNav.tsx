'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function LegalPageNav() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 mb-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo_high_res.png" 
            alt="VibeCheck Logo" 
            width={40} 
            height={40} 
            className="mr-2"
          />
          <span className="text-xl font-semibold text-gray-900 dark:text-white">VibeCheck</span>
        </Link>
        
        <div className="flex space-x-6">
          <Link 
            href="/" 
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Link>
          <Link 
            href="/privacy" 
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/terms" 
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </nav>
  );
}
